export async function realTransfer(payload, token){
  const res = await fetch(
    "https://hopeful-liberation-production-9d00.up.railway.app/api/transfer",
    {
      method: "POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body: JSON.stringify(payload)
    }
  );
  return res.json();
}
