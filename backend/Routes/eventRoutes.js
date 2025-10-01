const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // save in backend/uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Create Event with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, date } = req.body;
    if (!title || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error("Create Event Error:", err);
    res.status(500).json({ message: "Failed to create event" });
  }
});

// Fetch all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    console.error("Error fetching event:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
