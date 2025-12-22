import fs from "fs";
import crypto from "crypto";
let prev="GENESIS";
export function audit(event){
  const h=crypto.createHash("sha256")
    .update(JSON.stringify(event)+prev)
    .digest("hex");
  prev=h;
  fs.appendFileSync(
    "audit.log",
    JSON.stringify({...event,hash:h})+"\n"
  );
}
