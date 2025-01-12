import { Router } from "express";
import { sellerMiddleware } from "../middleware/adminMiddleware";
import { tokenVerify } from "../middleware/tokenVerify";
import { productController } from "../controllers/productController";
const router = Router();

router.post("/add", tokenVerify, sellerMiddleware, productController)

export default router;