const BACKEND_URL="https://hopeful-liberation-production-9d00.up.railway.app/api";
export const fetchStatus=async()=>{const r=await fetch(`${BACKEND_URL}/status`);return await r.json();};
export const executeTransfer=async(type,amount,to)=>{const r=await fetch(`${BACKEND_URL}/v1/transfer`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type,amount,to})});return await r.json();};
