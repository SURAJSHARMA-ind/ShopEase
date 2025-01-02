import express, { Request, Response } from "express"
import dotenv from "dotenv"
dotenv.config();
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { z } from "zod"
import { UsersModel } from "../database/db"

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not Found")
}

// Signup Route
router.post("/signup", async (req: Request, res: Response) => {
  // Zod Validation
  const requiredBody = z.object({
    name: z.string().min(6).max(30),
    email: z.string().min(6).max(320).email(),
    password: z.string().min(8).max(30),
    phone_no: z.string().min(10).max(10),
    address: z.array(
      z.object({
        street: z.string(),
        country: z.string(),
        state: z.string(),
        area: z.string(),
        landmark: z.string()
      })
    )
  });

  const parsedData = requiredBody.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Incorrect signup Format  ",
    });
    return
  }
  const { name, email, password, phone_no, address } = parsedData.data;

  try {
    const emailExists = await UsersModel.findOne({ email });
    const phone_noExists = await UsersModel.findOne({ phone_no });

    // console.log(emailExists ? emailExists.email : "email not exit");
    // console.log(phone_noExists ? phone_noExists.phone_no : "phone_no not exit");
    if (phone_noExists || emailExists) {
      res.status(409).json({
        message: "User Already Exists",
      });
      return
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    await UsersModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      phone_no: phone_no,
      address: address
    });
    res.json({
      message: "Account Created Successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error occurred",
    });
    return
  }
});


// Signin Route

router.post("/signin", async (req: Request, res: Response) => {
  const requiredSignin = z.object({
    email: z.string().max(320).email(),
    password: z.string().min(8).max(30)

  })
  const parsedSignin = requiredSignin.safeParse(req.body)

  if (!parsedSignin.success) {
    res.status(400).json({
      message: "Incorrect Signin format"
    })
    return
  }
  try {
    const { email, password } = parsedSignin.data
    const user = await UsersModel.findOne({ email });
    if (!user) {
      res.status(400).send({
        message: "Email Not Found",
      });
      return
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      res.status(403).send({
        message: "Invalid name or Password",
      });
      return
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET,
      { expiresIn: "10d" }
    );

    res.send({
      message: "Login Successfully",
      email: email,
      token: token,
    });
  } catch (error) {
    res.status(500).send({
      message: `Error occurred ${error}`,
    });
    return
  }
});


export default router;


