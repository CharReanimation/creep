import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import healthRoutes from "./routes/healthRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";

// Env
dotenv.config();

// App
const app = express();
app.use(cors());
app.use(express.json());

// URI
const MONGO_URI = process.env.MONGO_URI;

// Port
const PORT = process.env.PORT || 5001;

// Routes
app.use("/api/calendar-service", healthRoutes); // Health: /api/calendar-service/health
app.use("/api/calendar-service", calendarRoutes); // Event: /api/calendar-service/events/:id

// Connect to MongoDB
mongoose.connect((MONGO_URI)) // "mongodb://mongo:27017/userdb"
  .then(() => console.log("✅ MongoDB Connected", process.env.MONGO_URI))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Start Server
app.listen(PORT, () => console.log(`🚀 Calendar-Service running on port ${PORT}`));
