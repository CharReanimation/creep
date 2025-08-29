import express from "express";

// Middleware
import { verifyToken } from "../middlewares/auth.js";

// Controller
import { getProfile, updateProfile } from "../controllers/userController.js";

// Router
const router = express.Router();

// User routes
router.get("/profile", verifyToken, getProfile); // Get
router.put("/profile", verifyToken, updateProfile); // Put

// Export
export default router;
