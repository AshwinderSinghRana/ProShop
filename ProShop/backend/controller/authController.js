import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function verifyUser(req, res) {
  let { email, password } = req.body;
  try {
    let result = await User.findOne({
      email,
    });
    if (!result) {
      res.send("User not found");
    } else {
      let decoded = await bcrypt.compare(password, result.password);
      if (!decoded) {
        res.send("Invalid email or password");
      } else {
        let token = jwt.sign(
          { result, expiresIn: 120 },
          process.env.JWT_SECRET_KEY
        );
        res.status(200).send({ message: "Login succesfull", token });
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// async function createUser(req, res) {
//   try {
//     let result = await User.create(req.body);
//     res.status(201).send({ success: "true", result });
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// }

export { verifyUser };
