const Razorpay = require("razorpay");
const crypto = require("crypto");

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { amount, receipt } = req.body;

        // Validation
        if (!amount || amount <= 0) {
            console.error("Invalid amount:", amount);
            return res.status(400).json({ error: 'Invalid amount' });
        }

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.error("Razorpay credentials missing in environment");
            return res.status(500).json({ error: 'Payment gateway configuration error' });
        }

        console.log("Creating Razorpay order:", { amount, receipt });

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const order = await razorpay.orders.create({
            amount: amount * 100, // INR to paise
            currency: "INR",
            receipt: receipt,
            payment_capture: 1,
        });

        console.log("Order created successfully:", order.id);
        res.status(200).json(order);
    } catch (err) {
        console.error("Order creation error:", err.message, err.stack);
        res.status(500).json({
            error: err.message || 'Failed to create order',
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};
