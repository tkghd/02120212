import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const migrate = async () => {
  try {
    console.log('🚀 マイグレーション開始...');
    
    // テーブル作成
    await pool.query(`
      -- ユーザーテーブル
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        full_name TEXT,
        wallet_address TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      -- トランザクションテーブル
      CREATE TABLE IF NOT EXISTS transactions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        from_account TEXT,
        to_account TEXT,
        amount NUMERIC,
        currency TEXT DEFAULT 'JPY',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    console.log('✅ テーブル作成完了');

    // RLSを有効化
    await pool.query(`
      -- RLS有効化
      ALTER TABLE users ENABLE ROW LEVEL SECURITY;
      ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
    `);
    
    console.log('✅ RLS有効化完了');

    // ポリシー作成
    await pool.query(`
      -- usersテーブルのポリシー
      DROP POLICY IF EXISTS "Users can view own data" ON users;
      CREATE POLICY "Users can view own data"
        ON users FOR SELECT
        TO authenticated
        USING (auth.uid()::text = id::text);

      DROP POLICY IF EXISTS "Users can update own data" ON users;
      CREATE POLICY "Users can update own data"
        ON users FOR UPDATE
        TO authenticated
        USING (auth.uid()::text = id::text)
        WITH CHECK (auth.uid()::text = id::text);

      DROP POLICY IF EXISTS "Users can insert own data" ON users;
      CREATE POLICY "Users can insert own data"
        ON users FOR INSERT
        TO authenticated
        WITH CHECK (auth.uid()::text = id::text);

      -- transactionsテーブルのポリシー
      DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
      CREATE POLICY "Users can view own transactions"
        ON transactions FOR SELECT
        TO authenticated
        USING (auth.uid()::text = user_id::text);

      DROP POLICY IF EXISTS "Users can create transactions" ON transactions;
      CREATE POLICY "Users can create transactions"
        ON transactions FOR INSERT
        TO authenticated
        WITH CHECK (auth.uid()::text = user_id::text);

      -- 管理者用: すべて閲覧可能 (service_roleキー使用時)
      DROP POLICY IF EXISTS "Service role can view all" ON users;
      CREATE POLICY "Service role can view all"
        ON users FOR ALL
        TO service_role
        USING (true)
        WITH CHECK (true);

      DROP POLICY IF EXISTS "Service role can manage transactions" ON transactions;
      CREATE POLICY "Service role can manage transactions"
        ON transactions FOR ALL
        TO service_role
        USING (true)
        WITH CHECK (true);
    `);
    
    console.log('✅ RLSポリシー作成完了');

    // テーブル確認
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);
    
    console.log('📋 作成されたテーブル:', tables.rows.map(r => r.table_name).join(', '));
    console.log('✅ マイグレーション完了!');
    
  } catch (err) {
    console.error('❌ マイグレーション失敗:', err.message);
    if (err.code) console.error('エラーコード:', err.code);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

migrate();
