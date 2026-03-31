const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// Add attendance
router.post("/", async (req, res) => {
  const data = new Attendance(req.body);
  await data.save();
  res.json({ message: "Attendance added", data });
});

// Get all attendance
router.get("/", async (req, res) => {
  const data = await Attendance.find();
  res.json(data);
});

// Delete attendance
router.delete("/:id", async (req, res) => {
  await Attendance.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;