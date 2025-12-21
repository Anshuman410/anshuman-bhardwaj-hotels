require("dotenv").config();
const express = require("express");
const cors = require("cors");

// DB
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();

const bookingRoutes = require("./routes/booking");
app.use("/api/booking", bookingRoutes);

// Connect MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
