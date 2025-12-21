const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store = {
  users: new Map([['TKG-OWNER-001', { id: 'TKG-OWNER-001', balance: 2e15 }]]),
  transactions: new Map()
};

app.all('*', (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => res.json({ status: 'OK', api: 'TKG Transfer' }));
app.get('/api/health', (req, res) => res.json({ healthy: true }));
app.get('/api/balance/:userId', (req, res) => {
  const user = store.users.get(req.params.userId);
  res.json(user ? { balance: user.balance } : { error: 'Not found' });
});
app.post('/api/transfer/instant', (req, res) => {
  const { fromUserId, toIdentifier, amount, note } = req.body;
  const tx = {
    id: `TX${Date.now()}`,
    fromUserId, toIdentifier, amount, note,
    status: 'completed',
    createdAt: new Date().toISOString()
  };
  store.transactions.set(tx.id, tx);
  console.log('✅ Transfer:', tx.id);
  res.json(tx);
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 API on :${PORT}`));
