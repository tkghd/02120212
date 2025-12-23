[先ほどの完全なバックエンドコード]

app.get('/api/legal/jp', (req, res) => {
  res.json({
    country: 'Japan',
    license: '資金移動業者登録',
    authority: '関東財務局',
    compliance: ['KYC', 'AML', '犯収法']
  });
});

app.get('/api/exchange-rate/USD/JPY', (req, res) => {
  res.json({ from: 'USD', to: 'JPY', rate: 150.25 });
});

console.log('✅ Endpoints added');
