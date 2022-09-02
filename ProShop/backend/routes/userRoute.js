import express from "express"
import { createUser, deleteUser, getAllUser, getUser, updateUser } from "../controller/userController.js"

const routerUser = express.Router()


routerUser.post("/",createUser)
routerUser.delete("/:id",deleteUser)
routerUser.put("/:id",updateUser)
routerUser.get("/:id",getUser)
routerUser.get("/",getAllUser)

export default routerUser
