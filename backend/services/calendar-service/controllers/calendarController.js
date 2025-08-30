import Event from "../models/Event.js";

// Get All Events
export const getAllEvents = async (req, res) => {
  try {
    // Request Query
    const { userId } = req.query; // Get the userId from the query params
    let query = {};
    if (userId) {
      query.userId = userId;
    }

    // Find Events
    const events = await Event.find(query).populate("userId", "username email");

    // Success
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Event
export const addEvent = async (req, res) => {
  try {
    // Request Body
    const { title, date, note, userId } = req.body;

    // Save new Event
    const newEvent = new Event({ title, date, note, userId });
    await newEvent.save();

    // Success
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    // Request Query
    const { id } = req.params;

    // Find Event, Delete
    await Event.findByIdAndDelete(id);

    // Success
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(404).json({ error: "Event not found" });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  try {
    // Request Query
    const { id } = req.params;

    // Request Body
    const { title, date, note } = req.body;

    // Update Event
    const updated = await Event.findByIdAndUpdate(
      id,
      { title, date, note },
      { new: true }
    );

    // Success
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
