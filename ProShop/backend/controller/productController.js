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

// admin delete product
const productDeleteByAdmin = expressAsyncHandler(async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  if (product) {
    res.json("Product deleted");
  } else {
    res.status(404);
    throw new Error("product Not found");
  }
});

const createProductByAdmin = expressAsyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "images/sample.jpg", //error.....
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProductByAdmin = expressAsyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getProducts,
  productDeleteByAdmin,
  createProductByAdmin,
  updateProductByAdmin,
};
