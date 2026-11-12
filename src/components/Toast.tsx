'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300 font-mono">
      <div className="bg-zinc-950 text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500/80 flex items-center gap-3 text-xs font-bold glow-emerald-sm">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="text-zinc-200">{toast}</span>
      </div>
    </div>
  );
}
