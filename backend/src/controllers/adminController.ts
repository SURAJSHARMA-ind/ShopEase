import Router, { Request, Response } from "express"
import { adminSignup, requiredSignin } from "../validations/userValidation"
import { AdminModel } from "../models/Admin"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const router = Router()
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET
if (!ADMIN_JWT_SECRET) {
    throw new Error("ADMIN_JWT_SECRET not Found")
}

export const createAdmin = async (req: Request, res: Response) => {
    const parsedValue = adminSignup.safeParse(req.body)
    if (!parsedValue.success) {
        res.status(400).json({
            message: "Incorrect Signup Format"
        })
        return
    }
    try {
        const { name, email, password, phone_no, address, role } = parsedValue.data
        const hashedPassword = await bcrypt.hash(password, 8)

        const emailExists = await AdminModel.findOne({ email })
        const phone_noExists = await AdminModel.findOne({ phone_no })

        if (emailExists || phone_noExists) {
            res.status(400).json({
                message: "User Already Exists"
            })
            return
        }

        const response = await AdminModel.create({
            name,
            email,
            password: hashedPassword,
            address,
            phone_no,
            role

        })
        res.status(200).json({
            message: "Account Created Successfully"
        })
        console.log(response)
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}

export const adminSignin = async (req: Request, res: Response) => {
    const parsedSigninValue = requiredSignin.safeParse(req.body)
    if (!parsedSigninValue.success) {
        res.status(400).json({
            message: "Incorrect Signin Format"
        })
        return
    }
    try {
        const { email, password } = parsedSigninValue.data
        const admin = await AdminModel.findOne({ email })
        if (!admin) {
            res.status(400).json({
                message: "User Not Found"
            })
            return
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password)
        if (!isPasswordValid) {
            res.status(400).json({
                message: "Invalid Password"
            })
            return
        }
        const token = jwt.sign({ id: admin._id }, ADMIN_JWT_SECRET, {
            expiresIn: "1h"
        })
        res.status(200).json({
            message: "Signin Successful",
            token: token
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}