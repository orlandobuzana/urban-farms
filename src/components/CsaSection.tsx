'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CSABox, SubscriptionCadence, BoxAddOn } from '../types/store';
import { BOX_ADDONS } from '../data/mockData';
import {
  Check,
  Calendar,
  Sliders,
  RefreshCw,
  ShoppingBag,
  X,
  Leaf,
  Sprout,
  Sparkles,
  Zap
} from 'lucide-react';

export default function CsaSection() {
  const { csaBoxes, addToCart, customizingBox, setCustomizingBox } = useStore();
  const [selectedCadence, setSelectedCadence] = useState<SubscriptionCadence>('weekly');

  const [activeBoxCustomization, setActiveBoxCustomization] = useState<{
    items: string[];
    selectedAddOns: BoxAddOn[];
  }>({
    items: [],
    selectedAddOns: []
  });

  const getDiscountMultiplier = (cadence: SubscriptionCadence) => {
    if (cadence === 'weekly') return 0.85;
    if (cadence === 'bi-weekly') return 0.9;
    return 1.0;
  };

  const getEffectivePrice = (basePrice: number, cadence: SubscriptionCadence) => {
    return (basePrice * getDiscountMultiplier(cadence)).toFixed(2);
  };

  const openCustomizer = (box: CSABox) => {
    setActiveBoxCustomization({
      items: box.defaultItems.map((i) => i.name),
      selectedAddOns: []
    });
    setCustomizingBox(box);
  };

  const handleSwapItem = (originalName: string, newName: string) => {
    setActiveBoxCustomization((prev) => ({
      ...prev,
      items: prev.items.map((name) => (name === originalName ? newName : name))
    }));
  };

  const toggleAddOn = (addOn: BoxAddOn) => {
    setActiveBoxCustomization((prev) => {
      const exists = prev.selectedAddOns.some((a) => a.id === addOn.id);
      if (exists) {
        return {
          ...prev,
          selectedAddOns: prev.selectedAddOns.filter((a) => a.id !== addOn.id)
        };
      } else {
        return {
          ...prev,
          selectedAddOns: [...prev.selectedAddOns, addOn]
        };
      }
    });
  };

  const handleQuickAdd = (box: CSABox) => {
    const effectivePrice = parseFloat(getEffectivePrice(box.basePrice, selectedCadence));
    addToCart({
      type: 'csa',
      productId: box.id,
      title: `${box.name} (${selectedCadence.toUpperCase()})`,
      price: effectivePrice,
      quantity: 1,
      frequency: selectedCadence,
      boxServes: box.serves,
      customizedItems: box.defaultItems.map((i) => i.name),
      addOns: [],
      image: box.image
    });
  };

  const handleCustomizedAdd = () => {
    if (!customizingBox) return;

    const baseEffective = parseFloat(getEffectivePrice(customizingBox.basePrice, selectedCadence));
    const addOnsTotal = activeBoxCustomization.selectedAddOns.reduce((sum, a) => sum + a.price, 0);
    const totalPrice = parseFloat((baseEffective + addOnsTotal).toFixed(2));

    addToCart({
      type: 'csa',
      productId: customizingBox.id,
      title: `${customizingBox.name} (${selectedCadence.toUpperCase()} Customized)`,
      price: totalPrice,
      quantity: 1,
      frequency: selectedCadence,
      boxServes: customizingBox.serves,
      customizedItems: activeBoxCustomization.items,
      addOns: activeBoxCustomization.selectedAddOns.map((a) => ({
        id: a.id,
        name: a.name,
        price: a.price,
        unit: a.unit
      })),
      image: customizingBox.image
    });

    setCustomizingBox(null);
  };

  return (
    <section id="csa-boxes" className="py-24 bg-zinc-950 text-zinc-100 border-b border-zinc-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>COMMUNITY SUPPORTED AGRICULTURE // AUTOMATED HARVEST</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-mono">
            Vertical Harvest Subscriptions
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Select an autonomous harvest cadence. Every box is cut to order, packed inside sterile eco-insulated pods, and sent straight from the rack to your doorstep.
          </p>

          {/* Cadence Selector Tabs */}
          <div className="pt-6 flex items-center justify-center font-mono">
            <div className="inline-flex p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-inner">
              <button
                onClick={() => setSelectedCadence('weekly')}
                className={`relative px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  selectedCadence === 'weekly'
                    ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>WEEKLY HARVEST</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                  selectedCadence === 'weekly' ? 'bg-zinc-950 text-emerald-400' : 'bg-emerald-950 text-emerald-300'
                }`}>
                  -15%
                </span>
              </button>

              <button
                onClick={() => setSelectedCadence('bi-weekly')}
                className={`relative px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  selectedCadence === 'bi-weekly'
                    ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>BI-WEEKLY</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                  selectedCadence === 'bi-weekly' ? 'bg-zinc-950 text-emerald-400' : 'bg-emerald-950 text-emerald-300'
                }`}>
                  -10%
                </span>
              </button>

              <button
                onClick={() => setSelectedCadence('one-time')}
                className={`relative px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  selectedCadence === 'one-time'
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                SINGLE DISPATCH
              </button>
            </div>
          </div>
        </div>

        {/* CSA Box Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {csaBoxes.map((box) => {
            const effectivePrice = getEffectivePrice(box.basePrice, selectedCadence);
            const isDiscounted = selectedCadence !== 'one-time';

            return (
              <div
                key={box.id}
                className={`relative rounded-3xl bg-zinc-900/80 border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  box.popular
                    ? 'border-emerald-500/80 shadow-2xl shadow-emerald-950/70 ring-1 ring-emerald-400/40'
                    : 'border-zinc-800 hover:border-zinc-700 hover:shadow-xl'
                }`}
              >
                {/* Popular or Specialty Badge */}
                {box.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-2.5 py-1 rounded font-mono text-[10px] font-black uppercase tracking-wider ${
                      box.popular
                        ? 'bg-emerald-500 text-zinc-950 shadow-md'
                        : 'bg-zinc-950 text-emerald-400 border border-zinc-800'
                    }`}>
                      {box.badge}
                    </span>
                  </div>
                )}

                {/* Box Image */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                  <img
                    src={box.image}
                    alt={box.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 opacity-90 hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                    <span className="text-zinc-300 font-semibold">{box.serves}</span>
                    <span className="bg-zinc-950/90 text-emerald-400 border border-zinc-800 px-2 py-0.5 rounded text-[10px]">
                      {box.weightLbs}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-white font-mono tracking-tight">
                      {box.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {box.subtitle}
                    </p>

                    {/* Price Block */}
                    <div className="mt-4 flex items-baseline gap-2 font-mono">
                      <span className="text-3xl font-black text-emerald-400">
                        ${effectivePrice}
                      </span>
                      <span className="text-xs text-zinc-500">
                        /{selectedCadence === 'one-time' ? 'order' : 'cycle'}
                      </span>
                      {isDiscounted && (
                        <span className="text-xs text-zinc-600 line-through">
                          ${box.basePrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Harvest Items Highlights */}
                    <div className="mt-5 space-y-2 border-t border-zinc-800/80 pt-4">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
                        CHAMBER INCLUSIONS:
                      </span>
                      <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                        {box.defaultItems.slice(0, 4).map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span className="truncate">{item.name}</span>
                          </li>
                        ))}
                        {box.defaultItems.length > 4 && (
                          <li className="text-[10px] text-zinc-500 italic pl-3.5">
                            + {box.defaultItems.length - 4} additional living crops
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 space-y-2 font-mono">
                    <button
                      onClick={() => handleQuickAdd(box)}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20 active:scale-98"
                    >
                      <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                      <span>INITIALIZE SUBSCRIPTION</span>
                    </button>

                    <button
                      onClick={() => openCustomizer(box)}
                      className="w-full py-2 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                      <span>CUSTOMIZE CHAMBER CROPS</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* High-Tech Value Props */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 grid grid-cols-1 md:grid-cols-3 gap-8 font-mono">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Autonomous Cadence Control
              </h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-sans">
                Skip an upcoming delivery with 1 click in your portal or pause during travel. Zero cancellation penalties.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Precision Timing Harvest
              </h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-sans">
                Harvested at optimal photosynthetically active radiation (PAR) levels on Tuesday & Friday mornings.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Zero Pesticide Assurance
              </h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-sans">
                Positive-pressure HEPA filtered growth zones protect plants from insects without toxic chemical sprays.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Box Customizer Modal */}
      {customizingBox && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-mono">
          <div className="bg-zinc-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-zinc-700">
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
              <div>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">
                  CHAMBER CUSTOMIZATION MATRIX
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  {customizingBox.name}
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Selected Cadence: <strong className="text-emerald-400 uppercase">{selectedCadence}</strong>
                </p>
              </div>
              <button
                onClick={() => setCustomizingBox(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-zinc-300">
              {/* Swap Included Items */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  1. Current Rack Inclusions (Select to swap):
                </h4>
                <div className="space-y-2.5">
                  {customizingBox.defaultItems.map((item, idx) => {
                    const currentSelection = activeBoxCustomization.items[idx] || item.name;
                    const matchingSwap = customizingBox.swappableOptions.find(
                      (s) => s.category.toLowerCase() === item.category.toLowerCase()
                    );

                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                            ✓
                          </div>
                          <div>
                            <span className="font-bold text-white block">
                              {currentSelection}
                            </span>
                            <span className="text-[10px] text-zinc-500">
                              {item.quantity} • {item.category}
                            </span>
                          </div>
                        </div>

                        {matchingSwap && (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-zinc-500">SWAP:</span>
                            <select
                              value={currentSelection}
                              onChange={(e) => handleSwapItem(currentSelection, e.target.value)}
                              className="text-xs bg-zinc-900 border border-zinc-700 rounded-lg py-1 px-2.5 text-zinc-200 focus:outline-none focus:border-emerald-500"
                            >
                              {matchingSwap.options.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Farm Add-ons */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  2. Farm Add-ons (Optional extras):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BOX_ADDONS.map((addOn) => {
                    const isSelected = activeBoxCustomization.selectedAddOns.some(
                      (a) => a.id === addOn.id
                    );

                    return (
                      <div
                        key={addOn.id}
                        onClick={() => toggleAddOn(addOn)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500/30'
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <img
                          src={addOn.image}
                          alt={addOn.name}
                          className="w-11 h-11 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-white truncate">
                            {addOn.name}
                          </h5>
                          <span className="text-[10px] text-emerald-400 block">
                            +${addOn.price.toFixed(2)} / {addOn.unit}
                          </span>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            isSelected
                              ? 'bg-emerald-500 text-zinc-950'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {isSelected ? '✓' : '+'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase">Total Harvest Cost:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-emerald-400">
                    $
                    {(
                      parseFloat(getEffectivePrice(customizingBox.basePrice, selectedCadence)) +
                      activeBoxCustomization.selectedAddOns.reduce((s, a) => s + a.price, 0)
                    ).toFixed(2)}
                  </span>
                  <span className="text-xs text-zinc-400">
                    /{selectedCadence}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setCustomizingBox(null)}
                  className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-zinc-700 text-xs text-zinc-300 hover:bg-zinc-800"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleCustomizedAdd}
                  className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  <span>ADD TO BASKET</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
