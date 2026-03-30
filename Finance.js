const mongoose = require("mongoose");

const FinanceSchema = new mongoose.Schema({
  date: String,
  revenue: Number,
  expenses: Number,
  profit: Number,
});

module.exports = mongoose.model("Finance", FinanceSchema);