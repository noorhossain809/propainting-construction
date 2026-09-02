import express from "express"
import { AuthController } from "./auth.controller"
import auth from "../../middlewares/auth"



const router = express.Router()

router.post("/login", AuthController.login)
router.post("/google", AuthController.googleLogin)   // ← যোগ করুন
router.post("/logout", AuthController.logout)
router.get("/me", auth(), AuthController.getMe)

export const AuthRoutes = router