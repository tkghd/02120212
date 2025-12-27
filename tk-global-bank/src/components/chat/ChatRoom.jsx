import { useState, useEffect } from "react";
import { askAI, sendCrypto } from "../api/fullGateway";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [systemInput, setSystemInput] = useState("");

  // メッセージ送信
  const sendMessage = () => {
    if(!input) return;
    setMessages(prev => [...prev, { user: "You", content: input }]);
    setInput("");
  };

  // システム管理操作
  const executeSystem = async () => {
    if(!systemInput) return;
    setMessages(prev => [...prev, { user: "SYSTEM", content: `Executing: ${systemInput}` }]);
    // 例: AI質問 or Web3送金判定
    if(systemInput.startsWith("AI:")) {
      const res = await askAI(systemInput.replace("AI:", ""));
      setMessages(prev => [...prev, { user: "AI", content: res }]);
    } else if(systemInput.startsWith("SEND:")) {
      const [to, amount] = systemInput.replace("SEND:", "").split(" ");
      const tx = await sendCrypto(to, amount);
      setMessages(prev => [...prev, { user: "BLOCKCHAIN", content: tx }]);
    }
    setSystemInput("");
  };

  return (
    <div className="p-4 bg-black/40 rounded-xl border border-yellow-500/30 space-y-4">
      <h2 className="text-yellow-400 font-bold">Imperial ChatRoom</h2>
      
      <div className="h-60 overflow-y-auto bg-black/20 p-2 rounded-md space-y-1">
        {messages.map((msg, i) => (
          <div key={i}><span className="font-bold">{msg.user}:</span> {msg.content}</div>
        ))}
      </div>

      <div className="flex gap-2">
        <input className="flex-1 p-2 rounded-md text-black" placeholder="Message..." value={input} onChange={e=>setInput(e.target.value)} />
        <button className="px-4 py-2 bg-cyan-500 rounded-md" onClick={sendMessage}>Send</button>
      </div>

      <div className="flex gap-2 mt-2">
        <input className="flex-1 p-2 rounded-md text-black" placeholder="System Command (AI:/SEND:)" value={systemInput} onChange={e=>setSystemInput(e.target.value)} />
        <button className="px-4 py-2 bg-emerald-500 rounded-md" onClick={executeSystem}>Execute</button>
      </div>
    </div>
  );
}
