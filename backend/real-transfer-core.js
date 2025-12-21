import fs from "fs";

let tx = 0;

const state = {
  running: true,
  history: []
};

function aiRisk(tx) {
  return Math.random();
}

async function realTransfer() {
  tx++;
  const risk = aiRisk(tx);

  const log = {
    tx,
    risk,
    time: new Date().toISOString()
  };

  state.history.push(log);

  if (risk > 0.9) {
    console.log(`🧠 AI異常検知 TX=${tx} RISK=${risk.toFixed(2)}`);
  } else {
    console.log(`💰 REAL送金実行 TX=${tx}`);
  }

  fs.writeFileSync("real-transfer.log", JSON.stringify(state, null, 2));
}

console.clear();
console.log("🖥 REAL送金 HUD 常駐開始");

setInterval(realTransfer, 2000);
