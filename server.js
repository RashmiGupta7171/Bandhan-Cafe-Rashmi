const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/salary", require("./routes/salary"));
app.use("/api/attendance", require("./routes/attendance"));

app.get("/", (req, res) => {
  res.send("Backend working ✅");
});
mongoose.connect("mongodb://127.0.0.1:27017/bandhanCafe")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});