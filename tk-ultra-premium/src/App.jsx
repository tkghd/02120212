import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div 
      className="min-h-screen text-white p-6 font-sans"
      style={{
        background: 'linear-gradient(135deg, #0A0A0F 0%, #1a1a2e 50%, #0A0A0F 100%)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div className="max-w-7xl mx-auto">
        <Header />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Dashboard />
        </motion.main>
      </div>
      
      {/* 背景エフェクト */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-premium-gold/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-premium-diamond/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}

export default App;
