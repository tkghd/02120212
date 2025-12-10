

import React from 'react';
import { Building2, TrendingUp, Globe, Activity, CheckCircle2, QrCode, ShieldCheck, Landmark, Briefcase, Wallet, Users, ArrowRight } from 'lucide-react';
import { WalletState, BusinessEntity, LicenseData } from '../types';
import { BUSINESS_PORTFOLIO, LICENSE_REGISTRY } from '../constants';

interface CorporateViewProps {
  wallet: WalletState;
}

export const CorporateView: React.FC<CorporateViewProps> = ({ wallet }) => {
  const governance = BUSINESS_PORTFOLIO.find(b => b.category === 'governance');
  const financeUnits = BUSINESS_PORTFOLIO.filter(b => b.category === 'finance');
  const businessUnits = BUSINESS_PORTFOLIO.filter(b => b.category === 'business');

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      
      {/* 1. Governance Header */}
      <div className="bg-gradient-to-r from-slate-950 to-[#050510] border-b border-cyan-900/50 pb-6">
         <div className="flex justify-between items-start">
             <div>
                <h2 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
                    <Landmark className="text-cyan-500" size={32} />
                    {governance?.name || 'TK-GLOBAL HD'}
                </h2>
                <p className="text-sm text-cyan-400 font-mono mt-2 flex items-center gap-2">
                    <ShieldCheck size={14} /> {governance?.role || '統括管理・ガバナンス'}
                </p>
             </div>
             <div className="flex flex-col items-end gap-2">
                 <span className="px-3 py-1 bg-green-950/30 border border-green-500/50 rounded-lg text-xs text-green-400 font-mono animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                    PROD_ENABLED=true
                 </span>
                 <span className="text-[10px] text-slate-500 font-mono">
                    Global Heartbeat: ONLINE
                 </span>
             </div>
         </div>
      </div>

      {/* 2. License Verification Cards */}
      <section>
          <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="text-white" size={20} />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">License Verification Registry</h3>
              <span className="ml-auto text-xs text-slate-500 font-mono">Next Renewal: 2026-12-31</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LICENSE_REGISTRY.map(license => (
                  <LicenseCard key={license.id} data={license} />
              ))}
          </div>
      </section>

      {/* 3. Entity Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
         {/* Financial / Capital Group */}
         <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
               <Wallet size={120} />
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-2 border-b border-slate-800 pb-2">
               <span className="text-xl">🏦</span> 金融・資金関連 (Finance & Capital)
            </h3>
            <div className="space-y-3 relative z-10">
               {financeUnits.map(unit => (
                   <EntityRow key={unit.id} unit={unit} icon={<Wallet size={16} className="text-emerald-500" />} />
               ))}
            </div>
         </div>

         {/* Business / Service Group */}
         <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
               <Briefcase size={120} />
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-2 border-b border-slate-800 pb-2">
               <span className="text-xl">🚀</span> 事業・サービス系 (Business & Services)
            </h3>
            <div className="space-y-3 relative z-10">
               {businessUnits.map(unit => (
                   <EntityRow key={unit.id} unit={unit} icon={<Globe size={16} className="text-blue-500" />} />
               ))}
            </div>
         </div>
      </div>

      {/* 4. Global Expansion Roadmap */}
      <div className="bg-[#05050A] border border-slate-800 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
          
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2 relative z-10">
             <TrendingUp size={16} /> Global Acquisition & Integration Roadmap
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative z-10">
              <RoadmapCard 
                  phase="Q1" 
                  title="初手参入" 
                  desc="アジア新興国 (HK/SG)" 
                  details={['デューデリジェンス完了', 'HUD登録・ブランド反映']}
                  status="done" 
              />
              <RoadmapCard 
                  phase="Q2" 
                  title="統合フェーズ" 
                  desc="銀行・決済・AI接続" 
                  details={['口座・貸付モジュール', 'リスク予測AI稼働']}
                  status="active" 
              />
              <RoadmapCard 
                  phase="Q3" 
                  title="拡張フェーズ" 
                  desc="欧州・カリブ海進出" 
                  details={['EUパスポート法人', '保険・証券ライセンス']}
                  status="pending" 
              />
              <RoadmapCard 
                  phase="Q4" 
                  title="完全統合" 
                  desc="Global Heartbeat" 
                  details={['205兆ドル市場接続', '永続運用 (pm2 save)']}
                  status="pending" 
              />
          </div>
          
          {/* Progress Bar (Visual) */}
          <div className="hidden sm:block absolute top-[100px] left-10 right-10 h-0.5 bg-slate-800 -z-0">
              <div className="h-full w-1/2 bg-gradient-to-r from-green-500 to-cyan-500"></div>
          </div>
      </div>
    </div>
  );
};

