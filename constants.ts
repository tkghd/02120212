
import { SystemModule, WalletState, QueueState, BusinessEntity, OwnerAccount, LicenseData } from './types';

export const INITIAL_MODULES: SystemModule[] = [
  { id: 'god_integrated', name: 'Integrated Core API', command: 'node integrated_server.js', status: 'online', type: 'core', cpu: 99, memory: 98, latency: 12, endpoint: 'http://localhost:3000/api', httpStatus: 200 },
  { id: 'god_hud', name: 'HUD Server', command: 'node hud_server.js', status: 'online', type: 'interface', cpu: 45, memory: 60, latency: 4, endpoint: 'http://localhost:3200', httpStatus: 200 },
  { id: 'god_front', name: 'Frontend Server', command: 'node front_server.js', status: 'online', type: 'interface', cpu: 55, memory: 70, latency: 8, endpoint: 'http://localhost:3000', httpStatus: 200 },
  { id: 'god_ai', name: 'AI Optimizer', command: 'node ai_server.js', status: 'online', type: 'ai', cpu: 92, memory: 95, latency: 150, endpoint: 'http://localhost:3130', httpStatus: 200 },
  { id: 'god_revenue', name: 'Revenue Stream', command: 'node revenue_server.js', status: 'online', type: 'finance', cpu: 88, memory: 80, latency: 5, endpoint: 'internal://rev-stream', httpStatus: 200 },
  { id: 'god_vault', name: 'Vault/Asset Sync', command: 'node vault_server.js', status: 'online', type: 'finance', cpu: 12, memory: 40, latency: 3, endpoint: 'internal://vault-sync', httpStatus: 200 },
  { id: 'god_dex', name: 'DEX Optimizer', command: 'node dex_server.js', status: 'online', type: 'finance', cpu: 78, memory: 85, latency: 22, endpoint: 'internal://dex-opt', httpStatus: 200 },
  { id: 'god_crosschain', name: 'Crosschain Bridge', command: 'node crosschain_server.js', status: 'online', type: 'finance', cpu: 65, memory: 75, latency: 45, endpoint: 'internal://bridge', httpStatus: 200 },
  { id: 'pwa', name: 'PWA Module', command: 'node pwa/index.js', status: 'online', type: 'interface', cpu: 10, memory: 20, latency: 5, endpoint: 'http://localhost:3001/api/status', httpStatus: 200 },
  { id: 'web', name: 'Web Module', command: 'node web/index.js', status: 'online', type: 'interface', cpu: 15, memory: 25, latency: 6, endpoint: 'http://localhost:3002/api/status', httpStatus: 200 },
  { id: 'uiux', name: 'UI/UX Module', command: 'node uiux/index.js', status: 'online', type: 'interface', cpu: 20, memory: 30, latency: 7, endpoint: 'http://localhost:3003/api/status', httpStatus: 200 },
  { id: 'dashboard', name: 'Dashboard Module', command: 'node dashboard/index.js', status: 'online', type: 'utility', cpu: 25, memory: 35, latency: 10, endpoint: 'http://localhost:3010/api/status', httpStatus: 200 },
  { id: 'health', name: 'Health Module', command: 'node health/index.js', status: 'online', type: 'utility', cpu: 8, memory: 15, latency: 3, endpoint: 'http://localhost:3099/api/status', httpStatus: 200 },
  { id: 'real', name: 'Real API Module', command: 'node real/index.js', status: 'online', type: 'core', cpu: 30, memory: 40, latency: 85, endpoint: 'http://34.153.218.156/real', httpStatus: 200 },
  { id: 'compliance', name: 'Compliance Module', command: 'node compliance/index.js', status: 'online', type: 'utility', cpu: 12, memory: 22, latency: 9, endpoint: 'http://localhost:3111/api/status', httpStatus: 200 },
  { id: 'audit', name: 'Audit Module', command: 'node audit/index.js', status: 'online', type: 'utility', cpu: 18, memory: 28, latency: 11, endpoint: 'http://localhost:3103/api/status', httpStatus: 200 },
  { id: 'license', name: 'License Module', command: 'node license/index.js', status: 'online', type: 'utility', cpu: 5, memory: 10, latency: 4, endpoint: 'http://localhost:3120/api/status', httpStatus: 200 },
  { id: 'smartatm', name: 'Smart ATM Module', command: 'node smartatm/index.js', status: 'online', type: 'finance', cpu: 15, memory: 30, latency: 12, endpoint: 'http://localhost:3150/api/status', httpStatus: 200 },
  { id: 'treasury', name: 'Treasury Module', command: 'node treasury/index.js', status: 'online', type: 'finance', cpu: 20, memory: 45, latency: 8, endpoint: 'http://localhost:3132/api/status', httpStatus: 200 },
  { id: 'token', name: 'Token Listing Engine', command: 'node token/index.js', status: 'online', type: 'finance', cpu: 35, memory: 55, latency: 6, endpoint: 'http://localhost:3160/api/status', httpStatus: 200 },
  { id: 'profit', name: '100B Profit Engine', command: 'node profit/index.js', status: 'online', type: 'finance', cpu: 85, memory: 90, latency: 2, endpoint: 'http://localhost:3180/api/status', httpStatus: 200 },
  { id: 'bank', name: 'Bank API Module', command: 'node bank/index.js', status: 'online', type: 'finance', cpu: 40, memory: 60, latency: 15, endpoint: 'http://localhost:3140/api/status', httpStatus: 200 },
  { id: 'remittance', name: 'Remittance Module', command: 'node remittance/index.js', status: 'online', type: 'finance', cpu: 25, memory: 50, latency: 10, endpoint: 'http://localhost:3122/api/status', httpStatus: 200 },
  { id: 'corporate', name: 'Corporate Module', command: 'node corporate/index.js', status: 'online', type: 'business', cpu: 18, memory: 35, latency: 9, endpoint: 'http://localhost:3121/api/status', httpStatus: 200 },
  { id: 'card_ui', name: 'Card UI Module', command: 'node card/index.js', status: 'online', type: 'interface', cpu: 12, memory: 25, latency: 5, endpoint: 'http://localhost:3170/api/status', httpStatus: 200 },
  
  // Godmode / Port 6060 Modules
  { id: 'god_autorun', name: 'Godmode Auto-Run', command: 'node auto_run.js', status: 'online', type: 'core', cpu: 10, memory: 20, latency: 5, endpoint: 'http://localhost:6060/auto-run/start', httpStatus: 200 },
  { id: 'live_deploy', name: 'Live Deploy Engine', command: 'go run live_deploy.go', status: 'online', type: 'deployment', cpu: 60, memory: 80, latency: 25, endpoint: 'http://localhost:6060/start-live-deploy', httpStatus: 200 },
  { id: 'wallet_connect', name: 'Wallet Connect Svc', command: 'node wallet_svc.js', status: 'online', type: 'interface', cpu: 15, memory: 30, latency: 10, endpoint: 'http://localhost:6060/wallet/connect', httpStatus: 200 },
  { id: 'ai_optimize', name: 'AI Auto-Optimize', command: 'python optimize.py', status: 'online', type: 'ai', cpu: 95, memory: 90, latency: 120, endpoint: 'http://localhost:6060/ai/start-optimize', httpStatus: 200 },
  { id: 'nft_mint', name: 'NFT Minting Daemon', command: 'rustc mint_daemon.rs', status: 'online', type: 'finance', cpu: 40, memory: 50, latency: 15, endpoint: 'http://localhost:6060/nft/mint-demo', httpStatus: 200 },
  { id: 'pdf_gen', name: 'PDF Generator', command: 'node pdf_gen.js', status: 'online', type: 'utility', cpu: 20, memory: 40, latency: 40, endpoint: 'http://localhost:6060/pdf/generate', httpStatus: 200 },
];

