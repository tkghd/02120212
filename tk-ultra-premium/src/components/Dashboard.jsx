import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { motion } from 'framer-motion';
import { TrendingUp, Layers, Globe2, Wallet } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState({ mcap: '---', vault: '---', entities: {} });
  const [vault, setVault] = useState({});

  useEffect(() => {
    const sync = async () => {
      try {
        const [status, vaultData] = await Promise.all([
          api.fetchStatus(),
          api.fetchVault()
        ]);
        setData(status);
        setVault(vaultData);
      } catch (e) {}
    };
    sync();
    const timer = setInterval(sync, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* メイン資産表示 */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl p-12"
        style={{
          background: 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(10,10,15,0.95) 50%, rgba(185,242,255,0.1) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,215,0,0.3)'
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-premium-gold/20 via-transparent to-premium-diamond/20 animate-shimmer" 
               style={{ backgroundSize: '200% 100%' }}></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-premium-gold text-sm tracking-widest uppercase mb-6">
            <Globe2 className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
            Total Imperial Net Worth
          </div>
          
          <motion.div 
            className="text-7xl font-black mb-4"
            animate={{ 
              textShadow: [
                '0 0 20px rgba(255,215,0,0.5)',
                '0 0 40px rgba(255,215,0,0.8)',
                '0 0 20px rgba(255,215,0,0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: 'linear-gradient(90deg, #FFD700, #FFF, #FFD700)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {data.mcap}
          </motion.div>
          
          <div className="flex items-center gap-3 text-premium-diamond text-base font-mono">
            <motion.div 
              className="w-3 h-3 bg-premium-diamond rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            QUANTUM SYNC: 0.1s INTERVAL | 532 GLOBAL NODES ACTIVE
          </div>
        </div>
      </motion.div>

      {/* グリッドカード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard 
          icon={<Wallet className="text-premium-gold" />}
          title="Personal Vault"
          value={vault.vault || '---'}
          subtitle="Immediately Available"
        />
        <GlassCard 
          icon={<TrendingUp className="text-emerald-400" />}
          title="Global Entities"
          value={`${data.entities.total || 532}`}
          subtitle="Active Worldwide"
        />
        <GlassCard 
          icon={<Layers className="text-premium-royal" />}
          title="Accounts"
          value={vault.accounts || 350}
          subtitle="Distributed Network"
        />
        <GlassCard 
          icon={<Globe2 className="text-premium-diamond" />}
          title="Networks"
          value={data.networks?.length || 4}
          subtitle="Payment Systems"
        />
      </div>
    </div>
  );
}

function GlassCard({ icon, title, value, subtitle }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="p-6 rounded-2xl backdrop-blur-xl"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <div className="mb-4">{icon}</div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs text-premium-platinum/60 uppercase tracking-wide">{title}</div>
      <div className="text-xs text-premium-platinum/40 mt-1">{subtitle}</div>
    </motion.div>
  );
}
