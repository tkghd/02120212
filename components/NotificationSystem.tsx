
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Zap, Globe, Lock, Wallet, CheckCircle2, X } from 'lucide-react';

export type NotificationType = 'security' | 'finance' | 'system' | 'success';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
}

const SAMPLE_EVENTS: Omit<Notification, 'id' | 'timestamp'>[] = [
  { type: 'finance', title: 'Whale Transaction', message: 'Inbound liquidity detected: ¥500,000,000' },
  { type: 'finance', title: 'Arbitrage Executed', message: 'DEX Delta neutral profit: +12.5%' },
  { type: 'security', title: 'Firewall Active', message: 'Unauthorized access attempt intercepted (IP: 192.168.x.x)' },
  { type: 'system', title: 'Module Sync', message: 'Global Node (EU-West) latency optimized to 12ms' },
  { type: 'system', title: 'AI Prediction', message: 'Market sentiment shift detected: BULLISH' },
  { type: 'success', title: 'Asset Secured', message: 'Cold storage backup completed successfully' },
  { type: 'finance', title: 'Dividend Payout', message: 'TKG Staking rewards distributed' },
  { type: 'security', title: 'Encryption Rotation', message: 'Quantum keys updated for Vault #7' },
];

export const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Function to add a notification
  const addNotification = (event: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNote: Notification = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };

    setNotifications((prev) => [newNote, ...prev].slice(0, 4)); // Keep max 4 visible

    // Auto dismiss
    setTimeout(() => {
      removeNotification(newNote.id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Simulate Random Godmode Events
  useEffect(() => {
    // Initial welcome notification
    setTimeout(() => {
        addNotification({ type: 'system', title: 'Godmode Active', message: 'Real-time monitoring systems engaged.' });
    }, 1000);

    const interval = setInterval(() => {
      // 30% chance to trigger an event every 4 seconds
      if (Math.random() > 0.7) {
        const randomEvent = SAMPLE_EVENTS[Math.floor(Math.random() * SAMPLE_EVENTS.length)];
        addNotification(randomEvent);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 w-80 pointer-events-none">
      {notifications.map((note) => (
        <div 
          key={note.id}
          className={`pointer-events-auto relative overflow-hidden rounded-xl border p-4 shadow-2xl backdrop-blur-md transition-all duration-500 animate-in slide-in-from-right-10 fade-in ${
            note.type === 'security' ? 'bg-red-950/80 border-red-500/50 shadow-red-900/20' :
            note.type === 'finance' ? 'bg-emerald-950/80 border-emerald-500/50 shadow-emerald-900/20' :
            note.type === 'success' ? 'bg-indigo-950/80 border-indigo-500/50 shadow-indigo-900/20' :
            'bg-slate-900/90 border-slate-700 shadow-slate-900/50'
          }`}
        >
            {/* Type Indicator Bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
               note.type === 'security' ? 'bg-red-500' :
               note.type === 'finance' ? 'bg-emerald-500' :
               note.type === 'success' ? 'bg-indigo-500' :
               'bg-slate-500'
            }`}></div>

            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 mb-1">
                    {note.type === 'security' && <ShieldAlert size={14} className="text-red-400 animate-pulse" />}
                    {note.type === 'finance' && <Zap size={14} className="text-emerald-400" />}
                    {note.type === 'success' && <CheckCircle2 size={14} className="text-indigo-400" />}
                    {note.type === 'system' && <Globe size={14} className="text-slate-400" />}
                    
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                        note.type === 'security' ? 'text-red-400' :
                        note.type === 'finance' ? 'text-emerald-400' :
                        note.type === 'success' ? 'text-indigo-400' :
                        'text-slate-400'
                    }`}>
                        {note.title}
                    </span>
                </div>
                <button onClick={() => removeNotification(note.id)} className="text-slate-500 hover:text-white transition-colors">
                    <X size={14} />
                </button>
            </div>
            
            <p className="text-sm font-medium text-slate-200 pl-1 leading-snug">
                {note.message}
            </p>
            
            <div className="mt-2 text-[9px] text-slate-500 font-mono text-right pl-1">
                {note.timestamp.toLocaleTimeString()} • GOD_NET
            </div>
        </div>
      ))}
    </div>
  );
};
