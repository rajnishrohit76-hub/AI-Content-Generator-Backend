require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRouter = require("./routes/authRoutes");
const aiRouter = require("./routes/aiRoutes");
const paymentRoute = require("./routes/paymentRoute");
const contactRoute = require("./routes/contactRoute");

const app = express();

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: "*", // tighten this to your frontend domain after testing
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ── DB Middleware ──────────────────────────────────────────────────────────────
// Ensures DB is connected before every request (safe for serverless cold starts)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB Connection Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

app.use("/api/auth", authRouter);
app.use("/api/ai", aiRouter);
app.use("/api/payment", paymentRoute);
app.use("/api/contact", contactRoute);

// ── Local Dev Server ──────────────────────────────────────────────────────────
// Vercel doesn't use app.listen() — it imports the app directly.
// This block only runs locally.
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
}

module.exports = app;
