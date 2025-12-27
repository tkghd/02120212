import React, { useState } from 'react'; 
import { fetchStatus, executeImpact } from '../api'; 
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.AI_GATEWAY_API_KEY, baseUrl: 'https://ai-gateway.vercel.sh/v1' });

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if(!input) return;
    const userMsg = { role: 'user', content: input };
    setMessages([...messages, userMsg]);
    setInput('');
    
    // AI解析してコマンド化
    const aiRes = await client.chat.completions.create({
      model: 'xai/grok-4',
      messages: [...messages, userMsg]
    });

    const aiContent = aiRes.choices[0].message.content;
    setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);

    // 解析結果に応じてシステム操作
    if(aiContent.includes('executeImpact')) {
      const match = aiContent.match(/executeImpact\(([\d\.]+),\s*['"](\w+)['"]\)/);
      if(match) await executeImpact(parseFloat(match[1]), match[2]);
    }
  };

  return (
    <div className="p-4 bg-black/70 rounded-xl">
      <div className="h-64 overflow-y-auto mb-2">
        {messages.map((m,i)=><div key={i} className={m.role==='user'?'text-white':'text-cyan-400'}>{m.content}</div>)}
      </div>
      <input className="w-full p-2 rounded" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && sendMessage()}/>
    </div>
  );
}
