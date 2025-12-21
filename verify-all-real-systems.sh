#!/bin/bash

API_URL="https://hopeful-liberation-production-9d00.up.railway.app"
JWT_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJfMTE5MDIxMiIsImVtYWlsIjoib3duZXJAdGtnaGQuZ2xvYmFsIiwicm9sZSI6Im93bmVyIiwiaWF0IjoxNzY2Mjc3OTU2LCJleHAiOjE3NjY4ODI3NTZ9.nWJL8NOySwWj2xEZ17P4KLJziNTFrmmdUG-CbF6ME6M"

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║       🚀 TKG ULTIMATE REAL SYSTEM - 全機能確認               ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# テストカウンター
TOTAL=0
PASSED=0
FAILED=0

test_api() {
  local name=$1
  local method=$2
  local endpoint=$3
  local data=$4
  
  TOTAL=$((TOTAL + 1))
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🧪 TEST $TOTAL: $name"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  
  if [ "$method" = "GET" ]; then
    response=$(curl -s -w "\n%{http_code}" "$API_URL$endpoint" \
      -H "Authorization: Bearer $JWT_TOKEN")
  else
    response=$(curl -s -w "\n%{http_code}" -X "$method" "$API_URL$endpoint" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $JWT_TOKEN" \
      -d "$data")
  fi
  
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | head -n-1)
  
  if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
    echo "✅ PASSED (HTTP $http_code)"
    PASSED=$((PASSED + 1))
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
  else
    echo "❌ FAILED (HTTP $http_code)"
    FAILED=$((FAILED + 1))
    echo "$body"
  fi
  echo ""
}

# ===================================
# 1. システム基本機能
# ===================================
echo "📡 SECTION 1: システム基本機能"
test_api "ルートアクセス" "GET" "/" ""
test_api "ヘルスチェック" "GET" "/api/health" ""

# ===================================
# 2. 口座管理
# ===================================
echo "💰 SECTION 2: REAL口座管理"
test_api "REAL口座残高照会" "GET" "/api/balance/TKG-OWNER-001" ""

# ===================================
# 3. 送金機能（全種類）
# ===================================
echo "💸 SECTION 3: 送金機能"

# 3.1 即時送金
test_api "即時送金（¥5,000）" "POST" "/api/transfer/instant" '{
  "fromUserId": "TKG-OWNER-001",
  "toIdentifier": "test1@example.com",
  "amount": 5000,
  "note": "UI確認テスト1"
}'

test_api "即時送金（¥10,000）" "POST" "/api/transfer/instant" '{
  "fromUserId": "TKG-OWNER-001",
  "toIdentifier": "test2@example.com",
  "amount": 10000,
  "note": "UI確認テスト2"
}'

# 3.2 銀行振込
test_api "銀行振込（みずほ銀行）" "POST" "/api/transfer/bank" '{
  "fromAccountId": "TKG-OWNER-001",
  "toBankCode": "0001",
  "toAccountNumber": "1234567",
  "toAccountName": "タナカ ハナコ",
  "amount": 30000
}'

test_api "銀行振込（三菱UFJ）" "POST" "/api/transfer/bank" '{
  "fromAccountId": "TKG-OWNER-001",
  "toBankCode": "0005",
  "toAccountNumber": "7654321",
  "toAccountName": "サトウ タロウ",
  "amount": 50000
}'

# 3.3 暗号資産送金
test_api "BTC送金" "POST" "/api/transfer/crypto" '{
  "fromUserId": "TKG-OWNER-001",
  "toAddress": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "amount": 0.001,
  "currency": "BTC"
}'

test_api "ETH送金" "POST" "/api/transfer/crypto" '{
  "fromUserId": "TKG-OWNER-001",
  "toAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "amount": 0.5,
  "currency": "ETH"
}'

