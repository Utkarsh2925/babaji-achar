// send-sms.js - Vercel Serverless Function for SMS (DLT-compliant Gateway Placeholder)

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { phone, message, templateId } = req.body;

        // Validation
        if (!phone || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check for SMS Gateway credentials
        const smsApiKey = process.env.SMS_API_KEY;
        const smsSenderId = process.env.SMS_SENDER_ID;

        if (!smsApiKey || !smsSenderId) {
            console.warn('⚠️ SMS Gateway credentials not configured');
            return res.status(200).json({
                success: false,
                message: 'SMS service not configured (Trial Mode)',
                trial: true
            });
        }

        // TODO: Implement actual SMS sending using DLT-compliant gateway
        // Popular options: MSG91, Twilio India, TextLocal, etc.
        console.log('📱 SMS would be sent to:', phone);
        console.log('Message:', message);
        console.log('Template ID:', templateId);

        return res.status(200).json({
            success: true,
            message: 'SMS queued (Trial Mode)',
            trial: true
        });

    } catch (error) {
        console.error('❌ SMS handler error:', error);
        return res.status(500).json({
            error: error.message || 'Internal server error'
        });
    }
}
