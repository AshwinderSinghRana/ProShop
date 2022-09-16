import express from "express";
import upload from "../config/multer.js";
import {
  createProduct,
  getProduct,
  getProducts,
  productDeleteByAdmin,
  updateProductByAdmin,
} from "../controller/productController.js";
import { admin, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getall", getProducts);
router.post("/create", upload.single("image"), createProduct);
router.route("/getProduct/:id").get(getProduct);
router.delete(
  "/removeProduct/:id",
  authMiddleware,
  admin,
  productDeleteByAdmin
);
router.put("/update/:id", authMiddleware, admin, updateProductByAdmin);

export default router;
