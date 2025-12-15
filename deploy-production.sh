#!/bin/bash
echo "🚀 本番環境デプロイ開始..."

# ビルド
echo "📦 ビルド中..."
npm run build

# Git
echo "📤 Git push..."
git add .
git commit -m "Production: All payment systems LIVE - $(date)"
git push

echo "✅ デプロイ完了！"
echo "🌐 URL: https://tkghd.vercel.app"
