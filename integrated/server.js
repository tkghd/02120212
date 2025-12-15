const express = require('express');
const path = require('path');
const cors = require('cors');
const paymentGateway = require('./payment-gateway');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Payment Gateway統合
app.use(paymentGateway);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'online', 
    services: ['PayPay', 'Cotra', 'Bank', 'Card', 'ATM', 'Camera'],
    timestamp: new Date().toISOString() 
  });
});

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API Endpoint Not Found' });
  }
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`⚡ All Payment Systems Online on port ${PORT}`);
});
