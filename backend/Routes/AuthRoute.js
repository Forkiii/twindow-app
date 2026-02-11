import express from "express";
import { Login, Logout, Signup, VerifyUser } from "../Controllers/AuthController.js";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/verify", verifyToken, VerifyUser); // Check if user is authenticated

export default router;