import React from 'react';
import { Download, FileSpreadsheet, Shield } from 'lucide-react';
import type { Order } from '../../types';

interface DataCentreProps {
    orders: Order[];
}

const DataCentre: React.FC<DataCentreProps> = ({ orders }) => {

    const downloadCSV = () => {
        // 1. Define Headers
        const headers = [
            'Order ID', 'Date', 'Status', 'Total Amount',
            'Customer Name', 'Phone', 'Address', 'City', 'Pincode',
            'Items', 'Payment Method', 'UTR'
        ];

        // 2. Map Data
        const rows = orders.map(order => [
            order.id,
            new Date(order.date).toLocaleDateString(),
            order.status,
            order.totalAmount,
            `"${order.customerDetails.fullName}"`, // Quote to handle commas in names
            order.customerDetails.phone,
            `"${order.customerDetails.street}"`, // Quote to handle commas in address
            order.customerDetails.city,
            order.customerDetails.pincode,
            `"${order.items.map(i => `${i.productName} (${i.quantity}x${i.size})`).join(', ')}"`,
            order.paymentMethod,
            order.utrNumber
        ]);

        // 3. Construct CSV Content
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        // 4. Create Blob and Download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `babaji_achar_data_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500">
            <div className="text-center space-y-4 mb-12">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                    <DatabaseIcon size={40} />
                </div>
                <h2 className="text-4xl font-black text-stone-900">Data Centre</h2>
                <p className="text-xl text-stone-500 font-medium max-w-lg mx-auto">
                    Securely access and download your business data. This includes all customer details, order history, and financial records.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Export Card */}
                <div className="bg-white p-8 rounded-3xl border-2 border-blue-50 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <FileSpreadsheet size={48} className="text-blue-600 mb-6" />
                        <h3 className="text-2xl font-black text-stone-900 mb-2">Master Data Sheet</h3>
                        <p className="text-stone-500 font-medium mb-8">
                            Comprehensive Excel-compatible CSV file containing everyone's personal data (Name, Phone, Address) and complete order history.
                        </p>
                        <button
                            onClick={downloadCSV}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg shadow-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            <Download size={24} />
                            Download All Data
                        </button>
                    </div>
                </div>

                {/* Security Info */}
                <div className="bg-stone-900 p-8 rounded-3xl text-stone-300 flex flex-col justify-center">
                    <Shield size={48} className="text-green-500 mb-6" />
                    <h3 className="text-2xl font-black text-white mb-4">Secure & Private</h3>
                    <p className="font-medium opacity-80 mb-6 leading-relaxed">
                        This data contains sensitive customer information. Please handle it with care and do not share it with unauthorized personnel.
                    </p>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-white">Total Records</span>
                            <span className="font-bold text-green-400">{orders.length}</span>
                        </div>
                        <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DatabaseIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s 9-1.34 9-3V5"></path>
    </svg>
);

export default DataCentre;
