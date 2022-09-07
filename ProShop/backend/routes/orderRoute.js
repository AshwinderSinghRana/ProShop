import express from "express";
import { addOrderItem } from "../controller/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const routerOrder = express.Router();

routerOrder.route("/").post(authMiddleware, addOrderItem);

export default routerOrder;
