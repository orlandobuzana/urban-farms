'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sprout, ShoppingBag, MapPin, Calendar, ShieldCheck, Cpu } from 'lucide-react';

export default function Navbar() {
  const {
    cartItemCount,
    cartTotal,
    setIsCartOpen,
    fulfillment,
    setIsSubscriptionPortalOpen,
    subscriptions,
    isAdminOpen,
    setIsAdminOpen
  } = useStore();

  const activeSubCount = subscriptions.filter((s) => s.status === 'active').length;

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80 text-zinc-100 transition-all">
      {/* Top Telemetry Bar */}
      <div className="bg-zinc-900/90 border-b border-zinc-800/80 text-[11px] font-mono py-1.5 px-4 text-zinc-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              CEA HARVEST STATUS: LIVE
            </span>
            <span className="hidden md:inline text-zinc-600">|</span>
            <span className="hidden md:inline text-zinc-400">
              SPECTRUM: OPTIMIZED 450nm/660nm LED • WATER RECYCLED: 98.4%
            </span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="text-zinc-500">CYCLE:</span>
            <strong className="text-emerald-400">FRIDAY 06:00 EST</strong>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all">
              <Sprout className="w-6 h-6 text-zinc-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-mono">
                  VERDANT<span className="text-emerald-400">.BIO</span>
                </span>
                <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                  URBAN CEA
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase">
                Zero Pesticide • Autonomous Vertical Agriculture
              </p>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-zinc-400">
            <a
              href="#csa-boxes"
              className="hover:text-emerald-400 transition-colors py-1 flex items-center gap-2 group"
            >
              <span>CSA Subscriptions</span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                -15% RECURRING
              </span>
            </a>
            <a href="#farm-market" className="hover:text-emerald-400 transition-colors py-1">
              Produce Catalog
            </a>
            <a href="#fulfillment" className="hover:text-emerald-400 transition-colors py-1">
              Logistics & Hubs
            </a>
            <a href="#sustainability" className="hover:text-emerald-400 transition-colors py-1">
              Controlled Environment
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 font-mono">
            {/* Fulfillment Status Pill */}
            <a
              href="#fulfillment"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-[11px]">
                {fulfillment.type === 'delivery'
                  ? `NODE: ${fulfillment.zipCode}`
                  : 'HUB: DOWNTOWN'}
              </span>
            </a>

            {/* My Subscription Portal Button */}
            <button
              onClick={() => setIsSubscriptionPortalOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-semibold text-zinc-200 transition-all hover:border-emerald-500/40"
              title="Manage your recurring CSA harvest subscription"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline text-xs">PORTAL</span>
              {activeSubCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">BASKET</span>
              {cartItemCount > 0 && (
                <span className="bg-zinc-950 text-emerald-400 text-[10px] font-bold px-1.5 py-0.2 rounded border border-emerald-400/50">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Farm Admin Portal Toggle */}
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className="p-2 rounded-xl text-zinc-500 hover:text-emerald-400 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors"
              title="Open Vertical Farm Facility Controls"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
