import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const uploader = cloudinary.v2;

uploader.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default uploader;
