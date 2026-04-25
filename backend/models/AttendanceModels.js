const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  date: String,
  name: String,
  status: String,
});

module.exports = mongoose.model("Attendance", AttendanceSchema);


