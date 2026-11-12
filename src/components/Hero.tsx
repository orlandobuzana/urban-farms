'use client';

import React from 'react';
import { ArrowRight, Leaf, Droplets, CheckCircle2, Sparkles, Shield, Clock, Cpu, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#090a0b] text-white pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-zinc-800/80">
      {/* High-tech LED ambient glows */}
      <div className="absolute -top-36 left-1/3 w-[650px] h-[450px] bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-fuchsia-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-xs font-mono tracking-wider shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>FACILITY #01 • CLOSED-LOOP VERTICAL CEA</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.05]">
              Hyper-Local Produce.{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                Engineered for Peak Nutrients.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Zero agricultural runoff. Zero chemical pesticides. Grown inside computer-controlled LED vertical chambers right inside your city, harvested within hours of your delivery.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#csa-boxes"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm tracking-wide uppercase transition-all shadow-xl shadow-emerald-500/25 active:scale-98 font-mono"
              >
                <span>Deploy Weekly Harvest Box</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </a>
              <a
                href="#farm-market"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 font-bold text-sm tracking-wide uppercase transition-colors font-mono"
              >
                <span>A-La-Carte Crops</span>
              </a>
            </div>

            {/* Telemetry Chips */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-zinc-400 max-w-2xl mx-auto lg:mx-0">
              <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl">
                <span className="text-[10px] text-zinc-500 block uppercase">Pesticides</span>
                <span className="text-emerald-400 font-bold text-sm">0.00 ppm</span>
              </div>
              <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl">
                <span className="text-[10px] text-zinc-500 block uppercase">Water Recycled</span>
                <span className="text-emerald-400 font-bold text-sm">98.4%</span>
              </div>
              <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl">
                <span className="text-[10px] text-zinc-500 block uppercase">Food Radius</span>
                <span className="text-emerald-400 font-bold text-sm">1.4 Miles</span>
              </div>
              <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl">
                <span className="text-[10px] text-zinc-500 block uppercase">Harvest Window</span>
                <span className="text-emerald-400 font-bold text-sm">&lt; 24 Hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Box Preview Card with HUD Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-zinc-900/90 p-3 shadow-2xl shadow-emerald-950/70">
                {/* Tech corner markings */}
                <div className="absolute top-2 left-2 text-[9px] font-mono text-emerald-500/60 uppercase">
                  SYS:CAM_01 // HARVEST_BAY
                </div>
                <div className="absolute top-2 right-2 text-[9px] font-mono text-emerald-500/60 uppercase">
                  REC: 24FPS 4K
                </div>

                {/* Product Image */}
                <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden mt-3">
                  <img
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=85"
                    alt="High Tech Vertical Farm Produce"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                  {/* Top Status */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-emerald-500 text-zinc-950 font-black text-[10px] px-2.5 py-1 rounded font-mono uppercase tracking-wider">
                      PRIMARY HARVEST BOX
                    </span>
                    <span className="bg-zinc-950/90 text-zinc-300 font-mono text-[10px] px-2 py-0.5 rounded border border-zinc-700">
                      BATCH: #V-8942
                    </span>
                  </div>

                  {/* Floating Box Info */}
                  <div className="absolute bottom-3 left-3 right-3 p-4 rounded-xl bg-zinc-950/90 border border-zinc-800 text-white space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-black text-sm text-white font-mono">
                          CITY HARVEST FAMILY BOX
                        </h4>
                        <p className="text-[11px] text-zinc-400 font-mono">
                          7–8.5 LBS • AEROPONIC & HYDROPONIC
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-emerald-400 font-mono font-bold block">
                          WEEKLY CADENCE
                        </span>
                        <div className="flex items-baseline gap-1.5 font-mono">
                          <span className="text-lg font-black text-emerald-400">$40.80</span>
                          <span className="text-xs text-zinc-500 line-through">$48.00</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1 border-t border-zinc-800/80 font-mono text-[10px]">
                      <span className="bg-zinc-900 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                        + Living Butterhead Lettuce
                      </span>
                      <span className="bg-zinc-900 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                        + Vine Cherry Tomatoes
                      </span>
                      <span className="bg-zinc-900 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                        + Blue Oyster Fungi
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
