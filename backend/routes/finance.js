const express = require("express");
const router = express.Router();
const Finance = require("../models/FinanceModels");

// GET
router.get("/", async (req, res) => {
  const data = await Finance.find();
  res.json(data);
});

// 🔥 ADD OR UPDATE (MAIN LOGIC)
router.post("/add-sale", async (req, res) => {
  const { amount, date } = req.body;

  let record = await Finance.findOne({ date });

  if (record) {
    record.revenue += amount;
    record.profit = record.revenue - record.expenses;
    await record.save();
  } else {
    record = new Finance({
      date,
      revenue: amount,
      expenses: 0,
      profit: amount,
    });
    await record.save();
  }

  res.json(record);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { revenue, expenses } = req.body;

  const record = await Finance.findById(req.params.id);

  record.revenue = revenue;
  record.expenses = expenses;
  record.profit = revenue - expenses;

  await record.save();

  res.json(record);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Finance.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;