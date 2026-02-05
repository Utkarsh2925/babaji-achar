// send-whatsapp.js - Vercel Serverless Function for WhatsApp Business API

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
        const { phone, templateName, parameters } = req.body;

        // Validation
        if (!phone || !templateName) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check for WhatsApp credentials
        const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
        const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

        if (!accessToken || !phoneNumberId) {
            console.warn('⚠️ WhatsApp credentials not configured');
            return res.status(200).json({
                success: false,
                message: 'WhatsApp not configured (Trial Mode)',
                trial: true
            });
        }

        // Template mapping (Hindi + English combined)
        const templates = {
            order_confirmation: {
                name: 'order_confirmation',
                language: 'en',
                components: [{
                    type: 'body',
                    parameters: [
                        { type: 'text', text: parameters.name },
                        { type: 'text', text: parameters.order_id },
                        { type: 'text', text: parameters.amount.toString() },
                        { type: 'text', text: parameters.address }
                    ]
                }]
            },
            payment_online: {
                name: 'payment_online',
                language: 'en',
                components: [{
                    type: 'body',
                    parameters: [
                        { type: 'text', text: parameters.order_id },
                        { type: 'text', text: parameters.amount.toString() }
                    ]
                }]
            },
            payment_cod: {
                name: 'payment_cod',
                language: 'en',
                components: [{
                    type: 'body',
                    parameters: [
                        { type: 'text', text: parameters.order_id },
                        { type: 'text', text: parameters.amount.toString() }
                    ]
                }]
            },
            order_dispatched: {
                name: 'order_dispatched',
                language: 'en',
                components: [{
                    type: 'body',
                    parameters: [
                        { type: 'text', text: parameters.name },
                        { type: 'text', text: parameters.order_id }
                    ]
                }]
            }
        };

        const template = templates[templateName];
        if (!template) {
            return res.status(400).json({ error: 'Invalid template name' });
        }

        // Call WhatsApp Business API
        const whatsappResponse = await fetch(
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

        const data = await whatsappResponse.json();

        if (!whatsappResponse.ok) {
            console.error('WhatsApp API Error:', data);
            return res.status(500).json({
                error: 'WhatsApp API failed',
                details: data
            });
        }

        console.log('✅ WhatsApp message sent:', data.messages?.[0]?.id);
        return res.status(200).json({ success: true, messageId: data.messages?.[0]?.id });

    } catch (error) {
        console.error('❌ WhatsApp handler error:', error);
        return res.status(500).json({
            error: error.message || 'Internal server error'
        });
    }
}
