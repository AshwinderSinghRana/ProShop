import express from "express";
import {
  getUserProfile,
  registerUser,
  updateUserProfile,
  verifyUser,
} from "../controller/authController.js";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const routerUser = express.Router();


routerUser.delete("/:id", deleteUser);
routerUser.put("/update/:id", updateUser);
routerUser.get("/getUser/:id", getUser);
routerUser.route("/getUsers/").get(authMiddleware,getAllUser);
routerUser.post("/login", verifyUser);
routerUser
  .route("/profile")
  .get(authMiddleware, getUserProfile)
  .put(authMiddleware, updateUserProfile);
routerUser.route("/register").post(registerUser);

export default routerUser;
