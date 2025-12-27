import React from 'react';
import { Shield, Zap, Lock, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center mb-12 pb-6 border-b border-premium-gold/20 backdrop-blur-xl"
    >
      <div>
        <motion.h1 
          className="text-4xl font-black tracking-tighter"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{
            background: 'linear-gradient(90deg, #FFD700, #E5E4E2, #B9F2FF, #FFD700)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          TKG ULTRA PREMIUM
        </motion.h1>
        <p className="text-xs text-premium-platinum/60 uppercase tracking-widest mt-2 font-light">
          Owner: 1190212 | Quantum Sovereignty System | Real-World Banking
        </p>
      </div>
      <div className="flex gap-4">
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <Shield className="text-emerald-400 w-6 h-6" />
        </motion.div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Zap className="text-premium-gold w-6 h-6" />
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }}>
          <Lock className="text-premium-diamond w-6 h-6" />
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }}>
          <Globe className="text-premium-royal w-6 h-6" />
        </motion.div>
      </div>
    </motion.header>
  );
}
