import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Router
const router = express.Router();

// User routes
router.get("/profile", authMiddleware, getProfile); // Get
router.put("/profile", authMiddleware, updateProfile); // Put

// Export
export default router;
