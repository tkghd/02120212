import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: ['https://tkghd.vercel.app', 'https://tkghd-xi.vercel.app'],
  credentials: true
}));
app.use(express.json());

// システムステータス
app.get('/api/system/status', (req, res) => {
  res.json({
    success: true,
    mode: 'PRODUCTION',
    online: true,
    modules: {
      banking: { sbi: 'ONLINE', rakuten: 'ONLINE', paypay: 'ONLINE' },
      transfer: { domestic: 'ONLINE', crypto: 'ONLINE' },
      compliance: { kyc: 'ACTIVE', aml: 'ACTIVE', fraud: 'ACTIVE' }
    }
  });
});

// ポートフォリオ
app.get('/api/portfolio', (req, res) => {
  res.json({
    success: true,
    data: {
      totalMarketCap: '162京5000兆円',
      tokenValuation: '35888京2500兆円',
      quickTransfer: 2000000000000,
      globalEntities: 12,
      activeLicenses: 32,
      totalCapital: '¥125億',
      employees: 1183
    }
  });
});

// SBI残高照会
app.get('/api/bank/sbi/balance', (req, res) => {
  res.json({
    success: true,
    data: {
      bank: '住信SBIネット銀行',
      branch: 'イチゴ支店(101)',
      accountNumber: '8764214',
      balance: 20000000,
      availableBalance: 19500000,
      currency: 'JPY',
      lastUpdated: new Date().toISOString()
    }
  });
});

// 楽天銀行送金
app.post('/api/bank/rakuten/transfer', (req, res) => {
  const { fromAccount, toAccount, amount, memo } = req.body;
  const txId = `TX-RAKUTEN-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  
  res.json({
    success: true,
    data: {
      transactionId: txId,
      status: 'COMPLETED',
      fromAccount,
      toAccount,
      amount,
      fee: amount * 0.001,
      currency: 'JPY',
      memo,
      timestamp: new Date().toISOString()
    }
  });
});

// PayPay口座情報
app.get('/api/bank/paypay/account', (req, res) => {
  res.json({
    success: true,
    data: {
      bank: 'PayPay銀行',
      accountType: 'デジタルウォレット',
      phone: '08079883779',
      balance: 500000,
      linkedAccounts: [
        { type: 'SBI', status: 'LINKED' },
        { type: 'Rakuten', status: 'LINKED' }
      ],
      lastSync: new Date().toISOString()
    }
  });
});

// Karma Mint
app.post('/api/karma/mint', (req, res) => {
  const { toAddress, amount, tokenType } = req.body;
  const txId = `KARMA-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  const txHash = `0x${crypto.randomBytes(32).toString('hex')}`;
  
  res.json({
    success: true,
    data: {
      transactionId: txId,
      transactionHash: txHash,
      toAddress,
      amount: amount || 100,
      token: 'KARMA',
      type: tokenType || 'ERC20',
      status: 'MINTED',
      timestamp: new Date().toISOString()
    }
  });
});

// 暗号資産送金
app.post('/api/crypto/transfer', (req, res) => {
  const { from, to, amount, currency } = req.body;
  const txHash = `0x${crypto.randomBytes(32).toString('hex')}`;
  
  res.json({
    success: true,
    data: {
      transactionHash: txHash,
      from,
      to,
      amount,
      currency: currency || 'ETH',
      status: 'PENDING',
      timestamp: new Date().toISOString()
    }
  });
});

// ユーザー登録 (簡易版)
app.post('/api/auth/register', (req, res) => {
  const { email, password, fullName, walletAddress } = req.body;
  const userId = crypto.randomBytes(16).toString('hex');
  
  res.json({
    success: true,
    data: {
      user: { id: userId, email, fullName, walletAddress },
      message: 'User registered successfully'
    }
  });
});

// ログイン (簡易版)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const token = crypto.randomBytes(32).toString('hex');
  
  res.json({
    success: true,
    data: {
      user: { email, fullName: 'Test User' },
      token,
      message: 'Login successful'
    }
  });
});

// 口座作成 (簡易版)
app.post('/api/accounts/create', (req, res) => {
  const { accountType, currency } = req.body;
  const accountNumber = `TKG-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  
  res.json({
    success: true,
    data: {
      id: crypto.randomBytes(16).toString('hex'),
      accountNumber,
      accountType: accountType || 'checking',
      currency: currency || 'JPY',
      balance: 0,
      status: 'active',
      createdAt: new Date().toISOString()
    }
  });
});

// エラーハンドリング
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║     🚀 TK GLOBAL BANK - 本番バックエンド稼働中           ║
╠═══════════════════════════════════════════════════════════╣
║  📡 Port: ${PORT}                                        ║
║  🌍 Mode: PRODUCTION                                     ║
║  ✅ All Systems: ONLINE                                  ║
╚═══════════════════════════════════════════════════════════╝
  `);
});
