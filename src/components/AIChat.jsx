import { useState } from "react";
import { askAI } from "../api/aiGateway";

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    const res = await askAI(question);
    setAnswer(res);
  };

  return (
    <div className="p-4 bg-black/40 rounded-xl border border-white/20">
      <input
        type="text"
        className="p-2 rounded-md w-full text-black"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask the AI..."
      />
      <button className="mt-2 px-4 py-2 bg-yellow-500 rounded-md" onClick={handleAsk}>
        Ask
      </button>
      <p className="mt-4 text-white">{answer}</p>
    </div>
  );
}
