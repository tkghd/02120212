-- TK GLOBAL BANK データベーススキーマ
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ユーザーテーブル
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  wallet_address VARCHAR(42) UNIQUE,
  kyc_status VARCHAR(50) DEFAULT 'pending',
  two_factor_enabled BOOLEAN DEFAULT false,
  two_factor_secret VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- 口座テーブル
CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  account_type VARCHAR(50) NOT NULL,
  account_number VARCHAR(50) UNIQUE NOT NULL,
  bank_code VARCHAR(10),
  currency VARCHAR(3) DEFAULT 'JPY',
  balance DECIMAL(20, 2) DEFAULT 0.00,
  available_balance DECIMAL(20, 2) DEFAULT 0.00,
  status VARCHAR(50) DEFAULT 'active',
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- トランザクションテーブル
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_account_id UUID REFERENCES accounts(id),
  to_account_id UUID REFERENCES accounts(id),
  transaction_type VARCHAR(50) NOT NULL,
  amount DECIMAL(20, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'JPY',
  fee DECIMAL(20, 2) DEFAULT 0.00,
  status VARCHAR(50) DEFAULT 'pending',
  description TEXT,
  reference_id VARCHAR(100) UNIQUE,
  tx_hash VARCHAR(66),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Karmaトークン
CREATE TABLE IF NOT EXISTS karma_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  token_type VARCHAR(20) NOT NULL,
  token_id BIGINT,
  amount DECIMAL(30, 18),
  wallet_address VARCHAR(42) NOT NULL,
  tx_hash VARCHAR(66),
  metadata JSONB,
  minted_at TIMESTAMP DEFAULT NOW()
);

-- 監査ログ
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50),
  ip_address INET,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_karma_user_id ON karma_tokens(user_id);

-- 初期データ挿入
INSERT INTO users (email, password_hash, full_name, wallet_address, kyc_status, is_active)
VALUES 
  ('admin@tkgbank.com', crypt('admin123', gen_salt('bf')), 'TKG Bank Admin', '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', 'approved', true)
ON CONFLICT (email) DO NOTHING;

-- 成功メッセージ
DO $$ 
BEGIN 
  RAISE NOTICE '✅ Database schema created successfully';
END $$;
