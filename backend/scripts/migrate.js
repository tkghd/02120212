require('dotenv').config();
const { Pool } = require('pg');

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
  } catch (err) {
    console.error('❌ マイグレーション失敗:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

migrate();
