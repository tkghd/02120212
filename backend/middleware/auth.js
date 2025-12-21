import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import pool from '../config/database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'tkgbank-secret-key';

// JWTトークン生成
export const generateToken = (userId, address) => {
  return jwt.sign(
    { userId, address, timestamp: Date.now() },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// 認証ミドルウェア
export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    // ユーザー存在確認
    const result = await pool.query(
      'SELECT id, email, full_name, is_active, wallet_address FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0 || !result.rows[0].is_active) {
      return res.status(401).json({ error: 'User not found or inactive' });
    }

    req.user = result.rows[0];
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// 2FA設定
export const setup2FA = () => {
  return speakeasy.generateSecret({
    name: 'TKG Bank',
    length: 32
  });
};

// 2FA検証
export const verify2FA = (token, secret) => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 2
  });
};
