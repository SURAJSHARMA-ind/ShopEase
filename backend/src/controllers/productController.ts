import { Request, Response } from "express";
import { requiredProduct } from "../validations/products";
import { ProductsModel } from "../models/Product";

export const addProductController = async (req: Request, res: Response) => {
    const parsedValue = requiredProduct.safeParse(req.body)
    if (!parsedValue.success) {
        res.status(400).json({
            message: "Incorrect Format"
        })
        return;
    }
    try {

        const { name, price, description, stock, category, images } = parsedValue.data;
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
        return
    }
}

export const getProductsController = async (req: Request, res: Response) => {
    const page: number = Number(req.query.page) || 1
    const limit: number = Number(req.query.limit) || 10
    try {
        const skip = (page - 1) * limit
        const productData = await ProductsModel.find().skip(skip).limit(limit)
        if (productData.length === 0) {
            res.status(404).json({
                message: "NO product found"
            })
            return
        }
        res.status(200).json({
            ProductData: productData
        })

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}
