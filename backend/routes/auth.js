const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const exists = await User.findOne({ username });
  if (exists) return res.json({ message: "User exists" });

  const user = new User({ username, password });
  await user.save();

  res.json({ message: "Registered" });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || user.password !== password) {
    return res.json({ message: "Invalid login" });
  }

  res.json({ message: "Login success" });
});

module.exports = router;