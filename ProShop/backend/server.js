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
app.use(cors());
connectDB();

app.use(express.json());
app.use("/products", productRoutes);
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

// //post route
// router.post("/post", async (req, res) => {
//   const { token } = req.body;
//   await axios.post(
//     `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SITE_KEY}&response=${token}`
//   );

// if (res.status(200)) {
//   res.send("Human");
// } else {
//   res.send("Robot");
// }
// });
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`.red.bold);
});
