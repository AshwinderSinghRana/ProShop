import mongoose from "mongoose";


async function connectDB() {
  try {
    let result = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("dhang se kr");
  }
}

export default connectDB;
