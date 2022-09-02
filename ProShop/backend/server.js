import express from "express";
import connectDB from "./dbconn.js";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
connectDB();

app.use("/products", authMiddleware,productRoutes); //  authMiddleware,
app.use("/user", userRoutes);
app.use("/login", authRoutes);
// const port = process.env.PORT;
const port = 1221;
app.listen(port, () => {
  console.log(`Server running on port ${1221}`.red.bold);
});
