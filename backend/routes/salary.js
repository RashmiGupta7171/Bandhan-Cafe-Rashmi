const express = require("express");
const router = express.Router();
const Salary = require("../models/SalaryModels");

// GET
router.get("/", async (req, res) => {
  const data = await Salary.find();
  res.json(data);
});

// ADD
router.post("/", async (req, res) => {
  const record = new Salary(req.body);
  await record.save();
  res.json(record);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Salary.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;