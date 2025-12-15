module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, context } = req.body || {};
    const responses = {
      greeting: "こんにちは！TK Global Bank AIです。",
      balance: "残高確認中...",
      transfer: "送金処理開始",
      default: `「${prompt || 'リクエスト'}」処理中`
    };
    
    res.status(200).json({
      success: true,
      service: 'AI',
      response: responses[context] || responses.default,
      aiModel: 'TK-GPT-Ultra',
      confidence: 0.95,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
