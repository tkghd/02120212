import React, { useState, useEffect } from 'react';

interface NodeStatus {
  zengin: number;
  swift: number;
  paypay: number;
}

export const AIStudioHUD: React.FC = () => {
  const [mode, setMode] = useState<'god' | 'sovereign'>('god');
  const [nodeStatus, setNodeStatus] = useState<NodeStatus>({ zengin: 0, swift: 0, paypay: 0 });
  const [resonance, setResonance] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodeStatus({
        zengin: 85 + Math.random() * 15,
        swift: 80 + Math.random() * 20,
        paypay: 90 + Math.random() * 10
      });
      setResonance(Math.random() * 100);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const avgResonance = (nodeStatus.zengin + nodeStatus.swift + nodeStatus.paypay) / 3;

  return (
    <div className={`fixed top-4 right-4 p-6 rounded-xl shadow-2xl transition-all duration-500 ${
      mode === 'god' 
        ? 'bg-gradient-to-br from-blue-900 to-blue-600' 
        : 'bg-gradient-to-br from-yellow-900 to-yellow-600'
    }`}>
      <div className="text-white">
        <div className="text-2xl font-bold mb-4 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${mode === 'god' ? 'bg-blue-400' : 'bg-yellow-400'} animate-pulse`} />
          {mode === 'god' ? '🔷 GOD MODE' : '👑 SOVEREIGN MODE'}
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-xs opacity-75">Node Resonance</div>
            <div className="text-3xl font-bold">{avgResonance.toFixed(1)}%</div>
          </div>

          <div className="space-y-2">
            {Object.entries(nodeStatus).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm uppercase opacity-75">{key}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        mode === 'god' ? 'bg-blue-400' : 'bg-yellow-400'
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold w-12 text-right">{value.toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setMode(mode === 'god' ? 'sovereign' : 'god')}
            className={`w-full py-3 rounded-lg font-bold transition-all ${
              mode === 'god'
                ? 'bg-yellow-500 hover:bg-yellow-600 text-yellow-900'
                : 'bg-blue-500 hover:bg-blue-600 text-blue-900'
            }`}
          >
            {mode === 'god' ? '👑 SOVEREIGN化' : '🔷 GOD化'}
          </button>
        </div>
      </div>
    </div>
  );
};
