// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// GET /events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
