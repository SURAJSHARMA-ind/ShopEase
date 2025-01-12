import Router from "express"
import { createAdmin, adminSignin } from "../controllers/adminController"
import { tokenVerify } from "../middleware/tokenVerify"
import { adminMiddleware } from "../middleware/adminMiddleware"

const router = Router()

router.post('/create', tokenVerify, adminMiddleware, createAdmin)
router.post('/signin', adminSignin)

export default router