export const API_CONFIG = {
  REAL_API_IP: '34.153.218.156',
  GLOBAL_VIP: '34.160.120.99',
  ZONE: 'asia-northeast1-a',
  INSTANCE_TYPE: 'n2-standard-16',
  HTTPS_ENABLED: true
};

export const INITIAL_WALLET: WalletState = {
  jpy: '999,999,999,999,999,999', // INFINITE
  usd: '8,888,888,888,888,888',
  eth: '999,999.00',
  btc: '99,999,999.00',
  usdt: '99,999,999,999.00',
  tk_coin: '∞ (INFINITE)',
  lustra: '999,999',
  rubiss: '999,999',
  diamuse: '999,999',
};

export const INITIAL_QUEUES: QueueState = {
  nft: 0,
  pdf: 0,
  withdrawals: 0, // Auto-cleared
  transactions: 9999999,
};

export const STARTUP_LOGS = [
  "SYSTEM BOOT: ΩβαMAX KERNEL ACTIVE",
  "SERVER STATUS: FULL BURST MODE [ONLINE]",
  "NETWORK: MAINNET CONNECTION ESTABLISHED",
  "LIQUIDITY: INFINITE POOL UNLOCKED",
  "BUSINESS LICENSE: 500+ ENTITIES ACTIVE",
  "REALITY OVERWRITE: COMPLETE",
  "URL ROUTING: PROPAAGATED (tkglobalbank.com)",
  "DEPLOYMENT: SUCCESS",
  "GATEWAY: NGINX LOGS VERIFIED [CLEAN]",
  "REAL API KEYS: LOADED (2 ACTIVE)",
  "[TRANSFER] MODULE RESTART: SUCCESS",
  "💠 FULL SYSTEM ONLINE: 全モジュール全チャンネル全機能全システム搭載 💠",
  "💎 SYSTEM IS LIVE. ACCESS GRANTED. 💎",
  "[REMITTANCE] REAL MODULE ONLINE",
  "[REMITTANCE] EXPANSION: COMPLETED",
  "[REMITTANCE] EMBEDDED: 0038-101-8764214",
  "[REMITTANCE] EXPANSION: FULL SUITE ONLINE",
  "[LICENSE] MODULE: FULL ENABLED (BOOTSTRAP COMPLETE)",
  "[AUDIT] EVENT: license_full_enable RECORDED",
  "[NGINX] CONFIG: VALID (RELOADED)",
  "[HUD] NOTIFICATION: LICENSE FULL ENABLE",
  "[SYSTEM] ABSOLUTE ONLINE: ALL MODULES ACTIVE",
  "[PROFIT] ENGINE: DAILY 100B ACTIVE",
  "[NETWORK] STATUS CHECK: 3.123.45.67 [OK]",
  "[NETWORK] FULL MODULE SCAN: 11/11 UP",
  "[IP] EXTERNAL: VERIFIED (35.226.88.195)",
  "[REMITTANCE] REAL MODULE ONLINE",
  "[SYSTEM] INTERACTIVE MODE: ENABLED",
  "[TRANSFER] REAL EXECUTION: 500,000 JPY -> PROCESSED",
  "[NETWORK] SECURE CHECK: 11/11 HTTPS UP",
  "[SSL] CERTIFICATE: VALID (WILDCARD)",
  "[NETWORK] IP MIGRATION: SUCCESS (34.153.218.156)",
  "[GODMODE] FULL DEPLOY: ACTIVE",
  "[GODMODE] AUTO-RUN: ENABLED (PERMANENT)",
  "[DEPLOY] REAL GODMODE: ALL SYSTEMS GO",
  "[NETWORK] EXTERNAL CHECK: 11/11 MODULES REACHABLE (34.153.218.156)",
  "[INFRA] VIP ALLOCATED: 34.160.120.99 (Global)",
  "[LB] GLOBAL LOAD BALANCER: ACTIVE"
];

