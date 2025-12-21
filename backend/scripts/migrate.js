import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false
});

const migrate = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        full_name TEXT,
        wallet_address TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        from_account TEXT,
        to_account TEXT,
        amount NUMERIC,
        currency TEXT DEFAULT 'JPY',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ マイグレーション完了');
    
    // テーブル一覧を表示
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('📋 作成されたテーブル:', tables.rows.map(r => r.table_name).join(', '));
    
  } catch (err) {
    console.error('❌ マイグレーション失敗:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

migrate();
