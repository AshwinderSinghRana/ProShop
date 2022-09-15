import express from "express";
import { authenticateHeader } from "../config/keys.js";
import {
  getUserProfile,
  registerUser,
  updateUserProfile,
  verifyUser,
} from "../controller/authController.js";
import {
  createUser,
  deleteUser,
  getUser,
  getUserById,
  getUsers,
  updateUserByAdmin,
} from "../controller/userController.js";
import { admin, authMiddleware } from "../middleware/authMiddleware.js";

const routerUser = express.Router();

routerUser
  .route("/profile")
  .get(authMiddleware, getUserProfile)
  .put(authMiddleware, updateUserProfile);
routerUser.route("/getUsers").get(authMiddleware, admin, getUsers);
routerUser
  .route("/:id")
  .delete(authMiddleware, admin, deleteUser)
  .get(authMiddleware, admin, getUserById)
  .put(authMiddleware, admin, updateUserByAdmin);
routerUser.put("/update/:id", updateUserByAdmin);
routerUser.post("/create", createUser);
routerUser.get("/getUser/:id", getUser);
// routerUser.route("/getAllUsers/").get(authMiddleware, getAllUser);
routerUser.post("/login", authenticateHeader, verifyUser);
routerUser.route("/register").post(registerUser);

export default routerUser;
