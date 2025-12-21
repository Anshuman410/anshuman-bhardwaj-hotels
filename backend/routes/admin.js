const express = require("express");
const User = require("../models/User");
const adminAuth = require("../middleware/adminMiddleware");

const router = express.Router();

/* ======================
   ADMIN – GET ALL USERS
====================== */
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
