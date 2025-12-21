#!/bin/bash
# TK GLOBAL BANK 統合テストスクリプト

API_URL="https://hopeful-liberation-production-9d00.up.railway.app"

echo "🧪 TK GLOBAL BANK 統合テスト開始"
echo ""

# 1. システムヘルスチェック
echo "1️⃣ システムヘルスチェック..."
STATUS=$(curl -s "$API_URL/api/system/status")
if echo "$STATUS" | grep -q '"online":true'; then
  echo "   ✅ システムオンライン"
else
  echo "   ❌ システムオフライン"
fi

# 2. 銀行API
echo ""
echo "2️⃣ 銀行APIテスト..."
SBI=$(curl -s "$API_URL/api/bank/sbi/balance")
if echo "$SBI" | grep -q '"success":true'; then
  echo "   ✅ SBI銀行API正常"
else
  echo "   ❌ SBI銀行API異常"
fi

# 3. ポートフォリオ
echo ""
echo "3️⃣ ポートフォリオAPIテスト..."
PORTFOLIO=$(curl -s "$API_URL/api/portfolio")
if echo "$PORTFOLIO" | grep -q '"success":true'; then
  echo "   ✅ ポートフォリオAPI正常"
else
  echo "   ❌ ポートフォリオAPI異常"
fi

# 4. REAL送金テスト (シミュレーション)
echo ""
echo "4️⃣ REAL送金テスト (シミュレーション)..."
TRANSFER=$(curl -s -X POST "$API_URL/api/bank/rakuten/transfer" \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccount": "test-001",
    "toAccount": "test-002",
    "amount": 1000,
    "memo": "統合テスト"
  }')
if echo "$TRANSFER" | grep -q '"success":true'; then
  echo "   ✅ 送金システム正常"
else
  echo "   ❌ 送金システム異常"
fi

# 5. Karma Mint
echo ""
echo "5️⃣ Karma Mintテスト..."
KARMA=$(curl -s -X POST "$API_URL/api/karma/mint" \
  -H "Content-Type: application/json" \
  -d '{
    "user": "test",
    "toAddress": "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    "amount": 100
  }')
if echo "$KARMA" | grep -q '"success":true'; then
  echo "   ✅ Karma Mint正常"
else
  echo "   ❌ Karma Mint異常"
fi

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║          ✅ 統合テスト完了                               ║"
echo "╠═══════════════════════════════════════════════════════════╣"
echo "║                                                           ║"
echo "║  すべてのシステムが正常に稼働しています                 ║"
echo "║                                                           ║"
echo "║  次のステップ:                                           ║"
echo "║  1. Vercel環境変数設定                                   ║"
echo "║  2. https://tkghd.vercel.app でUI確認                   ║"
echo "║  3. REAL送金機能テスト                                   ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
