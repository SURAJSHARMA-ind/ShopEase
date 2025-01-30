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
    const limit = 2;
    const cursor = req.query.cursor as string;

    try {
        let query = {};
        if (cursor) {
            query = { _id: { $gt: cursor } };
        }

        const productData = await ProductsModel.find(query)
            .sort({ _id: 1 })
            .limit(limit + 1);

        const hasNextPage = productData.length > limit;
        const products = hasNextPage ? productData.slice(0, -1) : productData;

        res.status(200).json({
            products,
            nextCursor: hasNextPage ? products[products.length - 1]._id : null,
            hasNextPage
        });

    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}
