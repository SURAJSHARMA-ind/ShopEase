import Router, { Request, Response } from "express"
import { adminSignup, requiredSignin } from "../validations/userValidation"
import { AdminModel } from "../database/db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { tokenVerify } from "../middleware/tokenVerify"
import { adminMiddleware, sellerMiddleware } from "../middleware/adminMiddleware"
const router = Router()
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET
if (!ADMIN_JWT_SECRET) {
    throw new Error("ADMIN_JWT_SECRET not Found")
}


router.post("/create", tokenVerify, adminMiddleware, async (req: Request, res: Response) => {
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
})

router.post("/signin", async (req: Request, res: Response) => {

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
        console.log("Admin response is ", admin)
        if (!admin) {
            res.status(400).json({
                message: "Email not exist"
            })
            return
        }
        const decryptedPassword = await bcrypt.compare(password, admin.password)
        if (!decryptedPassword) {
            res.status(401).json({
                message: "Incorrect password"
            })
            return
        }

        const token = jwt.sign(
            {
                id: admin._id,
            },
            ADMIN_JWT_SECRET,
            { expiresIn: "10d" }
        );
        res.send({
            message: "Login Successfully",
            email: email,
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error"
        })
    }
})

export default router