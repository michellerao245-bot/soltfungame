import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import Confetti from 'react-confetti';

const DiceGame = ({ betAmount, setBetAmount, rollUnder, setRollUnder, isRolling, playDice, lastResult, error, gameHistory = [] }) => {
  const winProb = rollUnder - 1;
  const multiplier = (98 / winProb).toFixed(2);
  const potentialPayout = (betAmount * multiplier).toFixed(2);

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (lastResult !== null && lastResult < rollUnder && !isRolling) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [lastResult, rollUnder, isRolling]);

  return (
    <main className="max-w-7xl mx-auto mt-8 px-4">
      
      {/* GAME NAME */}
      <div className="mb-8 text-left pl-4">
        <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">
          CYBER<span className="text-yellow-400">DICE</span>
        </h2>
        <p className="text-[10px] text-gray-500 font-bold tracking-[0.3em] uppercase mt-1">
          SOLTCHAIN INFRASTRUCTURE V2.0.8
        </p>
      </div>

      {/* WIN ANIMATION */}
      {showConfetti && (
        <Confetti
          numberOfPieces={200}
          recycle={false}
          colors={['#facb15', '#ffffff', '#000000']}
          style={{ position: 'fixed', zIndex: 100 }}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Controls */}
        <div className="lg:col-span-4 bg-[#0c0c0c] p-10 rounded-[3rem] border border-white/5 flex flex-col justify-between shadow-2xl">
          <div className="space-y-8">
            {error && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-500 text-[10px] font-black uppercase">
                <AlertCircle size={16} /> {error}
              </motion.div>
            )}
            <div>
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4 block italic text-left">Stake Amount</label>
              <div className="bg-black p-6 rounded-3xl border border-white/5 flex items-center justify-between">
                <input type="number" value={betAmount} onChange={(e) => setBetAmount(Number(e.target.value))} className="bg-transparent border-none outline-none font-black text-4xl w-full text-white" />
                <span className="text-yellow-400 font-black ml-2 text-xl italic">SOLT</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] font-black uppercase mb-4 text-gray-500 px-1">
                <span>Roll Under: <span className="text-yellow-400">{rollUnder}</span></span>
                <span>Win Prob: <span className="text-yellow-400">{winProb}%</span></span>
              </div>
              <input type="range" min="2" max="98" value={rollUnder} onChange={(e) => setRollUnder(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 text-left">
                <label className="text-[9px] font-black text-gray-600 uppercase block mb-1">Multiplier</label>
                <span className="text-white font-black text-lg">{multiplier}x</span>
              </div>
              <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 text-left">
                <label className="text-[9px] font-black text-gray-600 uppercase block mb-1">Payout</label>
                <span className="text-yellow-400 font-black text-lg">{potentialPayout}</span>
              </div>
            </div>
          </div>
          <button onClick={playDice} disabled={isRolling} className={`w-full mt-10 py-8 rounded-[2rem] font-black text-lg uppercase tracking-[0.5em] transition-all duration-300 ${isRolling ? 'bg-gray-800 text-gray-500' : 'bg-yellow-400 text-black hover:shadow-[0_0_50px_rgba(250,204,21,0.2)] active:scale-95'}`}>
            {isRolling ? 'ROLLING...' : 'PLAY NOW'}
          </button>
        </div>

        {/* Result Display & HISTORY FIX */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <div className="bg-[#0c0c0c] rounded-[4rem] border border-white/5 p-12 flex flex-col items-center justify-center relative overflow-hidden shadow-inner min-h-[500px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.03)_0%,transparent_70%)]" />
            <AnimatePresence mode="wait">
              <motion.div key={isRolling ? "rolling" : lastResult} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center relative z-10 -mt-10">
                <span className={`text-[200px] font-black leading-none tracking-tighter ${lastResult !== null ? (lastResult < rollUnder ? 'text-yellow-400 drop-shadow-[0_0_80px_rgba(250,204,21,0.2)]' : 'text-white/20') : 'text-white/5'}`}>
                  {isRolling ? ".." : (lastResult !== null ? lastResult : '00')}
                </span>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-12 left-0 right-0 px-10 text-center">
              <div className="flex justify-center flex-wrap gap-2 md:gap-3">
                {/* 🔥 DYNAMIC HISTORY LOGIC FIX: Ab yeh App.jsx ke '.roll' ko perfectly catch karega */}
                {Array.isArray(gameHistory) && gameHistory.slice(0, 10).map((res, index) => {
                  // App.jsx me key ka naam 'roll' hai, toh humne res.roll ko sabse upar priority de di hai
                  const rolledValue = res && typeof res === 'object' ? (res.roll ?? res.val ?? res.result ?? res.value) : res;
                  const targetValue = res && typeof res === 'object' ? (res.target ?? rollUnder) : rollUnder;
                  
                  // Check win status (App.jsx directly res.win bhi deta hai, fallback me standard math laga di)
                  const isWin = res && typeof res === 'object' && res.win !== undefined ? res.win : (rolledValue < targetValue);

                  return (
                    <div
                      key={`history-${index}`}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-black text-sm border transition-all duration-300
                        ${isWin 
                          ? 'bg-yellow-400 text-black border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)]' 
                          : 'bg-white/5 border-white/10 text-white/40'}`}
                    >
                      {rolledValue}
                    </div>
                  );
                })}

                {/* Khali boxes jab tak 10 games na ho jayein */}
                {[...Array(Math.max(0, 10 - (gameHistory?.length || 0)))].map((_, i) => (
                  <div 
                    key={`empty-${i}`} 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/10 font-bold"
                  >
                    -
                  </div>
                ))}
              </div>
              <div className="mt-6 text-[10px] font-black uppercase text-gray-700 tracking-[0.4em] italic">Live Session History</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DiceGame;