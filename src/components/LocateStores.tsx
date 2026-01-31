import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Store } from '../types';
import { Locate, MapPin, ExternalLink, ArrowLeft } from 'lucide-react';

// Fix for default marker icon in Leaflet
const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface LocateStoresProps {
    stores: Store[];
    onBack?: () => void;
}

const LocateStores: React.FC<LocateStoresProps> = ({ stores, onBack }) => {
    // Center on Prayagraj
    const center: [number, number] = [25.4358, 81.8463];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-500">
            {onBack && (
                <button onClick={onBack} className="flex items-center gap-2 text-orange-900 mb-8 font-black uppercase text-sm tracking-widest hover:gap-3 transition-all">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md border border-orange-50">
                        <ArrowLeft size={18} />
                    </div>
                    Back
                </button>
            )}
            <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-orange-950 mb-4 flex items-center justify-center gap-3">
                    <MapPin className="text-orange-600" size={40} />
                    Store Locator
                </h2>
                <p className="text-xl text-stone-600 font-medium max-w-2xl mx-auto">
                    Find Baba Ji Achar at a general store near you in Prayagraj.
                </p>
            </div>

            <div className="bg-white p-4 rounded-3xl shadow-xl border border-amber-100 overflow-hidden relative z-0">
                <div className="h-[600px] w-full rounded-2xl overflow-hidden z-0">
                    <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%', zIndex: 0 }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {stores.filter(s => s.isActive).map(store => (
                            <Marker key={store.id} position={[store.lat, store.lng]} icon={customIcon}>
                                <Popup>
                                    <div className="p-2 min-w-[200px]">
                                        <h3 className="font-bold text-lg text-orange-950 mb-1">{store.name}</h3>
                                        <p className="text-sm text-stone-600 mb-3">{store.address}</p>
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 text-blue-600 font-bold text-xs hover:underline"
                                        >
                                            <ExternalLink size={14} /> Get Directions
                                        </a>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.filter(s => s.isActive).map(store => (
                    <div key={store.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 shrink-0">
                                <Locate size={24} />
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-stone-800 mb-1">{store.name}</h3>
                                <p className="text-sm text-stone-500 font-medium mb-3">{store.address}</p>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-orange-700 bg-orange-50 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-orange-100 transition-colors"
                                >
                                    Open in Maps
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocateStores;
