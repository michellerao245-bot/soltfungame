import React, { useState } from 'react';

const PokerGame = ({ currentBalance }) => {
  const displayBalance = typeof currentBalance === 'number' ? currentBalance.toFixed(2) : '759.19';
  
  const [handState, setHandState] = useState('PLACE YOUR BLIND');
  const [myCards, setMyCards] = useState([]);
  const [communityCards, setCommunityCards] = useState([]);
  const [isDealing, setIsDealing] = useState(false);

  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['A', 'K', 'Q', 'J', '10', '9'];

  const getRandomCard = () => {
    const v = values[Math.floor(Math.random() * values.length)];
    const s = suits[Math.floor(Math.random() * suits.length)];
    return { value: v, suit: s, isRed: s === '♥' || s === '♦' };
  };

  const handleDeal = () => {
    setIsDealing(true);
    setHandState('DEALING CARDS...');
    
    setTimeout(() => {
      setMyCards([getRandomCard(), getRandomCard()]);
      setCommunityCards([getRandomCard(), getRandomCard(), getRandomCard()]);
      setHandState('ROYAL FLUSH CHANCE!');
      setIsDealing(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0a0a0a] border border-yellow-500/20 rounded-3xl p-6 md:p-8 text-white my-6 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/5 pb-6 mb-8 gap-4">
        <div>
          <h2 className="text-4xl font-black text-yellow-400 tracking-tighter uppercase italic drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]">
            POKERBAZ WEB3
          </h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">
            Decentralized Texas Hold'em Engine
          </p>
        </div>
        
        <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-center min-w-[180px]">
          <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block mb-0.5">TABLE BALANCE</span>
          <span className="text-2xl font-mono font-black text-white">${displayBalance}</span>
        </div>
      </div>

      {/* Main Board Layout */}
      <div className="bg-emerald-950/20 border border-emerald-500/10 rounded-2xl p-8 mb-8 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden backdrop-blur-sm">
        
        {/* State Banner */}
        <div className="mb-8 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
            {handState}
          </span>
        </div>

        {/* Community Cards Block */}
        <div className="mb-10 w-full text-center">
          <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-3">Community Cards</p>
          <div className="flex justify-center gap-3 min-h-[90px]">
            {communityCards.length > 0 ? communityCards.map((card, i) => (
              <div key={i} className={`w-14 h-20 bg-white rounded-lg flex flex-col justify-between p-2 shadow-lg transform transition-all duration-300 scale-100 ${card.isRed ? 'text-red-600' : 'text-black'}`}>
                <span className="font-mono font-black text-sm leading-none">{card.value}</span>
                <span className="text-xl self-center leading-none">{card.suit}</span>
                <span className="font-mono font-black text-sm leading-none text-right rotate-180">{card.value}</span>
              </div>
            )) : (
              <div className="flex gap-3">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="w-14 h-20 bg-neutral-900 border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center text-xs text-neutral-700 font-black">?</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Your Hole Cards */}
        <div className="w-full text-center z-10">
          <p className="text-[10px] uppercase font-black tracking-widest text-yellow-500 mb-3">Your Hand</p>
          <div className="flex justify-center gap-3 min-h-[90px]">
            {myCards.length > 0 ? myCards.map((card, i) => (
              <div key={i} className={`w-14 h-20 bg-white rounded-lg flex flex-col justify-between p-2 shadow-lg transform transition-all duration-500 ${card.isRed ? 'text-red-600' : 'text-black'}`}>
                <span className="font-mono font-black text-sm leading-none">{card.value}</span>
                <span className="text-xl self-center leading-none">{card.suit}</span>
                <span className="font-mono font-black text-sm leading-none text-right rotate-180">{card.value}</span>
              </div>
            )) : (
              <div className="flex gap-3">
                {[1, 2].map((_, i) => (
                  <div key={i} className="w-14 h-20 bg-gradient-to-br from-yellow-500/20 to-black border border-yellow-500/30 rounded-lg flex items-center justify-center text-lg text-yellow-500/40 font-black">🃏</div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Action Trigger */}
      <button
        onClick={handleDeal}
        disabled={isDealing}
        className={`w-full font-black py-4 rounded-xl text-center uppercase tracking-wider transition-all ${
          isDealing 
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black active:scale-95 shadow-lg'
        }`}
      >
        {isDealing ? 'DEALING...' : '♣ DEAL NEW HAND ♥'}
      </button>

    </div>
  );
};

export default PokerGame;