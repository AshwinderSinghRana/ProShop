import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { unixTimestamp } from "../config/validator.js";
dotenv.config();

export const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  const time = unixTimestamp();
  return {
    token,
    time,
  };
};
