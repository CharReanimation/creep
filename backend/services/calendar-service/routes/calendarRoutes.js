import express from "express";

// Controllers
import { getAllEvents, addEvent, deleteEvent, updateEvent } from "../controllers/calendarController.js";

// Router
const router = express.Router();

// Routes
router.get("/events", getAllEvents); // GET /api/calendar-service/events
router.post("/events", addEvent); // POST /api/calendar-service/events
router.delete("/events/:id", deleteEvent); // DELETE /api/calendar-service/events/:id
router.put("/events/:id", updateEvent); // PUT /api/calendar-service/events/:id

// Export
export default router;