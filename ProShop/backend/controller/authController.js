import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utilis/generateToken.js";
import bcrypt from "bcrypt";
import { Validator } from "node-input-validator";
import { checkValidation, failed } from "../config/validator.js";

const verifyUser = asyncHandler(async (req, res) => {
  //Use of Validator......................
  let v = new Validator(req.body, {
    email: "required|email",
    password: "required",
  });
  let value = JSON.parse(JSON.stringify(v));
  let errorResponse = await checkValidation(v);
  if (errorResponse) {
    return failed(res, errorResponse);
  }
  //Use of Validator......................

  const user = await User.findOne({
    email: value.inputs.email,
  });
  if (user && (await bcrypt.compare(value.inputs.password, user.password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({
    email,
  });
  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }
  let hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hash,
  });
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      let hash = await bcrypt.hash(req.body.password, 10);
      user.password = hash;
    }
    const updateUser = await user.save();
    res.send({
      id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      isVerified: updateUser.isVerified,
    });
  } else {
    res.status(400);
    throw new Error("User not Updated");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    const updateUser = await user.save();
    res.send({
      id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      isVerified: updateUser.isVerified,
    });
  } else {
    res.status(400);
    throw new Error("User not Updated");
  }
});

export {
  verifyUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  updateUser,
};
