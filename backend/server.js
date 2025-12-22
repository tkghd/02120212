import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Bank Transfer API
app.post('/api/bank/transfer', (req, res) => {
  const { fromBank, toBank, amount, recipient } = req.body;
  
  res.json({
    success: true,
    transferId: `TXN-${Date.now()}`,
    fromBank,
    toBank,
    amount,
    recipient,
    status: 'COMPLETED',
    mode: process.env.REAL_TRANSFER_ENABLED === 'true' ? 'REAL' : 'MOCK',
    timestamp: new Date().toISOString()
  });
});

// Bank API
app.post('/api/bank', (req, res) => {
  res.json({
    success: true,
    banks: [
      { id: 'sbi', name: 'SBI Net Bank', status: 'CONNECTED' },
      { id: 'rakuten', name: 'Rakuten Bank', status: 'CONNECTED' }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
