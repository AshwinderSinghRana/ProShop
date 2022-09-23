import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();

async function connectDB() {
  try {
    let result = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to mongodb".green.underline.bold);
  } catch (error) {
    console.log(error.message);
  }
}
export default connectDB;
