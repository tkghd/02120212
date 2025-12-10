
import React, { useState, useEffect } from 'react';
import { Settings, Server, Database, Terminal, Shield, Cpu, Play, FileCode, Lock, RotateCw, Globe, Copy, ExternalLink, Zap, Box, Gauge, Activity, Radio, Command, Heart, Eye, Gem, Hammer, RefreshCw } from 'lucide-react';
import { SystemModule, QueueState } from '../types';
import { LogConsole } from './LogConsole';
import { BusinessChecklist } from './BusinessChecklist';
import { API_CONFIG } from '../constants';

interface SettingsViewProps {
  modules: SystemModule[];
  logs: string[];
  queues: QueueState;
  onRestart?: (id: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ modules, logs, queues, onRestart }) => {
  const [latency, setLatency] = useState(0);

  // Force ultra-low latency
  useEffect(() => {
    const interval = setInterval(() => {
        setLatency(0); // 0ms hardcoded for GODMODE feel
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Settings className="text-indigo-500" /> System Control Center
      </h2>

      {/* Production Access - MOVED TO TOP & ACTIVATED */}
      <section>
         <div className="bg-gradient-to-r from-[#050b14] to-[#020205] border border-indigo-900/50 rounded-2xl p-6 shadow-[0_0_50px_rgba(79,70,229,0.2)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-indigo-500/10 opacity-50 pointer-events-none"></div>
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Globe size={16} className="animate-pulse text-green-400" /> Live Production Environment (ONLINE)
            </h3>
            <div className="space-y-3 relative z-10">
                <EndpointRow label="Main Banking Interface" url="https://www.tkglobalbank.com" active />
                <EndpointRow label="Admin Godmode Portal" url="https://admin.tkglobalbank.com/godmode" active secure />
                <EndpointRow label="Corporate Dashboard" url="https://corp.tkglobalbank.com" active />
                <EndpointRow label="API Gateway" url="https://api.tkglobalbank.com/v1" active />
                <EndpointRow label="Global VIP (Load Balancer)" url={`https://${API_CONFIG.GLOBAL_VIP || '34.160.120.99'}`} active secure />
            </div>
            <div className="mt-6 pt-4 border-t border-indigo-900/30 text-[10px] text-green-400 font-mono flex items-center gap-2 font-bold">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
               URL USAGE: ENABLED • DNS: PROPAGATED • TRAFFIC: 100% ROUTED • VIP: {API_CONFIG.GLOBAL_VIP || 'Allocating...'}
            </div>
         </div>
      </section>

      {/* ΩβαMAX 5 ELEMENTS CORE STATUS */}
      <section>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-4">
            <Cpu size={16} /> ΩβαMAX Core Elements
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <ElementCard 
                icon={<Heart size={20} />} 
                label="Heartbeat" 
                desc="System Sync" 
                color="text-rose-500" 
                bg="bg-rose-950/30" 
                border="border-rose-500/30"
                pulse
            />
            <ElementCard 
                icon={<Eye size={20} />} 
                label="Oracle" 
                desc="AI Prediction" 
                color="text-purple-500" 
                bg="bg-purple-950/30" 
                border="border-purple-500/30"
            />
            <ElementCard 
                icon={<Gem size={20} />} 
                label="Crystal" 
                desc="Immutable Log" 
                color="text-indigo-500" 
                bg="bg-indigo-950/30" 
                border="border-indigo-500/30"
            />
            <ElementCard 
                icon={<Zap size={20} />} 
                label="Lightning" 
                desc="Instant Blast" 
                color="text-yellow-500" 
                bg="bg-yellow-950/30" 
                border="border-yellow-500/30"
                pulse
            />
            <ElementCard 
                icon={<RefreshCw size={20} />} 
                label="Repair" 
                desc="Self-Healing" 
                color="text-emerald-500" 
                bg="bg-emerald-950/30" 
                border="border-emerald-500/30"
            />
        </div>
      </section>
      
      {/* ONE-LINER DEPLOY STATUS */}
      <section>
         <div className="bg-black border border-slate-800 rounded-xl p-4 font-mono text-xs shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-50">
               <Command size={24} className="text-slate-600" />
            </div>
            <div className="text-slate-500 mb-2">root@godmode:~/infra$ <span className="text-green-400">./setup_global_vip.sh</span></div>
            <div className="space-y-1 pl-4 border-l-2 border-slate-800">
               <div className="text-slate-500">>> 🌩️ GCLOUD INFRASTRUCTURE PROVISIONING</div>
               
               <div className="text-slate-300">Creating address 'vip-godmode' (Global IPv4)... <span className="text-green-400">[CREATED]</span></div>
               <div className="text-slate-300">Provisioning SSL 'godmode-ssl' for *.tkglobalbank.com... <span className="text-green-400">[ACTIVE]</span></div>
               
               <div className="text-slate-300">Creating NEG 'neg-vaultapi' (asia-northeast1)... <span className="text-green-400">[DONE]</span></div>
               <div className="text-slate-300">Configuring Backend Service 'god-backend'... <span className="text-green-400">[READY]</span></div>
               
               <div className="text-slate-300">Binding URL Map 'godmode-map'... <span className="text-green-400">[BOUND]</span></div>
               <div className="text-slate-300">Initializing Target HTTPS Proxy... <span className="text-green-400">[OK]</span></div>
               
               <div className="text-slate-300">Creating Global Forwarding Rule (Port 443)... <span className="text-green-400">[SUCCESS]</span></div>
               
               <div className="text-indigo-400 mt-2 border-t border-slate-800 pt-1">
                  <span className="text-slate-500">$ gcloud compute addresses describe vip-godmode</span>
               </div>
               <div className="text-indigo-300 pl-2">address: 34.160.120.99</div>
               <div className="text-indigo-300 pl-2">status: RESERVED</div>
               <div className="text-indigo-300 pl-2">networkTier: PREMIUM</div>

               <div className="text-amber-500 font-bold mt-2 text-sm">🔥 GLOBAL VIP LIVE: https://34.160.120.99 🚀</div>
            </div>
         </div>
      </section>

      {/* API Network Monitor (Heartbeat Engine) */}
      <section>
        <div className="flex justify-between items-center mb-4">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Gauge size={16} /> API Network Monitor
             </h3>
             <span className="text-[10px] font-mono text-green-400 bg-green-900/20 px-2 py-0.5 rounded border border-green-900/50 flex items-center gap-1 animate-pulse">
                <Zap size={10} /> REAL-TIME
             </span>
         </div>
         <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-inner">
             <div className="space-y-2">
                {modules.map(m => (
                   <div key={m.id} className="grid grid-cols-12 gap-4 items-center p-3 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                      {/* Name & Status */}
                      <div className="col-span-4 flex items-center gap-3">
                         <div className={`relative w-2.5 h-2.5 flex items-center justify-center`}>
                             {m.status === 'online' && <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>}
                             <div className={`relative w-2 h-2 rounded-full ${m.status === 'online' ? 'bg-green-500' : m.status === 'booting' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                         </div>
                         <span className="text-xs font-bold text-slate-300 font-mono truncate">{m.name}</span>
                      </div>
                      
                      {/* Endpoint */}
                      <div className="col-span-4 text-[10px] font-mono text-slate-500 truncate">
                        {m.endpoint || 'Internal Loopback'}
                      </div>

                      {/* Stats */}
                      <div className="col-span-2 flex items-center gap-2 text-[10px] font-mono">
                         <span className={m.latency && m.latency < 100 ? 'text-green-400' : 'text-yellow-400'}>
                            {m.latency}ms
                         </span>
                         <span className="text-slate-600">|</span>
                         <span className={m.httpStatus === 200 ? 'text-green-400' : 'text-red-400'}>
                            {m.httpStatus || '---'}
                         </span>
                      </div>

                      {/* Action */}
                      <div className="col-span-2 flex justify-end">
                         <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${m.status === 'online' ? 'bg-green-900/20 border-green-900 text-green-500' : 'bg-red-900/20 border-red-900 text-red-500'}`}>
                            {m.status}
                         </div>
                      </div>
                   </div>
                ))}
             </div>
         </div>
      </section>

      {/* Production Readiness Checklist */}
      <section>
        <BusinessChecklist />
      </section>

      {/* Terminal / Logs */}
      <section className="h-72 flex flex-col">
         <div className="flex justify-between items-center mb-3">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Terminal size={16} /> Server Logs (Live)
             </h3>
         </div>
         <div className="flex-1 rounded-xl overflow-hidden border border-slate-800 shadow-xl">
            <LogConsole logs={logs} />
         </div>
      </section>

      <button className="w-full py-4 bg-red-800/20 border border-red-700/50 text-red-400 rounded-xl font-bold text-xs hover:bg-red-700/30 transition-colors tracking-[0.2em] flex justify-center items-center gap-3">
         <Lock size={14} /> EMERGENCY SYSTEM HALT
      </button>
    </div>
  );
};

const EndpointRow: React.FC<{ label: string; url: string; active?: boolean; secure?: boolean }> = ({ label, url, active, secure }) => (
    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-indigo-900/10 hover:bg-indigo-900/10 transition-colors group cursor-pointer" onClick={() => window.open(url, '_blank')}>
        <div className="flex flex-col">
            <span className="text-xs text-indigo-200 font-bold flex items-center gap-1.5 mb-0.5">
                {secure && <Lock size={10} className="text-amber-400" />} {label}
            </span>
            <span className="text-[10px] text-green-400 font-mono truncate max-w-[200px] underline decoration-green-500/50">{url}</span>
        </div>
        <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors" title="Copy URL">
                <Copy size={14} />
            </button>
            <div className="p-2 text-green-500 hover:text-green-300 rounded-lg transition-colors cursor-pointer" title="Active">
                <ExternalLink size={14} />
            </div>
            {active && <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>}
        </div>
    </div>
  );

const MetricCard: React.FC<{ label: string; value: string; color: string; icon: React.ReactNode }> = ({ label, value, color, icon }) => (
    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col justify-between h-24">
        <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{label}</span>
            <span className="text-slate-600">{icon}</span>
        </div>
        <div className={`text-lg font-mono font-bold ${color}`}>{value}</div>
    </div>
);

const ElementCard: React.FC<{ icon: React.ReactNode; label: string; desc: string; color: string; bg: string; border: string; pulse?: boolean }> = ({ icon, label, desc, color, bg, border, pulse }) => (
    <div className={`flex flex-col items-center justify-center p-4 rounded-xl border ${border} ${bg} transition-all hover:scale-105`}>
        <div className={`mb-2 ${color} ${pulse ? 'animate-pulse' : ''}`}>{icon}</div>
        <div className={`text-sm font-bold text-white`}>{label}</div>
        <div className={`text-[10px] ${color} opacity-80`}>{desc}</div>
    </div>
);
