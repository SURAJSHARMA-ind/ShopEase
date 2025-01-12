import jwt from "jsonwebtoken"
import { UsersModel } from '../models/User'
require("dotenv").config();
import { Request, Response, NextFunction } from "express";

    interface IuserDetail {
      id: string
    }
    interface IcustomReq extends Request{
      userid :string
    }

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("Jwt Secret not present")
}

export const authMiddleware = async (req: IcustomReq, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) {
     res.send({
      message: "Token is missing",
    });
    return
  }
  try {

    const userDetail = jwt.verify(token, JWT_SECRET) as IuserDetail;
    const userid = userDetail.id;
    req.userid = userid
    console.log("userid is ", userid);

    const userExists = await UsersModel.findOne({ _id: userid });
    if (!userExists) {
       res.status(404).send({
        message: "Invalid Token",
      });
      return
    }
    next();
  } catch (error) {
    return res.status(409).send({ message: `Error is ${error}` });
  }
};

