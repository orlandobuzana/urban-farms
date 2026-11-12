'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    isFreeDeliveryQualified,
    setIsCheckoutOpen,
    fulfillment
  } = useStore();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 40;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const deliveryProgress = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-mono">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col text-zinc-100">
          {/* Drawer Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-black text-white text-sm">HARVEST BASKET</h3>
                <p className="text-[10px] text-zinc-400 font-sans">
                  {cart.length} {cart.length === 1 ? 'batch' : 'batches'} staged for cut
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          {fulfillment.type === 'delivery' && (
            <div className="p-3.5 bg-zinc-900/60 border-b border-zinc-800 text-xs">
              <div className="flex items-center justify-between text-zinc-300 font-bold mb-1.5 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  {isFreeDeliveryQualified
                    ? '🎉 FREE ZERO-EMISSION DELIVERY UNLOCKED'
                    : `ADD $${remainingForFreeDelivery.toFixed(2)} FOR FREE CARGO BIKE DELIVERY`}
                </span>
                <span className="text-emerald-400 text-[10px]">
                  {Math.round(deliveryProgress)}%
                </span>
              </div>
              <div className="w-full bg-zinc-850 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300 shadow-sm shadow-emerald-500/50"
                  style={{ width: `${deliveryProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 space-y-4 py-16">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-zinc-300 text-sm">BASKET IS CURRENTLY EMPTY</p>
                  <p className="text-xs text-zinc-500 mt-1 font-sans">
                    Select a weekly harvest box or a-la-carte crops to initiate your order.
                  </p>
                </div>
                <a
                  href="#csa-boxes"
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-black text-xs hover:bg-emerald-400 transition-colors uppercase"
                >
                  EXPLORE CSA HARVEST BOXES
                </a>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartId}
                  className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex gap-3.5"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-white text-xs leading-tight">
                        {item.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                        title="Remove crop"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* CSA Frequency Badge */}
                    {item.type === 'csa' && item.frequency && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold uppercase">
                        {item.frequency === 'weekly' ? 'WEEKLY PLAN (-15%)' : item.frequency === 'bi-weekly' ? 'BI-WEEKLY (-10%)' : 'ONE-TIME DISPATCH'}
                      </span>
                    )}

                    {/* Add-ons list */}
                    {item.addOns && item.addOns.length > 0 && (
                      <div className="mt-1.5 text-[10px] text-zinc-400">
                        <span className="text-zinc-500">EXTRAS: </span>
                        {item.addOns.map((a) => a.name).join(', ')}
                      </div>
                    )}

                    {/* Price & Quantity Controls */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm font-black text-emerald-400">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>

                      <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-800 bg-zinc-950 space-y-4">
              <div className="space-y-1.5 text-xs text-zinc-400 font-mono">
                <div className="flex justify-between">
                  <span>PRODUCE SUBTOTAL</span>
                  <span className="font-bold text-white">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    LOGISTICS ({fulfillment.type === 'delivery' ? 'CARGO FLEET' : 'HUB PICKUP'})
                  </span>
                  <span className="font-bold text-white">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-black">FREE ($0.00)</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-zinc-800">
                  <span>TOTAL ESTIMATE</span>
                  <span className="text-base text-emerald-400">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all uppercase"
              >
                <span>PROCEED TO DISPATCH CHECKOUT</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
