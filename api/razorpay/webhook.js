const crypto = require("crypto");

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method not allowed');
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    if (!secret) {
        console.error("RAZORPAY_WEBHOOK_SECRET is missing");
        return res.status(500).json({ error: "Configuration Error" });
    }

    // 1. Verify Signature
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(JSON.stringify(req.body))
        .digest("hex");

    if (signature !== expectedSignature) {
        console.warn("⚠️ Invalid Webhook Signature");
        return res.status(400).json({ error: "Invalid Signature" });
    }

    const event = req.body.event;
    console.log("✅ Webhook Verified. Event:", event);

    if (event === 'payment.captured' || event === 'order.paid') {
        try {
            const payment = req.body.payload.payment.entity;
            const rzpOrderId = payment.order_id;
            const rzpPaymentId = payment.id;
            const amount = payment.amount / 100; // Razorpay is in paise

            console.log(`💰 Payment Confirmed: ${rzpPaymentId} for Order ${rzpOrderId}`);

            // 2. Find Order in Firebase
            // Hardcoded to verified Singapore region
            const dbBaseUrl = "https://babaji-achar-default-rtdb.asia-southeast1.firebasedatabase.app";

            // Note: This query requires indexing on 'razorpayOrderId'. 
            // If verification fails, we might need to rely on 'receipt' -> 'BABAJI_TIMESTAMP'.
            // But relying on rzpOrderId is standard.
            const searchUrl = `${dbBaseUrl}/orders.json?orderBy="razorpayOrderId"&equalTo="${rzpOrderId}"`;

            console.log("🔍 Searching Firebase:", searchUrl);
            const searchRes = await fetch(searchUrl);
            const searchData = await searchRes.json();

            if (!searchData || Object.keys(searchData).length === 0) {
                console.error("❌ Order not found in Firebase for:", rzpOrderId);
                // Maybe it wasn't saved yet? Retry logic could be handled by Razorpay's auto-retry.
                return res.status(404).json({ error: "Order not found" });
            }

            const firebaseId = Object.keys(searchData)[0];
            const order = searchData[firebaseId];
            console.log("✅ Found Firebase Order:", firebaseId);

            // 3. Update Order Status
            const updateUrl = `${dbBaseUrl}/orders/${firebaseId}.json`;
            await fetch(updateUrl, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: 'Payment_Received',
                    paymentStatus: 'Paid',
                    razorpayPaymentId: rzpPaymentId,
                    updatedAt: new Date().toISOString()
                })
            });
            console.log("✅ Firebase Updated: Paid");

            // 4. Send WhatsApp Notification (The "Bot" logic)
            // Trigger ONLY if marketingConsent is true (or if transactional messages are allowed)
            // User requirement: "Trigger Communication Bot ONLY AFTER: paymentStatus === 'Paid'"

            if (order.marketingConsent?.whatsapp) {
                const phone = order.customerDetails.phone;
                const name = order.customerDetails.fullName;

                // Use Graph API directly (Duplicate logic from send-whatsapp.js to ensure robustness)
                const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
                const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

                if (accessToken && phoneNumberId) {
                    const template = {
                        name: 'payment_online',
                        language: { code: 'en' },
                        components: [{
                            type: 'body',
                            parameters: [
                                { type: 'text', text: order.id || rzpOrderId },
                                { type: 'text', text: amount.toString() }
                            ]
                        }]
                    };

                    const waRes = await fetch(
                        `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
                        {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${accessToken}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                messaging_product: 'whatsapp',
                                to: phone,
                                type: 'template',
                                template: template
                            })
                        }
                    );
                    const waData = await waRes.json();
                    if (!waRes.ok) console.error("❌ WhatsApp Failed:", waData);
                    else console.log("✅ WhatsApp Sent:", waData.messages?.[0]?.id);
                } else {
                    console.log("⚠️ WhatsApp credentials missing (Trial Mode). Message skipped.");
                }
            } else {
                console.log("🚫 WhatsApp Consent Missing. Notification skipped.");
            }

        } catch (e) {
            console.error("❌ Webhook Error:", e);
            return res.status(500).json({ error: e.message });
        }
    }

    res.status(200).json({ received: true });
};
