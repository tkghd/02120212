#!/bin/bash
# setup-env.sh

# .env.local が存在するか確認
if [ ! -f .env.local ]; then
  echo "❌ .env.local が見つかりません。まず vercel env pull を実行してください。"
  exit 1
fi

# .env.local の内容を export
export $(grep -v '^#' .env.local | xargs)

echo "✅ 環境変数を読み込みました！"
