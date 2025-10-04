const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middleware/auth");
import connectDB from "../../server/db.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const events = await getEvents(); // fetch from DB
    res.status(200).json(events);
  }
}

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create new event (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const event = new Event({ title, description, date, createdBy: req.user.id });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE event (only creator)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.createdBy.toString() !== req.user.id) return res.status(403).json({ message: "Access denied" });

    await event.remove();
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
