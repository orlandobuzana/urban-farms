'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory, GrowthMethod } from '../types/store';
import {
  X,
  ShieldCheck,
  Package,
  Users,
  ShoppingBag,
  Plus,
  Check,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';

export default function AdminModal() {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    updateProductStock,
    addNewProduct,
    orders,
    subscriptions
  } = useStore();

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'subscriptions' | 'new-crop'>('inventory');

  // New product form
  const [newCropName, setNewCropName] = useState('');
  const [newCropCategory, setNewCropCategory] = useState<ProductCategory>('microgreens');
  const [newCropPrice, setNewCropPrice] = useState('5.00');
  const [newCropUnit, setNewCropUnit] = useState('4 oz clamshell');
  const [newCropMethod, setNewCropMethod] = useState<GrowthMethod>('Vertical Tower');
  const [newCropTagline, setNewCropTagline] = useState('');
  const [newCropStock, setNewCropStock] = useState('20');
  const [newCropImage, setNewCropImage] = useState(
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
  );

  if (!isAdminOpen) return null;

  const totalWeeklyMRR = subscriptions
    .filter((s) => s.status === 'active')
    .reduce((acc, sub) => acc + (sub.frequency === 'weekly' ? sub.pricePerCycle : sub.pricePerCycle / 2), 0);

  const handleAddCrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCropName) return;

    const newProd: Product = {
      id: `prod-custom-${Date.now()}`,
      name: newCropName,
      tagline: newCropTagline || 'High-density vertical CEA harvest',
      category: newCropCategory,
      price: parseFloat(newCropPrice),
      unit: newCropUnit,
      growthMethod: newCropMethod,
      harvestWindow: 'Harvested daily',
      inStock: true,
      stockCount: parseInt(newCropStock) || 20,
      image: newCropImage,
      description: 'Grown in our climate-controlled vertical agriculture rooms with zero pesticides.',
      nutritionHighlights: ['Zero Pesticides', 'Harvested Today'],
      daysToHarvest: 14
    };

    addNewProduct(newProd);
    setNewCropName('');
    setNewCropTagline('');
    setActiveTab('inventory');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-mono">
      <div className="bg-zinc-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-zinc-700 text-zinc-100">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                FACILITY CONTROL UNIT // ADMIN OS
              </span>
              <h3 className="font-black text-white text-base">URBAN FARM OPERATIONS TERMINAL</h3>
            </div>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metric Bar */}
        <div className="bg-zinc-950/70 p-4 border-b border-zinc-800 grid grid-cols-3 gap-4 text-center sm:text-left">
          <div className="bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-zinc-500">Active Subscribers</span>
            <div className="text-xl font-black text-white mt-0.5">
              {subscriptions.filter((s) => s.status === 'active').length} UNITS
            </div>
          </div>
          <div className="bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-zinc-500">Weekly Run Rate</span>
            <div className="text-xl font-black text-emerald-400 mt-0.5">
              ${totalWeeklyMRR.toFixed(2)}/WK
            </div>
          </div>
          <div className="bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-zinc-500">Dispatch History</span>
            <div className="text-xl font-black text-white mt-0.5">
              {orders.length} ORDERS
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 px-6 pt-3 gap-6 bg-zinc-950 text-xs font-bold uppercase">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'inventory'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Crop Inventory ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'subscriptions'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Subscribers ({subscriptions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'orders'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Dispatch Manifests ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('new-crop')}
            className={`pb-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'new-crop'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Seed New Batch</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 text-xs text-zinc-300">
          {activeTab === 'inventory' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  LIVE CROP PRODUCTION MATRIX
                </span>
                <span className="text-[10px] text-zinc-500">
                  REAL-TIME REACTIVE CLIENT SYNC
                </span>
              </div>

              <div className="divide-y divide-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-950">
                {products.map((p) => (
                  <div key={p.id} className="p-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div>
                        <h5 className="font-bold text-white text-xs">{p.name}</h5>
                        <span className="text-[10px] text-zinc-500">
                          ${p.price.toFixed(2)} / {p.unit} • {p.growthMethod}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs font-bold text-white block">
                          {p.stockCount} IN RACKS
                        </span>
                        <span
                          className={`text-[9px] font-black uppercase ${
                            p.inStock ? 'text-emerald-400' : 'text-red-400'
                          }`}
                        >
                          {p.inStock ? 'AVAILABLE' : 'DEPLETED'}
                        </span>
                      </div>

                      <button
                        onClick={() => updateProductStock(p.id, !p.inStock, p.inStock ? 0 : 25)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                          p.inStock
                            ? 'bg-amber-950/40 border border-amber-500/40 text-amber-300 hover:bg-amber-900/60'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950'
                        }`}
                      >
                        {p.inStock ? 'DEPLETE' : 'RESTOCK (25)'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                ACTIVE SUBSCRIBER MATRIX
              </h4>
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-2xl border border-zinc-800 bg-zinc-950 space-y-2 text-xs"
                >
                  <div className="flex justify-between items-center">
                    <strong className="text-sm font-bold text-white">{sub.boxTitle}</strong>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                      {sub.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-zinc-400">
                    CADENCE: <strong className="text-white uppercase">{sub.frequency}</strong> • TARGET: {sub.addressOrHub}
                  </p>
                  <p className="text-zinc-500">
                    NEXT HARVEST: {sub.nextHarvestDate} • CYCLE RATE: ${sub.pricePerCycle.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                DISPATCH MANIFESTS
              </h4>
              {orders.length === 0 ? (
                <p className="text-xs text-zinc-500 py-8 text-center font-sans">
                  No orders placed yet in this session. Complete a test checkout to see it appear here live!
                </p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl border border-zinc-800 bg-zinc-950 space-y-2 text-xs"
                  >
                    <div className="flex justify-between">
                      <strong className="font-bold text-white">
                        {order.id} — {order.customer.name}
                      </strong>
                      <span className="font-black text-emerald-400">${order.total.toFixed(2)}</span>
                    </div>
                    <p className="text-zinc-500">DISPATCHED: {order.createdAt}</p>
                    <div className="border-t border-zinc-850 pt-2 text-zinc-300">
                      <strong>ITEMS ({order.items.length}):</strong>{' '}
                      {order.items.map((i) => `${i.title} (x${i.quantity})`).join(', ')}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'new-crop' && (
            <form onSubmit={handleAddCrop} className="space-y-4 max-w-lg mx-auto">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">
                SEED NEW INDOOR CROP BATCH
              </h4>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400">Crop Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Red Veined Sorrel Microgreens"
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-700 bg-zinc-950 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400">Category</label>
                  <select
                    value={newCropCategory}
                    onChange={(e) => setNewCropCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-950 text-xs text-white"
                  >
                    <option value="microgreens">Microgreens</option>
                    <option value="greens">Salad Greens</option>
                    <option value="herbs">Living Herbs</option>
                    <option value="specialty">Specialty Fungi</option>
                    <option value="pantry">Farm Pantry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400">Growth Method</label>
                  <select
                    value={newCropMethod}
                    onChange={(e) => setNewCropMethod(e.target.value as GrowthMethod)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-950 text-xs text-white"
                  >
                    <option value="Vertical Tower">Vertical Tower</option>
                    <option value="Hydroponic">Hydroponic</option>
                    <option value="Aeroponic">Aeroponic</option>
                    <option value="Rooftop Soil">Rooftop Soil</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400">Price ($)</label>
                  <input
                    type="number"
                    step="0.25"
                    value={newCropPrice}
                    onChange={(e) => setNewCropPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-950 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400">Unit</label>
                  <input
                    type="text"
                    value={newCropUnit}
                    onChange={(e) => setNewCropUnit(e.target.value)}
                    placeholder="4 oz clamshell"
                    className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-950 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400">Batch Qty</label>
                  <input
                    type="number"
                    value={newCropStock}
                    onChange={(e) => setNewCropStock(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-950 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400">Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Tart lemon acidity with crimson veins"
                  value={newCropTagline}
                  onChange={(e) => setNewCropTagline(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-700 bg-zinc-950 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs transition-colors shadow-md uppercase"
              >
                PUBLISH BATCH TO STORE
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
