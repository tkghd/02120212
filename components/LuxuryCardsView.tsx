import React, { useState, useEffect } from 'react';
import { CreditCard, Lock, Zap, Camera, Banknote, Globe, Shield, Eye, EyeOff } from 'lucide-react';

export const LuxuryCardsView: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetch('https://tkghd-api.vercel.app/api/luxury-cards')
      .then(r => r.json())
      .then(data => {
        setCards(data.cards);
        setSelectedCard(data.cards[0]);
      });
  }, []);

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-600 flex items-center gap-3">
        <CreditCard size={32} /> TKG Luxury Cards Collection
      </h2>

      {/* Card Showcase */}
      {selectedCard && (
        <div className={`relative w-full aspect-[1.586/1] rounded-2xl p-6 flex flex-col justify-between shadow-2xl bg-gradient-to-br ${selectedCard.color}`}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 rounded-2xl"></div>
          
          <div className="relative z-10 flex justify-between items-start">
            <div className="text-white/80 font-bold tracking-widest text-lg">{selectedCard.type}</div>
            <div className="flex gap-2">
              <Camera className="text-white/60" size={20} />
              <Zap className="text-white/60" size={20} />
            </div>
          </div>

          <div className="relative z-10">
            <div className="font-mono text-2xl text-white tracking-[0.2em] mb-4">
              {showDetails ? selectedCard.number : selectedCard.number.replace(/\d(?=\d{4})/g, "•")}
            </div>
            
            <div className="flex justify-between items-end text-white/90 font-mono text-sm">
              <div>
                <div className="text-[10px] text-white/60">CARD HOLDER</div>
                <div className="font-bold">{selectedCard.holderName}</div>
              </div>
              <div>
                <div className="text-[10px] text-white/60">EXPIRES</div>
                <div className="font-bold">{selectedCard.exp}</div>
              </div>
              <div>
                <div className="text-[10px] text-white/60">CVV</div>
                <div className="font-bold">{showDetails ? selectedCard.cvv : "•••"}</div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="absolute top-4 right-4 z-20 text-white/60 hover:text-white"
          >
            {showDetails ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      )}

      {/* Features */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900/50 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
          <Camera className="text-emerald-400" size={24} />
          <div>
            <div className="text-white font-bold">ATMカメラ連動</div>
            <div className="text-slate-400 text-xs">QRコード出金</div>
          </div>
        </div>
        <div className="bg-slate-900/50 border border-purple-500/30 rounded-xl p-4 flex items-center gap-3">
          <Zap className="text-purple-400" size={24} />
          <div>
            <div className="text-white font-bold">バーチャル決済</div>
            <div className="text-slate-400 text-xs">即時決済対応</div>
          </div>
        </div>
        <div className="bg-slate-900/50 border border-blue-500/30 rounded-xl p-4 flex items-center gap-3">
          <Banknote className="text-blue-400" size={24} />
          <div>
            <div className="text-white font-bold">出金可能</div>
            <div className="text-slate-400 text-xs">無制限引出</div>
          </div>
        </div>
        <div className="bg-slate-900/50 border border-amber-500/30 rounded-xl p-4 flex items-center gap-3">
          <Globe className="text-amber-400" size={24} />
          <div>
            <div className="text-white font-bold">グローバル対応</div>
            <div className="text-slate-400 text-xs">世界中で利用可</div>
          </div>
        </div>
      </div>

      {/* Card List */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => setSelectedCard(card)}
            className={`bg-slate-900/50 border rounded-lg p-3 text-left transition-all hover:scale-105 ${
              selectedCard?.id === card.id ? 'border-purple-500' : 'border-slate-700'
            }`}
          >
            <div className="text-white font-bold text-sm mb-1">{card.name.split(' ')[1]}</div>
            <div className="text-slate-400 text-xs">••{card.number.slice(-4)}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
