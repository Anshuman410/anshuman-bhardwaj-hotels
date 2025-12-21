const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  hotelName: String,
  roomType: String,
  checkIn: String,
  checkOut: String,
  guests: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
