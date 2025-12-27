import React, { useState, useEffect } from 'react';
import { fetchStatus } from '../api';
import { TrendingUp, Globe } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState({ mcap: '---', vault: '---', entities: {} });

  useEffect(() => {
    const sync = async () => {
      try {
        const d = await fetchStatus();
        setData(d);
      } catch (e) {}
    };
    sync();
    const timer = setInterval(sync, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-quantum-dark via-black to-quantum-dark p-8 rounded-3xl border border-quantum-gold/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-quantum-gold/5 to-quantum-neon/5 animate-pulse"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-quantum-gold text-xs tracking-widest uppercase mb-4">
            <Globe className="w-4 h-4" />
            Imperial Net Worth
          </div>
          <div className="text-6xl font-black text-quantum-gold drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]">
            {data.mcap}
          </div>
          <div className="mt-4 flex items-center gap-2 text-quantum-neon text-sm font-mono">
            <div className="w-2 h-2 bg-quantum-neon rounded-full animate-pulse"></div>
            QUANTUM SYNC: 0.1s ACTIVE
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-black/50 p-6 rounded-2xl border border-white/10">
          <TrendingUp className="text-emerald-400 mb-4" />
          <div className="text-2xl font-bold text-white">{data.entities.total || 532}</div>
          <div className="text-xs text-white/60 mt-1">Global Entities</div>
        </div>
        <div className="bg-black/50 p-6 rounded-2xl border border-white/10">
          <div className="text-2xl font-bold text-quantum-gold">{data.vault}</div>
          <div className="text-xs text-white/60 mt-1">Personal Vault</div>
        </div>
      </div>
    </div>
  );
}
