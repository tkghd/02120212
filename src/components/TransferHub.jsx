import React, { useState } from 'react';
import { Send } from 'lucide-react';

const API = 'https://hopeful-liberation-production-9d00.up.railway.app';

export default function TransferHub() {
  const [form, setForm] = useState({ to: '', amount: '', note: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const transfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/transfer/instant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromUserId: 'TKG-OWNER-001',
          toIdentifier: form.to,
          amount: parseFloat(form.amount),
          note: form.note
        })
      });
      const data = await res.json();
      setResult(data);
      alert(`✅ 送金完了！¥${form.amount}`);
    } catch (err) {
      alert('❌ エラー: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Send className="text-blue-600" />
        リアルタイム送金
      </h2>
      <form onSubmit={transfer} className="space-y-4">
        <input
          placeholder="送金先メール/ID"
          value={form.to}
          onChange={e => setForm({...form, to: e.target.value})}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="number"
          placeholder="金額（円）"
          value={form.amount}
          onChange={e => setForm({...form, amount: e.target.value})}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          placeholder="メモ（任意）"
          value={form.note}
          onChange={e => setForm({...form, note: e.target.value})}
          className="w-full p-3 border rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '送金中...' : '即時送金'}
        </button>
      </form>
      {result && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="font-mono text-sm">TX: {result.id}</p>
        </div>
      )}
    </div>
  );
}