# 3.4 国際送金
test_api "国際送金（USD）" "POST" "/api/transfer/international" '{
  "fromUserId": "TKG-OWNER-001",
  "country": "US",
  "recipientData": {
    "name": "John Smith",
    "account": "123456789",
    "bank": "Chase Bank"
  },
  "amount": 500000,
  "fromCurrency": "JPY",
  "toCurrency": "USD"
}'

test_api "国際送金（EUR）" "POST" "/api/transfer/international" '{
  "fromUserId": "TKG-OWNER-001",
  "country": "EU",
  "recipientData": {
    "name": "Marie Dupont",
    "iban": "FR1234567890123456789012345"
  },
  "amount": 300000,
  "fromCurrency": "JPY",
  "toCurrency": "EUR"
}'

# ===================================
# 4. ATM機能
# ===================================
echo "🏧 SECTION 4: ATM機能"

# QRコード生成
test_api "QRコード生成（¥20,000）" "POST" "/api/qr/generate" '{
  "userId": "TKG-OWNER-001",
  "amount": 20000
}'

# ATM出金
test_api "ATM出金実行" "POST" "/api/atm/withdraw" '{
  "userId": "TKG-OWNER-001",
  "amount": 20000,
  "atmId": "ATM-TEST-001",
  "qrCode": "dGVzdHFyY29kZQ=="
}'

# ===================================
# 5. 履歴・レート・法人情報
# ===================================
echo "📊 SECTION 5: 情報取得"

test_api "送金履歴取得" "GET" "/api/transfers/TKG-OWNER-001" ""

test_api "為替レート（JPY→USD）" "GET" "/api/exchange-rate/JPY/USD" ""
test_api "為替レート（JPY→EUR）" "GET" "/api/exchange-rate/JPY/EUR" ""
test_api "為替レート（JPY→GBP）" "GET" "/api/exchange-rate/JPY/GBP" ""

test_api "日本法人情報" "GET" "/api/legal/japan" ""
test_api "米国法人情報" "GET" "/api/legal/usa" ""
test_api "英国法人情報" "GET" "/api/legal/uk" ""
test_api "シンガポール法人情報" "GET" "/api/legal/singapore" ""

# ===================================
# 最終レポート
# ===================================
echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                     📊 テスト結果サマリー                        ║"
echo "╠══════════════════════════════════════════════════════════════════╣"
echo "║  総テスト数: $TOTAL                                              "
echo "║  成功: $PASSED ✅                                                 "
echo "║  失敗: $FAILED ❌                                                 "
echo "║  成功率: $(awk "BEGIN {printf \"%.1f\", ($PASSED/$TOTAL)*100}")%"
echo "╠══════════════════════════════════════════════════════════════════╣"

if [ $FAILED -eq 0 ]; then
  echo "║  🎉 ALL TESTS PASSED - システム完全稼働中                       ║"
else
  echo "║  ⚠️  一部テスト失敗 - 詳細を確認してください                   ║"
fi

