(function() {
  const API_BASE = 'https://hopeful-liberation-production-9d00.up.railway.app';
  
  window.executeGlobalImpact = async () => {
    console.log('🔥 Global Impact Executor: START');
    
    const apis = [
      {p:"/api/real-transfer/domestic", m:'POST', d:{amount:1000}},
      {p:"/api/real-transfer/international", m:'POST', d:{amount:1000}},
      {p:"/api/v1/transfer/paypay", m:'POST', d:{amount:1000}},
      {p:"/api/v1/transfer/kotra", m:'POST', d:{amount:1000}},
      {p:"/api/v1/assets/car", m:'GET'},
      {p:"/api/v1/web3/status", m:'GET'},
      {p:"/api/v1/atm/scan", m:'POST', d:{auth:"scan"}}
    ];
    
    for (const api of apis) {
      try {
        const opts = {method: api.m, headers:{'Content-Type':'application/json'}};
        if (api.m === 'POST') opts.body = JSON.stringify(api.d);
        const res = await fetch(API_BASE + api.p, opts);
        const json = await res.json();
        console.log(`✅ ${api.p}:`, json);
      } catch (e) {
        console.log(`❌ ${api.p}:`, e.message);
      }
    }
    
    console.log('✅ Complete');
  };
  
  // 既存ボタンに自動注入
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('button').forEach(btn => {
        if (btn.textContent.match(/EXECUTE|実行|送金|SEND|Transfer/i)) {
          const orig = btn.onclick;
          btn.onclick = (e) => {
            if (orig) orig(e);
            window.executeGlobalImpact();
          };
          btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
      });
    });
  }
})();
