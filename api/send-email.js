// send-email.js - Vercel Serverless Function for Email (SMTP Placeholder)

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
        const { email, subject, templateName, parameters } = req.body;

        // Validation
        if (!email || !subject || !templateName) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check for SMTP credentials
        const smtpHost = process.env.SMTP_HOST;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;

        if (!smtpHost || !smtpUser || !smtpPass) {
            console.warn('⚠️ SMTP credentials not configured');
            return res.status(200).json({
                success: false,
                message: 'Email service not configured (Trial Mode)',
                trial: true
            });
        }

        // TODO: Implement actual SMTP sending using nodemailer or similar
        // For now, just log and return success in trial mode
        console.log('📧 Email would be sent to:', email);
        console.log('Subject:', subject);
        console.log('Template:', templateName);
        console.log('Parameters:', parameters);

        return res.status(200).json({
            success: true,
            message: 'Email queued (Trial Mode)',
            trial: true
        });

    } catch (error) {
        console.error('❌ Email handler error:', error);
        return res.status(500).json({
            error: error.message || 'Internal server error'
        });
    }
}
