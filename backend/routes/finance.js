const express = require("express");
const router = express.Router();
const Finance = require("../models/FinanceModels");

// ➕ Add finance
router.post("/", async (req, res) => {
  const data = new Finance(req.body);
  await data.save();
  res.json({ message: "Finance saved", data });
});

// 📥 Get all finance
router.get("/", async (req, res) => {
  const data = await Finance.find();
  res.json(data);
});

// ❌ Delete finance
router.delete("/:id", async (req, res) => {
  await Finance.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;