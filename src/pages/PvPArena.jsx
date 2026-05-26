import React, { useState } from 'react';
import PokerGame from '../components/PokerGame';
import NeonRoulette from '../components/NeonRoulette';

const PvPArena = () => {
  const [activePvPGame, setActivePvPGame] = useState(null);
  const fakeBalance = 759.19;

  return (
    <div className="p-8 max-w-7xl mx-auto bg-[#050505] min-h-screen text-white">
      {/* Upper Navigation Header */}
      <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h1 className="text-4xl font-black text-amber-500 tracking-tighter uppercase italic">
            SOLT <span className="text-white">PVP & TABLES</span>
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">
            Isolated Premium Gaming Zone
          </p>
        </div>
        <button 
          onClick={() => { window.location.href = '/'; }}
          className="bg-[#111] hover:bg-neutral-800 text-xs font-black uppercase tracking-wider px-4 py-2 rounded-xl border border-white/10 transition-colors cursor-pointer"
        >
          ← Return Main Hub
        </button>
      </div>

      {activePvPGame ? (
        <div className="space-y-4">
          <button 
            onClick={() => setActivePvPGame(null)}
            className="text-xs font-black bg-[#111] border border-white/5 px-4 py-2 rounded-xl uppercase tracking-wider text-gray-400 hover:text-white cursor-pointer"
          >
            ← Close Game Panel
          </button>
          {activePvPGame === 'PokerGame' && <PokerGame currentBalance={fakeBalance} />}
          {activePvPGame === 'NeonRoulette' && <NeonRoulette currentBalance={fakeBalance} />}
        </div>
      ) : (
        /* Grid mapping for secondary zone games */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Card 1: PokerBaz */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all group">
            <div>
              <div className="h-40 rounded-xl bg-gradient-to-br from-emerald-600/20 to-black border border-white/5 mb-4 flex items-center justify-center text-4xl">♦️♠️</div>
              <h3 className="text-2xl font-black uppercase italic mb-1">PokerBaz Web3</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-4">PvP Table Action</p>
            </div>
            <button 
              onClick={() => setActivePvPGame('PokerGame')}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-xl uppercase tracking-wider text-sm transition-transform active:scale-95"
            >
              LAUNCH POKER
            </button>
          </div>

          {/* Card 2: NeoRoulette */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all group">
            <div>
              <div className="h-40 rounded-xl bg-gradient-to-br from-red-600/20 to-black border border-white/5 mb-4 flex items-center justify-center text-4xl">🎰🔥</div>
              <h3 className="text-2xl font-black uppercase italic mb-1">NeoRoulette</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-4">Premium Table Wheel</p>
            </div>
            <button 
              onClick={() => setActivePvPGame('NeonRoulette')}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-xl uppercase tracking-wider text-sm transition-transform active:scale-95"
            >
              LAUNCH ROULETTE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PvPArena;