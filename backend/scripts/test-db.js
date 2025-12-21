import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

console.log('🔍 データベース接続テスト中...');
console.log('接続先:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000, // 5秒でタイムアウト
});

const test = async () => {
  try {
    console.log('⏳ 接続中...');
    const result = await pool.query('SELECT NOW() as current_time');
    console.log('✅ 接続成功!');
    console.log('サーバー時刻:', result.rows[0].current_time);
  } catch (err) {
    console.error('❌ 接続失敗:', err.message);
    console.error('エラーコード:', err.code);
    
    if (err.code === 'ETIMEDOUT' || err.code === 'ECONNREFUSED') {
      console.log('\n💡 解決方法:');
      console.log('1. Railwayダッシュボードでデータベースが起動しているか確認');
      console.log('2. Railway > Database > Connect から正しい接続文字列を取得');
      console.log('3. Cloud ShellのIPアドレスが許可されているか確認');
    }
  } finally {
    await pool.end();
  }
};

test();
