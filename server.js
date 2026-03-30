const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend working");
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/salary", require("./routes/salary"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/finance", require("./routes/finance"));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/bandhanCafe")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});