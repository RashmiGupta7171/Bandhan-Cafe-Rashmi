const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/salary", require("./routes/salary"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/finance", require("./routes/finance"));

// Test route
app.get("/", (req, res) => {
  res.send("Backend working ✅");
});

// ✅ MongoDB Connection (FIXED)
mongoose.connect("mongodb://127.0.0.1:27017/bandhanCafe")
  .then(() => {
    console.log("MongoDB Connected ✅");

    // Start server ONLY after DB connects
    app.listen(5000, () => {
      console.log("Server running on port 5000 🚀");
    });
  })
  .catch((err) => {
    console.log("MongoDB Error ❌", err);
  });