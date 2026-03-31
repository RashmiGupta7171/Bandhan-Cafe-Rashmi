const express = require("express");
const router = express.Router();
const Salary = require("../models/Salary");

// ✅ Add salary record
router.post("/", async (req, res) => {
  const data = new Salary(req.body);
  await data.save();
  res.json({ message: "Salary added", data });
});

// ✅ Get all salary records
router.get("/", async (req, res) => {
  const data = await Salary.find();
  res.json(data);
});

// ✅ Delete salary record
router.delete("/:id", async (req, res) => {
  await Salary.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;