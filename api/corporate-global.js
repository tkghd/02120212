export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  res.status(200).json({
    corporate: {
      name: 'TK Global Holdings',
      type: 'International Financial Corporation',
      headquarters: {
        country: 'Japan',
        address: 'Tokyo, Japan',
        registrationNumber: '0100-01-123456'
      },
      subsidiaries: [
        { name: 'TKG Bank Japan', country: 'Japan', license: '資金移動業者' },
        { name: 'TKG Crypto Exchange', country: 'Japan', license: '暗号資産交換業者' },
        { name: 'TKG Global Payment', country: 'Singapore', license: 'Major Payment Institution' },
        { name: 'TKG Digital Asset', country: 'UAE', license: 'VARA Licensed' }
      ],
      licenses: {
        japan: ['資金移動業者', '暗号資産交換業者', '第二種金融商品取引業'],
        international: ['MPI License (Singapore)', 'VARA (UAE)', 'MSB (USA)']
      },
      capitalStock: '¥10,000,000,000',
      employees: 450,
      founded: '2025'
    }
  });
}
