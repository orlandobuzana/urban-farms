'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Calendar,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  SkipForward,
  Sprout,
  ShieldCheck,
  RefreshCw,
  Cpu
} from 'lucide-react';

export default function SubscriptionPortalModal() {
  const {
    isSubscriptionPortalOpen,
    setIsSubscriptionPortalOpen,
    subscriptions,
    updateSubscriptionStatus,
    updateSubscriptionCadence
  } = useStore();

  if (!isSubscriptionPortalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-mono">
      <div className="bg-zinc-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-zinc-700 text-zinc-100">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                SUBSCRIBER TERMINAL // CADENCE CONTROL
              </span>
              <h3 className="font-black text-white text-base">MY HARVEST PORTAL</h3>
            </div>
          </div>
          <button
            onClick={() => setIsSubscriptionPortalOpen(false)}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-zinc-300">
          {subscriptions.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 space-y-3 font-mono">
              <Sprout className="w-10 h-10 text-zinc-600 mx-auto" />
              <p className="font-bold text-white text-sm">NO ACTIVE HARVEST SUBSCRIPTIONS FOUND</p>
              <p className="text-xs text-zinc-400 font-sans">
                Subscribe to a weekly or bi-weekly CSA box to manage recurring farm deliveries here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {subscriptions.map((sub) => {
                const isActive = sub.status === 'active';
                const isSkipped = sub.status === 'skipped_next';
                const isPaused = sub.status === 'paused';

                return (
                  <div
                    key={sub.id}
                    className="p-5 rounded-3xl border border-zinc-800 bg-zinc-950 space-y-4 shadow-sm"
                  >
                    {/* Top Row: Title & Status Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-850 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-base">{sub.boxTitle}</h4>
                          <span
                            className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                              isActive
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                                : isSkipped
                                ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                                : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                            }`}
                          >
                            {sub.status === 'active'
                              ? 'ACTIVE // SCHEDULED'
                              : sub.status === 'skipped_next'
                              ? 'NEXT DELIVERY SKIPPED'
                              : 'PAUSED'}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5 font-sans">
                          Fulfillment Target: {sub.addressOrHub}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-black text-emerald-400">
                          ${sub.pricePerCycle.toFixed(2)}
                        </span>
                        <span className="text-xs text-zinc-500 block">/ cycle</span>
                      </div>
                    </div>

                    {/* Next Harvest Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                        <span className="text-zinc-500 block font-bold text-[9px] uppercase">
                          Next Scheduled Cut:
                        </span>
                        <span className="font-bold text-white mt-0.5 block">
                          {isPaused ? 'PAUSED (STANDBY)' : sub.nextHarvestDate}
                        </span>
                      </div>

                      <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between">
                        <div>
                          <span className="text-zinc-500 block font-bold text-[9px] uppercase">
                            Harvest Cadence:
                          </span>
                          <span className="font-bold text-white uppercase">
                            {sub.frequency} ({sub.frequency === 'weekly' ? '-15%' : '-10%'})
                          </span>
                        </div>

                        {/* Frequency Switcher Button */}
                        <button
                          onClick={() =>
                            updateSubscriptionCadence(
                              sub.id,
                              sub.frequency === 'weekly' ? 'bi-weekly' : 'weekly'
                            )
                          }
                          className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] font-bold flex items-center gap-1 transition-colors"
                        >
                          <RefreshCw className="w-3 h-3 text-emerald-400" />
                          <span>{sub.frequency === 'weekly' ? 'TO BI-WEEKLY' : 'TO WEEKLY'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Included Items */}
                    {sub.items.length > 0 && (
                      <div className="space-y-1">
                        <span className="font-bold text-zinc-500 text-[9px] uppercase tracking-wider block">
                          Scheduled Produce Inclusions:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {sub.items.map((item, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded text-zinc-300 text-[10px]"
                            >
                              🌱 {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-zinc-850">
                      {isActive && (
                        <button
                          onClick={() => updateSubscriptionStatus(sub.id, 'skipped_next')}
                          className="px-3 py-1.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <SkipForward className="w-3.5 h-3.5" />
                          <span>SKIP NEXT HARVEST</span>
                        </button>
                      )}

                      {isSkipped && (
                        <button
                          onClick={() => updateSubscriptionStatus(sub.id, 'active')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>RESUME SCHEDULED CUT</span>
                        </button>
                      )}

                      {isActive ? (
                        <button
                          onClick={() => updateSubscriptionStatus(sub.id, 'paused')}
                          className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <PauseCircle className="w-3.5 h-3.5" />
                          <span>PAUSE SUBSCRIPTION</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => updateSubscriptionStatus(sub.id, 'active')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>ACTIVATE SUBSCRIPTION</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between text-xs text-zinc-400">
          <span className="flex items-center gap-1.5 text-[10px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ZERO LOCK-IN CONTRACTS • CANCEL OR EDIT ON DEMAND</span>
          </span>
          <button
            onClick={() => setIsSubscriptionPortalOpen(false)}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition-colors uppercase text-xs"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
}
