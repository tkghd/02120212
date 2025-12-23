import React from 'react';
import RealBankingIntegration from './components/RealBankingIntegration';
import ModernPaymentIntegration from './components/ModernPaymentIntegration';
import AIAssistant from './components/AIAssistant';
import UnifiedSystemDashboard from './components/UnifiedSystemDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            🌐 TK Global Bank
          </h1>
          <p className="text-gray-600 text-xl font-semibold">
            完全統合金融プラットフォーム - 全モジュール稼働中
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <AIAssistant />
          <UnifiedSystemDashboard />
        </div>

        <ModernPaymentIntegration />
        
        <div className="mt-12">
          <RealBankingIntegration />
        </div>

        <footer className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <p className="font-bold text-2xl mb-4">🚀 稼働中の全機能</p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full font-semibold">🤖 AI</span>
              <span className="bg-gray-900 text-white px-4 py-2 rounded-full">💳 Apple Pay</span>
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full">⚡ QUICPay</span>
              <span className="bg-red-500 text-white px-4 py-2 rounded-full">💰 PayPay</span>
              <span className="bg-blue-500 text-white px-4 py-2 rounded-full">💳 Kyash</span>
              <span className="bg-green-600 text-white px-4 py-2 rounded-full">🏧 ATM</span>
              <span className="bg-indigo-600 text-white px-4 py-2 rounded-full">🏦 全銀</span>
              <span className="bg-purple-600 text-white px-4 py-2 rounded-full">💸 REAL</span>
              <span className="bg-pink-500 text-white px-4 py-2 rounded-full">🎨 NFT</span>
              <span className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-full">₿ Crypto</span>
              <span className="bg-cyan-500 text-white px-4 py-2 rounded-full">🏢 License</span>
            </div>
            <a 
              href="https://hopeful-liberation-production-9d00.up.railway.app" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-bold text-lg"
            >
              🚂 Railway API →
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
