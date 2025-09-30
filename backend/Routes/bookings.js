// routes/bookings.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); // if using auth
const Booking = require("../models/Booking");

// GET /api/bookings/me
router.get("/me", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("event");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
