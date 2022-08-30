import express from "express";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./dbconn.js";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config()
const app = express();
app.use(cors());

app.use(express.json());
connectDB(); 

app.use("/products", productRoutes);

app.listen(5000, () => {
  console.log(`Server running on port ${5000}`);
});
