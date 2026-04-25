const express = require("express");
const router = express.Router();
const Attendance = require("../models/AttendanceModels");

// GET
router.get("/", async (req, res) => {
  const data = await Attendance.find();
  res.json(data);
});

// ADD
router.post("/", async (req, res) => {
  const record = new Attendance(req.body);
  await record.save();
  res.json(record);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Attendance.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;