const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { UsersModel } = require("../database/db");
const router = express.Router();
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// Signup Route
router.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    username: z.string().min(6).max(30),
    email: z.string().min(6).max(100).email(),
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
    return res.status(400).json({
      message: "Incorrect signup Format  ",
    });
  }
  const { username, email, password, phone_no, address } = parsedData.data;

  try {
    const emailExists = await UsersModel.findOne({ email });
    const phone_noExists = await UsersModel.findOne({ phone_no });

    console.log(emailExists ? emailExists.email : "email not exit");
    console.log(phone_noExists ? phone_noExists.phone_no : "phone_no not exit");
    if (phone_noExists || emailExists) {
      return res.status(409).json({
        message: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    await UsersModel.create({
      name: username,
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
    return res.status(500).json({
      message: "Server error occurred",
      error: error.message,
    });
  }
});

// Signin Route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UsersModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "Email Not Found",
      });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(403).send({
        message: "Invalid username or Password",
      });
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
    return res.status(500).send({
      message: `Error occurred ${error}`,
    });
  }
});

module.exports = router;
