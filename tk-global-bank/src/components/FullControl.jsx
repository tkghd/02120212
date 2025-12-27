import { useState } from "react";
import { askAI, sendCrypto } from "../api/fullGateway";

export default function FullControl() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleAsk = async () => setAnswer(await askAI(question));
  const handleSend = async () => setTxHash(await sendCrypto(toAddress, amount));

  return (
    <div className="p-4 space-y-4 bg-black/50 rounded-xl border border-yellow-500/30">
      <h2 className="text-yellow-400 font-bold">AI & Web3 Control</h2>
      
      <div>
        <input className="p-2 rounded-md w-full text-black" placeholder="Ask AI..." value={question} onChange={e=>setQuestion(e.target.value)} />
        <button className="mt-2 px-4 py-2 bg-yellow-500 rounded-md" onClick={handleAsk}>Ask AI</button>
        <p className="text-white mt-2">{answer}</p>
      </div>
      
      <div>
        <input className="p-2 rounded-md w-full text-black" placeholder="Recipient Address" value={toAddress} onChange={e=>setToAddress(e.target.value)} />
        <input className="p-2 rounded-md w-full text-black mt-2" placeholder="Amount (ETH)" value={amount} onChange={e=>setAmount(e.target.value)} />
        <button className="mt-2 px-4 py-2 bg-emerald-500 rounded-md" onClick={handleSend}>Send Crypto</button>
        <p className="text-white mt-2">Tx Hash: {txHash}</p>
      </div>
    </div>
  );
}
