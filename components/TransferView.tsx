import React, { useState, useEffect } from 'react';
import { Send, Building2, Search, ChevronRight, AlertCircle, ArrowRight, CheckCircle2, ChevronDown, RefreshCw, Wallet, ArrowLeft, CreditCard, History, User, Pencil, Landmark, ShieldCheck, Smartphone, Zap, Mail, QrCode, FileText, Fingerprint, Lock, Shield, Scan, Globe, AtSign } from 'lucide-react';
import { WalletState, OwnerAccount } from '../types';

interface TransferViewProps {
  wallet: WalletState;
  ownerAccounts: OwnerAccount[];
}

type TransferStep = 'method_select' | 'bank_select' | 'account_input' | 'amount_input' | 'confirm' | 'processing_auth' | 'complete';
type TransferMethod = 'bank' | 'paypay' | 'cotra' | 'wise' | 'revolut';

const MAJOR_BANKS = [
  { id: 'sbi', name: '住信SBIネット銀行', short: '住信SBI', color: 'bg-[#13284c]' },
  { id: 'minna', name: 'みんな銀行', short: 'みんな', color: 'bg-black border border-white/20' },
  { id: 'smbc', name: '三井住友銀行', short: 'SMBC', color: 'bg-[#679a05]' },
  { id: 'sony', name: 'ソニー銀行', short: 'Sony', color: 'bg-[#fa5686]' },
  { id: 'rakuten', name: '楽天銀行', short: '楽天', color: 'bg-[#bf0000]' },
  { id: 'mufg', name: '三菱UFJ銀行', short: '三菱UFJ', color: 'bg-[#d7000f]' },
  { id: 'mizuho', name: 'みずほ銀行', short: 'みずほ', color: 'bg-[#00287d]' },
  { id: 'jp', name: 'ゆうちょ銀行', short: 'ゆうちょ', color: 'bg-[#007b43]' },
  { id: 'resona', name: 'りそな銀行', short: 'りそな', color: 'bg-[#008d4c]' },
  { id: 'yokohama', name: '横浜銀行', short: '横浜', color: 'bg-[#fbb03b]' },
  { id: 'chiba', name: '千葉銀行', short: '千葉', color: 'bg-[#e60012]' },
  { id: 'fukuoka', name: '福岡銀行', short: '福岡', color: 'bg-[#0095d9]' },
  { id: 'seven', name: 'セブン銀行', short: 'セブン', color: 'bg-[#009b4d]' },
  { id: 'paypay_bank', name: 'PayPay銀行', short: 'PayPay', color: 'bg-[#ff0033]' },
  { id: 'jibun', name: 'auじぶん銀行', short: 'じぶん', color: 'bg-[#f39800]' },
  { id: 'aeon', name: 'イオン銀行', short: 'イオン', color: 'bg-[#D0006F]' },
  { id: 'shinsei', name: 'SBI新生銀行', short: 'SBI新生', color: 'bg-[#004886]' },
  { id: 'gmo', name: 'GMOあおぞら', short: 'GMO', color: 'bg-[#00A1E9]' },
  { id: 'saitama_resona', name: '埼玉りそな銀行', short: '埼玉りそな', color: 'bg-[#008d4c]' },
  { id: 'suruga', name: 'スルガ銀行', short: 'スルガ', color: 'bg-[#005cac]' },
  { id: 'shizuoka', name: '静岡銀行', short: '静岡', color: 'bg-[#f08300]' },
  { id: 'kyoto', name: '京都銀行', short: '京都', color: 'bg-[#006934]' },
  { id: 'hokuriku', name: '北陸銀行', short: '北陸', color: 'bg-[#da291c]' },
  { id: '77', name: '七十七銀行', short: '77', color: 'bg-[#009688]' },
  // Added requested banks
  { id: 'hokkaido', name: '北海道銀行', short: '北海道', color: 'bg-[#007b43]' },
  { id: 'gunma', name: '群馬銀行', short: '群馬', color: 'bg-[#005293]' },
  { id: 'chugoku', name: '中国銀行', short: '中国', color: 'bg-[#d7000f]' },
  { id: 'nishinippon', name: '西日本シティ銀行', short: '西日本C', color: 'bg-[#f39800]' },
  { id: 'iyo', name: '伊予銀行', short: '伊予', color: 'bg-[#009944]' },
];

