import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: '*' }));
app.use(express.json());

let BASE_MCAP = 162500000000000000;

app.get('/', (req, res) => {
  res.json({ message: 'TK Global Bank API', status: 'LIVE' });
});

app.get('/api/status', (req, res) => {
  BASE_MCAP += Math.random() * 10000000;
  res.json({
    user: '1190212',
    status: 'QUANTUM_PRODUCTION',
    realMode: true,
    legal: { fsa: '第88888号', license: 'GLOBAL-B1-2026' },
    entities: { total: 532, active: 532 },
    networks: ['ACH', 'SWIFT', 'SEPA', 'ZENGIN'],
    mcap: BASE_MCAP.toLocaleString('ja-JP') + ' JPY',
    vault: '2兆円',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/transfer', (req, res) => {
  const {type, from, to, amount, currency} = req.body;
  if (!from || !to || !amount) {
    return res.status(400).json({error: 'Missing fields'});
  }
  const txId = `TX-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  const proof = crypto.createHash('sha256').update(txId + String(amount)).digest('hex');
  res.json({
    success: true,
    txId,
    type: type || 'STANDARD',
    from,
    to,
    amount: Number(amount),
    currency: currency || 'JPY',
    proof,
    timestamp: new Date().toISOString(),
    status: 'SIMULATED',
    network: String(type || '').toUpperCase().includes('ZENGIN') ? 'ZENGIN' : 'ACH'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
