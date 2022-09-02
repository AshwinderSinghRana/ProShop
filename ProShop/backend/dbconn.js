import mongoose from "mongoose";
import colors from "colors"


async function connectDB() {
  try {
    let result = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to mongodb".green.underline.bold);
  } catch (error) {
    console.log("dhang se kr");
  }
}

export default connectDB;
