import React, { useState, useEffect } from 'react';

const VEGAS_COLORS = {
  0: 'green', 5: 'red', 10: 'black', 15: 'black', 20: 'black', 25: 'red',
  30: 'red', 32: 'red', 33: 'black', 34: 'red', 35: 'black', 36: 'red'
};

const NeonRoulette = ({ currentBalance, onBalanceUpdate }) => {
  const displayBalance = typeof currentBalance === 'number' ? currentBalance : 5041.69;
 
  // Core Game States
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null); 
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState(null);
  const [gameMessage, setGameMessage] = useState('PLACE YOUR VEGAS BETS');

  // Stats & Real-time Math Tracking
  const [betAmount, setBetAmount] = useState(10); 
  const [sessionWon, setSessionWon] = useState(0); 
  const [sessionLost, setSessionLost] = useState(0); 
  const [recentNumbers, setRecentNumbers] = useState([33, 25, 10, 5, 20]);
  const [potentialPayout, setPotentialPayout] = useState(0);

  // 🌟 Active Stars Canvas Array State
  const [starBurst, setStarBurst] = useState([]);

  // Multiplier Engine Link
  useEffect(() => {
    if (selectedNumber !== null) {
      setPotentialPayout(betAmount * 35);
    } else if (selectedZone) {
      setPotentialPayout(betAmount * 2);
    } else {
      setPotentialPayout(0);
    }
  }, [selectedNumber, selectedZone, betAmount]);

  // Inject Custom Vegas Animation Styles into Document Head
  useEffect(() => {
    const styleId = "vegas-stars-css";
    if (!document.getElementById(styleId)) {
      const styleNode = document.createElement("style");
      styleNode.id = styleId;
      styleNode.innerHTML = `
        @keyframes starExplode {
          0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 1; }
          80% { opacity: 0.9; }
          100% { transform: translate(var(--tx), var(--ty)) scale(var(--sz)) rotate(var(--rot)); opacity: 0; }
        }
        .vegas-star-particle {
          position: absolute;
          left: 50%;
          top: 45%;
          pointer-events: none;
          z-index: 99;
          font-size: 24px;
          animation: starExplode 2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
      `;
      document.head.appendChild(styleNode);
    }
  }, []);

  // 🌟 Trigger Engine: Generates Random Multi-Colored Stars Burst
  const triggerStarsCelebration = () => {
    const starsPool = ['✨', '⭐', '🌟', '💥', '🥇'];
    const colorsPool = ['#fbbf24', '#f59e0b', '#f43f5e', '#10b981', '#3b82f6', '#ffffff'];
    const temporaryStars = [];

    // Generates 45 individual explosion coordinates
    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 280; // Distance of blast radius
      const targetX = `${Math.cos(angle) * distance}px`;
      const targetY = `${Math.sin(angle) * distance}px`;
      const randomStar = starsPool[Math.floor(Math.random() * starsPool.length)];
      const randomColor = colorsPool[Math.floor(Math.random() * colorsPool.length)];
      const randomSize = (0.6 + Math.random() * 1.3).toFixed(2);
      const randomRotation = `${Math.floor(Math.random() * 360)}deg`;

      temporaryStars.push({
        id: i,
        char: randomStar,
        style: {
          '--tx': targetX,
          '--ty': targetY,
          '--sz': randomSize,
          '--rot': randomRotation,
          color: randomColor,
          textShadow: `0 0 12px ${randomColor}`
        }
      });
    }

    setStarBurst(temporaryStars);

    // Auto-clean canvas after animation terminates
    setTimeout(() => {
      setStarBurst([]);
    }, 2500);
  };

  // Sound Synth Generator Engine
  const playSynthSFX = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(587.33, now);
        gain.gain.setValueAtTime(0.1, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now); osc.stop(now + 0.1);
      } 
      else if (type === 'spin') {
        osc.type = 'triangle'; gain.gain.setValueAtTime(0.05, now);
        for (let i = 0; i < 20; i++) {
          const clickTime = now + (i * 0.12);
          osc.frequency.setValueAtTime(150 + (i * 15), clickTime);
          gain.gain.setValueAtTime(0.05, clickTime); gain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.08);
        }
        osc.start(now); osc.stop(now + 2.4);
      } 
      else if (type === 'win') {
        osc.type = 'square'; gain.gain.setValueAtTime(0.1, now);
        osc.frequency.setValueAtTime(523.25, now); osc.frequency.setValueAtTime(659.25, now + 0.15);
        osc.frequency.setValueAtTime(783.99, now + 0.3); osc.frequency.setValueAtTime(1046.50, now + 0.45);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        osc.start(now); osc.stop(now + 0.8);
      } 
      else if (type === 'lose') {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(60, now + 0.5);
        gain.gain.setValueAtTime(0.15, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now); osc.stop(now + 0.6);
      }
    } catch (err) { console.log(err); }
  };

  const selectBetTarget = (type, value) => {
    if (isSpinning) return;
    playSynthSFX('click');
    if (type === 'number') { setSelectedNumber(value); setSelectedZone(null); } 
    else { setSelectedZone(value); setSelectedNumber(null); }
  };

  const handleSpin = () => {
    if (selectedNumber === null && !selectedZone) {
      setGameMessage('SELECT A NUMBER OR BETTING ZONE FIRST!');
      return;
    }
    if (displayBalance < betAmount) {
      setGameMessage('INSUFFICIENT FUNDS FOR THIS WAGER!');
      return;
    }
   
    setIsSpinning(true);
    setGameMessage('🎰 WHEEL IS SPINNING...');
    setWheelResult(null);
    playSynthSFX('spin');

    setTimeout(() => {
      const availableNumbers = [0, 5, 10, 15, 20, 25, 30, 32, 33, 34, 35, 36];
      const winningNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
      const winningColor = VEGAS_COLORS[winningNumber];
      
      setWheelResult(winningNumber);
      setIsSpinning(false);
      setRecentNumbers(prev => [winningNumber, ...prev.slice(0, 4)]); 

      let isWin = false;
      let payoutMultiplier = 0;

      if (selectedNumber !== null && Number(selectedNumber) === winningNumber) {
        isWin = true; payoutMultiplier = 35;
      }
      else if (selectedZone) {
        if (selectedZone === 'RED' && winningColor === 'red') isWin = true;
        if (selectedZone === 'BLACK' && winningColor === 'black') isWin = true;
        if (selectedZone === 'EVEN' && winningNumber !== 0 && winningNumber % 2 === 0) isWin = true;
        if (selectedZone === 'ODD' && winningNumber % 2 !== 0) isWin = true;
        payoutMultiplier = 2;
      }

      if (isWin) {
        const netProfit = betAmount * payoutMultiplier;
        setGameMessage(`🎉 JACKPOT! YOU WON! RESULT: ${winningColor.toUpperCase()} ${winningNumber} (+${netProfit} SOLT)`);
        setSessionWon(prev => prev + netProfit);
        if (onBalanceUpdate) onBalanceUpdate(netProfit); 
        playSynthSFX('win'); 
        triggerStarsCelebration(); // 🌟 Explodes stars instantly on interface
      } else {
        setGameMessage(`💥 YOU LOST! BETTER LUCK NEXT TIME. RESULT: ${winningColor.toUpperCase()} ${winningNumber} (-${betAmount} SOLT)`);
        setSessionLost(prev => prev + betAmount);
        if (onBalanceUpdate) onBalanceUpdate(-betAmount); 
        playSynthSFX('lose'); 
      }
    }, 2500);
  };
  return (
    <div className="w-full max-w-4xl mx-auto bg-[#070707] border border-yellow-500/30 rounded-3xl p-6 md:p-8 text-white my-6 shadow-[0_0_60px_rgba(234,179,8,0.15)] relative overflow-hidden">
      
      {/* 🌟 STARS RENDER CANVAS CONTAINER */}
      {starBurst.map((star) => (
        <span key={star.id} className="vegas-star-particle" style={star.style}>
          {star.char}
        </span>
      ))}

      {/* Las Vegas Golden Neon Header */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-yellow-500/10 pb-6 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-[9px] px-2 py-0.5 rounded font-black tracking-widest animate-pulse"></span>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 tracking-tighter uppercase italic drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]">
              LAS VEGAS VIP ROULETTE
            </h2>
          </div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1">
            Premium High-Stakes Table • Provably Fair Authentication
          </p>
        </div>
       
        <div className="bg-gradient-to-b from-zinc-900 to-black border border-yellow-500/20 px-6 py-3 rounded-2xl text-center md:text-right min-w-[190px]">
          <span className="text-[9px] uppercase tracking-widest text-yellow-500/70 font-bold block mb-0.5">🎰 TABLE ACCOUNT BALANCE</span>
          <span className="text-2xl font-mono font-black text-white">{displayBalance.toFixed(2)} SOLT</span>
        </div>
      </div>

      {/* Vegas Live Billboard Tracker */}
      <div className="w-full bg-black/80 border border-white/5 p-3 rounded-xl mb-6 flex items-center justify-between px-6">
        <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Vegas Billboard History:</span>
        <div className="flex gap-2">
          {recentNumbers.map((num, idx) => (
            <span 
              key={idx} 
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-black text-xs border border-white/5 shadow-md ${
                VEGAS_COLORS[num] === 'red' ? 'bg-red-600/80 text-white' : 
                VEGAS_COLORS[num] === 'black' ? 'bg-zinc-800 text-white' : 'bg-green-600 text-white'
              }`}
            >
              {num}
            </span>
          ))}
        </div>
      </div>

      {/* 4-Column Financial Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
        <div className="bg-zinc-900/40 border border-white/5 p-3 rounded-xl">
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">CURRENT CHIP BET</p>
          <p className="text-lg font-mono font-black text-yellow-400">{betAmount} SOLT</p>
        </div>
        
        <div className="bg-amber-950/20 border border-yellow-500/30 p-3 rounded-xl shadow-[inset_0_0_10px_rgba(234,179,8,0.05)]">
          <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider">EST. POTENTIAL WIN</p>
          <p className="text-lg font-mono font-black text-yellow-400">
            {potentialPayout > 0 ? `+${potentialPayout}.00` : '0.00'} SOLT
          </p>
        </div>

        <div className="bg-zinc-900/40 border border-green-500/10 p-3 rounded-xl">
          <p className="text-[10px] text-green-500/70 font-bold uppercase tracking-wider">TOTAL PAID OUT</p>
          <p className="text-lg font-mono font-black text-green-400">+{sessionWon.toFixed(2)} SOLT</p>
        </div>
        
        <div className="bg-zinc-900/40 border border-red-500/10 p-3 rounded-xl">
          <p className="text-[10px] text-red-500/70 font-bold uppercase tracking-wider">TOTAL HOUSE CASHOUT</p>
          <p className="text-lg font-mono font-black text-red-400">-{sessionLost.toFixed(2)} SOLT</p>
        </div>
      </div>

      {/* Main Wheel & Grid Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
       
        {/* Left Control Column */}
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-black/80 to-zinc-950/80 border border-white/5 rounded-2xl relative min-h-[300px]">
          <div className={`w-32 h-32 rounded-full border-4 border-dashed border-yellow-500/60 flex items-center justify-center mb-4 bg-black shadow-[0_0_30px_rgba(234,179,8,0.1)] ${isSpinning ? 'animate-spin' : ''}`}>
            <span className={`text-4xl font-black font-mono ${wheelResult !== null && VEGAS_COLORS[wheelResult] === 'red' ? 'text-red-500' : wheelResult !== null && VEGAS_COLORS[wheelResult] === 'green' ? 'text-green-500' : 'text-yellow-400'}`}>
              {wheelResult !== null ? wheelResult : '🎰'}
            </span>
          </div>
         
          <div className="text-center w-full mb-4">
            <p className="text-xs font-black uppercase tracking-wider text-yellow-400 bg-yellow-400/5 px-4 py-2 rounded-lg border border-yellow-500/20 inline-block max-w-full">
              {gameMessage}
            </p>
          </div>

          <div className="w-full bg-[#111] p-3 rounded-xl border border-white/5 mt-2">
            <p className="text-[9px] uppercase tracking-widest text-zinc-500 text-center font-bold mb-2">Select Vegas Chip Size</p>
            <div className="flex justify-around gap-2">
              {[10, 50, 100, 500].map((chip) => (
                <button
                  key={chip}
                  disabled={isSpinning}
                  onClick={() => { playSynthSFX('click'); setBetAmount(chip); }}
                  className={`w-12 h-12 rounded-full border-2 border-dashed text-xs font-mono font-black transition-all cursor-pointer ${
                    betAmount === chip 
                      ? 'bg-yellow-500 text-black border-white scale-110 shadow-lg shadow-yellow-500/20' 
                      : 'bg-zinc-900 border-zinc-700 hover:border-zinc-500 text-white'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Inside/Outside Bets Layout Panel */}
        <div className="bg-black/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3">INSIDE BETS (PAYS 35x)</h4>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[0, 5, 10, 15, 20, 25, 30, 32, 33, 34, 35, 36].map((num) => (
                <button
                  key={num}
                  onClick={() => selectBetTarget('number', num)}
                  className={`py-2.5 text-sm font-mono font-black rounded-lg transition-all ${
                    selectedNumber === num
                      ? 'bg-yellow-500 text-black ring-4 ring-yellow-400/20 scale-105 font-black'
                      : num === 0 ? 'bg-green-700 text-white border border-green-600/30'
                      : VEGAS_COLORS[num] === 'red' ? 'bg-red-600 text-white'
                      : 'bg-zinc-900 text-zinc-200 border border-zinc-700/30'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3">OUTSIDE BETS (PAYS 2x)</h4>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {['RED', 'BLACK', 'EVEN', 'ODD'].map((zone) => (
                <button
                  key={zone}
                  onClick={() => selectBetTarget('zone', zone)}
                  className={`py-3 text-xs font-black rounded-xl border transition-all ${
                    selectedZone === zone
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black border-white'
                      : zone === 'RED' ? 'bg-red-700/20 text-red-400 border-red-500/30'
                      : zone === 'BLACK' ? 'bg-zinc-900 text-zinc-400 border-zinc-700'
                      : 'bg-zinc-900/40 text-white border-white/5'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`w-full font-black py-4 rounded-xl text-center uppercase tracking-wider transition-all cursor-pointer ${
              isSpinning
                ? 'bg-zinc-800 text-zinc-600 border border-white/5'
                : 'bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-black active:scale-95 shadow-xl shadow-yellow-500/5'
            }`}
          >
            {isSpinning ? '🎰 WHEEL SPINNING...' : '🎲 PLACE & INITIALIZE SPIN'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default NeonRoulette;