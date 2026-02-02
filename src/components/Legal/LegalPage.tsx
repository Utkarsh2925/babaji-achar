import React, { useEffect } from 'react';
import { ArrowLeft, Shield, FileText, AlertCircle, RefreshCcw } from 'lucide-react';
import { BRAND_CONFIG } from '../../constants';

type LegalPageProps = {
    type: 'PRIVACY' | 'REFUND' | 'TERMS' | 'DISCLAIMER';
    onBack: () => void;
};

const LegalPage: React.FC<LegalPageProps> = ({ type, onBack }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const content = {
        PRIVACY: {
            title: 'Privacy Policy',
            icon: <Shield className="w-8 h-8 text-orange-600" />,
            lastUpdated: '26.01.2026',
            text: (
                <div className="space-y-6 text-stone-600">
                    <p>At <strong>Bhojnamrit Foods (Brand: Babaji Achar)</strong>, accessible from https://babaji-achar.vercel.app/, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by us and how we use it. We adhere to the Information Technology Act, 2000 and standard e-commerce data protection practices.</p>

                    <h3 className="text-xl font-bold text-orange-900">1. Information Collection</h3>
                    <p>We collect information necessary to fulfill your order and provide customer support:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Personal Information:</strong> Name, Shipping Address, Phone Number, and Email Address.</li>
                        <li><strong>Order Details:</strong> Products purchased, taste preferences, and transaction IDs.</li>
                        <li><strong>Payment Data:</strong> We do NOT store sensitive payment credentials (UPI Pins, Credit/Debit Card numbers) on our servers. Matches are handled via secure third-party gateways or direct UPI apps.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-orange-900">2. Use of Data</h3>
                    <p>Your data is strictly used for:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Processing and delivering your orders via our courier partners.</li>
                        <li>Sending order confirmations and shipping updates via WhatsApp or Email.</li>
                        <li>Improving our website functionality and product offerings.</li>
                    </ul>
                    <p>We do not sell, trade, or rent your personal identification information to others.</p>

                    <h3 className="text-xl font-bold text-orange-900">3. Cookies & Analytics</h3>
                    <p>We use standard cookies to maintain your shopping cart session and analyze website traffic to improve user experience. You can choose to disable cookies through your browser options.</p>

                    <h3 className="text-xl font-bold text-orange-900">4. Data Security</h3>
                    <p>We implement appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.</p>

                    <h3 className="text-xl font-bold text-orange-900">5. Contact Us</h3>
                    <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>{BRAND_CONFIG.EMAIL}</strong> or strictly via WhatsApp at <strong>+91 {BRAND_CONFIG.WHATSAPP_NUMBER}</strong>.</p>
                </div>
            )
        },
        REFUND: {
            title: 'Refund & Cancellation Policy',
            icon: <RefreshCcw className="w-8 h-8 text-orange-600" />,
            lastUpdated: '26.01.2026',
            text: (
                <div className="space-y-6 text-stone-600">
                    <h3 className="text-xl font-bold text-orange-900">1. Strict No-Return Policy on Food</h3>
                    <p>For health, hygiene, and safety reasons, <strong>we strictly do not accept returns or exchanges</strong> on any food items once delivered. This is a standard global industry practice for perishable goods (pickles, spices, condiments).</p>
                    <p>We do not offer refunds based on <strong>personal taste preferences</strong> (e.g., "too spicy", "too sour") as our products are made using authentic traditional recipes which may differ from commercial brands.</p>

                    <h3 className="text-xl font-bold text-orange-900">2. Refund Eligibility</h3>
                    <p>We only offer refunds or free replacements under the following specific conditions:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>The glass jar is broken/shattered upon delivery.</li>
                        <li>The product seal is tampered with before you opened it.</li>
                        <li>You received the wrong item (brand or variant mismatch).</li>
                    </ul>

                    <h3 className="text-xl font-bold text-orange-900">3. Complaint Process</h3>
                    <p>To claim a refund/replacement for damaged goods:</p>
                    <ul className="list-decimal pl-5 space-y-2">
                        <li>You <strong>MUST</strong> record an unboxing video showing the shipping label and the damage clearly.</li>
                        <li>Send this video/photo proof to our WhatsApp Support (<strong>+91 {BRAND_CONFIG.WHATSAPP_NUMBER}</strong>) within <strong>24 hours of delivery</strong>.</li>
                        <li>Without video proof or checks beyond 24 hours, no claims will be entertained.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-orange-900">4. Processing Time</h3>
                    <p>Approved refunds will be processed within <strong>5-7 working days</strong> to your original payment method (UPI/Bank Transfer).</p>

                    <h3 className="text-xl font-bold text-orange-900">5. Cancellations</h3>
                    <p>Orders can only be cancelled within <strong>2 hours of placement</strong> or before the order status is marked as 'Shipped', whichever is earlier. Once shipped, orders cannot be cancelled.</p>
                </div>
            )
        },
        TERMS: {
            title: 'Terms & Conditions',
            icon: <FileText className="w-8 h-8 text-orange-600" />,
            lastUpdated: '26.01.2026',
            text: (
                <div className="space-y-6 text-stone-600">
                    <h3 className="text-xl font-bold text-orange-900">1. Introduction</h3>
                    <p>Welcome to <strong>Bhojnamrit Foods (Babaji Achar)</strong>. By accessing this website (https://babaji-achar.vercel.app/), we assume you accept these terms and conditions. Do not continue to use Babaji Achar if you do not agree to take all of the terms and conditions stated on this page.</p>

                    <h3 className="text-xl font-bold text-orange-900">2. Products & Accuracy</h3>
                    <p>We share our pickle images and descriptions as accurately as possible. However, since our products are <strong>100% handmade and sun-dried</strong>, minor variations in color, texture, and oil floating levels may occur between batches. This confirms the authenticity of the product and is not a defect.</p>

                    <h3 className="text-xl font-bold text-orange-900">3. Pricing & Availability</h3>
                    <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part thereof) without notice at any time.</p>

                    <h3 className="text-xl font-bold text-orange-900">4. Order Acceptance</h3>
                    <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. This generally applies to bulk orders that appear to be for resale/distribution without prior agreement.</p>

                    <h3 className="text-xl font-bold text-orange-900">5. Limitation of Liability</h3>
                    <p>Bhojnamrit Foods shall not be held liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use our products or website.</p>

                    <h3 className="text-xl font-bold text-orange-900">6. Governing Law</h3>
                    <p>These terms and conditions are governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts in <strong>Prayagraj, Uttar Pradesh</strong>.</p>
                </div>
            )
        },
        DISCLAIMER: {
            title: 'Disclaimer',
            icon: <AlertCircle className="w-8 h-8 text-orange-600" />,
            lastUpdated: '26.01.2026',
            text: (
                <div className="space-y-6 text-stone-600">
                    <h3 className="text-xl font-bold text-orange-900">1. Informational Purpose Only</h3>
                    <p>The content provided on this website is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind about the completeness, accuracy, reliability, or availability of the website or the products.</p>

                    <h3 className="text-xl font-bold text-orange-900">2. Medical Disclaimer</h3>
                    <p>Our products (Indian pickles/achar) contain spices like fenugreek, turmeric, and mustard oil, which are traditionally known for health benefits in Ayurveda. However, <strong>no content on this site is intended to be a substitute for professional medical advice, diagnosis, or treatment.</strong></p>
                    <p>If you have specific dietary restrictions (low sodium, oil-free, etc.) or medical conditions, please consult your doctor before consuming traditional pickles.</p>

                    <h3 className="text-xl font-bold text-orange-900">3. Allergen Warning</h3>
                    <p className="bg-orange-50 p-4 rounded-lg border border-orange-200 font-bold text-orange-800">
                        Caution: Our products are processed in a facility that handles MUSTARD OIL, SESAME SEEDS, FENUGREEK, and CHILI.
                    </p>

                    <h3 className="text-xl font-bold text-orange-900">4. Liability</h3>
                    <p>Bhojnamrit Foods is not responsible for any adverse reactions resulting from the misuse or excessive consumption of our products. Consumption is at the user's discretion.</p>
                </div>
            )
        }
    };

    const current = content[type];

    return (
        <div className="min-h-screen bg-stone-50 pt-24 pb-20 px-4 animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-stone-500 hover:text-orange-700 transition-colors mb-8 font-bold"
                >
                    <ArrowLeft size={20} /> Back to Home
                </button>

                <div className="bg-white rounded-[2.5rem] shadow-xl border border-stone-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-orange-50 p-8 sm:p-12 border-b border-orange-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-white rounded-2xl shadow-sm border border-orange-100">
                                {current.icon}
                            </div>
                            <span className="text-orange-600 font-bold tracking-widest uppercase text-xs">Legal Information</span>
                        </div>
                        <h1 className="hindi-font text-3xl sm:text-5xl font-black text-orange-950 mb-4">{current.title}</h1>
                        <p className="text-stone-500 font-medium">Last Updated: {current.lastUpdated}</p>
                    </div>

                    {/* Content */}
                    <div className="p-8 sm:p-12 leading-relaxed text-lg text-justify">
                        {current.text}
                    </div>

                    {/* Footer of Card */}
                    <div className="bg-stone-50 p-8 text-center border-t border-stone-100">
                        <p className="text-stone-400 text-sm font-bold">© {new Date().getFullYear()} Bhojnamrit Foods (Brand: Babaji Achar). All Rights Reserved.</p>
                        <p className="text-stone-300 text-xs mt-1">Prayagraj, Uttar Pradesh, India</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
