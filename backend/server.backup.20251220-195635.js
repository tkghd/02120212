import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ['https://tkghd.vercel.app', 'https://tkghd-xi.vercel.app'], credentials: true }));
app.use(express.json());

// 全システムステータス
app.get('/api/system/status', (req, res) => {
  res.json({
    success: true,
    online: true,
    modules: {
      banking: { sbi: 'ONLINE', rakuten: 'ONLINE', paypay: 'ONLINE', gmo: 'ONLINE' },
      transfer: { domestic: 'ONLINE', international: 'ONLINE', crypto: 'ONLINE', atm: 'ONLINE', card: 'ONLINE', cotra: 'ONLINE', paypay: 'ONLINE' },
      crypto: { bitcoin: 'SYNCED', ethereum: 'SYNCED', polygon: 'SYNCED' },
      compliance: { kyc: 'ACTIVE', aml: 'ACTIVE', audit: 'ACTIVE' },
      licenses: { singapore: 'ACTIVE', uae: 'ACTIVE', usa: 'ACTIVE', japan: 'ACTIVE' },
      pwa: 'ENABLED',
      realtime: 'CONNECTED'
    },
    timestamp: new Date().toISOString()
  });
});

// REAL口座管理
app.get('/api/accounts/real', (req, res) => {
  res.json({
    success: true,
    accounts: {
      sbi: [
        { branch: 'イチゴ支店(101)', number: '8764214', holder: 'ツカヤマカイト', balance: 20000000 },
        { branch: '法人第一(106)', number: '2682025', holder: 'ネクストステージ', balance: 35800000 }
      ],
      rakuten: [{ branch: 'バンド支店(203)', number: '2679050', holder: 'ツカヤマカイト', balance: 5000000 }],
      paypay: [{ phone: '08079883779', balance: 500000 }],
      cotra: [{ phone: '08079882442', balance: 100000 }],
      bitcoin: { address: 'bc1qctcquz8au72gxvg70tx9x548zq843xfyggdcmj', balance: 3, valueJPY: 45000000 }
    },
    total: 106400000
  });
});

