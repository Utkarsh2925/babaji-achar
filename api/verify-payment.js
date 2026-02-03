const crypto = require("crypto");

module.exports = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            console.error("Missing payment verification parameters");
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        if (!process.env.RAZORPAY_KEY_SECRET) {
            console.error("RAZORPAY_KEY_SECRET not configured");
            return res.status(500).json({ error: 'Payment verification configuration error' });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            console.log("Payment verified successfully:", razorpay_payment_id);
            res.status(200).json({ status: "success" });
        } else {
            console.error("Signature mismatch for payment:", razorpay_payment_id);
            res.status(400).json({ status: "failed", error: "Invalid signature" });
        }
    } catch (err) {
        console.error("Payment verification error:", err.message);
        res.status(500).json({ error: err.message || 'Verification failed' });
    }
};
