#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║   🔥 完全資産統合 - バックアップ含む                    ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# 統合先
TARGET_DIR=~/02120212
BACKUP_BASE=~/02120212_backup
COMPONENTS_DIR=$TARGET_DIR/components
API_DIR=$TARGET_DIR/pages/api
UTILS_DIR=$TARGET_DIR/utils

# ディレクトリ作成
mkdir -p $COMPONENTS_DIR $API_DIR $UTILS_DIR

# バックアップディレクトリリスト
BACKUP_DIRS=(
  ~/02120212_backup
  ~/02120212-main
  ~/tkghd-dashboard
)

echo "📦 統合対象ディレクトリ:"
for DIR in "${BACKUP_DIRS[@]}"; do
  if [ -d "$DIR" ]; then
    echo "  ✅ $DIR"
  else
    echo "  ⚠️  $DIR (存在しない)"
  fi
done
echo ""

# ==================== コンポーネント統合 ====================
echo "🎨 コンポーネント統合中..."
COMP_COUNT=0

for BACKUP in "${BACKUP_DIRS[@]}"; do
  if [ -d "$BACKUP/components" ]; then
    echo "  📂 $BACKUP/components"
    
    find "$BACKUP/components" -name "*.tsx" -o -name "*.jsx" 2>/dev/null | while read FILE; do
      BASENAME=$(basename "$FILE")
      
      # 重複チェック
      if [ ! -f "$COMPONENTS_DIR/$BASENAME" ]; then
        cp "$FILE" "$COMPONENTS_DIR/"
        echo "    ✅ $BASENAME"
        ((COMP_COUNT++))
      fi
    done
  fi
done

echo "  📊 統合: ${COMP_COUNT}個"
echo ""

# ==================== API統合 ====================
echo "📡 API統合中..."
API_COUNT=0

for BACKUP in "${BACKUP_DIRS[@]}"; do
  if [ -d "$BACKUP/pages/api" ] || [ -d "$BACKUP/api" ]; then
    BACKUP_API_DIR="$BACKUP/pages/api"
    [ ! -d "$BACKUP_API_DIR" ] && BACKUP_API_DIR="$BACKUP/api"
    
    if [ -d "$BACKUP_API_DIR" ]; then
      echo "  📂 $BACKUP_API_DIR"
      
      find "$BACKUP_API_DIR" -name "*.ts" -o -name "*.js" 2>/dev/null | while read FILE; do
        BASENAME=$(basename "$FILE")
        
        # 重複チェック
        if [ ! -f "$API_DIR/$BASENAME" ]; then
          cp "$FILE" "$API_DIR/"
          echo "    ✅ $BASENAME"
          ((API_COUNT++))
        fi
      done
    fi
  fi
done

echo "  📊 統合: ${API_COUNT}個"
echo ""

# ==================== Utils統合 ====================
echo "🔧 Utils統合中..."
UTILS_COUNT=0

for BACKUP in "${BACKUP_DIRS[@]}"; do
  if [ -d "$BACKUP/utils" ]; then
    echo "  📂 $BACKUP/utils"
    
    find "$BACKUP/utils" -name "*.ts" -o -name "*.js" 2>/dev/null | while read FILE; do
      BASENAME=$(basename "$FILE")
      
      # 重複チェック
      if [ ! -f "$UTILS_DIR/$BASENAME" ]; then
        cp "$FILE" "$UTILS_DIR/"
        echo "    ✅ $BASENAME"
        ((UTILS_COUNT++))
      fi
    done
  fi
done

echo "  📊 統合: ${UTILS_COUNT}個"
echo ""

# ==================== 統合後の状態確認 ====================
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║   📊 統合完了 - 最終状態                                ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

TOTAL_COMPONENTS=$(find $COMPONENTS_DIR -name "*.tsx" -o -name "*.jsx" 2>/dev/null | wc -l)
TOTAL_APIS=$(find $API_DIR -name "*.ts" -o -name "*.js" 2>/dev/null | wc -l)
TOTAL_UTILS=$(find $UTILS_DIR -name "*.ts" -o -name "*.js" 2>/dev/null | wc -l)

echo "📦 最終統合数:"
echo "  🎨 Components: ${TOTAL_COMPONENTS}個"
echo "  📡 APIs: ${TOTAL_APIS}個"
echo "  🔧 Utils: ${TOTAL_UTILS}個"
echo ""
echo "  💎 総モジュール数: $((TOTAL_COMPONENTS + TOTAL_APIS + TOTAL_UTILS))個"
echo ""

# ==================== 完全マニフェスト更新 ====================
cat > $TARGET_DIR/complete-manifest.json << MANIFEST_EOF
{
  "name": "TK Global Bank - Complete Ultimate System",
  "version": "4.0.0",
  "integration": "FULL - Including all backups",
  "stats": {
    "components": $TOTAL_COMPONENTS,
    "apis": $TOTAL_APIS,
    "utils": $TOTAL_UTILS,
    "total": $((TOTAL_COMPONENTS + TOTAL_APIS + TOTAL_UTILS))
  },
  "sources": [
    "~/02120212 (main)",
    "~/02120212_backup",
    "~/02120212-main", 
    "~/tkghd-dashboard"
  ],
  "deployments": {
    "frontend": {
      "vercel_main": "https://tkghd.vercel.app",
      "vercel_sovereign": "https://tkghd.vercel.app/?access=sovereign",
      "azure": "https://tkghd-api-azure.vercel.app"
    },
    "backend": {
      "railway": "https://hopeful-liberation-production-9d00.up.railway.app"
    }
  },
  "features": [
    "口座開設（個人・法人・多通貨）",
    "REAL送金（全銀300+行・SWIFT国際）",
    "ATM出金（実コード発行）",
    "カード決済（Visa/Master/Amex）",
    "契約管理（ローン・投資・保険・保管）",
    "自社通貨発行・流通管理",
    "法人資産管理（不動産・証券・IP・設備）",
    "オーナー統合ダッシュボード",
    "暗号資産送金（BTC/ETH/MATIC/他）",
    "AI異常検知システム",
    "ゼロ知識証明（ZKP）",
    "監査ログ・コンプライアンス",
    "HUD統合インターフェース",
    "モジュール間リンク機構",
    "完全バックアップ統合"
  ],
  "timestamp": "$(date -Iseconds)",
  "status": "COMPLETE - ALL MODULES INTEGRATED"
}
MANIFEST_EOF

echo "✅ 完全マニフェスト生成: complete-manifest.json"
echo ""

