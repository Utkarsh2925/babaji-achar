import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import type { Product } from '../../types';

interface AdminProductsProps {
    products: Product[];
    onUpdateStock: (productId: string, variantId: string, newStock: number) => void;
}

const AdminProducts: React.FC<AdminProductsProps> = ({ products, onUpdateStock }) => {
    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div>
                <h2 className="text-3xl font-black text-orange-950 mb-1">Products & Stock</h2>
                <p className="text-stone-500 font-medium">Manage inventory levels and availability.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product.id} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="w-24 h-24 rounded-2xl bg-stone-100 overflow-hidden shrink-0 border border-stone-100">
                                <img src={product.mainImage} alt={product.name.en} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-black text-orange-950 truncate">{product.name.en}</h3>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {product.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <p className="text-xs text-stone-400 font-bold line-clamp-2">{product.description.en}</p>
                            </div>
                        </div>

                        <div className="space-y-3 pt-3 border-t border-stone-100">
                            {product.variants.map(variant => (
                                <div key={variant.id} className="flex flex-col gap-2 bg-stone-50 p-3 rounded-xl">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-stone-600">{variant.size}</span>
                                        <span className="font-bold text-orange-700">₹{variant.mrp}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="relative flex-1">
                                            <input
                                                type="number"
                                                min="0"
                                                value={variant.stock}
                                                onChange={(e) => onUpdateStock(product.id, variant.id, Math.max(0, parseInt(e.target.value) || 0))}
                                                className={`w-full py-1.5 px-3 rounded-lg border-2 text-sm font-bold outline-none transition-colors ${variant.stock > 0 ? 'border-stone-200 bg-white text-stone-700 focus:border-orange-500' : 'border-red-200 bg-red-50 text-red-600'}`}
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 pointer-events-none">Units</span>
                                        </div>

                                        <button
                                            onClick={() => onUpdateStock(product.id, variant.id, variant.stock > 0 ? 0 : 50)}
                                            className={`p-2 rounded-lg transition-colors ${variant.stock > 0 ? 'bg-green-100 text-green-600 hover:bg-red-100 hover:text-red-600' : 'bg-stone-200 text-stone-500 hover:bg-green-100 hover:text-green-600'}`}
                                            title={variant.stock > 0 ? "Mark Out of Stock" : "Restock"}
                                        >
                                            {variant.stock > 0 ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-center text-stone-400 text-sm font-bold mt-8">Updates are saved automatically.</p>
        </div>
    );
};

export default AdminProducts;
