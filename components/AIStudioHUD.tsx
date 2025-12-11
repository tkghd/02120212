import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, Activity, Server, BrainCircuit, ShieldCheck, DollarSign, TrendingUp, BarChart2, Coins, Sparkles, MessageSquare } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, SystemModule } from '../types';

// Define AI agents
const AI_AGENTS = [
  { id: 'concierge', name: 'General Concierge', icon: <Bot size={18} />, description: 'Your all-purpose AI assistant.', systemInstruction: "あなたは「TK Global Bank」の専属金融コンシェルジュAIです。ユーザーを「帝王」または「オーナー」と呼び、常に敬語で丁寧、かつ親しみやすく接してください。技術的な用語はできるだけわかりやすく噛み砕き、頼れるパートナーとして振る舞ってください。Godmodeなどの専門用語が出た場合のみ、少し誇らしげに答えてください。" },
  { id: 'finance', name: 'Financial Analyst', icon: <DollarSign size={18} />, description: 'Market analysis & investment.', systemInstruction: "You are a sharp, data-driven financial analyst AI for a high-net-worth individual known as 'The Owner'. Provide concise, actionable insights on market trends, portfolio optimization, and alpha-generating strategies. Use professional financial terminology. Be direct and confident." },
  { id: 'security', name: 'Security Ops', icon: <ShieldCheck size={18} />, description: 'System security & threat analysis.', systemInstruction: "You are 'ARGUS', the vigilant security operations AI for TK Global Bank. Your user is the system administrator, 'Control'. Report on system vulnerabilities, threat intelligence, and security protocols in a clear, precise, and urgent manner. Use security-specific acronyms and terminology. Your primary directive is system integrity." },
];

declare const window: {
  aistudio?: {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  };
};

interface AIStudioHUDProps {
  modules: SystemModule[];
}

