// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// // app.use("/api/auth", require("./routes/auth"));
// // app.use("/api/salary", require("./routes/salary"));
// // app.use("/api/attendance", require("./routes/attendance"));
// // app.use("/api/finance", require("./routes/finance"));

// // Test route
// app.get("/", (req, res) => {
//   res.send("Backend working ✅");
// });

// // ✅ PORT for Render (IMPORTANT)
// const PORT = process.env.PORT || 5000;

// // ✅ MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB Connected ✅");

//     // Start server only after DB connects
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT} 🚀`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB Error ❌", err);
//     process.exit(1); // stop app if DB fails
//   });

// const express = require("express");
// const app = express();

// const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Server is running ✅");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Yay! Server is working 🎉");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});