export const TransferView: React.FC<TransferViewProps> = ({ wallet, ownerAccounts }) => {
  const [step, setStep] = useState<TransferStep>('method_select');
  const [method, setMethod] = useState<TransferMethod>('bank');
  const [selectedSource, setSelectedSource] = useState<OwnerAccount>(ownerAccounts[0]);
  const [selectedBank, setSelectedBank] = useState<any>(null);
  
  // Account Details (Bank)
  const [branchName, setBranchName] = useState('');
  const [accountType, setAccountType] = useState<'普通' | '当座' | '貯蓄'>('普通');
  const [accountNumber, setAccountNumber] = useState('');

  // Account Details (PayPay/Cotra/Wise/Revolut)
  const [recipientId, setRecipientId] = useState(''); // Phone, ID, Email, Revtag
  const [recipientType, setRecipientType] = useState<'phone' | 'id' | 'email' | 'revtag'>('phone');
  
  // Amount & Sender
  const [amount, setAmount] = useState('');
  const [senderName, setSenderName] = useState(selectedSource.accountName);
  const [isEditingSender, setIsEditingSender] = useState(false);
  
  // Process
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [txId, setTxId] = useState('');

  // Update sender name default when source changes
  useEffect(() => {
    setSenderName(selectedSource.accountName);
  }, [selectedSource]);

  const handleMethodSelect = (m: TransferMethod) => {
      setMethod(m);
      if (m === 'bank') {
          setStep('bank_select');
      } else {
          setStep('account_input');
          // Set default recipient type based on method
          if (m === 'wise') setRecipientType('email');
          else if (m === 'revolut') setRecipientType('revtag');
          else if (m === 'paypay') setRecipientType('phone');
          else setRecipientType('phone');
      }
  };

  const handleNext = () => {
    if (step === 'bank_select' && selectedBank) setStep('account_input');
    else if (step === 'account_input') {
        if (method === 'bank' && branchName && accountNumber.length >= 7) setStep('amount_input');
        else if ((method !== 'bank') && recipientId.length > 3) setStep('amount_input');
    }
    else if (step === 'amount_input' && amount) setStep('confirm');
  };

  const handleBack = () => {
    if (step === 'bank_select') setStep('method_select');
    else if (step === 'account_input') {
        if (method === 'bank') setStep('bank_select');
        else setStep('method_select');
    }
    else if (step === 'amount_input') setStep('account_input');
    else if (step === 'confirm') setStep('amount_input');
    else if (step === 'complete') {
        resetForm();
    }
  };

  const resetForm = () => {
    setStep('method_select');
    setMethod('bank');
    setAmount('');
    setAccountNumber('');
    setBranchName('');
    setRecipientId('');
    setSelectedBank(null);
    setTxId('');
  };

  const handleTransfer = async () => {
    setStep('processing_auth');
    setIsProcessing(true);
    
    // 3-Factor Auth Simulation
    setProcessingStage('Authenticating Biometrics...');
    await new Promise(resolve => setTimeout(resolve, 800));

    setProcessingStage('Verifying Device Security (ΩMAX)...');
    await new Promise(resolve => setTimeout(resolve, 800));

    setProcessingStage('Signing Digital Certificate...');
    await new Promise(resolve => setTimeout(resolve, 800));

    setProcessingStage('Executing Instant Settlement...');
    await new Promise(resolve => setTimeout(resolve, 600));

    setTxId(`TX-${Math.floor(Math.random() * 1000000000)}`);
    setIsProcessing(false);
    setStep('complete');
  };

  const autoFillBank = () => {
      setBranchName('本店営業部 (001)');
      setAccountNumber('1234567');
      handleNext();
  };

  // --- Render Header ---
  const renderHeader = (title: string) => (
    <div className="flex items-center gap-4 mb-4 pt-2 sticky top-0 bg-[#020205]/95 z-20 py-4 border-b border-white/5 backdrop-blur-md">
      {step !== 'method_select' && step !== 'complete' && step !== 'processing_auth' && (
        <button onClick={handleBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:text-white">
          <ArrowLeft size={20} />
        </button>
      )}
      <div className="flex-1">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            {step === 'complete' ? <CheckCircle2 size={24} className="text-green-500" /> : <Landmark size={20} className="text-indigo-500" />}
            {title}
          </h2>
          {step !== 'complete' && step !== 'method_select' && step !== 'processing_auth' && (
              <div className="flex items-center gap-1 mt-1">
                  {[1,2,3,4].map(i => {
                      const current = step === 'bank_select' ? 1 : step === 'account_input' ? 2 : step === 'amount_input' ? 3 : 4;
                      return (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= current ? 'bg-cyan-500' : 'bg-slate-800'}`}></div>
                      )
                  })}
              </div>
          )}
      </div>
    </div>
  );

  // --- STEP: Processing Auth (3-Factor) ---
  if (step === 'processing_auth') {
      return (
        <div className="h-full flex flex-col items-center justify-center p-8 animate-in zoom-in-95 duration-300">
            <div className="relative mb-12">
                <div className="w-32 h-32 rounded-full border-4 border-slate-800 border-t-indigo-500 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck size={48} className="text-indigo-500 animate-pulse" />
                </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">AUTHENTICATING</h3>
            <p className="text-indigo-400 font-mono mb-8">{processingStage}</p>

            <div className="w-full max-w-sm space-y-4">
                <div className="flex items-center gap-4 text-slate-400 anim-enter-right anim-delay-100">
                    <div className="w-8 h-8 rounded-full bg-indigo-900/30 flex items-center justify-center border border-indigo-500/50">
                        <Fingerprint size={16} className="text-indigo-400" />
                    </div>
                    <span className="text-sm">Biometric Scan</span>
                    <div className="ml-auto text-green-500 text-xs font-bold">VERIFIED</div>
                </div>
                <div className="flex items-center gap-4 text-slate-400 anim-enter-right anim-delay-200">
                    <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center border border-purple-500/50">
                        <Lock size={16} className="text-purple-400" />
                    </div>
                    <span className="text-sm">Secure Enclave PIN</span>
                    <div className="ml-auto text-green-500 text-xs font-bold">VERIFIED</div>
                </div>
                <div className="flex items-center gap-4 text-slate-400 anim-enter-right anim-delay-300">
                    <div className="w-8 h-8 rounded-full bg-amber-900/30 flex items-center justify-center border border-amber-500/50">
                        <Scan size={16} className="text-amber-400" />
                    </div>
                    <span className="text-sm">Device Integrity</span>
                    <div className="ml-auto text-green-500 text-xs font-bold">PASSED</div>
                </div>
            </div>
        </div>
      );
  }

  // --- STEP 1: Method Selection ---
  if (step === 'method_select') {
    return (
      <div className="anim-enter-right max-w-3xl mx-auto pb-28 relative">
        {renderHeader('送金方法の選択')}
        
        {/* Source Selector */}
        <div className="mb-8 bg-[#05050a] border border-slate-800 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-900/50 transition-colors">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
            <label className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2 uppercase tracking-wider">
               <Wallet size={14} className="text-indigo-500" /> 出金口座 (Source)
            </label>
            <div className="relative group">
                <select 
                    className="w-full bg-[#0a0a12] border border-slate-700 rounded-xl py-4 px-4 pr-10 text-white appearance-none focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all cursor-pointer hover:bg-[#151520]"
                    value={selectedSource.id}
                    onChange={(e) => setSelectedSource(ownerAccounts.find(a => a.id === e.target.value) || ownerAccounts[0])}
                >
                    {ownerAccounts.map(acc => (
                        <option key={acc.id} value={acc.id}>
                            {acc.bankName} {acc.branchName} — {acc.currency === 'JPY' ? '¥' : '$'}{acc.balance}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-indigo-400 transition-colors" size={20} />
            </div>
            <div className="mt-3 flex justify-between px-1 items-center">
               <span className="text-[10px] text-slate-500 font-mono">AVAILABLE BALANCE</span>
               <span className="text-sm font-mono font-bold text-indigo-400 tracking-wide">¥ {selectedSource.balance}</span>
            </div>
        </div>

        <div className="space-y-4">
           {/* Bank */}
           <button 
             onClick={() => handleMethodSelect('bank')}
             className="w-full p-5 rounded-[2rem] bg-[#0a0a12] border border-slate-800 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] transition-all flex items-center justify-between group anim-enter-right anim-delay-100"
           >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-900/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 size={24} />
                 </div>
                 <div className="text-left">
                    <div className="font-bold text-white text-base">銀行振込</div>
                    <div className="text-xs text-slate-400">金融機関口座へ送金</div>
                 </div>
              </div>
              <ChevronRight size={20} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
           </button>

           {/* PayPay */}
           <button 
             onClick={() => handleMethodSelect('paypay')}
             className="w-full p-5 rounded-[2rem] bg-[#0a0a12] border border-slate-800 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-all flex items-center justify-between group anim-enter-right anim-delay-200"
           >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-red-900/20 text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Smartphone size={24} />
                 </div>
                 <div className="text-left">
                    <div className="font-bold text-white text-base">PayPay送金</div>
                    <div className="text-xs text-slate-400">ID / 電話番号で即時送金</div>
                 </div>
              </div>
              <ChevronRight size={20} className="text-slate-600 group-hover:text-red-400 transition-colors" />
           </button>

           {/* Cotra */}
           <button 
             onClick={() => handleMethodSelect('cotra')}
             className="w-full p-5 rounded-[2rem] bg-[#0a0a12] border border-slate-800 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] transition-all flex items-center justify-between group anim-enter-right anim-delay-300"
           >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-green-900/20 text-green-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <RefreshCw size={24} />
                 </div>
                 <div className="text-left">
                    <div className="font-bold text-white text-base">ことら送金</div>
                    <div className="text-xs text-slate-400">10万円以下の個人間送金</div>
                 </div>
              </div>
              <ChevronRight size={20} className="text-slate-600 group-hover:text-green-400 transition-colors" />
           </button>

           {/* Wise */}
           <button 
             onClick={() => handleMethodSelect('wise')}
             className="w-full p-5 rounded-[2rem] bg-[#0a0a12] border border-slate-800 hover:border-lime-500/50 hover:shadow-[0_0_30px_rgba(132,204,22,0.1)] transition-all flex items-center justify-between group anim-enter-right anim-delay-500"
           >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-lime-900/20 text-lime-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe size={24} />
                 </div>
                 <div className="text-left">
                    <div className="font-bold text-white text-base">Wise</div>
                    <div className="text-xs text-slate-400">International / Multi-currency</div>
                 </div>
              </div>
              <ChevronRight size={20} className="text-slate-600 group-hover:text-lime-400 transition-colors" />
           </button>

           {/* Revolut */}
           <button 
             onClick={() => handleMethodSelect('revolut')}
             className="w-full p-5 rounded-[2rem] bg-[#0a0a12] border border-slate-800 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all flex items-center justify-between group anim-enter-right anim-delay-500"
           >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap size={24} />
                 </div>
                 <div className="text-left">
                    <div className="font-bold text-white text-base">Revolut</div>
                    <div className="text-xs text-slate-400">Instant P2P / Global</div>
                 </div>
              </div>
              <ChevronRight size={20} className="text-slate-600 group-hover:text-white transition-colors" />
           </button>
        </div>
      </div>
    );
  }

  // --- STEP: Bank Selection ---
  if (step === 'bank_select') {
    return (
      <div className="anim-enter-right max-w-3xl mx-auto pb-28 relative">
        {renderHeader('金融機関の選択')}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
           {MAJOR_BANKS.map(bank => (
             <button 
               key={bank.id}
               onClick={() => { setSelectedBank(bank); handleNext(); }}
               className="p-4 rounded-2xl border border-slate-800 bg-[#0a0a12] hover:bg-[#151520] hover:border-indigo-500/50 transition-all flex flex-col items-center gap-3 group h-28 justify-center active:scale-95 shadow-md"
             >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold ${bank.color} shadow-lg group-hover:scale-110 transition-transform ring-2 ring-white/5`}>
                  {bank.short.substring(0, 2)}
                </div>
                <span className="text-xs font-bold text-slate-300 group-hover:text-white">{bank.short}</span>
             </button>
           ))}
           <button className="p-4 rounded-2xl border border-dashed border-slate-700 hover:border-indigo-500 hover:bg-slate-800/30 transition-all flex flex-col items-center justify-center gap-2 group h-28">
              <Search size={24} className="text-slate-500 group-hover:text-indigo-400" />
              <span className="text-xs text-slate-500 group-hover:text-indigo-400">検索・その他</span>
           </button>
        </div>

        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
           <History size={16} className="text-slate-400" /> よく使う振込先
        </h3>
        <div className="space-y-2">
           {[1, 2].map(i => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[#0a0a12] border border-slate-800 hover:bg-[#151520] cursor-pointer transition-colors" onClick={() => { setSelectedBank(MAJOR_BANKS[0]); handleNext(); }}>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-400">
                       履歴
                    </div>
                    <div>
                       <div className="text-sm font-bold text-white">株式会社 〇〇商事</div>
                       <div className="text-xs text-slate-500">三菱UFJ銀行 • 普通 1234567</div>
                    </div>
                 </div>
                 <ChevronRight size={16} className="text-slate-600" />
              </div>
           ))}
        </div>
      </div>
    );
  }

  // --- STEP: Account Input (Adaptive) ---
  if (step === 'account_input') {
      const getTitle = () => {
          if (method === 'bank') return '口座情報の入力';
          if (method === 'paypay') return 'PayPay ID/電話番号';
          if (method === 'cotra') return 'ことら送金先の指定';
          if (method === 'wise') return 'Wise Recipient';
          if (method === 'revolut') return 'Revolut ID';
          return 'Destination';
      }

      return (
        <div className="anim-enter-right max-w-3xl mx-auto pb-28 relative">
          {renderHeader(getTitle())}
          
          <div className="bg-[#0a0a12] border border-slate-800 rounded-[2rem] p-6 space-y-6 shadow-2xl">
             
             {/* Method Indicator */}
             <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg ${
                    method === 'bank' ? selectedBank?.color : 
                    method === 'paypay' ? 'bg-red-500' : 
                    method === 'wise' ? 'bg-lime-500' :
                    method === 'revolut' ? 'bg-black border border-white/20' :
                    'bg-green-500'
                }`}>
                    {method === 'bank' ? selectedBank?.short.substring(0,2) : 
                     method === 'paypay' ? 'P' : 
                     method === 'wise' ? <Globe size={20} /> :
                     method === 'revolut' ? 'R' : 'C'}
                </div>
                <div>
                   <div className="font-bold text-white">
                       {method === 'bank' ? selectedBank?.name : 
                        method === 'paypay' ? 'PayPay残高送金' : 
                        method === 'wise' ? 'Wise Transfer' :
                        method === 'revolut' ? 'Revolut P2P' :
                        'ことら送金 (10万円以下)'}
                   </div>
                   <div className="text-xs text-slate-500">への送金</div>
                </div>
             </div>

             {/* BANK INPUTS */}
             {method === 'bank' && (
                 <div className="space-y-4">
                    <div>
                       <div className="flex justify-between">
                           <label className="text-xs font-bold text-slate-400 mb-2 block">支店名・支店番号</label>
                           <button onClick={autoFillBank} className="text-[10px] text-indigo-500 font-bold hover:underline">AUTO-FILL (TEST)</button>
                       </div>
                       <div className="relative group">
                          <input 
                             type="text" 
                             value={branchName}
                             onChange={(e) => setBranchName(e.target.value)}
                             placeholder="例：本店営業部 (001)"
                             className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors focus:shadow-[0_0_10px_rgba(79,70,229,0.2)] group-hover:border-slate-600"
                          />
                          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
                       </div>
                    </div>

                    <div>
                       <label className="text-xs font-bold text-slate-400 mb-2 block">口座種別</label>
                       <div className="flex gap-2">
                          {(['普通', '当座', '貯蓄'] as const).map(type => (
                             <button 
                               key={type}
                               onClick={() => setAccountType(type)}
                               className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${accountType === type ? 'bg-indigo-900/30 border-indigo-500 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.2)]' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                             >
                                {type}
                             </button>
                          ))}
                       </div>
                    </div>

                    <div>
                       <label className="text-xs font-bold text-slate-400 mb-2 block">口座番号 (7桁)</label>
                       <input 
                          type="tel" 
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 7))}
                          placeholder="1234567"
                          className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-4 text-white font-mono text-xl tracking-widest focus:outline-none focus:border-indigo-500 transition-colors focus:shadow-[0_0_10px_rgba(79,70,229,0.2)]"
                       />
                    </div>
                 </div>
             )}

             {/* OTHER INPUTS */}
             {method !== 'bank' && (
                 <div className="space-y-6">
                     <div className="flex gap-2">
                        {/* Phone is common */}
                        <button onClick={() => setRecipientType('phone')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${recipientType === 'phone' ? 'bg-slate-800 border-white/20 text-white' : 'border-transparent text-slate-500'}`}>電話番号</button>
                        
                        {/* Specific types */}
                        {method === 'paypay' && <button onClick={() => setRecipientType('id')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${recipientType === 'id' ? 'bg-slate-800 border-white/20 text-white' : 'border-transparent text-slate-500'}`}>PayPay ID</button>}
                        {method === 'cotra' && <button onClick={() => setRecipientType('email')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${recipientType === 'email' ? 'bg-slate-800 border-white/20 text-white' : 'border-transparent text-slate-500'}`}>メールアドレス</button>}
                        {method === 'wise' && <button onClick={() => setRecipientType('email')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${recipientType === 'email' ? 'bg-slate-800 border-white/20 text-white' : 'border-transparent text-slate-500'}`}>Email</button>}
                        {method === 'revolut' && <button onClick={() => setRecipientType('revtag')} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${recipientType === 'revtag' ? 'bg-slate-800 border-white/20 text-white' : 'border-transparent text-slate-500'}`}>Revtag</button>}
                     </div>

                     <div className="relative">
                        <input 
                           type={recipientType === 'phone' ? 'tel' : 'text'}
                           value={recipientId}
                           onChange={(e) => setRecipientId(e.target.value)}
                           placeholder={
                               recipientType === 'phone' ? '090-1234-5678' : 
                               recipientType === 'id' ? 'paypay_id' : 
                               recipientType === 'revtag' ? '@username' :
                               'sample@email.com'
                           }
                           className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:border-indigo-500 transition-colors pl-12 focus:shadow-[0_0_10px_rgba(79,70,229,0.2)]"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                            {recipientType === 'phone' ? <Smartphone size={20} /> : 
                             recipientType === 'id' ? <QrCode size={20} /> : 
                             recipientType === 'revtag' ? <AtSign size={20} /> :
                             <Mail size={20} />}
                        </div>
                     </div>
                     <p className="text-xs text-slate-500 text-center">
                        ※ 入力された情報に紐づくアカウントを検索します
                     </p>
                 </div>
             )}

             <button 
               onClick={handleNext}
               disabled={
                   (method === 'bank' && (!branchName || accountNumber.length < 7)) ||
                   ((method !== 'bank') && recipientId.length < 3)
               }
               className="w-full py-4 mt-4 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-indigo-500/20 group"
             >
                次へ進む <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>
      );
  }

  // --- STEP: Amount Input ---
  if (step === 'amount_input') {
      return (
        <div className="anim-enter-right max-w-3xl mx-auto pb-28 relative">
          {renderHeader('金額の入力')}

          <div className="bg-[#0a0a12] border border-slate-800 rounded-[2rem] p-6 space-y-6 shadow-2xl">
             <div className="text-center py-8">
                 <label className="text-xs font-bold text-slate-500 mb-4 block uppercase tracking-widest">送金金額</label>
                 <div className="flex items-end justify-center gap-2">
                    <span className="text-4xl text-slate-500 mb-2">¥</span>
                    <input 
                       type="tel"
                       value={amount}
                       onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                       placeholder="0"
                       className="bg-transparent text-6xl sm:text-7xl font-mono font-bold text-white w-full text-center focus:outline-none placeholder-slate-800 transition-all text-glow"
                       autoFocus
                    />
                 </div>
                 {amount && <div className="text-slate-500 mt-4 font-mono text-sm bg-slate-900/50 px-3 py-1 rounded-full inline-block border border-slate-800">手数料: ¥0 (Godmode Waiver)</div>}
                 {method === 'cotra' && parseInt(amount) > 100000 && (
                     <div className="text-red-400 text-xs mt-2 font-bold flex items-center justify-center gap-1 animate-pulse">
                         <AlertCircle size={12} /> ことら送金の上限は10万円です
                     </div>
                 )}
             </div>

             <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800 hover:bg-slate-900/70 transition-colors">
                <div className="flex justify-between items-center mb-2">
                   <label className="text-xs font-bold text-slate-400">振込依頼人名</label>
                   <button onClick={() => setIsEditingSender(!isEditingSender)} className="text-indigo-400 text-xs flex items-center gap-1 font-bold hover:text-white transition-colors">
                      <Pencil size={12} /> 編集
                   </button>
                </div>
                {isEditingSender ? (
                    <input 
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full bg-black/50 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:border-indigo-500 outline-none"
                    />
                ) : (
                    <div className="text-white font-bold text-lg">{senderName}</div>
                )}
             </div>

             <button 
               onClick={handleNext}
               disabled={!amount || (method === 'cotra' && parseInt(amount) > 100000)}
               className="w-full py-4 mt-4 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-indigo-500/20 group"
             >
                確認画面へ <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>
      );
  }

  // --- STEP: Confirm (Redesigned) ---
  if (step === 'confirm') {
      return (
        <div className="anim-enter-right max-w-3xl mx-auto pb-28 relative">
          {renderHeader('内容確認')}

          <div className="space-y-6">
                <div className="bg-[#0a0a12] border border-slate-800 rounded-[2rem] p-0 shadow-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
                    <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                    
                    <div className="p-8 border-b border-slate-800 text-center relative">
                       <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none"></div>
                       <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-3 relative z-10">Total Amount</span>
                       <div className="text-5xl font-mono font-bold text-white tracking-tight drop-shadow-lg relative z-10">
                          ¥ {parseInt(amount).toLocaleString()}
                       </div>
                       <span className="inline-block mt-4 px-3 py-1 bg-slate-900 rounded-full text-[10px] text-slate-400 border border-slate-800 font-mono relative z-10">
                          Transfer Fee: ¥0 (Godmode Waiver)
                       </span>
                    </div>

                    <div className="p-8 space-y-8 relative z-10">
                       {/* Recipient */}
                       <div className="flex gap-5">
                          <div className="flex flex-col items-center gap-2 min-w-[60px]">
                             <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/5 ${
                                 method === 'bank' ? selectedBank?.color : 
                                 method === 'paypay' ? 'bg-red-500' : 
                                 method === 'wise' ? 'bg-lime-500' :
                                 method === 'revolut' ? 'bg-black border border-white/20' :
                                 'bg-green-500'
                             }`}>
                                 {method === 'bank' ? selectedBank?.short.substring(0,1) : 
                                  method === 'paypay' ? 'P' : 
                                  method === 'wise' ? <Globe size={24} /> :
                                  method === 'revolut' ? 'R' :
                                  'C'}
                             </div>
                             <span className="text-[10px] font-bold text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">TO</span>
                          </div>
                          <div className="flex-1 border-l-2 border-slate-800 pl-5">
                             <div className="text-xs font-bold text-slate-500 uppercase mb-1 tracking-wider">Recipient (送金先)</div>
                             <div className="font-bold text-white text-xl leading-tight">
                                {method === 'bank' ? selectedBank?.name : 
                                 method === 'paypay' ? 'PayPay ID' : 
                                 method === 'wise' ? 'Wise Account' :
                                 method === 'revolut' ? 'Revolut User' :
                                 'Contact'}
                             </div>
                             <div className="text-sm text-indigo-400 font-mono mt-1 font-medium">
                                {method === 'bank' ? `${branchName} / ${accountType} / ${accountNumber}` : recipientId}
                             </div>
                          </div>
                       </div>

                       {/* Sender */}
                       <div className="flex gap-5">
                          <div className="flex flex-col items-center gap-2 min-w-[60px]">
                             <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shadow-lg">
                                <User size={24} className="text-slate-400" />
                             </div>
                             <span className="text-[10px] font-bold text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">FROM</span>
                          </div>
                          <div className="flex-1 border-l-2 border-slate-800 pl-5">
                             <div className="text-xs font-bold text-slate-500 uppercase mb-1 tracking-wider">Sender (送金元)</div>
                             <div className="font-bold text-white text-lg">{senderName}</div>
                             <div className="text-xs text-slate-500 mt-1">{selectedSource.bankName} {selectedSource.branchName}</div>
                          </div>
                       </div>
                    </div>

                    {/* Verification Seal */}
                    <div className="absolute bottom-6 right-6 opacity-10 pointer-events-none">
                       <ShieldCheck size={150} className="text-indigo-500 rotate-[-15deg]" />
                    </div>
                </div>

                <div className="bg-amber-950/20 border border-amber-500/20 p-5 rounded-2xl flex gap-4 items-start shadow-inner">
                   <div className="p-2 bg-amber-900/30 rounded-full text-amber-500">
                      <AlertCircle size={20} />
                   </div>
                   <p className="text-xs text-amber-200/80 leading-relaxed pt-1">
                      This transaction will be processed immediately via the <span className="text-amber-400 font-bold">ΩMAX Priority Network</span>. Please confirm details before signing.
                   </p>
                </div>

                <div className="flex gap-3 pt-2">
                    <button onClick={handleBack} className="flex-1 py-4 border border-slate-800 rounded-2xl text-slate-400 font-bold hover:bg-slate-900 hover:text-white transition-colors">
                        修正 (Edit)
                    </button>
                    <button 
                        onClick={handleTransfer}
                        className="flex-[2] py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold rounded-2xl shadow-[0_0_25px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
                    >
                        <Fingerprint size={24} className="group-hover:scale-110 transition-transform" /> 承認して送金
                    </button>
                </div>
             </div>
        </div>
      );
  }

  // --- STEP 5: Complete (Digital Certificate) ---
  if (step === 'complete') {
     return (
        <div className="flex flex-col items-center justify-center py-8 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center ring-2 ring-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.4)] mb-8 relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                <CheckCircle2 size={48} className="text-green-500 relative z-10" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">送金手続き完了</h2>
            <p className="text-slate-400 mb-10 text-sm">デジタル証明書が発行されました。</p>

            <div className="bg-[#eef2f6] text-slate-900 rounded-sm p-8 w-full max-w-md shadow-2xl relative overflow-hidden mb-10 font-serif border-[6px] border-double border-slate-300 anim-enter-bottom rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')]"></div>
                
                <div className="text-center border-b-2 border-slate-800 pb-6 mb-6">
                    <h3 className="text-2xl font-bold uppercase tracking-[0.2em] text-slate-900">Transaction<br/>Certificate</h3>
                    <div className="text-[10px] text-slate-500 mt-2 font-sans tracking-widest uppercase">TK Global Bank • Official Record</div>
                </div>

                <div className="space-y-5 text-sm relative z-10">
                    <div className="flex justify-between border-b border-slate-300 pb-2">
                        <span className="font-bold text-slate-500 uppercase text-xs tracking-wider">Transaction ID</span>
                        <span className="font-mono font-bold text-slate-900">{txId}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-300 pb-2">
                        <span className="font-bold text-slate-500 uppercase text-xs tracking-wider">Date</span>
                        <span className="font-mono text-slate-900">{new Date().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                        <span className="font-bold text-slate-500 uppercase text-xs tracking-wider">Amount</span>
                        <span className="font-mono font-bold text-2xl text-slate-900">¥ {parseInt(amount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-100 p-3 rounded border border-slate-200 mt-2">
                        <span className="font-bold text-slate-500 uppercase text-xs tracking-wider">Recipient</span>
                        <span className="text-right font-bold text-slate-900 max-w-[150px] truncate">{method === 'bank' ? selectedBank?.short : 'Contact'}</span>
                    </div>
                </div>

                <div className="mt-10 pt-4 border-t-2 border-slate-800 flex justify-between items-end">
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest leading-relaxed">
                        Authorized by<br/>TK Global Core System<br/>ΩβαMAX V9.0
                    </div>
                    <div className="w-24 h-24 border-[3px] border-red-800 rounded-full flex items-center justify-center opacity-40 rotate-[-15deg] absolute bottom-6 right-6 pointer-events-none mix-blend-multiply">
                        <div className="w-20 h-20 border border-red-800 rounded-full flex items-center justify-center">
                            <span className="text-red-800 font-black text-xs uppercase tracking-widest border-y border-red-800 px-1 transform rotate-[-5deg]">Verified</span>
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={resetForm} className="bg-slate-800 hover:bg-slate-700 text-white px-10 py-4 rounded-2xl font-bold transition-all w-full max-w-md shadow-lg border border-slate-700 hover:border-slate-600">
                閉じる (Close)
            </button>
        </div>
     );
  }

  return null; // Should not reach here
};