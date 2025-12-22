import React from 'react';
import RealBankingIntegration from './components/RealBankingIntegration';
import ModernPaymentIntegration from './components/ModernPaymentIntegration';
import AIAssistant from './components/AIAssistant';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            🌐 TK Global Bank
          </h1>
          <p className="text-gray-600 text-lg">
            AI搭載次世代金融プラットフォーム - 全機能統合
          </p>
        </header>

        {/* AIアシスタント */}
        <div className="mb-12">
          <AIAssistant />
        </div>

        {/* 最新決済機能 */}
        <ModernPaymentIntegration />
        
        {/* REAL銀行連携 */}
        <div className="mt-12">
          <RealBankingIntegration />
        </div>

        <footer className="mt-16 text-center text-sm text-gray-600 space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="font-bold text-lg mb-3">🚀 稼働中の全機能</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">🤖 AIアシスタント</span>
              <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs">💳 Apple Pay</span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">⚡ QUICPay</span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">💰 PayPay</span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">💳 Kyash</span>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">🏧 QR-ATM</span>
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs">🏦 全銀送金</span>
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs">💸 REAL送金</span>
              <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs">🎨 NFT</span>
              <span className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs">₿ 暗号通貨</span>
            </div>
            <p className="text-xs">Backend: <a href="https://hopeful-liberation-production-9d00.up.railway.app" className="text-blue-600 hover:underline font-semibold">Railway API</a></p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
