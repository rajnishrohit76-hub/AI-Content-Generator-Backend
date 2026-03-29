const { createOrderService, verifyPaymentService } = require("../services/paymentService");

// Create Order Controller
const createOrder = async (req, res) => {
    try {
        const { plan, amount: manualAmount } = req.body;

        // Map plan to amount if plan is provided
        let finalAmount = manualAmount;
        if (plan === 'pro') {
            finalAmount = 499; // Price in INR
        } else if (plan === 'free') {
            return res.status(400).json({
                success: false,
                message: "Cannot create order for Free plan"
            });
        }

        if (!finalAmount) {
            return res.status(400).json({
                success: false,
                message: "Plan or Amount is required"
            });
        }

        const createdOrder = await createOrderService(finalAmount);
        return res.status(200).json({
            success: true,
            message: "Order Created Successfully",
            data: createdOrder
        });
    } catch (error) {
        console.error("Order Creation Error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error.message
        });
    }
}

// Verify Payment Controller
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const userId = req.user.id;
        const verifiedUser = await verifyPaymentService(userId, { razorpay_order_id, razorpay_payment_id, razorpay_signature });
        return res.status(200).json({
            success: true,
            message: "Payment Verified Successfully",
            data: verifiedUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Payment Verification Failed",
            error: error.message
        });
    }
}

module.exports = { createOrder, verifyPayment };