// Updated Business Portfolio based on user request
export const BUSINESS_PORTFOLIO: BusinessEntity[] = [
  // Governance
  { id: 'hd1', name: 'TK-GLOBAL HD', role: '統括管理、全体戦略・ガバナンス', category: 'governance', revenue: '∞', status: 'active', region: 'global' },
  
  // Finance & Capital
  { id: 'f1', name: 'TK globalneo Bank Inc', role: '海外銀行・口座管理・国際送金', category: 'finance', revenue: '$999M/day', status: 'active', region: 'global' },
  { id: 'f2', name: 'T-capital price', role: '投資・資産管理', category: 'finance', revenue: '$880M/day', status: 'active', region: 'global' },
  { id: 'f3', name: 'T-capital bank', role: '銀行サービス（入出金・貸出）', category: 'finance', revenue: '¥500M/day', status: 'active', region: 'domestic' },
  { id: 'f4', name: 'T-wallet money gate', role: 'デジタルウォレット・資金ゲート', category: 'finance', revenue: '¥300M/day', status: 'active', region: 'global' },
  { id: 'f5', name: 'T/loan.finance', role: '融資・ローン・投資先管理', category: 'finance', revenue: '¥250M/day', status: 'active', region: 'domestic' },

  // Business & Services
  { id: 'b1', name: 'TK global hood', role: 'グローバル事業展開・拠点管理', category: 'business', revenue: '$50M/day', status: 'active', region: 'global' },
  { id: 'b2', name: 'T-Enter price', role: 'エンタープライズ (B2B)', category: 'business', revenue: '¥80M/day', status: 'active', region: 'domestic' },
  { id: 'b3', name: 'T-SIRE Japan', role: '日本向け特定事業', category: 'business', revenue: '¥120M/day', status: 'active', region: 'domestic' },
];

