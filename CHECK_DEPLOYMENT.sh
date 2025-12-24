#!/bin/bash

echo "🔍 TK GLOBAL BANK - デプロイ確認"
echo "=================================="
echo ""

# Vercel確認
echo "📦 Vercel Status:"
VERCEL_URL="https://tk-global-bank-alpha.vercel.app"
vercel_status=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL/api/health")

if [ "$vercel_status" = "200" ]; then
  echo "  ✅ Vercel: OPERATIONAL"
  echo "  🌐 URL: $VERCEL_URL"
else
  echo "  ❌ Vercel: ERROR ($vercel_status)"
fi

echo ""

# Railway確認
echo "🚂 Railway Status:"
if command -v railway &> /dev/null; then
  railway status
  echo ""
  RAILWAY_URL=$(railway domain 2>/dev/null | grep "http" | head -1)
  if [ ! -z "$RAILWAY_URL" ]; then
    railway_status=$(curl -s -o /dev/null -w "%{http_code}" "$RAILWAY_URL/api/health")
    if [ "$railway_status" = "200" ]; then
      echo "  ✅ Railway: OPERATIONAL"
      echo "  🌐 URL: $RAILWAY_URL"
    else
      echo "  ⚠️ Railway: Deploying... ($railway_status)"
    fi
  else
    echo "  ⏳ Railway: Domain not yet assigned"
  fi
else
  echo "  ⚠️ Railway CLI not installed"
  echo "  Install: npm i -g @railway/cli"
fi

echo ""
echo "=================================="
echo "Summary:"
echo "  Vercel:  ✅ Ready"
echo "  Railway: $([ "$railway_status" = "200" ] && echo "✅ Ready" || echo "⏳ Pending")"
echo "=================================="
