import React, { useState } from 'react';
import { MessageSquare, Zap, Brain, Sparkles, Code, Send } from 'lucide-react';

const AI_MODELS = [
  { id: 'sonnet-4.5', name: 'Claude Sonnet 4.5', icon: Brain, color: 'from-purple-500 to-pink-500' },
  { id: 'grok', name: 'Grok Code Fast', icon: Zap, color: 'from-blue-500 to-cyan-500' },
  { id: 'o3', name: 'OpenAI o3', icon: Sparkles, color: 'from-green-500 to-emerald-500' },
  { id: 'o4-mini', name: 'OpenAI o4-mini', icon: Code, color: 'from-orange-500 to-red-500' }
];

export const MultiAIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAI, setSelectedAI] = useState('sonnet-4.5');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<any[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const userMsg = { role: 'user', content: message, ai: selectedAI };
    setChat([...chat, userMsg]);
    setMessage('');

    // API呼び出し（後で実装）
    const aiMsg = { 
      role: 'assistant', 
      content: `[${AI_MODELS.find(a => a.id === selectedAI)?.name}] Processing your request...`,
      ai: selectedAI 
    };
    setTimeout(() => setChat(c => [...c, aiMsg]), 500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-28 left-6 z-[9999] w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <MessageSquare className="text-white" size={28} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl w-full max-w-4xl h-[80vh] flex flex-col border border-purple-500/30 shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">Multi-AI Studio</h3>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                  ×
                </button>
              </div>
              
              {/* AI選択 */}
              <div className="grid grid-cols-4 gap-2">
                {AI_MODELS.map(ai => (
                  <button
                    key={ai.id}
                    onClick={() => setSelectedAI(ai.id)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      selectedAI === ai.id 
                        ? 'border-white bg-white/10' 
                        : 'border-slate-700 bg-slate-800/50 hover:bg-slate-700'
                    }`}
                  >
                    <ai.icon className={`mx-auto mb-2 bg-gradient-to-r ${ai.color} bg-clip-text text-transparent`} size={24} />
                    <div className="text-xs text-white font-bold text-center">{ai.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-4 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-slate-800 text-white border border-slate-700'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask anything..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={sendMessage}
                  className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl text-white font-bold hover:shadow-lg transition-all"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
