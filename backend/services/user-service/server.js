import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Env
dotenv.config();

// App
const app = express();
app.use(express.json());
app.use(cors());

// URI
const MONGO_URI = process.env.MONGO_URI;

// Port
const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/user-service", healthRoutes); // Health: /api/user-service/health
app.use("/api/user-service/auth", authRoutes); // Login: /api/user-service/auth/login
app.use("/api/user-service/user", userRoutes); // User: /api/user-service/profile

// Connect to MongoDB
mongoose.connect((MONGO_URI)) // "mongodb://mongo:27017/userdb"
  .then(() => console.log("✅ MongoDB Connected", process.env.MONGO_URI))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Start Server
app.listen(PORT, () => console.log(`🚀 User-Service running on port ${PORT}`));