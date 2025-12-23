import React, { useState, useEffect } from 'react';
import { Server, Zap } from 'lucide-react';

export const BackendStatus: React.FC = () => {
  const [status, setStatus] = useState<any>({ vercel: null, railway: null });

  useEffect(() => {
    checkBackends();
    const interval = setInterval(checkBackends, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkBackends = async () => {
    try {
      const [vercel, railway] = await Promise.all([
        fetch('https://tkghd-api-azure.vercel.app/api/health').then(r => r.json()).catch(() => null),
        fetch('https://hopeful-liberation-production-9d00.up.railway.app/api/zengin/status').then(r => r.json()).catch(() => null)
      ]);
      setStatus({ vercel, railway });
    } catch (err) {
      console.error('Backend check error:', err);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 bg-slate-900/95 backdrop-blur-xl rounded-xl p-4 border border-slate-700 shadow-xl">
      <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
        <Server size={16} />
        Backends
      </h4>
      
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status.vercel ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className="text-slate-300">Vercel</span>
          <span className="text-slate-500 ml-auto">{status.vercel?.status || 'Offline'}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status.railway ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className="text-slate-300">Railway</span>
          <span className="text-slate-500 ml-auto">{status.railway?.online ? 'Online' : 'Offline'}</span>
        </div>
      </div>

      {status.railway?.supportedBanks && (
        <div className="mt-3 pt-3 border-t border-slate-700">
          <p className="text-xs text-slate-400">
            全銀: {status.railway.supportedBanks}行対応
          </p>
        </div>
      )}
    </div>
  );
};