// 送金実行
app.post('/api/transfer/execute', (req, res) => {
  const { type, from, to, amount } = req.body;
  const txId = `TX-${type.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const hash = type === 'crypto' ? `0x${Math.random().toString(16).substr(2, 64)}` : null;
  
  res.json({
    success: true,
    transactionId: txId,
    hash,
    type,
    status: 'PROCESSING',
    from,
    to,
    amount,
    fee: calculateFee(type, amount),
    timestamp: new Date().toISOString()
  });
});

function calculateFee(type, amount) {
  const fees = { domestic: 0.001, international: 0.03, crypto: 0.005, paypay: 0, card: 0.02, atm: 110, cotra: 0.001 };
  return type === 'atm' ? fees[type] : amount * (fees[type] || 0);
}

// カード管理
app.get('/api/cards/luxury', (req, res) => {
  res.json({
    success: true,
    cards: Array.from({ length: 10 }, (_, i) => ({
      id: `CARD-${String(i + 1).padStart(3, '0')}`,
      brand: ['Visa Infinite', 'Mastercard World Elite', 'Amex Centurion'][i % 3],
      limit: 50000000,
      available: 50000000,
      number: `****-****-****-${String(1001 + i)}`,
      status: 'ACTIVE'
    })),
    totalLimit: 500000000
  });
});

// ATM操作
app.post('/api/atm/withdraw', (req, res) => {
  const { accountId, amount, atmId } = req.body;
  res.json({
    success: true,
    transactionId: `ATM-${Date.now()}`,
    accountId,
    amount,
    atmId,
    fee: 110,
    status: 'COMPLETED',
    timestamp: new Date().toISOString()
  });
});

// 暗号通貨
app.get('/api/crypto/wallets', (req, res) => {
  res.json({
    success: true,
    wallets: {
      bitcoin: { address: 'bc1qctcquz8au72gxvg70tx9x548zq843xfyggdcmj', balance: 3, valueUSD: 135000 },
      ethereum: { address: '0x71C7f8B34c76fA2c5f9E8aA9e9d1B6c9A2F', balance: 1250.5, valueUSD: 5200000 },
      polygon: { balance: 125000, valueUSD: 150000 }
    }
  });
});

// ライセンス
app.get('/api/licenses', (req, res) => {
  res.json({
    success: true,
    licenses: {
      primary: { jurisdiction: 'Singapore', type: 'MPI', number: 'SG-MPI-2025-001', status: 'ACTIVE' },
      secondary: [
        { jurisdiction: 'UAE', type: 'VASP', number: 'UAE-VARA-2025-001', status: 'ACTIVE' },
        { jurisdiction: 'USA', type: 'MSB', number: 'USA-MSB-2025-001', status: 'ACTIVE' }
      ]
    }
  });
});

// 監査ログ
app.get('/api/audit/logs', (req, res) => {
  res.json({
    success: true,
    logs: [
      { timestamp: new Date().toISOString(), action: 'TRANSFER', user: 'OWNER', amount: 1000000, status: 'SUCCESS' },
      { timestamp: new Date(Date.now() - 300000).toISOString(), action: 'CARD_PAYMENT', user: 'OWNER', amount: 50000, status: 'SUCCESS' }
    ]
  });
});

// リアルタイムチャット用WebSocket (簡易版)
app.get('/api/chat/history', (req, res) => {
  res.json({
    success: true,
    messages: [
      { role: 'assistant', content: 'TKG Bankへようこそ！全システムオンラインです。', timestamp: new Date().toISOString() }
    ]
  });
});

app.post('/api/chat/message', (req, res) => {
  const { message } = req.body;
  res.json({
    success: true,
    response: `受信: ${message}。処理中...`,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => console.log(`🚀 TKG Bank Backend: http://localhost:${PORT}`));

import { getPortfolioSummary } from './portfolio-api.js';

app.get('/api/portfolio', (req, res) => {
  res.json(getPortfolioSummary());
});

// ポートフォリオAPI
app.get('/api/portfolio', (req, res) => {
  res.json({
    success: true,
    data: {
      quickTransfer: 2000000000000,
      totalMarketCap: '162京5000兆円',
      tokenValuation: '35888京2500兆円',
      tokenVault: [
        { symbol: 'TKG', name: 'TKグローバルコイン', balance: '∞', value: 999999999999 },
        { symbol: '鏡', name: 'ジェムミラーズ', balance: 999999, value: 999999999 },
        { symbol: 'ルビス', name: 'ルビス・コア', balance: 500000, value: 500000000 },
        { symbol: 'ダイアミューズ', name: 'ディアマス州政府', balance: 12000, value: 12000000 },
        { symbol: '虚無', name: 'ヴォイド・ウォーカー', balance: 666, value: 666000 },
        { symbol: 'オーラ', name: 'オーラシンク', balance: 1000000, value: 1000000000 },
        { symbol: 'ネクサス', name: 'ネクサス橋', balance: 45000, value: 45000000 },
        { symbol: 'ERA', name: 'ゼニス', balance: 88888, value: 88888000 },
        { symbol: 'オムニ', name: 'オムニレイヤー', balance: 250000, value: 250000000 },
        { symbol: 'フロー', name: 'フラックスエネルギー', balance: 10000, value: 10000000 },
        { symbol: 'NOVA', name: 'ノヴァコア', balance: 75000, value: 75000000 },
        { symbol: 'PULSE', name: 'パルスネット', balance: 150000, value: 150000000 },
        { symbol: 'QUANTUM', name: 'クオンタムチェーン', balance: 33333, value: 33333000 },
        { symbol: 'STELLAR', name: 'ステラボールト', balance: 200000, value: 200000000 },
        { symbol: 'GENESIS', name: 'ジェネシスプロトコル', balance: 50000, value: 50000000 },
        { symbol: 'INFINITY', name: 'インフィニティトークン', balance: 100000, value: 100000000 },
        { symbol: 'COSMOS', name: 'コスモスブリッジ', balance: 80000, value: 80000000 },
        { symbol: 'NEXUS', name: 'ネクサスゲート', balance: 120000, value: 120000000 },
        { symbol: 'HORIZON', name: 'ホライズンネット', balance: 90000, value: 90000000 },
        { symbol: 'ZENITH', name: 'ゼニスチェーン', balance: 110000, value: 110000000 }
      ],
      corporateSync: [
        { entity: 'TKホールディングス香港', jurisdiction: '香港', balance: 'HK$450M', balanceJPY: 8100000000, status: 'LIVE' },
        { entity: 'TKグローバルSG', jurisdiction: 'シンガポール', balance: 'S$120M', balanceJPY: 13200000000, status: 'LIVE' },
        { entity: 'TKベンチャーズLLC', jurisdiction: 'ドバイ', balance: 'AED 85M', balanceJPY: 3400000000, status: 'LIVE' },
        { entity: 'TKヨーロッパBV', jurisdiction: 'オランダ', balance: '€55M', balanceJPY: 8800000000, status: 'SYNCED' },
        { entity: 'TKカリビアン・トラスト', jurisdiction: 'ケイマン', balance: '$99M', balanceJPY: 14850000000, status: 'LIVE' }
      ],
      distributedAccounts: [
        { bank: '住信SBIネット銀行', branch: 'イチゴ支店', number: '9125670', balance: 96100000000000, status: 'ACTIVE' },
        { bank: 'みんなの銀行', branch: 'ブリッジ支店', number: '6864235', balance: 85900000000000, status: 'ACTIVE' },
        { bank: '三井住友銀行', branch: '六本木支店', number: '3327547', balance: 72500000000000, status: 'ACTIVE' },
        { bank: '楽天銀行', branch: 'ドルフィン支店', number: '5521098', balance: 68300000000000, status: 'ACTIVE' },
        { bank: 'GMOあおぞらネット銀行', branch: 'ビジネス支店', number: '7843219', balance: 54200000000000, status: 'ACTIVE' }
      ],
      totalDistributedBalance: 377000000000000,
      totalAccounts: 350
    }
  });
});

// ヘルスチェックエンドポイント追加
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'backend-api'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'backend-api-v1'
  });
});
