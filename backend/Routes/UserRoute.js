import express from "express";
import { getUserProfile, updateUserProfile , checkeOnlineStatus} from "../Controllers/UserController.js";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);
router.post("/online-status", verifyToken, checkeOnlineStatus ); // New route for updating online status
export default router;