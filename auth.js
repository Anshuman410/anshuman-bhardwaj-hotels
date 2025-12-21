const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Otp = require("../models/Otp");
const generateOtp = require("../utils/generateOtp");
const transporter = require("../config/mailer");

const router = express.Router();

/* ======================
   REGISTER + SEND OTP
====================== */
router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      mobile,
      password: hashedPassword
    });

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otpHash,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    await transporter.sendMail({
      from: "Anshuman Bhardwaj Hotels <anshumanbhardwajhotels@gmail.com>",
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP is ${otp}. Valid for 5 minutes.`
    });

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
   VERIFY OTP
====================== */
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email });
    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const isValid = await bcrypt.compare(otp, record.otpHash);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await User.updateOne({ email }, { emailVerified: true });
    await Otp.deleteMany({ email });

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
   USER LOGIN (JWT)
====================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.emailVerified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================
   ADMIN LOGIN (JWT)
====================== */
router.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // hardcoded admin (project purpose)
    if (email !== "admin@anshumanbhardwajhotels.com") {
      return res.status(403).json({ message: "Not an admin" });
    }

    if (password !== "admin123") {
      return res.status(401).json({ message: "Invalid admin password" });
    }

    const token = jwt.sign(
      { role: "admin", email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Admin login successful",
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
