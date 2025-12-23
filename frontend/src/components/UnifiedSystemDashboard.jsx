import React, { useState } from 'react';

const UnifiedSystemDashboard = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_BASE = 'https://hopeful-liberation-production-9d00.up.railway.app';

  const checkSystemStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/system/status`);
      const data = await response.json();
      setStatus(data.system);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <span className="text-4xl">🌐</span>
        システム統合ダッシュボード
      </h2>

      <button
        onClick={checkSystemStatus}
        className="w-full bg-blue-600 hover:bg-blue-700 font-semibold py-4 px-6 rounded-xl transition mb-6"
      >
        {loading ? '確認中...' : '📊 システムステータス確認'}
      </button>

      {status && (
        <div className="space-y-4">
          <div className="bg-green-600/20 border border-green-500 rounded-lg p-4">
            <p className="font-bold text-xl">✅ システム稼働中</p>
            <p className="text-sm mt-2">稼働時間: {Math.floor(status.uptime / 60)}分</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {Object.entries(status.modules).map(([name, stat]) => (
              <div
                key={name}
                className="bg-white/10 backdrop-blur rounded-lg p-3 flex items-center justify-between"
              >
                <span className="text-sm capitalize">{name}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  stat === 'ONLINE' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {stat}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedSystemDashboard;
