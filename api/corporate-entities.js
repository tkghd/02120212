export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  res.json({
    entities: [
      {
        name: 'TK Holdings HK Ltd',
        location: 'Hong Kong',
        capital: 'HKD 450,000,000',
        license: 'Money Service Operator',
        revenue: 'HKD 12M/month'
      },
      {
        name: 'TK Global SG Pte Ltd',
        location: 'Singapore',
        capital: 'SGD 120,000,000',
        license: 'Major Payment Institution',
        revenue: 'SGD 3.5M/month'
      },
      {
        name: 'TK Ventures LLC',
        location: 'Dubai',
        capital: 'AED 85,000,000',
        license: 'DFSA License',
        revenue: 'AED 2.8M/month'
      },
      {
        name: 'TK Europe BV',
        location: 'Netherlands',
        capital: 'EUR 55,000,000',
        license: 'DNB License',
        revenue: 'EUR 1.8M/month'
      },
      {
        name: 'TK Caribbean Trust',
        location: 'Cayman Islands',
        capital: 'USD 999,000,000',
        license: 'Banking License',
        revenue: 'USD 32M/month'
      }
    ],
    total: {
      entities: 200,
      totalCapital: '$205T',
      monthlyRevenue: '$895M'
    },
    timestamp: new Date().toISOString()
  });
}
