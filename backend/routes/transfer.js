const express = require('express');
const router = express.Router();

// 国内銀行送金
router.post('/domestic', async (req, res) => {
  const { fromAccount, toAccount, amount, bankCode } = req.body;
  
  res.json({
    success: true,
    transactionId: `DOM-${Date.now()}`,
    fromAccount,
    toAccount,
    amount,
    bankCode,
    status: 'completed',
    timestamp: new Date().toISOString()
  });
});

// 暗号資産送金
router.post('/crypto', async (req, res) => {
  const { fromAddress, toAddress, amount, currency } = req.body;
  
  res.json({
    success: true,
    transactionId: `CRY-${Date.now()}`,
    fromAddress,
    toAddress,
    amount,
    currency,
    status: 'pending',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
