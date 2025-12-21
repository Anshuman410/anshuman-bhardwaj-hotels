const express = require("express");
const Booking = require("../models/Booking");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* CREATE BOOKING */
router.post("/create", auth, async (req, res) => {
  try {
    const booking = await Booking.create({
      userId: req.user.id,
      ...req.body
    });
    res.json({ message: "Booking confirmed", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ADMIN – VIEW ALL BOOKINGS */
router.get("/all", auth, async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

module.exports = router;
