import express from "express";
import { getUserProfile, updateUserProfile } from "../Controllers/UserController.js";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);

export default router;