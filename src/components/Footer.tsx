'use client';

import React from 'react';
import { Sprout, Mail, MapPin, Globe, Share2, Heart, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-zinc-950 font-bold shadow-md shadow-emerald-500/20">
                <Sprout className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-base font-black text-white font-mono">
                VERDANT<span className="text-emerald-400">.BIO</span>
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed font-sans">
              Pioneering urban vertical farming. Cultivating high-nutrient produce indoors with zero chemical pesticides and 98% water recycling efficiency.
            </p>
            <div className="flex items-center gap-3 text-zinc-400">
              <span className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:text-white cursor-pointer transition-colors" title="Global Mesh">
                <Globe className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:text-white cursor-pointer transition-colors" title="Telemetry Feed">
                <Share2 className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:text-white cursor-pointer transition-colors" title="Facility Contact">
                <Mail className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              FACILITY PLATFORM
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="#csa-boxes" className="hover:text-emerald-400 transition-colors">
                  CSA Autonomous Plans (-15%)
                </a>
              </li>
              <li>
                <a href="#farm-market" className="hover:text-emerald-400 transition-colors">
                  A-La-Carte Rack Crops
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-emerald-400 transition-colors">
                  Closed-Loop Hydroponics
                </a>
              </li>
              <li>
                <a href="#fulfillment" className="hover:text-emerald-400 transition-colors">
                  Hub Network Locations
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Farm Hubs */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              PRIMARY VERTICAL NODES
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Node 01: 420 Green St, Suite 101</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Node 02: 88 Waterway Blvd, Dock 3</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Node 03: 710 Highline Terrace (Rooftop Pod)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              HARVEST DISPATCH NOTICES
            </h4>
            <p className="text-zinc-400 text-xs font-sans">
              Subscribe for weekly crop harvest notifications and culinary recipes.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="YOUR EMAIL..."
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs transition-colors uppercase"
              >
                JOIN HARVEST CIRCLE
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[10px] text-zinc-500 gap-4">
          <p>© 2026 VERDANT URBAN FARMS, INC. ALL CEA ENVIRONMENTAL DATA VERIFIED.</p>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>OPERATING ON 100% CLEAN RENEWABLE GRID ENERGY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
