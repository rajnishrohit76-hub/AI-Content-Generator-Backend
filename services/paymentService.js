const razorpayInstance = require("../config/razorpay");
const User = require("../schema/User");
const crypto = require("crypto");

// Create Order Service
async function createOrderService(amount) {
    try {
        const order = await razorpayInstance.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        });
        return order;
    } catch (error) {
       throw error;
    }
}

// Verify Payment
async function verifyPaymentService(userId, { razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
    try {
        // Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            const error = new Error("Invalid payment signature");
            error.status = 400;
            throw error;
        }

        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        user.plan = "Pro";
        user.credits += 100;
        await user.save();
        return user;
        
    } catch (error) {
       throw error;
    }
}


module.exports = { createOrderService, verifyPaymentService };