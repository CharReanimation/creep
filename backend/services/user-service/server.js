import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
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

// Connect to MongoDB
mongoose.connect((MONGO_URI)) // "mongodb://mongo:27017/userdb"
  .then(() => console.log("✅ MongoDB Connected", process.env.MONGO_URI))
  .catch(err => console.error("❌ MongoDB Error:", err));

// User Routes
app.use("/api/users", userRoutes); // Something like this: /api/users/login

// Start Server
app.listen(PORT, () => console.log(`🚀 User-Service running on port ${PORT}`));

// Health
app.get("/api/users/health", (req, res) => {
  res.json({ status: "ok", message: "User-Service: Frontend ↔ Backend Connected ✅" });
});
