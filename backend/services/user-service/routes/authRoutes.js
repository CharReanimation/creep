import express from "express";
import { register, login } from "../controllers/authController.js";

// Router
const router = express.Router();

// Auth Routes
router.post("/register", register);
router.post("/login", login);

// Export
export default router;
