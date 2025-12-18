#!/bin/bash
API_BASE="https://tkghd-api.vercel.app"

echo "1. Health Check"
curl -s "$API_BASE/api/health"

echo -e "\n\n2. Transfer All"
curl -s -X POST "$API_BASE/api/transfer-all" \
  -H "Content-Type: application/json" \
  -d '{"type":"domestic","to":"test","amount":1000}'

echo -e "\n\n3. Real Transfer"
curl -s -X POST "$API_BASE/api/real-transfer" \
  -H "Content-Type: application/json" \
  -d '{"transferType":"bank","from":"A","to":"B","amount":5000}'

echo -e "\n\n4. ATM Withdraw"
curl -s -X POST "$API_BASE/api/atm-withdraw" \
  -H "Content-Type: application/json" \
  -d '{"amount":10000}'

echo -e "\n\n5. Virtual Card"
curl -s -X POST "$API_BASE/api/virtual-card" \
  -H "Content-Type: application/json" \
  -d '{"cardType":"VISA","amount":100000}'

echo -e "\n\n6. Crypto Wallet"
curl -s "$API_BASE/api/crypto-wallet"

echo -e "\n\n7. Owner Vault"
curl -s "$API_BASE/api/owner-vault"

echo -e "\n\n8. Distributed Accounts"
curl -s "$API_BASE/api/distributed-accounts?limit=3"

echo -e "\n\n9. Realtime Status"
curl -s "$API_BASE/api/realtime-status"

echo -e "\n\n10. Production Status"
curl -s "$API_BASE/api/production-status"
