import { Request, Response, NextFunction } from "express"
import { AdminModel } from "../database/db"
import jwt from "jsonwebtoken"


const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET
if (!ADMIN_JWT_SECRET) {
    throw new Error("JWT Secret Missing")
}

interface IadminDetail {
    id: string
}
interface IcustomadminReq extends Request {
    adminid?: string;
}


const adminMiddleware = async (req: IcustomadminReq, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]

    if (!token) {
        res.status(403).json({
            message: "Token Missing"
        })
        return
    }
    try {
        const adminDetail = jwt.verify(token, ADMIN_JWT_SECRET) as IadminDetail
        const adminid = adminDetail.id
        req.adminid = adminid
        console.log("adminid is ", adminid);

        console.log(adminDetail)

        const userExists = await AdminModel.findOne({ _id: adminid ,role:"admin"});
        if (!userExists) {
            res.status(404).send({
                message: "Invalid Token",
            });
            return
        }
        next()
    }
    catch (error) {
       res.status(500).json({
        message : error
       })
    }
}


export default adminMiddleware