#!/bin/bash
API="http://localhost:8080"

echo "🧪 TKG API TESTS"
echo "================="

echo -e "\n1. Health Check"
curl -s $API/api/health | jq '.'

echo -e "\n2. Revenue"
curl -s $API/api/revenue/realtime | jq '.data'

echo -e "\n3. Portfolio"
curl -s $API/api/portfolio/list | jq '.data.jp[0]'

echo -e "\n4. Banking"
curl -s $API/api/banking/directory | jq '.data | keys'

echo -e "\n5. Create Transfer"
TRANSFER=$(curl -s -X POST $API/api/transfer/create \
  -H "Content-Type: application/json" \
  -d '{
    "fromCountry": "US",
    "toCountry": "JP",
    "amount": 1000000,
    "currency": "USD",
    "beneficiaryName": "TK Tokyo",
    "beneficiaryAccount": "JP123456"
  }')
echo $TRANSFER | jq '.'
TRANSFER_ID=$(echo $TRANSFER | jq -r '.data.id')

echo -e "\n6. Execute Transfer"
curl -s -X POST $API/api/transfer/execute/$TRANSFER_ID | jq '.'

sleep 2

echo -e "\n7. Check Status"
curl -s $API/api/transfer/status/$TRANSFER_ID | jq '.data'

echo -e "\n✅ Tests completed"
