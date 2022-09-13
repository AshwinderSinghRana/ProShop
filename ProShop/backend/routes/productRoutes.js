import express from "express";
import upload from "../config/multer.js";
import {
  createProduct,
  getProduct,
  getProducts,
} from "../controller/productController.js";

const router = express.Router();

router.get("/:id", getProduct);
router.get("/", getProducts);
router.post("/", upload.single("image"), createProduct);

export default router;
