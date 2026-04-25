const express = require("express");
const router = express.Router();
const Finance = require("../models/FinanceModels");

// 📥 GET ALL RECORDS
router.get("/", async (req, res) => {
  try {
    const data = await Finance.find().sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 ADD OR UPDATE REVENUE
router.post("/add-sale", async (req, res) => {
  try {
    const { amount, date } = req.body;

    let record = await Finance.findOne({ date });

    if (record) {
      // 👉 SAME DAY → ADD REVENUE
      record.revenue += amount;
      record.profit = record.revenue - record.expenses;
      await record.save();
    } else {
      // 👉 NEW DAY → CREATE RECORD
      record = new Finance({
        date,
        revenue: amount,
        expenses: 0,
        profit: amount,
      });
      await record.save();
    }

    res.json(record);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ UPDATE RECORD
router.put("/:id", async (req, res) => {
  try {
    const { revenue, expenses } = req.body;

    const record = await Finance.findById(req.params.id);

    record.revenue = revenue;
    record.expenses = expenses;
    record.profit = revenue - expenses;

    await record.save();

    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE
router.delete("/:id", async (req, res) => {
  await Finance.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;