const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema({
  date: String,
  revenue: { type: Number, default: 0 },
  expenses: { type: Number, default: 0 },
  profit: { type: Number, default: 0 },
});

module.exports = mongoose.model("Finance", financeSchema);