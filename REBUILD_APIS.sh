#!/bin/bash

echo "🔧 API完全再構築開始..."

cd ~/02120212

# 1. pages/apiディレクトリ作成
mkdir -p pages/api

# 2. 既存のAPIファイルを移動（あれば）
if [ -d "api" ]; then
  echo "📦 既存APIファイルを移動中..."
  cp -r api/* pages/api/ 2>/dev/null
fi

# 3. 基本APIを作成（上記のコード）
echo "✍️ 基本APIファイルを作成中..."

cat > pages/api/health.js << 'EOF'
export default function handler(req, res) {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
}
EOF

cat > pages/api/index.js << 'EOF'
export default function handler(req, res) {
  res.status(200).json({
    name: "TK Global Bank API",
    version: "1.0.0",
    count: 22
  });
}
EOF

# 4. 確認
echo "📊 作成されたAPIファイル:"
ls -la pages/api/

# 5. Git操作
git add -A
git commit -m "🚀 Next.js API Routes完全再構築"
git push origin main

# 6. デプロイ
echo "🚀 Vercelに再デプロイ中..."
vercel --prod --yes --force --token="JkHBWkHdjrds6EYMDhuwAU7O" --scope="t-global"

echo "✅ 完了！2分後にテストしてください"
sleep 120

# 7. テスト
echo "🧪 APIテスト開始..."
for endpoint in health index; do
  echo "Testing /api/$endpoint"
  curl -s "https://tkglobalbank.vercel.app/api/$endpoint"
  echo ""
done

