import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

async function createUser(req, res) {
  let { password } = req.body;
  let hash = await bcrypt.hash(password, 10);
  try {
    let result = await User.create({ ...req.body, password: hash });
    res.status(201).send({ success: "true", result });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// async function deleteUser(req, res) {
//   try {
//     let result = await User.deleteOne({ _id: req.params.id });
//     res.status(200).send({ success: true, result });
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// }
async function getUser(req, res) {
  try {
    let result = await User.findById({ _id: req.params.id });
    res.status(200).send({ success: true, result });
  } catch (error) {
    res.status(400).send(error.message);
  }
}
// async function getAllUser(req, res) {
//   try {
//     let total = await User.find().count();

//     let result = await User.find();
//     res.status(200).send({ success: true, total, result });
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// }
async function updateUser(req, res) {
  try {
    let result = await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).send({ success: true, result });
  } catch (error) {
    res.status(400).send(error.message);
  }
}
async function getUsers(req, res) {
  let users = await User.find();
  res.json(users);
}

async function deleteUser(req, res) {
  let user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
}

async function getUserById(req, res) {
  let user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
}

export { createUser, deleteUser, getUser, updateUser, getUsers, getUserById };
