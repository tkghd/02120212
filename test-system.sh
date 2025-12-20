#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 TKG GLOBAL EMPIRE - システムテスト"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Vercel Frontend Test
echo "🎨 Frontend Test (Vercel)..."
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://tkghd.vercel.app)
if [ "$FRONTEND_STATUS" = "200" ]; then
  echo "✅ Frontend: ONLINE (Status: $FRONTEND_STATUS)"
else
  echo "❌ Frontend: ERROR (Status: $FRONTEND_STATUS)"
fi

# Health API Test
echo ""
echo "🏥 Health Check API Test..."
HEALTH_RESPONSE=$(curl -s https://tkghd.vercel.app/api/health)
if [ -n "$HEALTH_RESPONSE" ]; then
  echo "✅ Health API: ONLINE"
  echo "$HEALTH_RESPONSE" | head -c 200
  echo "..."
else
  echo "❌ Health API: NO RESPONSE"
fi

# Transfer API Test
echo ""
echo "💸 Transfer API Test..."
TRANSFER_TEST=$(curl -s -X POST https://tkghd.vercel.app/api/transfer-ultra \
  -H "Content-Type: application/json" \
  -d '{"amount":1000,"recipient":"test@example.com"}')

if [ -n "$TRANSFER_TEST" ]; then
  echo "✅ Transfer API: ONLINE"
  echo "$TRANSFER_TEST" | head -c 200
  echo "..."
else
  echo "❌ Transfer API: NO RESPONSE"
fi

# Empire Unified API Test
echo ""
echo "🌍 Empire Unified API Test..."
EMPIRE_TEST=$(curl -s -X POST https://tkghd.vercel.app/api/empire-unified \
  -H "Content-Type: application/json" \
  -d '{"module":"assets","action":"get_total"}')

if [ -n "$EMPIRE_TEST" ]; then
  echo "✅ Empire API: ONLINE"
  echo "$EMPIRE_TEST" | head -c 200
  echo "..."
else
  echo "❌ Empire API: NO RESPONSE"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 テスト完了"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
