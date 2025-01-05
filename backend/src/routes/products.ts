import { Router } from "express";
import { Request, Response } from "express";
import { requiredProduct } from "../validations/products";
import { ProductsModel } from "../database/db";
import { sellerMiddleware } from "../middleware/adminMiddleware";
import { tokenVerify } from "../middleware/tokenVerify";
const router = Router();

router.post("/add",tokenVerify,sellerMiddleware, async (req: Request, res: Response) => {
    const parsedValue = requiredProduct.safeParse(req.body)
    if (!parsedValue.success) {
        res.status(400).json({
            message: "Incorrect Format"
        })
        return;
    }
    try{

        const { name, price, description,stock, category, images } = parsedValue.data;
        const product = await ProductsModel.create({
            name,
            price,
            description,
            category,
            images,
            stock
        })
        res.status(200).json({
            message: "Product Added Successfully",
            product
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
})

export default router;