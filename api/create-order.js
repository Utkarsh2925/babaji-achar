import Razorpay from "razorpay";

export default async function handler(req, res) {
    // Enable CORS for development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { amount, receipt } = req.body;

        // Log for debugging (will appear in Vercel Function logs)
        console.log("=== CREATE ORDER REQUEST ===");
        console.log("Amount:", amount);
        console.log("Receipt:", receipt);
        console.log("RAZORPAY_KEY_ID exists:", !!process.env.RAZORPAY_KEY_ID);
        console.log("RAZORPAY_KEY_SECRET exists:", !!process.env.RAZORPAY_KEY_SECRET);

        // Validation
        if (!amount || amount <= 0) {
            console.error("Invalid amount:", amount);
            return res.status(400).json({ error: "Amount missing or invalid" });
        }

        // CRITICAL: Check environment variables
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keyId || !keySecret) {
            console.error("CRITICAL: Razorpay credentials missing!");
            console.error("KEY_ID present:", !!keyId);
            console.error("KEY_SECRET present:", !!keySecret);
            console.error("Available env vars:", Object.keys(process.env).filter(k => k.includes('RAZOR')));

            return res.status(500).json({
                error: "Payment gateway configuration error",
                debug: process.env.NODE_ENV === 'development' ? {
                    keyIdPresent: !!keyId,
                    keySecretPresent: !!keySecret,
                    availableRazorEnvs: Object.keys(process.env).filter(k => k.includes('RAZOR'))
                } : undefined
            });
        }

        console.log("Initializing Razorpay with key:", keyId.substring(0, 10) + "...");

        const razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        });

        console.log("Creating order...");
        const order = await razorpay.orders.create({
            amount: Number(amount) * 100, // INR to paise
            currency: "INR",
            receipt: receipt || `receipt_${Date.now()}`,
        });

        console.log("Order created successfully:", order.id);
        return res.status(200).json(order);

    } catch (error) {
        console.error("=== RAZORPAY ERROR ===");
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        console.error("Error details:", error);

        return res.status(500).json({
            error: error.message || "Failed to create order",
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
