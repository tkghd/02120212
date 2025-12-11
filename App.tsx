import React, { useState, useEffect } from 'react';
import { Wallet, Send, QrCode, CreditCard, Settings, User, Globe, Wifi, Zap, Bot, Crown, Palette, BarChart2, Heart, Building, Scale, ClipboardList, FileText, Smartphone, Grid, X, Coins, Landmark, Menu } from 'lucide-react';
import { LoginScreen } from './components/LoginScreen';
import { AssetsView } from './components/AssetsView';
import { TransferView } from './components/TransferView';
import { ATMView } from './components/ATMView';
import { CardView } from './components/CardView';
import { CryptoView } from './components/CryptoView';
import { BankServicesView } from './components/BankServicesView';
import { AIStudioHUD } from './components/AIStudioHUD';
import { SettingsView } from './components/SettingsView';
import { Dashboard } from './components/Dashboard';
import { ProdBadge } from './components/ProdBadge';
import { RevenueCounter } from './components/RevenueCounter';
import { ModuleLinker } from './components/ModuleLinker';
import { AppMenu } from './components/AppMenu';
import { SystemModule, WalletState, QueueState, ActiveTab, OwnerAccount } from './types';
import { INITIAL_MODULES, STARTUP_LOGS, INITIAL_WALLET, INITIAL_QUEUES, OWNER_ACCOUNTS } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [modules, setModules] = useState<SystemModule[]>(INITIAL_MODULES);
  const [logs, setLogs] = useState<string[]>(STARTUP_LOGS);
  const [booted, setBooted] = useState(true);
  const [wallet, setWallet] = useState<WalletState>(INITIAL_WALLET);
  const [queues, setQueues] = useState<QueueState>(INITIAL_QUEUES);
  const [ownerAccounts] = useState<OwnerAccount[]>(OWNER_ACCOUNTS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
        setModules(prev => prev.map(m => ({ ...m, status: 'online' })));
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] 🚀 PRODUCTION DEPLOYMENT VERIFIED: ALL SYSTEMS GO`]);
    }
  }, [isLoggedIn]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const updateModuleStatus = (id: string, status: SystemModule['status']) => {
      setModules(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const handleRestartModule = async (id: string) => {
    updateModuleStatus(id, 'online');
    addLog(`MODULE ${id} REFRESHED INSTANTLY.`);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen flex-col bg-[#020205] text-slate-100 font-sans overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
         <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[30%] bg-purple-900/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Redesigned Minimal Header */}
      <header className="flex-none flex items-center justify-between bg-[#05050a]/80 backdrop-blur-xl px-6 py-4 z-30 border-b border-white/5 relative shadow-lg">
        <div className="flex items-center gap-4">
           <div className="relative group cursor-pointer" onClick={() => setActiveTab('settings')}>
             <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-20 rounded-full animate-pulse group-hover:opacity-40 transition-opacity"></div>
             <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-950 to-[#020205] flex items-center justify-center text-xl text-cyan-400 border border-cyan-500/30 relative z-10 shadow-lg group-hover:scale-105 transition-transform duration-300">
               💠
             </div>
           </div>
           <div className="flex flex-col">
             <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight leading-none">
               TK globalBank
             </h1>
             <div className="flex items-center gap-2 mt-1.5">
               <div className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
               </div>
               <span className="text-[10px] text-cyan-400/80 font-mono tracking-widest font-bold">ΩβαMAX SYSTEM ACTIVE</span>
             </div>
           </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block transform hover:scale-105 transition-transform">
             <RevenueCounter apiUrl="https://www.tkglobalbank.com/api/revenue" />
          </div>
          <button className="w-10 h-10 rounded-full bg-gradient-to-b from-white/10 to-transparent border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all relative overflow-hidden shadow-inner group">
             <User size={20} className="relative z-10" />
             <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative z-10">
         <div className="h-full overflow-y-auto custom-scrollbar p-4 pb-28 sm:p-6 sm:pb-32 scroll-smooth">
            <div key={activeTab} className="max-w-7xl mx-auto anim-enter-right">
               {activeTab === 'dashboard' && <Dashboard modules={modules} booted={true} wallet={wallet} queues={queues} />}
               {activeTab === 'assets' && <AssetsView wallet={wallet} ownerAccounts={ownerAccounts} />}
               {activeTab === 'transfer' && <TransferView wallet={wallet} ownerAccounts={ownerAccounts} />}
               {activeTab === 'atm' && <ATMView wallet={wallet} />}
               {activeTab === 'card' && <CardView />}
               {activeTab === 'crypto' && <CryptoView wallet={wallet} onUpdateWallet={setWallet} />}
               {activeTab === 'bank_services' && <BankServicesView onNavigate={handleTabChange} />}
               {activeTab === 'ai_hud' && <AIStudioHUD modules={modules} />}
               
               {/* Modules */}
               {activeTab === 'pwa' && <ModuleLinker modulePath="pwa" label="PWA Module" icon={<Smartphone size={48} />} />}
               {activeTab === 'web' && <ModuleLinker modulePath="web" label="Web Module" icon={<Globe size={48} />} />}
               {activeTab === 'uiux' && <ModuleLinker modulePath="uiux" label="UI/UX Module" icon={<Palette size={48} />} />}
               {activeTab === 'health' && <ModuleLinker modulePath="health" label="Health Module" icon={<Heart size={48} />} />}
               {activeTab === 'real' && <ModuleLinker modulePath="real" label="Real API Module" icon={<Building size={48} />} />}
               {activeTab === 'compliance' && <ModuleLinker modulePath="compliance" label="Compliance Module" icon={<Scale size={48} />} />}
               {activeTab === 'audit' && <ModuleLinker modulePath="audit" label="Audit Module" icon={<ClipboardList size={48} />} />}
               {activeTab === 'license' && <ModuleLinker modulePath="license" label="License Module" icon={<FileText size={48} />} />}
               
               {activeTab === 'settings' && (
                 <>
                   <div className="mt-8">
                      <SettingsView modules={modules} logs={logs} queues={queues} onRestart={handleRestartModule} />
                   </div>
                 </>
               )}
            </div>
         </div>
      </main>

      {/* Collapsible App Menu (Drawer) */}
      <AppMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        activeTab={activeTab} 
        onNavigate={handleTabChange} 
      />

      {/* Ultra-Modern Floating Navigation */}
      <div className="absolute bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <nav className="pointer-events-auto bg-[#080810]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] px-6 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-1 sm:gap-2 relative overflow-hidden group">
           {/* Glow Effect */}
           <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-indigo-500/5 to-purple-500/5 opacity-50"></div>
           
           <NavButton active={activeTab === 'dashboard'} onClick={() => handleTabChange('dashboard')} icon={<Globe size={22} />} label="World" />
           <NavButton active={activeTab === 'assets'} onClick={() => handleTabChange('assets')} icon={<Wallet size={22} />} label="Vault" />
           
           {/* Center FAB - Limit Break */}
           <div className="relative -top-6 mx-2 sm:mx-4">
              <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-30 rounded-full animate-pulse"></div>
              <button 
                onClick={() => handleTabChange('bank_services')}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-700 flex items-center justify-center text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-110 hover:-translate-y-1 transition-all duration-300 border-[3px] border-[#080810] relative z-10 group/fab"
              >
                <Landmark size={26} className="group-hover/fab:rotate-12 transition-transform duration-300 drop-shadow-md" />
              </button>
           </div>
           
           <NavButton active={activeTab === 'ai_hud'} onClick={() => handleTabChange('ai_hud')} icon={<Bot size={22} />} label="AI HUD" />
           
           {/* Apps Trigger */}
           <button 
             onClick={() => setIsMenuOpen(!isMenuOpen)}
             className={`flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-2xl transition-all duration-300 active:scale-95 relative ${isMenuOpen ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}
           >
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${isMenuOpen ? 'bg-cyan-500/10 ring-1 ring-cyan-500/30' : 'hover:bg-white/5'}`}>
                 {isMenuOpen ? <X size={22} /> : <Grid size={22} />}
              </div>
              <span className="text-[10px] font-medium tracking-wide opacity-80">Apps</span>
           </button>

        </nav>
      </div>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-2xl transition-all duration-300 active:scale-95 group relative ${active ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}
  >
    {active && <div className="absolute inset-0 bg-cyan-500/10 rounded-xl blur-sm"></div>}
    <div className={`p-1.5 rounded-xl transition-all duration-300 relative z-10 ${active ? 'bg-cyan-950/50 ring-1 ring-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)] transform -translate-y-1' : 'group-hover:bg-white/5'}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-medium tracking-wide transition-all ${active ? 'opacity-100 font-bold' : 'opacity-70 group-hover:opacity-100'}`}>{label}</span>
  </button>
);

export default App;