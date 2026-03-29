const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  prompt: String,
  result: String,
}, { timestamps: true });

module.exports = mongoose.model("Content", contentSchema);