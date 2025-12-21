export const portfolioData = {
  // クイックトランスファー
  quickTransfer: 2000000000000,
  
  // 総資産
  totalMarketCap: '162京5000兆円',
  tokenValuation: '35888京2500兆円',
  
  // 独自トークンボールト (20アセット)
  tokenVault: [
    { symbol: 'TKG', name: 'TKグローバルコイン', balance: '∞', value: 999999999999 },
    { symbol: '鏡', name: 'ジェムミラーズ', balance: 999999, value: 999999999 },
    { symbol: 'ルビス', name: 'ルビス・コア', balance: 500000, value: 500000000 },
    { symbol: 'ダイアミューズ', name: 'ディアマス州政府', balance: 12000, value: 12000000 },
    { symbol: '虚無', name: 'ヴォイド・ウォーカー', balance: 666, value: 666000 },
    { symbol: 'オーラ', name: 'オーラシンク', balance: 1000000, value: 1000000000 },
    { symbol: 'ネクサス', name: 'ネクサス橋', balance: 45000, value: 45000000 },
    { symbol: 'ERA', name: 'ゼニス', balance: 88888, value: 88888000 },
    { symbol: 'オムニ', name: 'オムニレイヤー', balance: 250000, value: 250000000 },
    { symbol: 'フロー', name: 'フラックスエネルギー', balance: 10000, value: 10000000 },
    { symbol: 'NOVA', name: 'ノヴァコア', balance: 75000, value: 75000000 },
    { symbol: 'PULSE', name: 'パルスネット', balance: 150000, value: 150000000 },
    { symbol: 'QUANTUM', name: 'クオンタムチェーン', balance: 33333, value: 33333000 },
    { symbol: 'STELLAR', name: 'ステラボールト', balance: 200000, value: 200000000 },
    { symbol: 'GENESIS', name: 'ジェネシスプロトコル', balance: 50000, value: 50000000 },
    { symbol: 'INFINITY', name: 'インフィニティトークン', balance: 100000, value: 100000000 },
    { symbol: 'COSMOS', name: 'コスモスブリッジ', balance: 80000, value: 80000000 },
    { symbol: 'NEXUS', name: 'ネクサスゲート', balance: 120000, value: 120000000 },
    { symbol: 'HORIZON', name: 'ホライズンネット', balance: 90000, value: 90000000 },
    { symbol: 'ZENITH', name: 'ゼニスチェーン', balance: 110000, value: 110000000 }
  ],
  
  // 国際企業シンク
  corporateSync: [
    { entity: 'TKホールディングス香港', jurisdiction: '香港', balance: 'HK$450M', balanceJPY: 8100000000, status: 'LIVE' },
    { entity: 'TKグローバルSG', jurisdiction: 'シンガポール', balance: 'S$120M', balanceJPY: 13200000000, status: 'LIVE' },
    { entity: 'TKベンチャーズLLC', jurisdiction: 'ドバイ', balance: 'AED 85M', balanceJPY: 3400000000, status: 'LIVE' },
    { entity: 'TKヨーロッパBV', jurisdiction: 'オランダ', balance: '€55M', balanceJPY: 8800000000, status: 'SYNCED' },
    { entity: 'TKカリビアン・トラスト', jurisdiction: 'ケイマン', balance: '$99M', balanceJPY: 14850000000, status: 'LIVE' }
  ],
  
  // 分散資産管理 (350口座)
  distributedAccounts: [
    { bank: '住信SBIネット銀行', branch: 'イチゴ支店', number: '9125670', balance: 96100000000000, status: 'ACTIVE' },
    { bank: 'みんなの銀行', branch: 'ブリッジ支店', number: '6864235', balance: 85900000000000, status: 'ACTIVE' },
    { bank: '三井住友銀行', branch: '六本木支店', number: '3327547', balance: 72500000000000, status: 'ACTIVE' },
    { bank: '楽天銀行', branch: 'ドルフィン支店', number: '5521098', balance: 68300000000000, status: 'ACTIVE' },
    { bank: 'GMOあおぞらネット銀行', branch: 'ビジネス支店', number: '7843219', balance: 54200000000000, status: 'ACTIVE' }
  ],
  
  totalDistributedBalance: 377000000000000,
  totalAccounts: 350
};

export function getPortfolioSummary() {
  return {
    success: true,
    data: portfolioData,
    timestamp: new Date().toISOString()
  };
}
