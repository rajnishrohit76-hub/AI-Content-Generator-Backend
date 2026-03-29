const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { generateContent, getHistory } = require("../controllers/aiController");

const aiRouter = express.Router();

aiRouter.post("/generate", protect, generateContent);
aiRouter.get("/history", protect, getHistory);

module.exports = aiRouter;
