import express from "express";
import { verifyUser } from "../controller/authController.js";

const authRoutes = express.Router();

authRoutes.post("/", verifyUser);

export default authRoutes;
