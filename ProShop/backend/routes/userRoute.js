import express from "express"
import { getUserProfile, registerUser, verifyUser } from "../controller/authController.js"
import { createUser, deleteUser, getAllUser, getUser, updateUser } from "../controller/userController.js"
import {authMiddleware} from "../middleware/authMiddleware.js"

const routerUser = express.Router()


// routerUser.post("/",createUser)
routerUser.delete("/:id",deleteUser)
routerUser.put("/:id",updateUser)
routerUser.get("/:id",getUser)
routerUser.route("/").get( getAllUser)
routerUser.post("/login", verifyUser);
routerUser.route("/profile").get(authMiddleware,getUserProfile);
routerUser.route("/register").post(registerUser);

export default routerUser
