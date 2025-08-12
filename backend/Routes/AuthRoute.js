import express from "express";
import { Signup } from "../Controllers/AuthController.js";

const router = express.Router();

router.post("/signup", Signup);

export default router;