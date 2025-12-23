import React, { useState } from 'react';
import AIAssistant from './components/AIAssistant';
import UnifiedSystemDashboard from './components/UnifiedSystemDashboard';
import ModernPaymentIntegration from './components/ModernPaymentIntegration';
import RealBankingIntegration from './components/RealBankingIntegration';
import CompleteFinancialPlatform from './components/CompleteFinancialPlatform';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: '🏠 ダッシュボード', icon: '🏠' },
    { id: 'payments', label: '💳 決済', icon: '💳' },
    { id: 'financial', label: '🏦 金融サービス', icon: '🏦' },
    { id: 'ai', label: '🤖 AI', icon: '🤖' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-white">
                🌐 TK Global Bank
              </h1>
              <p className="text-blue-100 text-sm mt-1">
                Complete Financial Platform
              </p>
            </div>
            <div className="flex gap-2">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                🟢 ONLINE
              </span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                🤖 AI
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* タブナビゲーション */}
      <nav className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <UnifiedSystemDashboard />
              <RealBankingIntegration />
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-8">
            <ModernPaymentIntegration />
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="space-y-8">
            <CompleteFinancialPlatform />
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-8">
            <AIAssistant />
          </div>
        )}
      </main>

      {/* フッター */}
      <footer className="bg-gray-800/50 backdrop-blur-lg border-t border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {[
              '🏢 Corp', '💸 Send', '🏧 ATM', '💳 Cards', '₿ Crypto',
              '📱 PWA', '🌐 Web', '💾 Data', '🎨 UI/UX', '❤️ Health',
              '🔌 API', '⚖️ Legal', '📊 Audit', '🔑 License', '👨‍💼 Admin'
            ].map((module, idx) => (
              <div
                key={idx}
                className="bg-green-500/20 border border-green-500 rounded-lg p-3 text-center text-white text-xs font-bold"
              >
                <div className="mb-1">{module}</div>
                <div className="text-green-300 text-[10px]">ONLINE</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://hopeful-liberation-production-9d00.up.railway.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              🚂 Backend API →
            </a>
            <p className="text-gray-500 text-sm mt-2">
              © 2025 TK Global Bank. All systems operational.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
