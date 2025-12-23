import React from 'react';
import CompleteFinancialPlatform from './components/CompleteFinancialPlatform';
import ModernPaymentIntegration from './components/ModernPaymentIntegration';
import AIAssistant from './components/AIAssistant';
import UnifiedSystemDashboard from './components/UnifiedSystemDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-8">
      <div className="container mx-auto px-4">
        {/* ヘッダー */}
        <header className="text-center mb-12">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1 rounded-3xl inline-block mb-6">
            <div className="bg-gray-900 px-12 py-6 rounded-3xl">
              <h1 className="text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                🌐 TK Global Bank
              </h1>
            </div>
          </div>
          <p className="text-white text-2xl font-bold mb-2">
            完全統合金融プラットフォーム
          </p>
          <p className="text-blue-300 text-lg">
            REAL送金 • 金融ライセンス • グローバル送金 • 法人サービス • 収益化
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
              🟢 ALL SYSTEMS ONLINE
            </span>
            <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
              🤖 AI POWERED
            </span>
          </div>
        </header>

        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <AIAssistant />
          <UnifiedSystemDashboard />
        </div>

        {/* 完全金融プラットフォーム */}
        <CompleteFinancialPlatform />

        {/* 決済統合 */}
        <div className="mt-12">
          <ModernPaymentIntegration />
        </div>

        {/* フッター */}
        <footer className="mt-16">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-10 shadow-2xl text-white">
            <h3 className="text-3xl font-bold text-center mb-6">
              🚀 稼働中の全システムモジュール
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
              {[
                { icon: '🏢', label: 'Corp' },
                { icon: '💸', label: 'Send' },
                { icon: '🏧', label: 'ATM' },
                { icon: '💳', label: 'Cards' },
                { icon: '₿', label: 'Crypto' },
                { icon: '📱', label: 'PWA' },
                { icon: '🌐', label: 'Web' },
                { icon: '💾', label: 'Data' },
                { icon: '🎨', label: 'UI/UX' },
                { icon: '❤️', label: 'Health' },
                { icon: '🔌', label: 'Real API' },
                { icon: '⚖️', label: 'Legal' },
                { icon: '📊', label: 'Audit' },
                { icon: '🔑', label: 'License' },
                { icon: '👨‍💼', label: 'Admin' }
              ].map((module, idx) => (
                <div
                  key={idx}
                  className="bg-green-500/20 border-2 border-green-500 rounded-xl p-4 text-center hover:bg-green-500/30 transition"
                >
                  <div className="text-3xl mb-2">{module.icon}</div>
                  <div className="text-sm font-bold">{module.label}</div>
                  <div className="text-xs text-green-300 mt-1">ONLINE</div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <a
                href="https://hopeful-liberation-production-9d00.up.railway.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition text-lg"
              >
                🚂 Backend API Dashboard →
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
