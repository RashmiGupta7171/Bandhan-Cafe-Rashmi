const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema({
  date: String,
  name: String,
  salary: Number,
  extra: Number,
  final: Number,
});

module.exports = mongoose.model("Salary", SalarySchema);