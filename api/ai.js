export default async function handler(req,res){
 if(req.method!=="POST")return res.status(405).end();
 const key=process.env.OPENAI_API_KEY;
 const {prompt}=req.body||{};
 if(!key||!prompt)return res.status(400).json({error:"bad request"});
 const r=await fetch("https://api.openai.com/v1/chat/completions",{
  method:"POST",
  headers:{ "Content-Type":"application/json","Authorization":`Bearer ${key}`},
  body:JSON.stringify({model:"gpt-4o-mini",messages:[{role:"user",content:prompt}]})
 });
 const j=await r.json();
 res.status(200).json({reply:j.choices?.[0]?.message?.content});
}