const LicenseCard: React.FC<{ data: LicenseData }> = ({ data }) => {
    // Style config based on type
    const config = {
        domestic: { color: 'border-blue-500', bg: 'bg-blue-950/20', badge: 'bg-blue-500', text: 'text-blue-400' },
        global: { color: 'border-red-500', bg: 'bg-red-950/20', badge: 'bg-red-500', text: 'text-red-400' },
        hybrid: { color: 'border-purple-500', bg: 'bg-purple-950/20', badge: 'bg-purple-500', text: 'text-purple-400' },
    }[data.type];

    return (
        <div className={`rounded-xl border ${config.color} ${config.bg} p-0 overflow-hidden relative group`}>
            {/* Header */}
            <div className={`${config.badge} px-4 py-2 flex justify-between items-center`}>
                <span className="text-white text-xs font-bold uppercase tracking-wider">{data.type.toUpperCase()} LICENSE</span>
                <ShieldCheck size={14} className="text-white" />
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                <div>
                    <div className="text-[10px] text-slate-500 uppercase">Registered Entity</div>
                    <div className="text-lg font-bold text-white leading-tight">{data.name}</div>
                </div>

                {/* Licenses Grid */}
                <div className="grid grid-cols-2 gap-2">
                    <LicenseCheck label="Bank" checked={data.licenses.bank} />
                    <LicenseCheck label="Securities" checked={data.licenses.securities} />
                    <LicenseCheck label="Crypto" checked={data.licenses.crypto} />
                    <LicenseCheck label="Insurance" checked={data.licenses.insurance} />
                </div>

                {/* QR & Hash */}
                <div className="flex gap-4 items-center bg-black/40 p-3 rounded-lg border border-white/5">
                    <div className="bg-white p-1 rounded">
                       <QrCode size={40} className="text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[9px] text-slate-500 font-mono mb-1">Signature Hash (SHA256)</div>
                        <div className={`text-[10px] font-mono truncate ${config.text} opacity-80`}>{data.hash}</div>
                        <div className="text-[9px] text-green-500 mt-1 flex items-center gap-1">
                            <CheckCircle2 size={8} /> Verified
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="pt-2 border-t border-white/10 flex justify-between items-end">
                    <div>
                        <div className="text-[9px] text-slate-500">Audit Log</div>
                        <div className="text-[10px] text-slate-300 font-mono">{data.auditStatus}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[9px] text-slate-500">Valid Until</div>
                        <div className="text-xs font-bold text-white">{data.expiry}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LicenseCheck: React.FC<{ label: string, checked: boolean }> = ({ label, checked }) => (
    <div className="flex items-center gap-1.5">
        <div className={`w-3 h-3 rounded-full flex items-center justify-center ${checked ? 'bg-green-500' : 'bg-slate-700'}`}>
            {checked && <CheckCircle2 size={10} className="text-black" />}
        </div>
        <span className="text-xs text-slate-300">{label}</span>
    </div>
);

const EntityRow: React.FC<{ unit: BusinessEntity, icon: React.ReactNode }> = ({ unit, icon }) => (
   <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-slate-600 transition-colors group">
      <div className="flex items-center gap-3">
         <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
            {icon}
         </div>
         <div className="flex flex-col">
            <span className="font-bold text-slate-200 text-sm">{unit.name}</span>
            <span className="text-[10px] text-slate-500">{unit.role}</span>
         </div>
      </div>
      <div className="text-right">
         <div className="font-mono text-cyan-400 font-bold text-sm">{unit.revenue}</div>
         <span className={`text-[9px] px-1.5 py-0.5 rounded border ${unit.status === 'active' ? 'bg-green-950/30 border-green-900 text-green-500' : 'bg-yellow-950/30 border-yellow-900 text-yellow-500'}`}>
            {unit.status.toUpperCase()}
         </span>
      </div>
   </div>
);

const RoadmapCard: React.FC<{ phase: string; title: string; desc: string; details: string[]; status: 'done' | 'active' | 'pending' }> = ({ phase, title, desc, details, status }) => {
    const statusColor = status === 'done' ? 'bg-green-500 shadow-green-500/50' : status === 'active' ? 'bg-cyan-500 shadow-cyan-500/50' : 'bg-slate-700';
    const textColor = status === 'done' ? 'text-green-400' : status === 'active' ? 'text-cyan-400' : 'text-slate-500';
    const borderColor = status === 'active' ? 'border-cyan-500/50' : 'border-slate-800';
    
    return (
        <div className={`bg-slate-900/80 border ${borderColor} p-5 rounded-2xl flex flex-col gap-3 relative z-10 transition-transform hover:-translate-y-1`}>
            {/* Phase Badge */}
            <div className="flex justify-between items-start">
                <span className={`text-xs font-black px-2 py-1 rounded bg-black/30 border border-white/5 ${textColor}`}>{phase}</span>
                <div className={`w-2.5 h-2.5 rounded-full ${statusColor} shadow-lg ${status === 'active' ? 'animate-pulse' : ''}`}></div>
            </div>
            
            {/* Content */}
            <div>
                <div className="font-bold text-white text-base mb-1">{title}</div>
                <div className="text-xs text-slate-400">{desc}</div>
            </div>

            {/* Details List */}
            <ul className="mt-2 space-y-1.5">
                {details.map((d, i) => (
                    <li key={i} className="text-[10px] text-slate-500 flex items-center gap-1.5">
                        <div className={`w-1 h-1 rounded-full ${status === 'pending' ? 'bg-slate-600' : 'bg-slate-400'}`}></div>
                        {d}
                    </li>
                ))}
            </ul>
        </div>
    );
};