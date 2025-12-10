import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginProps> = ({ onLogin }) => {
  const [account, setAccount] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (account) {
      onLogin();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950 font-sans text-slate-200 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      
      <div className="rounded-lg border shadow-sm w-full max-w-sm border-indigo-500/20 bg-slate-900/50 backdrop-blur-sm anim-enter-bottom relative z-10">
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <div className="w-16 h-16 mb-4 mx-auto rounded-2xl bg-gradient-to-br from-cyan-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 anim-float">
            <span className="text-4xl filter drop-shadow-md">💠</span>
          </div>
          <div className="font-semibold tracking-tight text-4xl text-white">Tk globalBank</div>
          <div className="text-sm text-slate-400 pt-2">次世代の統合金融プラットフォーム</div>
        </div>
        <form onSubmit={handleLogin} className="p-6 pt-0 space-y-4">
          <div className="space-y-4">
            <input 
              className="flex w-full rounded-md border px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-12 text-base bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-500 transition-all focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(6,182,212,0.3)]" 
              placeholder="口座番号" 
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              autoFocus
            />
          </div>
          <div className="flex items-center pt-4">
            <button 
              type="submit"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 w-full font-bold text-base bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)] active:scale-[0.98] hover:shadow-[0_0_25px_rgba(8,145,178,0.7)]"
            >
              次へ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};