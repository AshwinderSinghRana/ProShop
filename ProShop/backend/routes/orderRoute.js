import express from "express";
import {
  addOrderItem,
  MyOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controller/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const routerOrder = express.Router();

routerOrder.get("/myOrders", authMiddleware, MyOrders);
routerOrder.route("/").post(authMiddleware, addOrderItem);
routerOrder.route("/:id").get(authMiddleware, getOrderById);
routerOrder.route("/:id/pay").put(authMiddleware, updateOrderToPaid);

export default routerOrder;
