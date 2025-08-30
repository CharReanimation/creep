import express from "express";
import { checkHealth } from "../controllers/healthController.js";

// Router
const router = express.Router();

// Health Routes
router.get("/health", checkHealth);

// Export
export default router;
