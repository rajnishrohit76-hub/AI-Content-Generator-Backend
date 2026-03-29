require("dotenv").config();
// Imports 
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const aiRouter = require("./routes/aiRoutes");
const paymentRoute = require("./routes/paymentRoute");
const contactRoute = require("./routes/contactRoute");

// Configurations 
const app = express();

// Object Creations
app.use(cors());
app.use(express.json());

// MongoDB Connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => console.log("MongoDB Connection Failed:", error.message));

// Port Listening
app.listen(PORT, () => console.log(`Server is Running on http://localhost:${PORT}`));

// Testing Route
app.get("/", (req, res) => {
  res.send("Express Backend is running!");
});

// Authentication Base Route
app.use("/api/auth", authRouter);

// Content Base Route
app.use("/api/ai", aiRouter);

// Payment Base Route
app.use("/api/payment", paymentRoute);

// Contact Base Route
app.use("/api/contact", contactRoute);
