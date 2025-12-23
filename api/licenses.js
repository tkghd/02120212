export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  res.json({
    licenses: {
      japan: [
        { type: '資金移動業', number: '関東財務局長第00123号', status: 'ACTIVE' },
        { type: '暗号資産交換業', number: '関東財務局長第00456号', status: 'ACTIVE' }
      ],
      hongkong: [
        { type: 'Money Service Operator', number: 'MSO/12345', status: 'ACTIVE' }
      ],
      singapore: [
        { type: 'Major Payment Institution', number: 'MPI/2023/001', status: 'ACTIVE' }
      ],
      dubai: [
        { type: 'DFSA License', number: 'DFSA/2023/789', status: 'ACTIVE' }
      ],
      netherlands: [
        { type: 'DNB License', number: 'DNB/2023/456', status: 'ACTIVE' }
      ],
      cayman: [
        { type: 'Banking License', number: 'CIMA/2023/001', status: 'ACTIVE' }
      ]
    },
    compliance: {
      kyc: 'IMPLEMENTED',
      aml: 'ACTIVE',
      fatf: 'COMPLIANT',
      audit: 'QUARTERLY'
    },
    timestamp: new Date().toISOString()
  });
}