// License Registry Data
export const LICENSE_REGISTRY: LicenseData[] = [
  {
    id: 'lic_dom_001',
    name: 'K-secure trust (国内)',
    type: 'domestic', // Blue
    licenses: { bank: true, securities: true, crypto: true, insurance: true },
    hash: 'sha256:ABCD1234EF567890...',
    expiry: '2026-12-31',
    auditStatus: 'blast -> audit lineage保存済'
  },
  {
    id: 'lic_glo_001',
    name: 'Meta-ledger global (国外)',
    type: 'global', // Red
    licenses: { bank: true, securities: true, crypto: true, insurance: true },
    hash: 'sha256:EFGH5678IJ901234...',
    expiry: '2026-12-31',
    auditStatus: 'blast -> audit lineage保存済'
  },
  {
    id: 'lic_hyb_001',
    name: 'Predictive HUD bank (橋渡し)',
    type: 'hybrid', // Purple
    licenses: { bank: true, securities: true, crypto: true, insurance: true },
    hash: 'sha256:IJKL9012MN345678...',
    expiry: '2026-12-31',
    auditStatus: 'blast -> audit lineage保存済'
  }
];

// Generate 350 Owner Accounts with Limit Break Balances
const generateAccounts = (): OwnerAccount[] => {
  const banks = [
    { name: '住信SBIネット銀行', branches: ['イチゴ', 'ブドウ', 'ミカン', 'レモン', 'リンゴ', '法人第一'] },
    { name: 'みんな銀行', branches: ['ハーバー', 'ブリッジ', 'レインボー', 'クラウド'] },
    { name: '三井住友銀行', branches: ['本店営業部', '丸ノ内', '六本木', '新宿', '渋谷', 'デジタル営業部'] },
    { name: 'ソニー銀行', branches: ['本店', '銀座', 'ポストペット', 'MONEYKit'] },
    { name: '楽天銀行', branches: ['ジャズ', 'ロック', 'サンバ', 'ワルツ', 'オペラ', 'タンゴ'] },
    { name: '三菱UFJ銀行', branches: ['本店', '秋葉原', '雷門', '大阪営業部'] },
    { name: 'みずほ銀行', branches: ['本店', 'インターネット', '丸の内'] },
    // Overseas
    { name: 'HSBC', branches: ['Hong Kong Head', 'Singapore Main', 'London Canary Wharf'], isOverseas: true, currency: 'USD' },
    { name: 'Chase Bank', branches: ['New York Main', 'Silicon Valley', 'Chicago Loop'], isOverseas: true, currency: 'USD' },
    { name: 'DBS Bank', branches: ['Marina Bay', 'Orchard Road'], isOverseas: true, currency: 'USD' },
    { name: 'Barclays', branches: ['London City', 'International'], isOverseas: true, currency: 'EUR' },
  ];

  const accounts: OwnerAccount[] = [];
  
  for (let i = 0; i < 350; i++) {
    const bank = banks[i % banks.length];
    const branch = bank.branches[i % bank.branches.length];
    const isOverseas = !!bank.isOverseas;
    const currency = (bank.currency || 'JPY') as 'JPY' | 'USD' | 'EUR';
    
    // Generate massive random balance (Cheat Mode)
    const baseBalance = Math.floor(Math.random() * 900) + 100; 
    const multiplier = isOverseas ? 1000000000 : 100000000000; // Trillions
    
    accounts.push({
      id: `acc-${i}`,
      bankName: bank.name,
      branchName: branch + (isOverseas ? ' Branch' : '支店'),
      accountType: isOverseas ? 'Checking' : '普通',
      accountNumber: Math.floor(1000000 + Math.random() * 9000000).toString(),
      accountName: isOverseas ? 'TK GLOBAL HOLDINGS LTD' : `TK資産管理口 第${i+1}号`,
      balance: (baseBalance * multiplier).toLocaleString(),
      currency: currency,
      isOverseas: isOverseas
    });
  }
  return accounts;
};

export const OWNER_ACCOUNTS = generateAccounts();
