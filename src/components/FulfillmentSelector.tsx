'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PICKUP_LOCATIONS } from '../data/mockData';
import { MapPin, Truck, Store, CheckCircle, AlertCircle, Clock, Calendar, Navigation } from 'lucide-react';

export default function FulfillmentSelector() {
  const { fulfillment, updateFulfillment, validateZip } = useStore();
  const [zipInput, setZipInput] = useState(fulfillment.zipCode);
  const [zipSubmitted, setZipSubmitted] = useState(false);

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateZip(zipInput);
    updateFulfillment({ zipCode: zipInput, isEligible: isValid, type: 'delivery' });
    setZipSubmitted(true);
  };

  return (
    <section id="fulfillment" className="py-24 bg-zinc-950 text-zinc-100 border-b border-zinc-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 font-mono">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Navigation className="w-3.5 h-3.5" />
            <span>LAST-MILE LOGISTICS // ZERO EMISSIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Cargo Bike Delivery & Hub Pickup
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans">
            Insulated cold-chain delivery straight from vertical racks to your residence, or pickup free from our facility pods.
          </p>
        </div>

        {/* Fulfillment Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Delivery Checker */}
          <div className="lg:col-span-5 bg-zinc-900/90 rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base font-mono">
                  Electric Cargo Fleet Dispatch
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Temperature-controlled insulated delivery tote
                </p>
              </div>
            </div>

            {/* Check Zip Form */}
            <form onSubmit={handleZipCheck} className="space-y-3 font-mono">
              <label className="text-xs text-zinc-400 block uppercase tracking-wider">
                Enter Delivery Zip Code:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  maxLength={5}
                  value={zipInput}
                  onChange={(e) => {
                    setZipInput(e.target.value);
                    setZipSubmitted(false);
                  }}
                  placeholder="10001"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs transition-colors shadow-md shadow-emerald-500/20 uppercase"
                >
                  VERIFY
                </button>
              </div>
            </form>

            {/* Zip Result Message */}
            {zipSubmitted && (
              <div
                className={`p-4 rounded-2xl border text-xs font-mono flex items-start gap-3 ${
                  fulfillment.isEligible
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                }`}
              >
                {fulfillment.isEligible ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">SECTOR VERIFIED: {fulfillment.zipCode} IN SERVICE AREA</p>
                      <p className="mt-0.5 text-zinc-400 font-sans">
                        Orders over $40 qualify for <strong>FREE Zero-Emission Cargo Delivery</strong>.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">ZONE OUTSIDE CURRENT CARGO BIKE RADIUS</p>
                      <p className="mt-0.5 text-zinc-400 font-sans">
                        You can still order and select <strong>Free Farm Hub Pickup</strong> at any of our facilities.
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Delivery Days Info */}
            <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>
                  DISPATCH DAYS: <strong className="text-white">TUESDAYS & FRIDAYS</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>SLOT: 08:00–12:00 (MORNING) • 13:00–17:00 (AFTERNOON)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Free Pickup Farm Hubs */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between font-mono">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Store className="w-5 h-5 text-emerald-400" />
                <span>DIRECT FACILITY PICKUP HUBS</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded">
                ALWAYS $0.00
              </span>
            </div>

            <div className="space-y-3 font-mono">
              {PICKUP_LOCATIONS.map((loc) => {
                const isSelected =
                  fulfillment.type === 'pickup' && fulfillment.pickupLocationId === loc.id;

                return (
                  <div
                    key={loc.id}
                    onClick={() =>
                      updateFulfillment({
                        type: 'pickup',
                        pickupLocationId: loc.id
                      })
                    }
                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-zinc-900 border-emerald-500/80 ring-1 ring-emerald-500/30 shadow-lg shadow-emerald-950/50'
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected
                            ? 'bg-emerald-500 text-zinc-950'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{loc.name}</h4>
                          {isSelected && (
                            <span className="text-[9px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                              ACTIVE HUB
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5 font-sans">{loc.address}</p>
                        <p className="text-[11px] text-zinc-500 font-mono mt-1">
                          HOURS: {loc.hours} • DISPATCH: {loc.availableDays.join(' & ').toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                        isSelected
                          ? 'bg-emerald-500 text-zinc-950 shadow-md'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      {isSelected ? 'SELECTED' : 'SELECT'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
