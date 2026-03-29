const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");
const paymentRoute = express.Router();

// Create Order Route
paymentRoute.post("/create-order", protect, createOrder);

// Verify Payment Route
paymentRoute.post("/verify-payment", protect, verifyPayment);


module.exports = paymentRoute;