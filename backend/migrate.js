import pg from 'pg';

const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL, 
  ssl: { rejectUnauthorized: false } 
});

const sql = `
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
`;

pool.query(sql)
  .then(() => { 
    console.log('✅ Migration complete'); 
    pool.end(); 
  })
  .catch(err => { 
    console.error('❌ Migration failed:', err); 
    pool.end(); 
    process.exit(1); 
  });
