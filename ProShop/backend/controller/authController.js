import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import { generateToken } from "../utilis/generateToken.js"
import bcrypt from "bcrypt"


const verifyUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  
  const user = await User.findOne({
    email
  })
  if (user&&(await bcrypt.compare(password,user.password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      token:generateToken(user._id)
    })
  }
  else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})





const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password } = req.body
  
  const userExists = await User.findOne({
    email
  })
  if (userExists) {
    res.status(400)
    throw new Error("User already exist")
  }
  const user = await User.create({
    name,email,password
  })
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      token:generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})






const getUserProfile = asyncHandler(async (req, res) => {
  
  
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      
    })
  
  }
  else {
    res.status(404)
    throw new Error("User not found")
  }
})
export {verifyUser,getUserProfile,registerUser}