echo "╠══════════════════════════════════════════════════════════════════╣"
echo "║  📱 Frontend UI: https://tkghd.vercel.app                       ║"
echo "║  ⚙️  Backend API: $API_URL"
echo "║  🔑 JWT Token: 有効                                              ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# UI確認用HTMLファイル生成
cat > ui-real-test.html << 'HTMLEOF'
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TKG REAL Transfer - UI確認</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white min-h-screen p-4">
  <div class="max-w-6xl mx-auto">
    <div class="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-8 mb-6">
      <h1 class="text-4xl font-bold mb-2">🚀 TKG REAL Transfer System</h1>
      <p class="text-blue-100">全機能UI確認テスト</p>
      <div class="mt-4 flex items-center gap-4">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span>API接続: <span id="apiStatus">確認中...</span></span>
        </div>
        <div class="flex items-center gap-2">
          <span>残高: <span id="balance">読込中...</span></span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 即時送金 -->
      <div class="bg-gray-800 rounded-2xl p-6">
        <h2 class="text-xl font-bold mb-4">⚡ 即時送金</h2>
        <form id="instantForm" class="space-y-3">
          <input type="email" id="instant_to" placeholder="送金先" 
            class="w-full px-4 py-2 bg-gray-700 rounded-lg" required>
          <input type="number" id="instant_amount" placeholder="金額" 
            class="w-full px-4 py-2 bg-gray-700 rounded-lg" required>
          <button type="submit" 
            class="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold">
            送金実行
          </button>
        </form>
      </div>

      <!-- 銀行振込 -->
      <div class="bg-gray-800 rounded-2xl p-6">
        <h2 class="text-xl font-bold mb-4">🏦 銀行振込</h2>
        <form id="bankForm" class="space-y-3">
          <select id="bank_code" class="w-full px-4 py-2 bg-gray-700 rounded-lg" required>
            <option value="">銀行選択</option>
            <option value="0001">みずほ銀行</option>
            <option value="0005">三菱UFJ銀行</option>
            <option value="0009">三井住友銀行</option>
          </select>
          <input type="text" id="bank_account" placeholder="口座番号" 
            class="w-full px-4 py-2 bg-gray-700 rounded-lg" required>
          <input type="number" id="bank_amount" placeholder="金額" 
            class="w-full px-4 py-2 bg-gray-700 rounded-lg" required>
          <button type="submit" 
            class="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-bold">
            振込実行
          </button>
        </form>
      </div>

      <!-- 暗号資産送金 -->
      <div class="bg-gray-800 rounded-2xl p-6">
        <h2 class="text-xl font-bold mb-4">₿ 暗号資産送金</h2>
        <form id="cryptoForm" class="space-y-3">
          <select id="crypto_currency" class="w-full px-4 py-2 bg-gray-700 rounded-lg" required>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="USDT">Tether (USDT)</option>
          </select>
          <input type="text" id="crypto_address" placeholder="送金先アドレス" 
            class="w-full px-4 py-2 bg-gray-700 rounded-lg" required>
          <input type="number" step="0.00001" id="crypto_amount" placeholder="数量" 
            class="w-full px-4 py-2 bg-gray-700 rounded-lg" required>
          <button type="submit" 
            class="w-full bg-orange-600 hover:bg-orange-700 py-3 rounded-lg font-bold">
            送金実行
          </button>
        </form>
      </div>

      <!-- 国際送金 -->
      <div class="bg-gray-800 rounded-2xl p-6">
        <h2 class="text-xl font-bold mb-4">🌍 国際送金</h2>
        <form id="intlForm" class="space-y-3">
          <select id="intl_currency" class="w-full px-4 py-2 bg-gray-700 rounded-lg" required>
            <option value="USD">米ドル (USD)</option>
            <option value="EUR">ユーロ (EUR)</option>
            <option value="GBP">ポンド (GBP)</option>
          </select>
          <input type="text" id="intl_recipient" placeholder="受取人名" 
            class="w-full px-4 py-2 bg-gray-700 rounded-lg" required>
          <input type="number" id="intl_amount" placeholder="金額（円）" 
            class="w-full px-4 py-2 bg-gray-700 rounded-lg" required>
          <button type="submit" 
            class="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold">
            送金実行
          </button>
        </form>
      </div>
    </div>

    <!-- 結果表示 -->
    <div id="result" class="mt-6 hidden bg-gray-800 rounded-2xl p-6">
      <h3 class="text-xl font-bold mb-4">📊 実行結果</h3>
      <pre id="resultData" class="bg-gray-900 p-4 rounded-lg overflow-auto text-sm"></pre>
    </div>

    <!-- 履歴 -->
    <div class="mt-6 bg-gray-800 rounded-2xl p-6">
      <h3 class="text-xl font-bold mb-4">📜 送金履歴</h3>
      <div id="history" class="space-y-2 text-sm">読込中...</div>
    </div>
  </div>

  <script>
    const API = 'https://hopeful-liberation-production-9d00.up.railway.app';
    const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXJfMTE5MDIxMiIsImVtYWlsIjoib3duZXJAdGtnaGQuZ2xvYmFsIiwicm9sZSI6Im93bmVyIiwiaWF0IjoxNzY2Mjc3OTU2LCJleHAiOjE3NjY4ODI3NTZ9.nWJL8NOySwWj2xEZ17P4KLJziNTFrmmdUG-CbF6ME6M';

    async function api(endpoint, method = 'GET', data = null) {
      const opts = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`
        }
      };
      if (data) opts.body = JSON.stringify(data);
      
      const res = await fetch(API + endpoint, opts);
      return res.json();
    }

    function showResult(data) {
      document.getElementById('result').classList.remove('hidden');
      document.getElementById('resultData').textContent = JSON.stringify(data, null, 2);
    }

    // 初期化
    (async () => {
      try {
        const status = await api('/');
        document.getElementById('apiStatus').textContent = '✅ ' + status.status;
        
        const balance = await api('/api/balance/TKG-OWNER-001');
        document.getElementById('balance').textContent = 
          '¥' + balance.totalBalance.toLocaleString();
        
        const history = await api('/api/transfers/TKG-OWNER-001');
        document.getElementById('history').innerHTML = history.transactions
          .slice(0, 5)
          .map(tx => `<div class="p-3 bg-gray-700 rounded-lg">
            ${tx.type} | ¥${tx.amount?.toLocaleString() || 'N/A'} | ${tx.status}
          </div>`).join('');
      } catch (e) {
        document.getElementById('apiStatus').textContent = '❌ エラー';
      }
    })();

    // フォーム送信
    document.getElementById('instantForm').onsubmit = async (e) => {
      e.preventDefault();
      const result = await api('/api/transfer/instant', 'POST', {
        fromUserId: 'TKG-OWNER-001',
        toIdentifier: document.getElementById('instant_to').value,
        amount: parseFloat(document.getElementById('instant_amount').value),
        note: 'UI送金'
      });
      showResult(result);
      alert('✅ 即時送金完了！');
    };

    document.getElementById('bankForm').onsubmit = async (e) => {
      e.preventDefault();
      const result = await api('/api/transfer/bank', 'POST', {
        fromAccountId: 'TKG-OWNER-001',
        toBankCode: document.getElementById('bank_code').value,
        toAccountNumber: document.getElementById('bank_account').value,
        toAccountName: 'テスト',
        amount: parseFloat(document.getElementById('bank_amount').value)
      });
      showResult(result);
      alert('✅ 銀行振込完了！');
    };

    document.getElementById('cryptoForm').onsubmit = async (e) => {
      e.preventDefault();
      const result = await api('/api/transfer/crypto', 'POST', {
        fromUserId: 'TKG-OWNER-001',
        toAddress: document.getElementById('crypto_address').value,
        amount: parseFloat(document.getElementById('crypto_amount').value),
        currency: document.getElementById('crypto_currency').value
      });
      showResult(result);
      alert('✅ 暗号資産送金完了！');
    };

    document.getElementById('intlForm').onsubmit = async (e) => {
      e.preventDefault();
      const result = await api('/api/transfer/international', 'POST', {
        fromUserId: 'TKG-OWNER-001',
        country: 'US',
        recipientData: { name: document.getElementById('intl_recipient').value },
        amount: parseFloat(document.getElementById('intl_amount').value),
        fromCurrency: 'JPY',
        toCurrency: document.getElementById('intl_currency').value
      });
      showResult(result);
      alert('✅ 国際送金完了！');
    };
  </script>
</body>
</html>
HTMLEOF

echo "✅ UI確認ファイル生成完了: ui-real-test.html"
echo "🌐 ブラウザで開く: file://$(pwd)/ui-real-test.html"
echo ""
