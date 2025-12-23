#!/bin/bash
# 🚀 ワンライナー一撃デプロイ
echo "🚀 Starting instant deployment..." && \
npm install --silent && \
npm run build --silent && \
echo "📦 Building complete..." && \
(cd frontend && vercel --prod --yes 2>/dev/null &) && \
(cd backend && railway up --detach 2>/dev/null &) && \
(cd api && vercel --prod --yes 2>/dev/null &) && \
echo "🌐 All services deploying..." && \
sleep 5 && \
echo "✅ Deployment initiated successfully!"
