import Product from "../models/productModel.js";
import uploader from "../config/cloudinary.js";
import expressAsyncHandler from "express-async-handler";

const createProduct = expressAsyncHandler(async (req, res) => {
  let file = await uploader.uploader.upload(req.file.path);
  let fileUrl = file.secure_url;
  try {
    let result = await Product.create({ ...req.body, image: fileUrl });
    res.status(201).send({ success: "true", result });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const deleteProduct = expressAsyncHandler(async (req, res) => {
  try {
    let result = await Product.delete({ _id: req.params.id });
    res.status(200).send("Product is deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const updateProduct = expressAsyncHandler(async (req, res) => {
  try {
    let result = await Product.update({ _id: req.body._id }, req.body);
    res.status(200).send("product updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const getProduct = expressAsyncHandler(async (req, res) => {
  try {
    let result = await Product.findOne({ _id: req.params.id });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const getProducts = expressAsyncHandler(async (req, res) => {
  try {
    let result = await Product.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
export { createProduct, deleteProduct, updateProduct, getProduct, getProducts };
