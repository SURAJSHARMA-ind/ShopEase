const jwt = require("jsonwebtoken");
const UserModel = require('../database/db')
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.send({
      message: "Token is missing",
    });
  }
  try {
    const userDetail = jwt.verify(token, JWT_SECRET);
    req.userid = userDetail.id
    const userid = userDetail.id;
    console.log("userid is ",userid);
    
    const userExists = await UserModel.findOne({ _id: userid });
    if (!userExists) {
      return res.status(404).send({
        message: "Invalid Token",
      });
    }
    next();
  } catch (error) {
    return res.status(409).send({ message: `Error is ${error}` });
  }
};

module.exports = authMiddleware;
