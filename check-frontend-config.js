// フロントエンドのAPI接続先を確認
const config = {
  vercelAPI: 'https://tkghd-api.vercel.app',
  railwayAPI: 'https://hopeful-liberation-production-9d00.up.railway.app',
  localZengin: 'http://localhost:8082'
};

console.log('Frontend API Configuration:');
console.log(JSON.stringify(config, null, 2));
