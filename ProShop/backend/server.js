import express from "express";
import connectDB from "./dbconn.js";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoute.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import routerOrder from "./routes/orderRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
connectDB();

app.use(cors());
app.use(express.json());
app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/order", routerOrder);
app.use("/config/paypal", (req, res) =>
  res.send(process.env.PAY_PAL_CLIENT_ID)
);
app.use("/config/secretkey", (req, res) =>
  res.send(process.env.CAPTCHA_SITE_KEY)
);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`.red.bold);
});
