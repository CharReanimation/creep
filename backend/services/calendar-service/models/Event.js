import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  note: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
  createdAt: { type: Date, default: Date.now }
});

// Export
export default mongoose.model("Event", eventSchema);
