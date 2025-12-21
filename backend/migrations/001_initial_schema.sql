-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT,
    wallet_address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Example transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    from_account TEXT,
    to_account TEXT,
    amount NUMERIC,
    currency TEXT DEFAULT 'JPY',
    created_at TIMESTAMP DEFAULT NOW()
);
