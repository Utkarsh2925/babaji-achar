import React from 'react';
import { ArrowLeft, Shield, FileText, AlertCircle, RefreshCcw } from 'lucide-react';
import { BRAND_CONFIG } from '../../constants';

type LegalPageProps = {
    type: 'PRIVACY' | 'REFUND' | 'TERMS' | 'DISCLAIMER';
    onBack: () => void;
};

const LegalPage: React.FC<LegalPageProps> = ({ type, onBack }) => {
    const content = {
        PRIVACY: {
            title: 'Privacy Policy',
            icon: <Shield className="w-8 h-8 text-orange-600" />,
            lastUpdated: 'October 25, 2023',
            text: (
                <div className="space-y-6 text-stone-600">
                    <p>At <strong>Bhojnamrit Foods (Babaji Achar)</strong>, accessible from https://babajiachar.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by us and how we use it. We adhere to standard e-commerce data protection practices.</p>

                    <h3 className="text-xl font-bold text-orange-900">1. Information Collection</h3>
                    <p>We collect information necessary to fulfill your order: Name, Shipping Address, Phone Number, and Email. We <strong>never</strong> store your payment credentials (UPI Pins, Card Numbers) on our servers.</p>

                    <h3 className="text-xl font-bold text-orange-900">2. Data Usage</h3>
                    <p>Your data is strictly used for order processing, delivery updates (via WhatsApp/Email), and improving our service. We do not sell, trade, or rent your personal identification information to others.</p>

                    <h3 className="text-xl font-bold text-orange-900">3. Security</h3>
                    <p>We implement appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.</p>
                </div>
            )
        },
        REFUND: {
            title: 'Refund & Cancellation Policy',
            icon: <RefreshCcw className="w-8 h-8 text-orange-600" />,
            lastUpdated: 'October 25, 2023',
            text: (
                <div className="space-y-6 text-stone-600">
                    <h3 className="text-xl font-bold text-orange-900">1. Strict No-Return Policy on Food</h3>
                    <p>For health, hygiene, and safety reasons, <strong>we strictly do not accept returns or exchanges</strong> on any food items once delivered. This is a standard industry practice for perishable goods.</p>

                    <h3 className="text-xl font-bold text-orange-900">2. Exceptions for Damage</h3>
                    <p>We only offer refunds or replacements under the following specific condition:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>The glass jar is broken/shattered upon delivery.</li>
                        <li>The seal is tampered with before you opened it.</li>
                        <li>You received the wrong item.</li>
                    </ul>
                    <p>In such cases, you <strong>MUST</strong> send an unboxing video to our WhatsApp (+91 {BRAND_CONFIG.WHATSAPP_NUMBER}) within 24 hours of delivery. Without video proof, no claims will be entertained.</p>

                    <h3 className="text-xl font-bold text-orange-900">3. Cancellations</h3>
                    <p>Orders can only be cancelled within 2 hours of placement if not yet shipped.</p>
                </div>
            )
        },
        TERMS: {
            title: 'Terms & Conditions',
            icon: <FileText className="w-8 h-8 text-orange-600" />,
            lastUpdated: 'October 25, 2023',
            text: (
                <div className="space-y-6 text-stone-600">
                    <h3 className="text-xl font-bold text-orange-900">1. Acceptance of Terms</h3>
                    <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use Babaji Achar if you do not agree to take all of the terms and conditions stated on this page.</p>

                    <h3 className="text-xl font-bold text-orange-900">2. Products & Pricing</h3>
                    <p>We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors.</p>
                    <p>All prices are subject to change without notice.</p>

                    <h3 className="text-xl font-bold text-orange-900">3. Governing Law</h3>
                    <p>These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in Prayagraj, Uttar Pradesh.</p>
                </div>
            )
        },
        DISCLAIMER: {
            title: 'Disclaimer',
            icon: <AlertCircle className="w-8 h-8 text-orange-600" />,
            lastUpdated: 'October 25, 2023',
            text: (
                <div className="space-y-6 text-stone-600">
                    <h3 className="text-xl font-bold text-orange-900">1. Handmade Product Warning</h3>
                    <p>Our pickles are 100% handmade in small batches using traditional sun-drying methods. As a result, <strong>minor variations in taste, color, texture, and oil levels</strong> may occur between different batches. This is a hallmark of authentic, artisanal products and not a manufacturing defect.</p>

                    <h3 className="text-xl font-bold text-orange-900">2. Allergen Warning</h3>
                    <p className="bg-orange-50 p-4 rounded-lg border border-orange-200 font-bold text-orange-800">
                        Caution: Our products are processed in a facility that handles MUSTARD OIL, SESAME SEEDS, FENUGREEK, and CHILI.
                    </p>
                    <p>Please review the ingredient list of each product carefully before consumption if you have any severe food allergies.</p>

                    <h3 className="text-xl font-bold text-orange-900">3. Health Benefits</h3>
                    <p>References to health benefits (digestion, immunity) are based on traditional Ayurvedic knowledge and are not intended as medical advice or to cure any specific disease.</p>
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
                    <div className="p-8 sm:p-12 leading-relaxed">
                        {current.text}
                    </div>

                    {/* Footer of Card */}
                    <div className="bg-stone-50 p-8 text-center border-t border-stone-100">
                        <p className="text-stone-400 text-sm font-bold">© {new Date().getFullYear()} Bhojnamrit Foods. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
