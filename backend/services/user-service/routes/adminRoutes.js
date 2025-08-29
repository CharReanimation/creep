import express from "express";

// Middleware
import { verifyToken } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

// Controller
import { getAllUsers, deleteUser } from "../controllers/adminController.js";

// Router
const router = express.Router();

// Admin Routes
router.get("/users", verifyToken, isAdmin, getAllUsers);
router.delete("/delete/:id", verifyToken, isAdmin, deleteUser);

// Export
export default router;
