import React, { useState } from 'react';
import { Landmark, Globe, CreditCard, Plus, ArrowRight, ShieldCheck, Banknote, Building2, CheckCircle2, AlertCircle, RefreshCw, Zap, Cpu, Scan, ArrowDownToLine, Settings, Smartphone, ExternalLink, Download } from 'lucide-react';
import { ActiveTab } from '../types';
import { DomesticTransferView } from './DomesticTransferView';
import { GlobalBankHUD } from './GlobalBankHUD';

type ServiceTab = 'accounts' | 'transfer_intl' | 'loans' | 'domestic';

interface BankServicesViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const BankServicesView: React.FC<BankServicesViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<ServiceTab>('accounts');
  const [loanProcessing, setLoanProcessing] = useState(false);
  const [loanApproved, setLoanApproved] = useState(false);
  const [aiAction, setAiAction] = useState<string>('');
  const [generatedAccount, setGeneratedAccount] = useState<any>(null);

  const simulateAiAction = (action: string) => {
    setAiAction(action);
    setTimeout(() => setAiAction(''), 3000);
  };

  const generateBankingDetails = (jurisdiction: string) => {
      setGeneratedAccount(null);
      setTimeout(() => {
          const randomIBAN = `LT${Math.floor(Math.random() * 99)} 7300 0${Math.floor(Math.random() * 999)} ${Math.floor(Math.random() * 9999)} ${Math.floor(Math.random() * 9999)}`;
          const randomSwift = `TKGB${jurisdiction === 'EU' ? 'LT' : jurisdiction === 'SG' ? 'SG' : 'US'}22XXX`;
          setGeneratedAccount({ iban: randomIBAN, swift: randomSwift, jurisdiction });
      }, 1000);
  };

  // Mock Data for Global Bank Acquisitions
  const acquisitionCandidates = [
    { bank: "TK Global Bank Europe", country: "Estonia", est_price_usd: 12000000 },
    { bank: "Zenith Bank SG", country: "Singapore", est_price_usd: 7800000 },
    { bank: "NovaPay UAE", country: "UAE", est_price_usd: 5400000 }
  ];

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
           <h2 className="text-3xl font-black text-white flex items-center gap-3">
             <Landmark className="text-cyan-500" size={32} />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-500">Bank Module</span>
           </h2>
           <p className="text-sm text-slate-400 font-mono mt-1 tracking-tight">GLOBAL BANKING SERVICES & CREDIT PROTOCOL</p>
        </div>
        <div className="flex gap-2 bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-sm">
            <TabButton active={activeTab === 'accounts'} onClick={() => setActiveTab('accounts')} label="Accounts" icon={<Plus size={14} />} />
            <TabButton active={activeTab === 'domestic'} onClick={() => setActiveTab('domestic')} label="Domestic" icon={<Smartphone size={14} />} />
            <TabButton active={activeTab === 'transfer_intl'} onClick={() => setActiveTab('transfer_intl')} label="Intl. Wire" icon={<Globe size={14} />} />
            <TabButton active={activeTab === 'loans'} onClick={() => setActiveTab('loans')} label="Lending" icon={<Banknote size={14} />} />
        </div>
      </div>

      {/* AI Command Nexus - LIMIT BREAK UI */}
      <div className="bg-[#05050a] border border-cyan-500/30 rounded-[2rem] p-8 relative overflow-hidden group shadow-[0_0_40px_rgba(6,182,212,0.15)]">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-purple-600 shadow-[0_0_20px_#22d3ee]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 animate-pulse"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Cpu size={18} className="animate-spin-slow" /> AI Command Nexus
              </h3>
              {aiAction ? (
                  <span className="text-xs text-green-400 font-mono font-bold animate-pulse flex items-center gap-2 bg-green-950/30 px-3 py-1 rounded-full border border-green-500/30">
                      <CheckCircle2 size={12} /> {aiAction}
                  </span>
              ) : (
                  <span className="text-[10px] text-slate-500 font-mono">READY FOR INPUT</span>
              )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
              <CommandButton 
                onClick={() => simulateAiAction('Withdrawal Protocol Initiated')}
                icon={<ArrowDownToLine size={24} />}
                label="Withdraw ALL"
                color="red"
              />
              <CommandButton 
                onClick={() => simulateAiAction('Portfolio Optimization: Complete')}
                icon={<Zap size={24} />}
                label="AI Optimize"
                color="cyan"
              />
              <CommandButton 
                onClick={() => simulateAiAction('Manual Override: Active')}
                icon={<Settings size={24} />}
                label="Custom Amount"
                color="slate"
              />
              <CommandButton 
                onClick={() => onNavigate('atm')}
                icon={<Scan size={24} />}
                label="ATM Scan"
                color="indigo"
              />
          </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[400px]">
        {activeTab === 'accounts' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Global Bank Acquisitions HUD */}
                <GlobalBankHUD list={acquisitionCandidates} />

                {/* Account Generator */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none transform rotate-12"><Globe size={150} /></div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                            <Plus size={20} />
                        </div>
                        Open New Global Account
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jurisdiction</label>
                            <select className="w-full bg-black/40 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none appearance-none hover:bg-slate-900/60">
                                <option value="EU">🇪🇺 European Union (IBAN)</option>
                                <option value="US">🇺🇸 United States (ACH/FedWire)</option>
                                <option value="SG">🇸🇬 Singapore (FAST)</option>
                                <option value="HK">🇭🇰 Hong Kong (Clearing)</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Currency</label>
                            <select className="w-full bg-black/40 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none appearance-none hover:bg-slate-900/60">
                                <option>EUR - Euro</option>
                                <option>USD - US Dollar</option>
                                <option>SGD - Singapore Dollar</option>
                                <option>HKD - HK Dollar</option>
                            </select>
                        </div>
                    </div>

                    <button 
                        onClick={() => generateBankingDetails('EU')}
                        className="w-full py-5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-3 active:scale-[0.99] transition-all"
                    >
                        <Zap size={20} className="fill-white" /> Generate IBAN / Account Number
                    </button>

                    {generatedAccount && (
                        <div className="mt-6 p-6 bg-green-950/20 border border-green-500/30 rounded-2xl animate-in zoom-in-95 duration-300">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-500/20 rounded-full text-green-400">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div className="space-y-2 flex-1">
                                    <h4 className="font-bold text-white text-lg">Account Generated Successfully</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                        <div className="bg-black/40 p-3 rounded-xl border border-green-500/20">
                                            <div className="text-[10px] text-slate-400 uppercase mb-1">IBAN</div>
                                            <div className="font-mono text-green-300 font-bold tracking-wide">{generatedAccount.iban}</div>
                                        </div>
                                        <div className="bg-black/40 p-3 rounded-xl border border-green-500/20">
                                            <div className="text-[10px] text-slate-400 uppercase mb-1">SWIFT / BIC</div>
                                            <div className="font-mono text-green-300 font-bold tracking-wide">{generatedAccount.swift}</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-2">
                                        <button className="text-xs font-bold text-green-400 flex items-center gap-1 hover:text-white transition-colors">
                                            <Download size={14} /> Download Credentials
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Active Accounts List */}
                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Your Global Accounts</h4>
                    <AccountCard region="EU" iban="LT45 7300 0099 1234 5678" currency="EUR" balance="€ 4,500,000" bank="TK Global Bank (Lithuania)" />
                    <AccountCard region="US" iban="Routing: 021000021 / Acc: 987654321" currency="USD" balance="$ 12,250,000" bank="TK Global Bank (NY Branch)" />
                    <AccountCard region="SG" iban="DBS-Link-888-999-000" currency="SGD" balance="S$ 8,888,888" bank="DBS / TK Trust" />
                </div>
            </div>
        )}

        {activeTab === 'domestic' && (
            <DomesticTransferView />
        )}

        {activeTab === 'transfer_intl' && (
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
                        <Globe size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">SWIFT / SEPA Transfer</h3>
                        <p className="text-sm text-slate-400">International Wire Protocol</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Beneficiary Details</label>
                        <input type="text" placeholder="SWIFT / BIC Code" className="w-full bg-black/40 border border-slate-700 rounded-2xl px-5 py-4 text-white font-mono focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" />
                        <input type="text" placeholder="IBAN / Account Number" className="w-full bg-black/40 border border-slate-700 rounded-2xl px-5 py-4 text-white font-mono focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" />
                        <input type="text" placeholder="Beneficiary Name" className="w-full bg-black/40 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" />
                    </div>
                    
                    <div className="pt-6 border-t border-slate-800 space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Transfer Amount</label>
                            <span className="text-xs text-indigo-400 font-mono bg-indigo-950/30 px-2 py-1 rounded border border-indigo-500/20">Fee: Waived (Godmode)</span>
                        </div>
                        <div className="relative">
                            <input type="text" placeholder="0.00" className="w-full bg-black/40 border border-slate-700 rounded-2xl px-5 py-5 text-3xl font-bold text-white text-right focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" />
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xl">$</span>
                        </div>
                    </div>

                    <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-3 active:scale-[0.99] group mt-4">
                        Initiate Wire Transfer <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        )}

        {activeTab === 'loans' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Loan AI Dashboard */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 transform rotate-3">
                                <Building2 className="text-white" size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Lending AI Core</h3>
                                <p className="text-sm text-indigo-300 font-mono">Instant Credit Protocol v3.0</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Available Credit Line</div>
                            <div className="text-3xl font-mono font-bold text-green-400 tracking-tighter shadow-green-500/20 drop-shadow-lg">¥ 500,000,000</div>
                        </div>
                    </div>

                    {!loanApproved ? (
                        <div className="space-y-6 relative z-10">
                            <div className="p-6 bg-black/40 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                                <div className="flex justify-between mb-4">
                                    <span className="text-sm text-slate-300 font-bold">Requested Amount</span>
                                    <span className="text-lg font-bold text-white font-mono">¥ 100,000,000</span>
                                </div>
                                <input type="range" className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                                <div className="flex justify-between mt-2 text-xs text-slate-500 font-mono">
                                    <span>¥1M</span>
                                    <span>¥500M</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => {
                                    setLoanProcessing(true);
                                    setTimeout(() => { setLoanProcessing(false); setLoanApproved(true); }, 2000);
                                }}
                                disabled={loanProcessing}
                                className="w-full py-5 bg-white text-indigo-950 font-black text-lg rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.99]"
                            >
                                {loanProcessing ? (
                                    <>
                                        <RefreshCw size={24} className="animate-spin" /> Analyzing Risk Vector...
                                    </>
                                ) : (
                                    <>
                                        <Zap size={24} fill="currentColor" /> Instant Approval Request
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-10 animate-in zoom-in-95 duration-500 bg-black/20 rounded-2xl border border-green-500/20 backdrop-blur-sm">
                            <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-500/50 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                                <CheckCircle2 size={48} />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Loan Approved</h3>
                            <p className="text-slate-400 text-sm mb-8 font-mono">Funds disbursed to Main Vault: <span className="text-white font-bold">TX-LOAN-9982</span></p>
                            <button onClick={() => setLoanApproved(false)} className="px-8 py-3 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-700 transition-colors">
                                Dismiss Notification
                            </button>
                        </div>
                    )}
                </div>

                {/* Active Loans */}
                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Active Credit Lines</h4>
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 flex justify-between items-center hover:border-slate-700 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                                <Banknote size={24} />
                            </div>
                            <div>
                                <div className="font-bold text-white text-lg group-hover:text-indigo-400 transition-colors">Corporate Growth Fund</div>
                                <div className="text-xs text-slate-500 font-mono mt-1">Interest: 1.2% APR (Fixed)</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-mono text-white font-bold text-lg">¥ 50,000,000</div>
                            <div className="text-xs font-bold text-green-400 bg-green-900/20 px-2 py-0.5 rounded border border-green-500/30 inline-block mt-1">ACTIVE</div>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

const CommandButton: React.FC<{ onClick: () => void; icon: React.ReactNode; label: string; color: 'red' | 'cyan' | 'slate' | 'indigo' }> = ({ onClick, icon, label, color }) => {
    const colors = {
        red: 'bg-red-900/20 border-red-500/30 text-red-400 hover:bg-red-900/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]',
        cyan: 'bg-cyan-900/20 border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]',
        slate: 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(148,163,184,0.1)]',
        indigo: 'bg-indigo-900/20 border-indigo-500/30 text-indigo-400 hover:bg-indigo-900/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]'
    };

    return (
        <button 
            onClick={onClick}
            className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 group active:scale-95 ${colors[color]}`}
        >
            <div className="transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md">
                {icon}
            </div>
            <span className="text-xs font-bold tracking-wide">{label}</span>
        </button>
    );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string; icon: React.ReactNode }> = ({ active, onClick, label, icon }) => (
    <button 
        onClick={onClick}
        className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105' : 'bg-transparent text-slate-400 hover:bg-white/5 hover:text-white'}`}
    >
        {icon} {label}
    </button>
);

const AccountCard: React.FC<{ region: string; iban: string; currency: string; balance: string; bank: string }> = ({ region, iban, currency, balance, bank }) => (
    <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex items-center justify-between hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all group cursor-pointer backdrop-blur-sm">
        <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center font-bold text-slate-400 border border-slate-700 group-hover:bg-cyan-900/20 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all shadow-md group-hover:scale-105">
                {region}
            </div>
            <div>
                <div className="font-bold text-white text-base group-hover:text-cyan-100 transition-colors">{bank}</div>
                <div className="text-xs text-slate-500 font-mono mt-1">{iban}</div>
            </div>
        </div>
        <div className="text-right">
            <div className="font-mono font-bold text-white text-lg tracking-tight">{balance}</div>
            <div className="text-[10px] text-slate-500 font-bold bg-slate-800/50 px-2 py-0.5 rounded inline-block mt-1">{currency}</div>
        </div>
    </div>
);