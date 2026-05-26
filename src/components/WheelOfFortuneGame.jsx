import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Coins, Play, RotateCcw, Award } from 'lucide-react';

// 1. CONFIGURATION DATA ENGINE
const SECTORS = [
  { multiplier: 0, label: "0x", color: "#1e1b4b", text: "#6366f1" },      
  { multiplier: 2, label: "2x", color: "#10b981", text: "#000000" },      
  { multiplier: 0.5, label: "0.5x", color: "#f59e0b", text: "#000000" },    
  { multiplier: 1.5, label: "1.5x", color: "#3b82f6", text: "#ffffff" },    
  { multiplier: 0, label: "0x", color: "#1e1b4b", text: "#6366f1" },      
  { multiplier: 5, label: "5x", color: "#ec4899", text: "#ffffff" },     // Jackpot!
  { multiplier: 1.2, label: "1.2x", color: "#3b82f6", text: "#ffffff" },    
  { multiplier: 0.5, label: "0.5x", color: "#f59e0b", text: "#000000" },    
  { multiplier: 2, label: "2x", color: "#10b981", text: "#000000" },      
  { multiplier: 0, label: "0x", color: "#ef4444", text: "#ffffff" }       
];

const WheelOfFortuneGame = ({ currentBalance = 1000, onBalanceUpdate }) => {
  // 2. STATE MANAGEMENT HOOKS (Now safely inside the component)
  const [stake, setStake] = useState(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  
  const wheelRef = useRef(null);
  const currentRotation = useRef(0);

  // 3. CALCULATION & ANIMATION EXECUTION ENGINE
  const spinWheel = () => {
    if (isSpinning) return;
    if (stake <= 0) {
      setError("Enter a valid stake amount!");
      return;
    }
    if (currentBalance < stake) {
      setError("Insufficient balance in your wallet!");
      return;
    }

    setError('');
    setIsSpinning(true);
    setPrize(null);

    // Initial balance deduction pipeline
    if (onBalanceUpdate) onBalanceUpdate(-stake);

    // Mathematical vector selection
    const sectorCount = SECTORS.length;
    const randomSectorIndex = Math.floor(Math.random() * sectorCount);
    const selectedSector = SECTORS[randomSectorIndex];

    // Precision pointer math offset (Top position pointer targeting)
    const sectorDegrees = 360 / sectorCount;
    const targetDegrees = 270 - (randomSectorIndex * sectorDegrees) - (sectorDegrees / 2);
    
    // Dynamic rotation accumulation to bypass anti-clockwise snaps
    const totalSpinsDegrees = (360 * 6) + targetDegrees;
    currentRotation.current = totalSpinsDegrees + (360 - (currentRotation.current % 360));

    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)';
      wheelRef.current.style.transform = `rotate(${currentRotation.current}deg)`;
    }

    // Promise resolve callback pipeline
    setTimeout(() => {
      setIsSpinning(false);
      const grossPayout = stake * selectedSector.multiplier;
      const netProfit = grossPayout - stake;

      if (grossPayout > 0 && onBalanceUpdate) {
        onBalanceUpdate(grossPayout);
      }

      setPrize({
        multiplier: selectedSector.multiplier,
        payout: grossPayout,
        isWin: selectedSector.multiplier > 1
      });

      setHistory(prev => [
        {
          id: Date.now(),
          stake: stake,
          multiplier: selectedSector.multiplier,
          profit: netProfit,
          time: new Date().toLocaleTimeString()
        },
        ...prev
      ].slice(0, 8));

    }, 4100);
  };
  // 4. CYBERPUNK UI GRID LAYOUT RETURN
  return (
    <div className="bg-[#0c0c0e] border border-white/5 rounded-3xl p-6 md:p-8 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      
      {/* LEFT INTERACTION INTERFACE CONTAINER */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-yellow-400 font-bold tracking-widest text-xs uppercase bg-yellow-400/5 px-3 py-1.5 rounded-lg border border-yellow-400/10 w-max">
            <Award size={14} /> SLOT 10 • PREMIUM WHEEL
          </div>
          <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white mb-1">
            WHEEL OF <span className="text-yellow-400">FORTUNE</span>
          </h2>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Test your matrix alignment & multiplier streaks.</p>
        </div>

        {/* Stake Amount Handler Input */}
        <div className="bg-[#111115] border border-white/5 p-4 rounded-2xl">
          <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2">SET YOUR STAKE AMOUNT</label>
          <div className="flex items-center gap-3 bg-black/40 border border-white/5 p-2.5 rounded-xl">
            <Coins className="text-yellow-400 ml-1" size={20} />
            <input 
              type="number" 
              value={stake} 
              onChange={(e) => setStake(Math.max(0, parseFloat(e.target.value) || 0))}
              disabled={isSpinning}
              className="bg-transparent text-xl font-black text-white focus:outline-none w-full"
            />
            <div className="flex gap-1.5">
              <button onClick={() => setStake(p => Math.max(1, Math.floor(p / 2)))} disabled={isSpinning} className="bg-[#1a1a22] hover:bg-[#22222a] text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors text-gray-400">½</button>
              <button onClick={() => setStake(p => p * 2)} disabled={isSpinning} className="bg-[#1a1a22] hover:bg-[#22222a] text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors text-yellow-400">2X</button>
              <button onClick={() => setStake(parseFloat(currentBalance))} disabled={isSpinning} className="bg-yellow-400/10 hover:bg-yellow-400/20 text-xs font-black px-2.5 py-1.5 rounded-lg transition-colors text-yellow-400">MAX</button>
            </div>
          </div>
          {error && <p className="text-red-500 font-bold text-xs mt-2 uppercase tracking-wide">⚠️ {error}</p>}
        </div>

        {/* Execution Action Button */}
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className={`w-full font-black text-lg py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 tracking-wider uppercase ${
            isSpinning 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed shadow-none animate-pulse' 
              : 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-[0_0_30px_rgba(234,179,8,0.2)] cursor-pointer'
          }`}
        >
          {isSpinning ? <RotateCcw className="animate-spin" size={22} /> : <Play size={22} />}
          {isSpinning ? 'Spinning Matrix...' : 'LAUNCH SPIN'}
        </button>

        {/* Live Status Logger Terminal */}
        <div className="min-h-[80px] flex items-center justify-center border border-white/5 bg-black/20 rounded-2xl p-4">
          {prize && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
              <span className="text-[10px] block font-bold text-gray-500 uppercase tracking-widest mb-0.5">🎰 LANDED MULTIPLIER</span>
              <span className={`text-3xl font-black tracking-tight ${prize.multiplier >= 1 ? 'text-emerald-400' : 'text-red-500'}`}>
                {prize.multiplier}x {prize.multiplier > 0 ? `(+${prize.payout.toFixed(2)} SOLT)` : '(0 Payout)'}
              </span>
            </motion.div>
          )}
          {!prize && !isSpinning && <span className="text-xs text-gray-600 font-bold uppercase tracking-widest">Place bet & spin the engine</span>}
          {isSpinning && <span className="text-xs text-yellow-400/70 font-black uppercase tracking-widest animate-pulse">Calculating vector endpoints...</span>}
        </div>
      </div>

      {/* RIGHT MATRIX PANEL: WHEEL SVG GRAPHIC ASSEMBLEY */}
      <div className="lg:col-span-7 flex flex-col items-center justify-center relative py-6">
        <div className="absolute top-2 z-50 transform -translate-x-1/2 left-1/2">
          <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-top-[24px] border-top-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" />
          <div className="w-2 h-4 bg-yellow-500 mx-auto -mt-1 rounded-b" />
        </div>

        {/* Wheel Core Container */}
        <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full p-4 bg-[#111115] border-4 border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(255,255,255,0.05)] flex items-center justify-center overflow-hidden">
          <div 
            ref={wheelRef}
            className="w-full h-full rounded-full relative overflow-hidden origin-center"
            style={{ transform: 'rotate(0deg)' }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-[18deg]">
              {SECTORS.map((sec, i) => {
                const angle = 360 / SECTORS.length;
                const startAngle = i * angle;
                const endAngle = startAngle + angle;
                 
                const radStart = (Math.PI * startAngle) / 180;
                const radEnd = (Math.PI * endAngle) / 180;
     
                const x1 = 50 + 50 * Math.cos(radStart);
                const y1 = 50 + 50 * Math.sin(radStart);
                const x2 = 50 + 50 * Math.cos(radEnd);
                const y2 = 50 + 50 * Math.sin(radEnd);
     
                const textAngle = startAngle + angle / 2;
                const radText = (Math.PI * textAngle) / 180;
                const tx = 50 + 35 * Math.cos(radText);
                const ty = 50 + 35 * Math.sin(radText);
     
                return (
                  <g key={i}>
                    <path 
                      d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`} 
                      fill={sec.color}
                      stroke="#050505"
                      strokeWidth="0.6"
                    />
                    <text 
                      x={tx} 
                      y={ty} 
                      fill={sec.text} 
                      fontSize="4.5" 
                      fontWeight="900" 
                      textAnchor="middle" 
                      alignmentBaseline="middle"
                      transform={`rotate(${textAngle + 90}, ${tx}, ${ty})`}
                    >
                      {sec.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Center Metallic Pin Core */}
          <div className="absolute w-14 h-14 bg-gradient-to-br from-[#222] via-[#050505] to-[#333] border-4 border-white/10 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.5)] flex items-center justify-center z-40">
            <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-25 absolute" />
            <div className="w-3 h-3 bg-yellow-400 rounded-full z-50 drop-shadow-[0_0_8px_rgba(234,179,8,1)]" />
          </div>
        </div>

        {/* Personal Strategy Roll Pipeline History */}
        <div className="mt-8 w-full max-w-sm">
          <span className="text-[9px] block font-black uppercase text-gray-600 tracking-[0.2em] mb-2 text-center">PERSONAL STATS PIPELINE</span>
          <div className="flex gap-1.5 overflow-x-auto justify-center pb-2">
            {history.length === 0 ? (
              <span className="text-[10px] text-gray-700 uppercase font-bold py-1">No rounds executed</span>
            ) : (
              history.map((h) => (
                <div key={h.id} className={`text-[10px] font-black px-2.5 py-1 rounded-md border border-white/5 ${h.multiplier >= 1 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-500'}`}>
                  {h.multiplier}x
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WheelOfFortuneGame;