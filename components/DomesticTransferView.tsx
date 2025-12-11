import React, { useState } from 'react';
import { Smartphone, Building2, RefreshCw, ArrowRight, CheckCircle2, QrCode, Mail, Phone, User, Zap } from 'lucide-react';

type DomesticMethod = 'bank' | 'paypay' | 'cotra';

export const DomesticTransferView: React.FC = () => {
  const [method, setMethod] = useState<DomesticMethod>('paypay');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleTransfer = () => {
    setStatus('processing');
    setTimeout(() => setStatus('success'), 1500);
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-slate-900/40 border border-green-500/30 rounded-3xl text-center animate-in zoom-in-95 backdrop-blur-sm shadow-[0_0_50px_rgba(34,197,94,0.1)]">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6 ring-2 ring-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.4)] relative">
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
          <CheckCircle2 size={48} className="text-green-500 relative z-10" />
        </div>
        <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Transfer Successful</h3>
        <p className="text-slate-400 text-sm mb-8 font-mono">
          {method === 'paypay' ? 'PayPay Balance Sent' : method === 'cotra' ? 'Cotra Instant Settle' : 'Domestic Wire Sent'}
        </p>
        <div className="flex gap-3 w-full max-w-xs">
            <button 
            onClick={() => { setStatus('idle'); setAmount(''); setRecipient(''); }}
            className="flex-1 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors border border-slate-700"
            >
            New Transfer
            </button>
            <button className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
                Receipt
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <Zap size={20} className="text-white" fill="currentColor" />
            </div>
            Domestic Instant Transfer
        </h3>
        <span className="text-[10px] bg-green-950/40 text-green-400 px-3 py-1 rounded-full border border-green-500/30 animate-pulse font-mono font-bold tracking-wide">
          SYSTEM LIVE
        </span>
      </div>

      {/* Method Select */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <MethodCard 
            active={method === 'paypay'} 
            onClick={() => setMethod('paypay')} 
            icon={<Smartphone size={24} />} 
            label="PayPay" 
            color="red"
        />
        <MethodCard 
            active={method === 'cotra'} 
            onClick={() => setMethod('cotra')} 
            icon={<RefreshCw size={24} />} 
            label="Cotra" 
            color="green"
        />
        <MethodCard 
            active={method === 'bank'} 
            onClick={() => setMethod('bank')} 
            icon={<Building2 size={24} />} 
            label="Bank" 
            color="indigo"
        />
      </div>

      {/* Input Form */}
      <div className="space-y-6">
        <div className="bg-black/30 p-6 rounded-2xl border border-slate-800">
          <label className="text-xs font-bold text-slate-400 mb-3 block uppercase tracking-wider pl-1">
            {method === 'paypay' ? 'PayPay ID / Phone' : method === 'cotra' ? 'Mobile / Email' : 'Account Number'}
          </label>
          <div className="relative group">
            <input 
              type="text" 
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={method === 'paypay' ? '090-xxxx-xxxx' : 'Recipient info...'}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-white pl-12 text-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all group-hover:border-slate-600"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-cyan-400 transition-colors">
              {method === 'paypay' ? <QrCode size={20} /> : method === 'cotra' ? <Phone size={20} /> : <User size={20} />}
            </div>
          </div>
        </div>

        <div className="bg-black/30 p-6 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-center mb-3 pl-1">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Amount (JPY)</label>
             {method === 'cotra' && <span className="text-[10px] text-amber-400 bg-amber-950/30 px-2 py-0.5 rounded border border-amber-500/20">Max 100k</span>}
          </div>
          <div className="relative group">
             <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-white font-mono font-bold text-3xl text-right focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all group-hover:border-slate-600"
             />
             <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xl">¥</span>
          </div>
        </div>

        <button 
          disabled={!amount || !recipient || status === 'processing'}
          onClick={handleTransfer}
          className="w-full py-5 mt-4 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {status === 'processing' ? (
            <span className="flex items-center gap-2 animate-pulse"><RefreshCw className="animate-spin" size={20}/> Processing...</span>
          ) : (
            <>
                Send {method === 'paypay' ? 'PayPay' : method === 'cotra' ? 'Cotra' : 'Wire'} 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const MethodCard: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; color: 'red' | 'green' | 'indigo' }> = ({ active, onClick, icon, label, color }) => {
    const colors = {
        red: active ? 'bg-red-500 text-white border-red-400 shadow-red-500/30' : 'bg-slate-900 text-slate-500 border-slate-800 hover:border-red-500/50 hover:text-red-400',
        green: active ? 'bg-green-500 text-white border-green-400 shadow-green-500/30' : 'bg-slate-900 text-slate-500 border-slate-800 hover:border-green-500/50 hover:text-green-400',
        indigo: active ? 'bg-indigo-500 text-white border-indigo-400 shadow-indigo-500/30' : 'bg-slate-900 text-slate-500 border-slate-800 hover:border-indigo-500/50 hover:text-indigo-400'
    };

    return (
        <button 
          onClick={onClick}
          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 shadow-lg group active:scale-95 h-28 ${colors[color]}`}
        >
          <div className="transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <span className="text-xs font-bold tracking-wide">{label}</span>
        </button>
    );
};