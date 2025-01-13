import { Router } from "express";
import { sellerMiddleware } from "../middleware/adminMiddleware";
import { tokenVerify } from "../middleware/tokenVerify";
import { addProductController, getProductsController } from "../controllers/productController";
const router = Router();

// Add product
router.post("/add", tokenVerify, sellerMiddleware, addProductController)
// get product
router.get("/get", getProductsController)

export default router;