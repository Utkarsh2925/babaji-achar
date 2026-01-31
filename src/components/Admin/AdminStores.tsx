import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import type { Store } from '../../types';
import { Trash2, MapPin, Plus, Save } from 'lucide-react';

// Reusing the icon setup
const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface AdminStoresProps {
    stores: Store[];
    onAddStore: (store: Store) => void;
    onDeleteStore: (id: string) => void;
}

const LocationPicker = ({ position, setPosition }: { position: L.LatLng | null, setPosition: (pos: L.LatLng) => void }) => {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });
    return position === null ? null : (
        <Marker position={position} icon={customIcon} />
    );
};

const AdminStores: React.FC<AdminStoresProps> = ({ stores, onAddStore, onDeleteStore }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [position, setPosition] = useState<L.LatLng | null>(null);
    const [latInput, setLatInput] = useState('');
    const [lngInput, setLngInput] = useState('');

    const handleMapClick = (latlng: L.LatLng) => {
        setPosition(latlng);
        setLatInput(latlng.lat.toString());
        setLngInput(latlng.lng.toString());
    };

    const handleLatChange = (val: string) => {
        setLatInput(val);
        const lat = parseFloat(val);
        if (!isNaN(lat) && position) {
            setPosition(new L.LatLng(lat, position.lng));
        } else if (!isNaN(lat)) {
            setPosition(new L.LatLng(lat, 81.8463));
        }
    };

    const handleLngChange = (val: string) => {
        setLngInput(val);
        const lng = parseFloat(val);
        if (!isNaN(lng) && position) {
            setPosition(new L.LatLng(position.lat, lng));
        } else if (!isNaN(lng)) {
            setPosition(new L.LatLng(25.4358, lng));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalLat = parseFloat(latInput);
        const finalLng = parseFloat(lngInput);

        if (name && address && !isNaN(finalLat) && !isNaN(finalLng)) {
            const newStore: Store = {
                id: Date.now().toString(),
                name,
                address,
                lat: finalLat,
                lng: finalLng,
                isActive: true
            };
            onAddStore(newStore);
            // Reset
            setName('');
            setAddress('');
            setPosition(null);
            setLatInput('');
            setLngInput('');
            alert('Store added successfully!');
        } else {
            alert('Please fill all details and select a location or enter coordinates.');
        }
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div>
                <h2 className="text-3xl font-black text-orange-950 mb-1">Store Locator Manager</h2>
                <p className="text-stone-500 font-medium">Add or remove general stores where your products are available.</p>
            </div>

            {/* Add New Store Form */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
                <h3 className="font-bold text-xl text-orange-900 mb-6 flex items-center gap-2">
                    <Plus size={24} /> Add New Store
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-1">Store Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Gupta General Store"
                                className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none font-medium"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-1">Address</label>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Locality, Landmark etc."
                                className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none font-medium h-24 resize-none"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-1">Latitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={latInput}
                                    onChange={(e) => handleLatChange(e.target.value)}
                                    placeholder="e.g. 25.4358"
                                    className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none font-medium"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-1">Longitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={lngInput}
                                    onChange={(e) => handleLngChange(e.target.value)}
                                    placeholder="e.g. 81.8463"
                                    className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:border-orange-500 outline-none font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full py-3 bg-orange-600 text-white rounded-xl font-black text-sm uppercase tracking-wider hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <Save size={18} /> Add Shop to Map
                            </button>
                            <p className="text-xs text-stone-400 mt-2 text-center">Click on the map or enter coordinates manually.</p>
                        </div>
                    </form>

                    {/* Mini Map for Selection */}
                    <div className="h-[450px] rounded-xl overflow-hidden border-2 border-dashed border-stone-300 relative">
                        <div className="absolute top-2 right-2 z-[1000] bg-white/90 px-3 py-1 rounded text-xs font-bold shadow-sm">
                            {position ? `Selected Pin: ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}` : 'Click map to drop pin'}
                        </div>
                        <MapContainer center={[25.4358, 81.8463]} zoom={13} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationPicker position={position} setPosition={handleMapClick} />
                        </MapContainer>
                    </div>
                </div>
            </div>

            {/* Existing Stores List */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
                <h3 className="font-bold text-xl text-orange-900 mb-6">Active Stores ({stores.length})</h3>

                {stores.length === 0 ? (
                    <div className="text-center py-10 text-stone-400 font-bold">No stores added yet.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stores.map(store => (
                            <div key={store.id} className="flex justify-between items-start p-4 bg-stone-50 rounded-2xl border border-stone-100 hover:border-orange-200 transition-colors">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 text-orange-600"><MapPin size={20} /></div>
                                    <div>
                                        <h4 className="font-black text-stone-800">{store.name}</h4>
                                        <p className="text-sm text-stone-500">{store.address}</p>
                                        <span className="text-xs text-stone-400 mt-1 block">Lat: {store.lat.toFixed(4)}, Lng: {store.lng.toFixed(4)}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { if (window.confirm('Delete this store?')) onDeleteStore(store.id); }}
                                    className="text-stone-400 hover:text-red-500 p-2 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminStores;
