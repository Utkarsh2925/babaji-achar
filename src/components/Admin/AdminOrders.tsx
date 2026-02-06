import React, { useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import type { Order, OrderStatus } from '../../types';

interface AdminOrdersProps {
    orders: Order[];
    updateOrderStatus: (orderId: string, status: OrderStatus) => void;
    deleteOrder: (orderId: string) => void;
}

const AdminOrders: React.FC<AdminOrdersProps> = ({ orders, updateOrderStatus, deleteOrder }) => {
    const [filter, setFilter] = useState<string>('All');
    const [search, setSearch] = useState('');

    const filteredOrders = orders.filter(order => {
        const matchesFilter = filter === 'All' || order.status === filter;
        const matchesSearch =
            order.id.toLowerCase().includes(search.toLowerCase()) ||
            order.customerDetails.fullName.toLowerCase().includes(search.toLowerCase()) ||
            order.customerDetails.phone.includes(search);
        return matchesFilter && matchesSearch;
    }).sort((a, b) => {
        const numA = parseInt(a.id.split('#')[1] || '0');
        const numB = parseInt(b.id.split('#')[1] || '0');
        return numA - numB;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending_Payment': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Payment_Received': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Packed': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Shipped': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-orange-950 mb-1">Orders</h2>
                    <p className="text-stone-500 font-medium">Manage and track all customer orders.</p>
                </div>

                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search ID or Name..."
                            className="pl-10 pr-4 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none font-bold text-stone-700 w-full md:w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
                {['All', 'Pending_Payment', 'Payment_Received', 'Packed', 'Shipped', 'Delivered'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-colors ${filter === status
                            ? 'bg-orange-900 text-white shadow-md'
                            : 'bg-white text-stone-500 border border-stone-100 hover:bg-stone-50'
                            }`}
                    >
                        {status.replace('_', ' ')}
                    </button>
                ))}
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-stone-50 border-b border-stone-100">
                            <tr>
                                <th className="p-4 pl-6 text-xs font-black text-stone-400 uppercase tracking-widest text-center">No.</th>
                                <th className="p-4 text-xs font-black text-stone-400 uppercase tracking-widest">Order ID</th>
                                <th className="p-4 text-xs font-black text-stone-400 uppercase tracking-widest">Customer</th>
                                <th className="p-4 text-xs font-black text-stone-400 uppercase tracking-widest">Date</th>
                                <th className="p-4 text-xs font-black text-stone-400 uppercase tracking-widest">Items</th>
                                <th className="p-4 text-xs font-black text-stone-400 uppercase tracking-widest">Total</th>
                                <th className="p-4 text-xs font-black text-stone-400 uppercase tracking-widest">Payment</th>
                                <th className="p-4 text-xs font-black text-stone-400 uppercase tracking-widest">Status</th>
                                <th className="p-4 pr-6 text-xs font-black text-stone-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center text-stone-400 font-bold">No orders found matching your criteria.</td>
                                </tr>
                            ) : (
                                filteredOrders.map((order, idx) => (
                                    <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                                        <td className="p-4 pl-6 font-bold text-stone-400 text-center">{idx + 1}</td>
                                        <td className="p-4 font-bold text-orange-900">{order.id}</td>
                                        <td className="p-4">
                                            <div className="font-bold text-stone-900">{order.customerDetails.fullName}</div>
                                            <div className="text-xs text-stone-400">{order.customerDetails.phone}</div>
                                        </td>
                                        <td className="p-4 text-sm font-medium text-stone-600">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="p-4 text-sm font-medium text-stone-600">
                                            {order.items.map(i => `${i.productName} (${i.quantity})`).join(', ')}
                                        </td>
                                        <td className="p-4 font-black text-stone-900">₹{order.totalAmount}</td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className={`text-xs font-black uppercase ${order.paymentMethod === 'COD' ? 'text-amber-600' : 'text-blue-600'}`}>
                                                    {order.paymentMethod}
                                                </span>
                                                <span className="text-[10px] font-bold text-stone-400">
                                                    {order.paymentStatus}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                                                className={`px-3 py-1 rounded-lg text-xs font-black uppercase border outline-none cursor-pointer ${getStatusColor(order.status)}`}
                                            >
                                                {['Pending_Payment', 'Payment_Received', 'Packed', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                                                    <option key={s} value={s}>{s.replace('_', ' ')}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <button
                                                onClick={() => { if (confirm('Delete order?')) deleteOrder(order.id) }}
                                                className="p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
