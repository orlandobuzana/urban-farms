'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PICKUP_LOCATIONS } from '../data/mockData';
import {
  X,
  CheckCircle,
  Truck,
  Store,
  CreditCard,
  Lock,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Sprout
} from 'lucide-react';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    fulfillment,
    updateFulfillment,
    createOrder,
    setIsSubscriptionPortalOpen
  } = useStore();

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  // Form inputs
  const [name, setName] = useState('Elena Vance');
  const [email, setEmail] = useState('elena.vance@example.com');
  const [phone, setPhone] = useState('(555) 234-8971');
  const [address, setAddress] = useState('142 Mercer St, Apt 3A');
  const [instructions, setInstructions] = useState('Leave with front concierge desk');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('08/28');
  const [cvc, setCvc] = useState('912');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        customer: {
          name,
          email,
          phone,
          address: fulfillment.type === 'delivery' ? address : undefined,
          instructions
        }
      });
      setCompletedOrder(order);
      setIsSubmitting(false);
      setStep('success');
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('details');
  };

  const handleGoToPortal = () => {
    handleClose();
    setIsSubscriptionPortalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-mono">
      <div className="bg-zinc-900 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-zinc-700 text-zinc-100">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-400" />
            <h3 className="font-black text-white text-sm">
              {step === 'details' ? 'ORDER DISPATCH CONFIGURATION' : 'ORDER CONFIRMED & SCHEDULED'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs text-zinc-300">
          {step === 'details' ? (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Fulfillment Method Selector */}
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  1. FULFILLMENT METHOD
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => updateFulfillment({ type: 'delivery' })}
                    className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all text-left ${
                      fulfillment.type === 'delivery'
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/30'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <Truck
                      className={`w-5 h-5 ${
                        fulfillment.type === 'delivery' ? 'text-emerald-400' : 'text-zinc-500'
                      }`}
                    />
                    <div>
                      <div className="font-bold text-xs text-white">Cargo Bike Delivery</div>
                      <div className="text-[10px] text-zinc-500 font-sans">Delivered to residence</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => updateFulfillment({ type: 'pickup' })}
                    className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all text-left ${
                      fulfillment.type === 'pickup'
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/30'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <Store
                      className={`w-5 h-5 ${
                        fulfillment.type === 'pickup' ? 'text-emerald-400' : 'text-zinc-500'
                      }`}
                    />
                    <div>
                      <div className="font-bold text-xs text-white">Farm Hub Pickup</div>
                      <div className="text-[10px] text-zinc-500 font-sans">Direct facility collection</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Schedule Days */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 block mb-1 uppercase">
                    HARVEST DAY:
                  </label>
                  <select
                    value={fulfillment.scheduledDay}
                    onChange={(e) =>
                      updateFulfillment({
                        scheduledDay: e.target.value as 'Tuesday' | 'Friday'
                      })
                    }
                    className="w-full text-xs bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-zinc-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Friday">Friday Morning Cut (Upcoming)</option>
                    <option value="Tuesday">Tuesday Morning Cut</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-400 block mb-1 uppercase">
                    TIME WINDOW:
                  </label>
                  <select
                    value={fulfillment.timeSlot}
                    onChange={(e) => updateFulfillment({ timeSlot: e.target.value })}
                    className="w-full text-xs bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-zinc-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Morning (8:00 AM – 12:00 PM)">08:00–12:00 (MORNING)</option>
                    <option value="Afternoon (1:00 PM – 5:00 PM)">13:00–17:00 (AFTERNOON)</option>
                  </select>
                </div>
              </div>

              {/* Address / Hub Details */}
              {fulfillment.type === 'delivery' ? (
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    2. DELIVERY DESTINATION
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        required
                        placeholder="Street Address & Suite / Apt #"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Zip Code"
                        value={fulfillment.zipCode}
                        onChange={(e) => updateFulfillment({ zipCode: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 text-xs text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Concierge / door code / gate instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-800 bg-zinc-950 text-xs text-zinc-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    2. SELECT PICKUP HUB LOCATION
                  </label>
                  <div className="space-y-2">
                    {PICKUP_LOCATIONS.map((loc) => (
                      <label
                        key={loc.id}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer text-xs ${
                          fulfillment.pickupLocationId === loc.id
                            ? 'bg-emerald-950/40 border-emerald-500 font-bold text-emerald-300'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="hub"
                            checked={fulfillment.pickupLocationId === loc.id}
                            onChange={() => updateFulfillment({ pickupLocationId: loc.id })}
                            className="text-emerald-500"
                          />
                          <span>{loc.name}</span>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-sans">{loc.hours}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Customer Contact */}
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  3. RECIPIENT INFORMATION
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email for dispatch notification"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="SMS contact"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Payment Mock */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>4. PAYMENT ENCRYPTION (DEMO ENVIRONMENT)</span>
                  </label>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    256-BIT ENCRYPTED
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card Number"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-700 text-xs bg-zinc-900 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="px-3 py-2 rounded-xl border border-zinc-700 text-xs bg-zinc-900 text-white text-center"
                    />
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="CVC"
                      className="px-3 py-2 rounded-xl border border-zinc-700 text-xs bg-zinc-900 text-white text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Order Breakdown */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>PRODUCE SUBTOTAL ({cart.length} ITEMS)</span>
                  <span className="font-bold text-white">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>LOGISTICS FEE</span>
                  <span className="font-bold text-white">
                    {deliveryFee === 0 ? <span className="text-emerald-400">FREE ($0.00)</span> : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-white font-black text-sm pt-2 border-t border-zinc-800">
                  <span>DISPATCH TOTAL</span>
                  <span className="text-base text-emerald-400">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all active:scale-98 uppercase"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                    TRANSMITTING DISPATCH MANIFEST...
                  </span>
                ) : (
                  <>
                    <span>CONFIRM & SCHEDULE HARVEST (${cartTotal.toFixed(2)})</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Order Confirmation Step */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                  ORDER BATCH #{completedOrder?.id} SCHEDULED
                </span>
                <h3 className="text-2xl font-black text-white">
                  Automated Harvest Initiated
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed font-sans">
                  Confirmation and dispatch manifest have been sent to{' '}
                  <strong className="text-white">{completedOrder?.customer?.email}</strong>.
                </p>
              </div>

              {/* Order Snapshot Card */}
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-left space-y-3 text-xs max-w-md mx-auto">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">SCHEDULED HARVEST</span>
                  <strong className="text-white">
                    {completedOrder?.fulfillment?.scheduledDay} ({completedOrder?.fulfillment?.timeSlot})
                  </strong>
                </div>

                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">DESTINATION</span>
                  <strong className="text-white">
                    {completedOrder?.fulfillment?.type === 'delivery'
                      ? completedOrder?.customer?.address
                      : 'Downtown Farm Hub Pickup'}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">BILLED AMOUNT</span>
                  <strong className="text-emerald-400 text-sm">
                    ${completedOrder?.total?.toFixed(2)}
                  </strong>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleGoToPortal}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 text-zinc-950 font-black text-xs hover:bg-emerald-400 transition-colors shadow-md uppercase"
                >
                  MANAGE SUBSCRIPTION PORTAL
                </button>
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-zinc-700 font-bold text-xs text-zinc-300 hover:bg-zinc-800 uppercase"
                >
                  RETURN TO STORE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
