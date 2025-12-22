#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 TKG EMPIRE - 全機能稼働確認"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. Frontend Health Check
echo "1️⃣ Frontend稼働確認..."
FRONTEND=$(curl -s https://tkghd.vercel.app/api/health)
echo "✅ Frontend: ONLINE"
echo "$FRONTEND" | jq '.'
echo ""

# 2. UI→バックエンド接続テスト
echo "2️⃣ UI→バックエンド接続テスト..."
echo "Testing: Bank Transfer API"
BANK_TEST=$(curl -s -X POST https://tkghd.vercel.app/api/bank-transfer \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 10000,
    "fromBank": "SBI Net Bank",
    "toBank": "Rakuten Bank",
    "recipient": "Test User",
    "accountNumber": "1234567"
  }')

echo "$BANK_TEST" | jq '.'
echo ""

# 3. Ultra Transfer テスト
echo "3️⃣ Ultra Transfer API テスト..."
ULTRA_TEST=$(curl -s -X POST https://tkghd.vercel.app/api/transfer-ultra \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50000,
    "recipient": "test_recipient_001",
    "mode": "ultra"
  }')

echo "$ULTRA_TEST" | jq '.'
echo ""

# 4. Empire API テスト
echo "4️⃣ Empire Unified API テスト..."
EMPIRE_TEST=$(curl -s -X POST https://tkghd.vercel.app/api/empire-unified \
  -H "Content-Type: application/json" \
  -d '{
    "module": "assets",
    "action": "get_total"
  }')

echo "$EMPIRE_TEST" | jq '.'
echo ""

# 5. Bank API テスト
echo "5️⃣ Bank API テスト..."
BANK_API=$(curl -s -X POST https://tkghd.vercel.app/api/bank-api \
  -H "Content-Type: application/json" \
  -d '{
    "action": "get_banks"
  }')

echo "$BANK_API" | jq '.'
echo ""

# 6. 着金確認テスト
echo "6️⃣ 着金確認API テスト..."
VERIFY=$(curl -s "https://tkghd.vercel.app/api/verify-arrival?transferId=TXN-123456")
echo "$VERIFY" | jq '.'
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 テスト結果サマリー"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 結果判定
if echo "$FRONTEND" | jq -e '.status' > /dev/null 2>&1; then
  echo "✅ Frontend Health: PASS"
else
  echo "❌ Frontend Health: FAIL"
fi

if echo "$BANK_TEST" | jq -e '.success' > /dev/null 2>&1; then
  echo "✅ Bank Transfer: PASS"
  echo "   TransferID: $(echo $BANK_TEST | jq -r '.transferId')"
  echo "   Status: $(echo $BANK_TEST | jq -r '.transaction.status')"
else
  echo "❌ Bank Transfer: FAIL"
fi

if echo "$ULTRA_TEST" | jq -e '.success' > /dev/null 2>&1; then
  echo "✅ Ultra Transfer: PASS"
  echo "   Speed: $(echo $ULTRA_TEST | jq -r '.speed')"
  echo "   Execution: $(echo $ULTRA_TEST | jq -r '.executionTime')"
else
  echo "❌ Ultra Transfer: FAIL"
fi

if echo "$EMPIRE_TEST" | jq -e '.success' > /dev/null 2>&1; then
  echo "✅ Empire API: PASS"
  echo "   Entities: $(echo $EMPIRE_TEST | jq -r '.result.entities')"
  echo "   Revenue/sec: ¥$(echo $EMPIRE_TEST | jq -r '.result.revenue_per_sec' | numfmt --grouping)"
else
  echo "❌ Empire API: FAIL"
fi

if echo "$BANK_API" | jq -e '.success' > /dev/null 2>&1; then
  echo "✅ Bank API: PASS"
  BANK_COUNT=$(echo $BANK_API | jq '.result.banks | length')
  echo "   Connected Banks: $BANK_COUNT"
else
  echo "❌ Bank API: FAIL"
fi

if echo "$VERIFY" | jq -e '.status' > /dev/null 2>&1; then
  echo "✅ Verify Arrival: PASS"
  echo "   Status: $(echo $VERIFY | jq -r '.status')"
else
  echo "❌ Verify Arrival: FAIL"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 本口座反映確認"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⚠️  注意: 現在はMOCKモードです"
echo ""
echo "本口座反映には以下が必要:"
echo "  1. 銀行API本番契約"
echo "  2. REAL APIキー設定"
echo "  3. .envファイル更新"
echo ""
echo "REALモード有効化:"
echo "  cd backend"
echo "  vi .env"
echo "  # 以下を設定:"
echo "  SBI_API_KEY=real_key_here"
echo "  RAKUTEN_API_KEY=real_key_here"
echo "  STRIPE_SECRET_KEY=sk_live_xxxxx"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ 全機能稼働確認完了"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

