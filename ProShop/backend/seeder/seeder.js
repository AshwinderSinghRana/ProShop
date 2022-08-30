import products from "../data/product.js"
import user from "../data/user.js"
import dotenv from "dotenv"
import connectDB from "../dbconn.js"
import Product from "../models/productModel.js"

connectDB();
const ImportData=async()=>{
  try {
      const sampleData=products.map((products)=>({...products}));
    await Product.insertMany(sampleData);
    console.log("Data imported succesfully");
    process.exit();
  } catch (error) {
      console.log(error.message)
      process.exit(1)
  }
}
const DestroyData=async()=>{
   await Product.deleteMany()
    console.log("Deleted succesfully")
    process.exit()
}
if (process.argv[2]==="-d") {
    DestroyData()
} else {
    ImportData()
}