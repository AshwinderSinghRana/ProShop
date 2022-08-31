import Product from "../models/productModel.js";
import uploader from "../config/cloudinary.js";

async function createProduct(req, res) {
  let file = await uploader.uploader.upload(req.file.path);
  let fileUrl = file.secure_url;
  try {
    let result = await Product.create({ ...req.body, image: fileUrl });
    res.status(201).send({ success: "true", result });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteProduct(req, res) {
  try {
    let result = await Product.delete({ _id: req.params.id });
    res.status(200).send("Product is deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function updateProduct(req, res) {
  try {
    let result = await Product.update({ _id: req.body._id }, req.body);
    res.status(200).send("product updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getProduct(req, res) {
  try {
    let result = await Product.findOne({ _id: req.params.id });
    res.status(200).send( result );
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getProducts(req, res) {
  try {
    let result = await Product.find();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export { createProduct, deleteProduct, updateProduct, getProduct, getProducts };
