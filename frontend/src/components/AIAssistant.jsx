import React, { useState, useRef, useEffect } from 'react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 こんにちは!TK Global BankのAIアシスタントです。送金、ライセンス、システム強化など、何でもお手伝いします!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const API_BASE = 'https://hopeful-liberation-production-9d00.up.railway.app';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Claude APIを使用してAI応答を生成
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: `あなたはTK Global Bankのシステムアシスタントです。以下の機能について質問に答えてください:

利用可能な機能:
- 全銀送金 (銀行間送金)
- REAL送金 (リアルタイム送金)
- ATM出金 (QRコード対応)
- カード決済
- Apple Pay / QUICPay
- PayPay / Kyash送金
- 企業ライセンス管理
- AIポートフォリオ分析
- NFT統合
- 暗号通貨スワップ

ユーザーの質問: ${input}

簡潔に、実用的な回答をしてください。`
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = {
          role: 'assistant',
          content: data.content[0].text
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        // フォールバック応答
        const fallbackResponse = generateFallbackResponse(input);
        setMessages(prev => [...prev, { role: 'assistant', content: fallbackResponse }]);
      }
    } catch (error) {
      // エラー時のフォールバック
      const fallbackResponse = generateFallbackResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: fallbackResponse }]);
    }

    setLoading(false);
  };

  const generateFallbackResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('送金') || lowerQuery.includes('振込')) {
      return '💸 送金機能について:\n\n1. **全銀送金**: 国内銀行間の送金に対応\n2. **REAL送金**: リアルタイムで即時反映\n3. **PayPay/Kyash**: P2P送金に対応\n\nご希望の送金方法を選択して、金額と送金先を入力してください。';
    }
    
    if (lowerQuery.includes('atm') || lowerQuery.includes('出金')) {
      return '🏧 ATM出金機能:\n\nカメラでQRコードをスキャンして出金できます。\n対応コンビニ:\n- ファミリーマート\n- ローソン\n- セブンイレブン\n\nPINと企業番号の入力が必要です。';
    }
    
    if (lowerQuery.includes('apple pay') || lowerQuery.includes('quicpay')) {
      return '💳 バーチャルカード決済:\n\n- **Apple Pay**: タップ決済対応\n- **QUICPay**: 後払い決済対応\n\n加盟店で簡単に決済できます。';
    }
    
    if (lowerQuery.includes('ライセンス') || lowerQuery.includes('企業')) {
      return '🏢 企業ライセンス管理:\n\n法人向けの決済ライセンス、送金ライセンスを管理できます。APIキーの発行や権限設定も可能です。';
    }
    
    if (lowerQuery.includes('ai') || lowerQuery.includes('分析')) {
      return '🤖 AI機能:\n\n1. **ポートフォリオ分析**: 資産配分を最適化\n2. **リスク分析**: リスクスコアを評価\n3. **予測取引**: AI予測に基づく取引提案\n\nリアルタイムで市場を分析します。';
    }
    
    if (lowerQuery.includes('nft')) {
      return '🎨 NFT統合:\n\nNFTの購入、販売、管理が可能です。セカンダリーマーケットでの即時決済にも対応しています。';
    }
    
    return `ご質問ありがとうございます!

TK Global Bankでは以下の機能が利用可能です:

💸 **送金・決済**
- 全銀送金、REAL送金
- Apple Pay、QUICPay
- PayPay、Kyash

🏧 **ATM・出金**
- QRコード出金
- コンビニATM対応

🤖 **AI機能**
- ポートフォリオ最適化
- リスク分析
- 予測取引

🎨 **その他**
- NFT統合
- 暗号通貨スワップ
- 企業ライセンス管理

具体的な操作方法をお知りになりたい場合は、機能名を教えてください!`;
  };

  const quickActions = [
    { label: '送金方法を教えて', value: '送金の方法を教えてください' },
    { label: 'ATM出金の手順', value: 'ATM出金の手順を教えてください' },
    { label: 'Apple Payの使い方', value: 'Apple Payの使い方を教えてください' },
    { label: 'システム機能一覧', value: '利用可能な全機能を教えてください' }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-2xl p-6 text-white h-[600px] flex flex-col">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/20">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-3xl">
          🤖
        </div>
        <div>
          <h2 className="text-2xl font-bold">AIアシスタント</h2>
          <p className="text-sm opacity-90">リアルタイム対応・外部連携可能</p>
        </div>
      </div>

      {/* メッセージエリア */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-white text-purple-900'
                  : 'bg-purple-700/50 backdrop-blur'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-purple-700/50 backdrop-blur p-4 rounded-2xl">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* クイックアクション */}
      <div className="mb-4 flex flex-wrap gap-2">
        {quickActions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInput(action.value);
            }}
            className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition"
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* 入力エリア */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="メッセージを入力..."
          className="flex-1 bg-white/20 backdrop-blur border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          送信
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
