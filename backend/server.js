
app.post('/api/transfer', (req, res) => {
  const {type, from, to, amount, currency} = req.body;
  if (!from || !to || !amount) {
    return res.status(400).json({error: 'Missing fields'});
  }
  const txId = `TX-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  const proof = crypto.createHash('sha256').update(txId + amount.toString()).digest('hex');
  res.json({
    success: true,
    txId,
    type: type || 'STANDARD',
    from,
    to,
    amount: parseFloat(amount),
    currency: currency || 'JPY',
    proof,
    timestamp: new Date().toISOString(),
    status: 'SIMULATED',
    network: type?.toUpperCase().includes('ZENGIN') ? 'ZENGIN' : 'ACH'
  });
});

app.post('/api/transfer', (req, res) => {
  const {type, from, to, amount, currency} = req.body;
  if (!from || !to || !amount) {
    return res.status(400).json({error: 'Missing fields'});
  }
  const txId = `TX-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  const proof = crypto.createHash('sha256').update(txId + amount.toString()).digest('hex');
  res.json({
    success: true,
    txId,
    type: type || 'STANDARD',
    from,
    to,
    amount: parseFloat(amount),
    currency: currency || 'JPY',
    proof,
    timestamp: new Date().toISOString(),
    status: 'SIMULATED',
    network: type?.toUpperCase().includes('ZENGIN') ? 'ZENGIN' : 'ACH'
  });
});