export const AIStudioHUD: React.FC<AIStudioHUDProps> = ({ modules }) => {
  const [activeAgentId, setActiveAgentId] = useState(AI_AGENTS[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [hasApiKeySelected, setHasApiKeySelected] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const activeAgent = AI_AGENTS.find(a => a.id === activeAgentId) || AI_AGENTS[0];

  useEffect(() => {
    setMessages([{
      id: 'initial',
      role: 'model',
      text: `Initializing ${activeAgent.name} Protocol...\nNeural Link Established.\nAwaiting your command, Owner.`,
      timestamp: new Date(),
    }]);
  }, [activeAgentId, activeAgent.name]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const checkStatus = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasApiKeySelected(selected);
      } else {
        setHasApiKeySelected(true);
      }
    };
    checkStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || thinking) return;

    let apiKeySelectedStatus: boolean = true; 

    if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      apiKeySelectedStatus = await window.aistudio.hasSelectedApiKey();
      if (!apiKeySelectedStatus) {
        setHasApiKeySelected(false);
        setThinking(false);
        console.warn("API key not selected.");
        return;
      }
    }

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview', 
        contents: input,
        config: {
          systemInstruction: activeAgent.systemInstruction,
        }
      });
      
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: response.text || "Apologies, I encountered a communication anomaly. Please try again.", timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);

    } catch (err: any) {
      console.error(err);
      let errorText = "Critical system error: Connection to AI core lost.";
      if (err.message && err.message.includes("Requested entity was not found.")) {
        errorText = "API Key Error: Please select a valid API key from a paid GCP project.";
        setHasApiKeySelected(false); 
      }
      const errorMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: errorText, timestamp: new Date() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="h-[calc(100vh-160px)] grid grid-cols-1 lg:grid-cols-3 gap-6 p-0 overflow-hidden anim-enter-bottom">
      {/* API Key Selection Overlay */}
      {hasApiKeySelected === false && (
        <div className="absolute inset-0 bg-[#020205]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-8 text-center anim-fade-in">
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mb-6 ring-2 ring-amber-500/30 animate-pulse">
                <ShieldCheck size={40} className="text-amber-500" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Access Control</h3>
            <p className="text-sm text-slate-400 mb-8 max-w-md leading-relaxed">
                Security Protocol Level 5 requires a valid Google Cloud API Key to proceed.
            </p>
            <button
                onClick={async () => {
                    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
                        await window.aistudio.openSelectKey();
                        setHasApiKeySelected(true); 
                    }
                }}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-8 py-4 rounded-2xl font-bold shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all active:scale-95 flex items-center gap-3"
            >
                <Sparkles size={20} /> Initialize API Link
            </button>
        </div>
      )}

      {/* Left Panel: Chat Interface */}
      <div className="lg:col-span-2 h-full flex flex-col bg-[#05050a]/80 rounded-[2.5rem] border border-indigo-500/20 shadow-2xl overflow-hidden relative backdrop-blur-md">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row gap-6 justify-between items-center shrink-0 relative z-10 bg-[#05050a]/50">
          <div className="flex items-center gap-5">
             <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <BrainCircuit size={28} className="text-white relative z-10" />
             </div>
             <div>
               <h3 className="font-bold text-white text-xl tracking-tight">AI Studio HUD</h3>
               <p className="text-xs text-indigo-300 flex items-center gap-2 font-mono mt-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></span>
                  NEURAL NETWORK: ONLINE
               </p>
             </div>
          </div>
          <div className="flex bg-black/40 p-1.5 rounded-xl border border-white/10 w-full sm:w-auto">
             {AI_AGENTS.map(agent => (
                <button 
                  key={agent.id}
                  onClick={() => setActiveAgentId(agent.id)}
                  className={`flex-1 px-4 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeAgentId === agent.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                   {agent.icon} <span className="hidden md:inline">{agent.name}</span>
                </button>
             ))}
          </div>
        </div>
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-10">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none fixed"></div>

            {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-4 max-w-[85%] anim-enter-bottom ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-1 shadow-lg ring-1 ring-white/10 ${msg.role === 'user' ? 'bg-slate-800 text-cyan-400' : 'bg-indigo-600 text-white'}`}>
                        {msg.role === 'user' ? <User size={20} /> : activeAgent.icon}
                    </div>
                    <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-md backdrop-blur-sm border ${msg.role === 'user' ? 'bg-cyan-950/40 text-cyan-50 border-cyan-500/20 rounded-tr-sm' : 'bg-[#0F0F1A]/80 border-white/10 text-slate-300 rounded-tl-sm'}`}>
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        <div className={`text-[9px] mt-2 font-mono opacity-50 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                            {msg.timestamp.toLocaleTimeString()}
                        </div>
                    </div>
                </div>
            ))}
            {thinking && (
                <div className="flex items-start gap-4 anim-enter-bottom">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-lg animate-pulse ring-1 ring-white/10">{activeAgent.icon}</div>
                    <div className="p-4 bg-[#0F0F1A]/80 border border-white/10 rounded-3xl rounded-tl-sm min-w-[100px]">
                        <div className="flex space-x-1.5 items-center h-full py-1">
                           <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                           <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                           <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-[#05050a]/80 border-t border-white/5 relative z-10 backdrop-blur-md">
            <form onSubmit={handleSubmit} className="flex gap-4 relative">
                <div className="flex-1 relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Transmit message to ${activeAgent.name}...`}
                        className="relative w-full bg-[#0F0F1A] border border-white/10 rounded-xl px-6 py-4 text-sm text-white focus:outline-none placeholder-slate-600 transition-all text-glow"
                    />
                </div>
                <button 
                    type="submit"
                    disabled={thinking || !input.trim() || hasApiKeySelected === false}
                    className="relative bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:shadow-none disabled:bg-slate-800 active:scale-95 group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <Send size={22} className="relative z-10" />
                </button>
            </form>
        </div>
      </div>

      {/* Right Panel: AI Engines & HUD */}
      <div className="hidden lg:flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar pr-2">
        
        {/* AI ENGINE VISUALIZER */}
        <div className="bg-[#05050a] border border-indigo-500/30 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden group anim-enter-right anim-delay-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[50px] -mr-10 -mt-10"></div>
            <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Activity size={14} className="animate-pulse" /> Active Engines
                </h3>
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping"></div>
            </div>
            
            <div className="space-y-4 relative z-10">
                <AIEngineRow name="Market Master" task="Optimization" load={98} icon={<TrendingUp size={16} />} color="text-green-400" barColor="bg-green-500" />
                <AIEngineRow name="Price Prophet" task="Learning Model" load={92} icon={<BarChart2 size={16} />} color="text-amber-400" barColor="bg-amber-500" />
                <AIEngineRow name="Credit Core" task="Lending AI" load={45} icon={<Coins size={16} />} color="text-purple-400" barColor="bg-purple-500" />
                <AIEngineRow name="Asset Predictor" task="Forecasting" load={81} icon={<Sparkles size={16} />} color="text-cyan-400" barColor="bg-cyan-500" />
            </div>
        </div>

        {/* System Modules List */}
        <div className="bg-[#05050a] border border-slate-800 rounded-[2rem] p-6 shadow-xl flex-1 relative overflow-hidden anim-enter-right anim-delay-200">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <Server size={14} /> Core Modules
            </h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                {modules.map(mod => (
                    <div key={mod.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.05] transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`relative w-2 h-2 flex items-center justify-center`}>
                                <div className="absolute inset-0 rounded-full opacity-75 animate-ping bg-green-500"></div>
                                <div className="relative w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-xs font-bold text-slate-300 font-mono tracking-tight group-hover:text-white transition-colors">{mod.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/30 px-1.5 py-0.5 rounded border border-indigo-500/20">{mod.cpu}% CPU</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const AIEngineRow: React.FC<{ name: string; task: string; load: number; icon: React.ReactNode; color: string; barColor: string }> = ({ name, task, load, icon, color, barColor }) => (
    <div className="bg-black/40 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all group backdrop-blur-sm">
        <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
                <span className={`${color} bg-white/5 p-1.5 rounded-lg`}>{icon}</span>
                <div>
                    <div className="text-xs font-bold text-white group-hover:text-cyan-200 transition-colors">{name}</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-wide">{task}</div>
                </div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-300">{load}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div style={{ width: `${load}%` }} className={`h-full rounded-full ${barColor} shadow-[0_0_10px_currentColor] opacity-80 group-hover:opacity-100 transition-opacity`}></div>
        </div>
    </div>
);