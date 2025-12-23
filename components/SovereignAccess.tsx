import React, { useEffect, useState } from 'react';
import { Shield, Crown, Lock, Unlock } from 'lucide-react';

export const SovereignAccess: React.FC = () => {
  const [isSovereign, setIsSovereign] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('access') === 'sovereign') {
      setIsSovereign(true);
    }
  }, []);

  if (!isSovereign) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-purple-900/95 via-pink-900/95 to-red-900/95 backdrop-blur-xl border-b-2 border-yellow-500/50 shadow-2xl">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Crown className="text-yellow-400 animate-pulse" size={24} />
          <div>
            <h3 className="text-sm font-black text-yellow-400 uppercase tracking-wider">
              Sovereign Access Active
            </h3>
            <p className="text-xs text-yellow-200/80">
              Full System Control - All Modules Unlocked
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-xs text-yellow-300">
            <div>Market Cap: <span className="font-bold">$205T</span></div>
            <div>Entities: <span className="font-bold">200+</span></div>
          </div>
          <Unlock className="text-green-400" size={20} />
        </div>
      </div>
    </div>
  );
};
