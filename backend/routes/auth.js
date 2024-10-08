const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { UserModel } = require("../database/db");
const router = express.Router();
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// Signup Route
router.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    username: z.string().min(6).max(30),
    email: z.string().min(6).max(100).email(),
    password: z.string().min(8).max(30),
    phoneno: z.string().min(10).max(10),
  });

  const parsedData = requiredBody.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      message: "Incorrect signup Format  ",
    });
  }
  const { username, email, password, phoneno } = parsedData.data;

  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        message: "Email Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    await UserModel.create({
      name: username,
      email: email,
      password: hashedPassword,
      phoneno : phoneno
    });
    res.json({
      message: "Account Created Successfully.",
    });
  } catch (error) {
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
    const user = await UserModel.findOne({ email });
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
