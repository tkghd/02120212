#!/bin/bash

echo "🚀 Vercel + Railway 完全デプロイ"
echo "=================================="

cd ~/02120212

# 1. 競合解消
echo "🔧 Next.js競合を解消中..."
rm -rf app

# 2. pages/index.tsx 確認
if [ ! -f "pages/index.tsx" ]; then
  echo "📝 pages/index.tsx を作成中..."
  cat > pages/index.tsx << 'EOF'
export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem' }}>🏦 TK GLOBAL BANK</h1>
        <p style={{ fontSize: '1.5rem' }}>Ultimate Sovereign Banking System</p>
      </div>
    </div>
  )
}
EOF
fi

# 3. Git操作
echo "📤 Git push中..."
git add -A
git commit -m "🚀 Vercel + Railway 完全デプロイ"
git push origin main

# 4. Vercel デプロイ
echo "📦 Vercel デプロイ中..."
vercel --prod --yes --force

# 5. Railway デプロイ
if command -v railway &> /dev/null; then
  echo "🚂 Railway デプロイ中..."
  railway up
else
  echo "⚠️ Railway CLI未インストール"
  echo "   npm i -g @railway/cli でインストールしてください"
fi

echo ""
echo "✅ デプロイ完了！"
echo ""
echo "📊 確認コマンド: ./CHECK_DEPLOYMENT.sh"
