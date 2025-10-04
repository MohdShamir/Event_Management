const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Event = require("../models/Event"); // Mongoose model for events
const { verifyToken } = require("../middleware/auth"); // JWT auth middleware

// ✅ Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // folder to save images
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)), // unique filename
});
const upload = multer({ storage });

// ✅ Create new event with optional image
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const newEvent = new Event({
      title,
      description,
      date,
      image,
      creatorId: req.user.id, // set from logged-in user
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create event" });
  }
});

// ✅ Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

// ✅ Get single event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update event (only creator or admin)
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // only admin or creator can update
    if (req.user.role !== "admin" && event.creatorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this event" });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    if (req.file) event.image = `/uploads/${req.file.filename}`;

    await event.save();
    res.json({ message: "Event updated successfully", event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete event (only creator or admin)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (req.user.role !== "admin" && event.creatorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
