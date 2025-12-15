module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt, context } = req.body;
    
    // AI応答をシミュレート
    const responses = {
      greeting: "こんにちは！TK Global Bank AIアシスタントです。何かお手伝いできることはありますか？",
      balance: "現在の残高を確認しています...",
      transfer: "送金処理を開始します。詳細を教えてください。",
      default: `「${prompt}」について処理しています。AIシステムが稼働中です。`
    };

    const responseText = responses[context] || responses.default;

    res.json({
      success: true,
      service: 'AI',
      response: responseText,
      aiModel: 'TK-GPT-Ultra',
      confidence: 0.95,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
