'use client';

import React from 'react';
import { Droplets, Navigation, ShieldCheck, Recycle, Sparkles, Activity } from 'lucide-react';

export default function ImpactTracker() {
  const stats = [
    {
      icon: Droplets,
      value: '98.4%',
      label: 'Closed-Loop Water Recycling',
      description: 'Controlled humidity condensing recaptures transpiration, reducing water use by up to 98% compared to traditional field farming.'
    },
    {
      icon: Navigation,
      value: '1.4 mi',
      label: 'Average Food Distribution Radius',
      description: 'Conventional produce travels 1,500+ miles across supply chains. Verdant produce travels across city blocks.'
    },
    {
      icon: ShieldCheck,
      value: '0.00 ppm',
      label: 'Synthetic Pesticides or Herbicides',
      description: 'Zero chemical sprays, zero runoff, and completely clean to enjoy without aggressive chemical washing.'
    },
    {
      icon: Recycle,
      value: '100%',
      label: 'Upcycled Organic Substrates',
      description: 'We repurpose local urban coffee grounds and hardwood shavings to cultivate nutrient-rich oyster mushrooms.'
    }
  ];

  return (
    <section id="sustainability" className="py-24 bg-[#090a0b] text-zinc-100 border-b border-zinc-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 font-mono">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>EFFICIENCY METRICS // AUDITED TELEMETRY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
            Resource Efficiency at Scale
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm font-sans max-w-xl mx-auto">
            By shifting cultivation into clean, sealed urban vertical towers, we eliminate climate risks, long-distance diesel freight, and pesticide runoff entirely.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight text-emerald-400">
                    {s.value}
                  </div>
                  <div className="text-xs font-bold text-white mt-1 uppercase tracking-wider">
                    {s.label}
                  </div>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Promise Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-emerald-950/40 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8 font-mono">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
              HARVEST SPECIFICATION
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
              Harvested at 06:00. On your table by dinner.
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Supermarket greens degrade over 40% of their vitamin C within 4 days of refrigerated transit. Verdant produce retains living enzymatic density, flavor, and crunch.
            </p>
          </div>

          <a
            href="#csa-boxes"
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all shrink-0 shadow-lg shadow-emerald-500/20 font-mono"
          >
            CONFIGURE CSA PLAN
          </a>
        </div>
      </div>
    </section>
  );
}
