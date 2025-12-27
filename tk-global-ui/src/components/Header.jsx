import React from 'react';
import { Shield, Lock, Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-12 pb-6 border-b border-white/10">
      <div>
        <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-quantum-gold to-quantum-neon bg-clip-text text-transparent">
          TKG GLOBAL
        </h1>
        <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">
          Owner: 1190212 | Quantum Sovereignty Terminal
        </p>
      </div>
      <div className="flex gap-4">
        <Shield className="text-emerald-500 w-5 h-5" />
        <Zap className="text-quantum-gold w-5 h-5 animate-pulse" />
        <Lock className="text-quantum-neon w-5 h-5" />
      </div>
    </header>
  );
}
