import React, { useState } from 'react';
import { Send, MessageCircle, Terminal, Zap } from 'lucide-react';
import { ultimateSystem } from '../services/ultimate-system';
import { backendAPI } from '../services/backend';

export const UltimateHub: React.FC = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [commandInput, setCommandInput] = useState('');
  const [commandOutput, setCommandOutput] = useState('');

  const handleAIChat = async () => {
    if (!chatInput.trim()) return;
    
    setChatHistory(prev => [...prev, { role: 'user', message: chatInput }]);
    
    const response = await ultimateSystem.aiChat(chatInput);
    
    if (response.success) {
      setChatHistory(prev => [...prev, { role: 'assistant', message: response.message }]);
    }
    
    setChatInput('');
  };

  const handleCommand = async () => {
    if (!commandInput.trim()) return;
    
    const result = await ultimateSystem.executeCommand(commandInput);
    setCommandOutput(JSON.stringify(result, null, 2));
    setCommandInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
            🌌 ULTIMATE SYSTEM HUB
          </h1>
          <p className="text-slate-400">AI Chat • Commands • All Modules Integrated</p>
        </div>

        {/* AI Chat */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="text-blue-400" size={24} />
            <h2 className="text-xl font-bold text-white">AI Commander Chat</h2>
          </div>
          
          <div className="bg-slate-950 rounded-xl p-4 h-96 overflow-y-auto mb-4 space-y-3">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-xl p-3 ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-800 text-slate-200'
                }`}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAIChat()}
              className="flex-1 bg-slate-950 text-white px-4 py-3 rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none"
              placeholder="Ask AI to send, analyze, code, or manage..."
            />
            <button
              onClick={handleAIChat}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all"
            >
              <Send size={20} />
            </button>
          </div>
        </div>

        {/* Command Terminal */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="text-cyan-400" size={24} />
            <h2 className="text-xl font-bold text-white">Command Terminal</h2>
          </div>

          <div className="bg-black rounded-xl p-4 font-mono text-green-400 text-sm h-48 overflow-y-auto mb-4">
            <pre>{commandOutput || '> Ready for commands...'}</pre>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCommand()}
              className="flex-1 bg-black text-green-400 px-4 py-3 rounded-xl border border-slate-700 font-mono focus:border-cyan-500 focus:outline-none"
              placeholder="send 0x... 1.0 MATIC | balance 0x... | price | health"
            />
            <button
              onClick={handleCommand}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-cyan-700 hover:to-blue-700 transition-all"
            >
              <Zap size={20} />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Send', 'Balance', 'Price', 'Analyze', 'Deploy', 'Health', 'Backup', 'Export'].map((action) => (
            <button
              key={action}
              onClick={() => setCommandInput(action.toLowerCase())}
              className="bg-slate-800/50 hover:bg-slate-700/50 text-white py-4 rounded-xl font-bold transition-all border border-slate-700 hover:border-blue-500"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
