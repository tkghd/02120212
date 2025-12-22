import cron from "node-cron";
import fs from "fs";
import { bankPing, rollbackTransfer } from "../services/BankGateway.js";

export function auditTrail(event){
  fs.appendFileSync(
    "./audit.log",
    JSON.stringify({event, ts:new Date().toISOString()})+"\n"
  );
}

cron.schedule("0 2 * * *", async ()=>{
  const result = await bankPing();
  auditTrail({type:"NIGHT_BATCH_PING", result});
});

process.on("TRANSFER_FAILED", async (tx)=>{
  await rollbackTransfer(tx);
  auditTrail({type:"ROLLBACK", tx});
});
