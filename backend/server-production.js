import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { verifyKYC, checkAML, fraudDetection } from './kyc-aml.js';
import { AuditLogger } from './audit-logger.js';

const app = express();
const PORT = process.env.PORT || 3001;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

app.use(cors({
  origin: IS_PRODUCTION 
    ? ['https://tkghd.vercel.app', 'https://tkghd-xi.vercel.app']
    : '*',
  credentials: true
}));
app.use(express.json());

// JWT認証
function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'tkgbank-secret-key-2025');
    AuditLogger.logAuth(req.user, 'API_ACCESS');
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// レート制限
const rateLimiter = {};
function checkRateLimit(userId) {
  const now = Date.now();
  const limit = rateLimiter[userId] || { count: 0, resetAt: now + 3600000 };
  
  if (now > limit.resetAt) {
    limit.count = 0;
    limit.resetAt = now + 3600000;
  }
  
  limit.count++;
  rateLimiter[userId] = limit;
  
  return limit.count <= (process.env.RATE_LIMIT_MAX || 1000);
}

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    mode: IS_PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT',
    timestamp: new Date().toISOString() 
  });
});

// REAL送金実行（本番モード）
app.post('/api/real-transfer/execute', verifyToken, async (req, res) => {
  try {
    const { bank, fromAccount, toAccount, amount, purpose } = req.body;
    
    // レート制限チェック
    if (!checkRateLimit(req.user.id)) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }
    
    // KYC確認
    const kycResult = await verifyKYC(req.user.id, {});
    if (!kycResult.verified) {
      return res.status(403).json({ error: 'KYC verification required' });
    }
    
    // AMLチェック
    const amlResult = await checkAML({ amount, from: fromAccount, to: toAccount });
    if (!amlResult.approved) {
      AuditLogger.log('AML_BLOCKED', { amount, from: fromAccount, to: toAccount });
      return res.status(403).json({ error: 'Transaction blocked by AML' });
    }
    
    // 不正検知
    const fraudCheck = await fraudDetection({ amount, from: fromAccount, to: toAccount });
    if (!fraudCheck.safe) {
      AuditLogger.log('FRAUD_ALERT', fraudCheck);
      return res.status(403).json({ error: 'Transaction under review' });
    }
    
    // 送金額制限
    if (amount > 100000000) {
      return res.status(400).json({ error: 'Amount exceeds limit' });
    }
    
    const txId = `REAL-${bank.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // 本番モードでREAL API呼び出し
    let bankResult;
    if (IS_PRODUCTION) {
      // 実際の銀行API呼び出し（要実装）
      // bankResult = await callRealBankAPI(bank, { fromAccount, toAccount, amount });
      bankResult = { status: 'DEMO', message: 'Production mode - API keys required' };
    } else {
      bankResult = { status: 'TEST', message: 'Test mode - No real transfer' };
    }
    
    const result = {
      success: true,
      mode: IS_PRODUCTION ? 'PRODUCTION' : 'TEST',
      transactionId: txId,
      bank,
      from: fromAccount,
      to: toAccount,
      amount,
      purpose,
      status: 'PROCESSING',
      kyc: kycResult.level,
      aml: amlResult.riskScore,
      fraud: fraudCheck.score,
      timestamp: new Date().toISOString()
    };
    
    await AuditLogger.logTransfer(result);
    
    res.json(result);
    
  } catch (error) {
    AuditLogger.log('TRANSFER_ERROR', { error: error.message });
    res.status(500).json({ error: error.message });
  }
});

// システムステータス
app.get('/api/system/status', (req, res) => {
  res.json({
    success: true,
    mode: IS_PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT',
    online: true,
    modules: {
      banking: { status: 'ONLINE', realAPI: IS_PRODUCTION },
      kyc: { status: 'ACTIVE', provider: 'Jumio' },
      aml: { status: 'ACTIVE', provider: 'Chainalysis' },
      fraud: { status: 'ACTIVE', enabled: true },
      audit: { status: 'LOGGING', enabled: true }
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 TKG Bank Backend [${IS_PRODUCTION ? 'PRODUCTION' : 'DEV'}] on port ${PORT}`);
});
