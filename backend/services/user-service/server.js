import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// URI
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/userdb";

// Port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect((MONGO_URI)) // "mongodb://mongo:27017/userdb"
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// User Routes
app.use("/api/users", userRoutes); // Something like this: /api/users/login

// Start Server
app.listen(PORT, () => console.log(`🚀 User-Service running on port ${PORT}`));