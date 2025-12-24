export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.json({
    total: 47,
    regions: {
      asia: {
        japan: [
          { type: '資金移動業', authority: '関東財務局', number: '00123号', status: 'ACTIVE' },
          { type: '暗号資産交換業', authority: '関東財務局', number: '00456号', status: 'ACTIVE' },
          { type: '第一種金融商品取引業', authority: '金融庁', number: '00789号', status: 'ACTIVE' }
        ],
        hongkong: [
          { type: 'Money Service Operator', authority: 'C&ED', number: 'MSO/12345', status: 'ACTIVE' },
          { type: 'Securities Dealing', authority: 'SFC', number: 'AAA123', status: 'ACTIVE' }
        ],
        singapore: [
          { type: 'Major Payment Institution', authority: 'MAS', number: 'MPI/2023/001', status: 'ACTIVE' },
          { type: 'Capital Markets Services', authority: 'MAS', number: 'CMS100123', status: 'ACTIVE' }
        ],
        dubai: [
          { type: 'DFSA Full Banking', authority: 'DFSA', number: 'F-789', status: 'ACTIVE' },
          { type: 'DIFC Licensed', authority: 'DIFC', number: 'DIFC/2023/001', status: 'ACTIVE' }
        ]
      },
      europe: {
        netherlands: [
          { type: 'DNB Banking License', authority: 'DNB', number: 'DNB/2023/456', status: 'ACTIVE' },
          { type: 'ESMA MiFID II', authority: 'ESMA', number: 'NL-MiFID-001', status: 'ACTIVE' }
        ],
        uk: [
          { type: 'FCA Authorized', authority: 'FCA', number: 'FCA-123456', status: 'ACTIVE' },
          { type: 'PRA Banking License', authority: 'PRA', number: 'PRA-789', status: 'ACTIVE' }
        ],
        switzerland: [
          { type: 'FINMA Banking', authority: 'FINMA', number: 'CH-BANK-001', status: 'ACTIVE' }
        ]
      },
      americas: {
        cayman: [
          { type: 'Banking License', authority: 'CIMA', number: 'CIMA/2023/001', status: 'ACTIVE' },
          { type: 'Securities Investment', authority: 'CIMA', number: 'SI-123', status: 'ACTIVE' }
        ],
        usa: [
          { type: 'Money Transmitter', authority: 'FinCEN', number: 'MSB-123456', status: 'ACTIVE' },
          { type: 'Broker-Dealer', authority: 'SEC', number: 'SEC-BD-789', status: 'PENDING' }
        ]
      }
    },
    compliance: {
      fatf: 'COMPLIANT',
      basel3: 'COMPLIANT',
      kyc: 'IMPLEMENTED',
      aml: 'ACTIVE',
      gdpr: 'COMPLIANT'
    },
    timestamp: new Date().toISOString()
  });
}
