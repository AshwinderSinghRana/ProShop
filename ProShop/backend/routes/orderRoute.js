import express from "express";
import {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
} from "../controller/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const routerOrder = express.Router();

routerOrder.route("/").post(authMiddleware, addOrderItem);
routerOrder.route("/:id").get(authMiddleware, getOrderById);
routerOrder.route("/:id/pay").put(authMiddleware, updateOrderToPaid);

export default routerOrder;
