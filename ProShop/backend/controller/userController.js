import User from "../models/userModel.js";
import bcrypt from "bcrypt"


async function createUser(req, res) {
    let {email,mobile,password}=req.body
    let hash=await bcrypt.hash(password,10)
  try {
    let result = await User.create({...req.body,password:hash});
    res.status(201).send({ success: "true", result });
  } catch (error) {
    res.status(400).send(error.message);
  }
}


async function deleteUser(req, res) {
    try {
      let result = await User.deleteOne({ _id: req.params.id });
      res.status(200).send({ success: true, result });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  async function getUser(req, res) {
    try {
      let result = await User.findById({ _id: req.params.id });
      res.status(200).send({ success: true, result });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  async function getAllUser(req, res) {
    try {
      let total = await User.find().count();
  
      let result = await User.find();
      res.status(200).send({ success: true, total, result });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  async function updateUser(req, res) {
    try {
      let result = await User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      res.status(200).send({ success: true, result });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  

export {  createUser,deleteUser,getUser,getAllUser,updateUser };
