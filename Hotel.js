const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: String,
  city: String,
  description: String,
  price: Number
});

module.exports = mongoose.model("Hotel", hotelSchema);
