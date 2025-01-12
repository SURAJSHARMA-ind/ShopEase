import express from "express"
import { userSigninController, userSignupController } from "../controllers/userController";

const router = express.Router();

router.post("/signup", userSignupController);
router.post("/signin", userSigninController);

export default router;


