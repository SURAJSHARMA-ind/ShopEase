import { Request, Response, NextFunction } from "express";
import { AdminModel } from "../database/db"

interface IcustomadminReq extends Request {
    adminid?: string
}

 const sellerMiddleware = async (req: IcustomadminReq, res: Response, next: NextFunction) => {
    const adminid = req.adminid
    const userExists = await AdminModel.findOne({ _id: adminid, role: "seller" });
    if (!userExists) {
        res.status(404).send({
            message: "Invalid Token",
        });
        return
    }
    next()
}
 const adminMiddleware = async (req: IcustomadminReq, res: Response, next: NextFunction) => {
    const adminid = req.adminid
    const userExists = await AdminModel.findOne({ _id: adminid, role: "admin" });
    if (!userExists) {
        res.status(404).send({
            message: "Invalid Token",
        });
        return
    }
    next()
}
export { sellerMiddleware, adminMiddleware }