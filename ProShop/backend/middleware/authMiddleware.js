import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  let token = req.headers.token;
  try {
    let result = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let duration = parseInt(new Date().getTime() / 1000 - result.iat);
    if (duration > result.expiresIn) {
      res.send("Token Has Expired Plz Login again");
    } else {
      next();
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export default protect;
