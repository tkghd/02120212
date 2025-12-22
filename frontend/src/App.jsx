import React from 'react';
import RealBankingIntegration from './components/RealBankingIntegration';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🌐 TK Global Bank
          </h1>
          <p className="text-gray-600">
            REAL銀行送金・ATM・カード決済統合システム
          </p>
        </header>

        <RealBankingIntegration />

        <footer className="mt-12 text-center text-sm text-gray-600">
          <p>Backend: <a href="https://hopeful-liberation-production-9d00.up.railway.app" className="text-blue-600 hover:underline">Railway API</a></p>
          <p className="mt-2">✅ 全銀送金 | 🏧 ATM出金 | 💳 カード決済</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
