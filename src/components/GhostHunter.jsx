import React, { useState, useEffect } from 'react'; 
 
const GhostHunter = ({ currentBalance, onBalanceUpdate }) => { 
  const [betAmount, setBetAmount] = useState(10); 
  const [selectedTarget, setSelectedTarget] = useState(null); // 'phantom', 'banshee', 'poltergeist' 
  const [isHunting, setIsHunting] = useState(false); 
  const [radarStatus, setRadarStatus] = useState('READY TO SCAN THE ROOM'); 
  const [caughtGhost, setCaughtGhost] = useState(null); 
  const [gameMessage, setGameMessage] = useState(''); 
 
  const ghostTargets = [ 
    { id: 'phantom', name: '👻 PHANTOM', multiplier: 2, color: 'border-cyan-500 text-cyan-400 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]' }, 
    { id: 'banshee', name: '🧛 BANSHEE', multiplier: 3, color: 'border-purple-500 text-purple-400 bg-purple-950/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]' }, 
    { id: 'poltergeist', name: '🔥 POLTERGEIST', multiplier: 5, color: 'border-red-500 text-red-400 bg-red-950/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]' }, 
  ]; 

  // 🎛️ Dynamic Web Audio API Synth Engine (Google Anti-Block Compliant)
  const playGhostSFX = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === 'click') {
        // High-pitch sci-fi interface blip
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'scan_trigger') {
        // Charging power up effect
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.3);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'win') {
        // Regal arcade success theme
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5 note
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5 note
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5 note
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'lose') {
        // Melancholic spooky descending drone
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.linearRampToValueAtTime(60, now + 0.5);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {
      console.log("Audio contexts blocked or unsupported:", e);
    }
  };
 
  const handleHunt = () => { 
    if (!selectedTarget) { 
      alert('Please select a Ghost type to hunt first!'); 
      return; 
    } 
    if (currentBalance < betAmount) { 
      alert('Insufficient Balance in your Wallet!'); 
      return; 
    } 
 
    playGhostSFX('scan_trigger');
    // Deduct bet amount immediately 
    onBalanceUpdate(-betAmount); 
    setIsHunting(true); 
    setCaughtGhost(null); 
    setGameMessage(''); 
     
    const statuses = [ 
      '🚨 CALIBRATING EMF SCANNER...', 
      '📡 DETECTING EMF FIELDS (LEVEL 4)...', 
      '💨 TEMPERATURE DROPPING FASTER...', 
      '👁️ VISUAL MANIFESTATION DETECTED!' 
    ]; 
 
    statuses.forEach((status, index) => { 
      setTimeout(() => { 
        setRadarStatus(status); 
      }, index * 600); 
    }); 
 
    // Final Result (Roulette Wheel Simulation) 
    setTimeout(() => { 
      const rand = Math.random() * 100; 
      let resultGhost = 'phantom'; // 50% chance 
      if (rand > 50 && rand <= 83) resultGhost = 'banshee'; // 33% chance 
      if (rand > 83) resultGhost = 'poltergeist'; // 17% chance 
 
      const winningGhost = ghostTargets.find(g => g.id === resultGhost); 
      setCaughtGhost(winningGhost); 
      setIsHunting(false); 
      setRadarStatus('SCAN COMPLETE'); 
 
      if (resultGhost === selectedTarget) { 
        const targetObj = ghostTargets.find(g => g.id === selectedTarget); 
        const winAmount = betAmount * targetObj.multiplier; 
        onBalanceUpdate(winAmount); // Credit win returns 
        playGhostSFX('win');
        setGameMessage(`🎉 EXORCISM SUCCESSFUL! You caught the ${winningGhost.name} and won +${winAmount.toFixed(2)} SOLT!`); 
      } else { 
        playGhostSFX('lose');
        setGameMessage(`💀 MISSION FAILED! The ghost escaped or was a different entity (${winningGhost.name}).`); 
      } 
    }, 2800); 
  }; 
 
  return ( 
    <div className="w-full max-w-4xl mx-auto bg-[#08080c] border border-purple-500/20 rounded-3xl p-6 md:p-8 text-white my-6 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden"> 
       
      {/* Background Matrix Glow Effect */} 
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-purple-600/5 rounded-full filter blur-[80px] pointer-events-none"></div> 
 
      {/* Header */} 
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/5 pb-6 mb-8 gap-4"> 
        <div> 
          <h2 className="text-4xl font-black text-purple-400 tracking-tighter uppercase italic drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"> 
            GHOST HUNTER 
          </h2> 
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1"> 
            Web3 Dynamic Roulette Exorcism Engine 
          </p> 
        </div> 
         
        {/* Updated Top Right Box Name & Removed $ */} 
        <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-center min-w-[180px]"> 
          <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block mb-0.5">YOUR BALANCE</span> 
          <span className="text-2xl font-mono font-black text-purple-300">{currentBalance.toFixed(2)} SOLT</span> 
        </div> 
      </div> 
 
      {/* EMF Radar / Roulette Area */} 
      <div className="bg-neutral-950/40 border border-purple-500/10 rounded-2xl p-8 mb-8 flex flex-col items-center justify-center min-h-[320px] relative backdrop-blur-sm"> 
         
        {/* Radar Scanner Animation */} 
        <div className="relative w-40 h-40 rounded-full border border-purple-500/20 flex items-center justify-center mb-6 overflow-hidden"> 
          {isHunting && ( 
            <div className="absolute inset-0 border-t-2 border-l-2 border-purple-500 rounded-full animate-spin duration-1000"></div> 
          )} 
          <div className="absolute w-32 h-32 rounded-full border border-dashed border-purple-500/10"></div> 
          <div className="absolute w-20 h-20 rounded-full border border-purple-500/10 bg-purple-950/10 flex items-center justify-center"> 
            <span className={`text-3xl filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] ${isHunting ? 'animate-pulse' : ''}`}> 
              {isHunting ? '📡' : caughtGhost ? caughtGhost.name.split(' ')[0] : '🎯'} 
            </span> 
          </div> 
        </div> 
 
        {/* Dynamic Log & Status Screen */} 
        <div className="text-center max-w-md"> 
          <p className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-black mb-2"> 
            {radarStatus} 
          </p> 
          {gameMessage && ( 
            <p className={`text-sm font-black uppercase tracking-wide px-4 py-2 rounded-xl border ${ 
              gameMessage.includes('SUCCESSFUL')  
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400'  
                : 'bg-red-950/20 border-red-500/30 text-red-400' 
            }`}> 
              {gameMessage} 
            </p> 
          )} 
        </div> 
      </div> 
 
      {/* Configuration Betting Controls */} 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"> 
        {/* Stake Settings - Replaced $ with SOLT */} 
        <div className="bg-white/5 border border-white/5 p-4 rounded-xl"> 
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-3">SET HUNTING STAKE</p> 
          <div className="flex gap-2"> 
            {[10, 50, 100, 500].map((amt) => ( 
              <button 
                key={amt} 
                onClick={() => {
                  if(!isHunting) {
                    setBetAmount(amt);
                    playGhostSFX('click');
                  }
                }} 
                className={`flex-1 font-mono font-black py-2 rounded-lg border transition-all text-[10px] ${ 
                  betAmount === amt  
                    ? 'bg-purple-500 border-purple-400 text-black shadow-lg shadow-purple-500/20'  
                    : 'bg-[#111] border-white/5 text-gray-400 hover:text-white' 
                }`} 
              > 
                {amt} SOLT 
              </button> 
            ))} 
          </div> 
        </div> 
 
        {/* Selection Entities */} 
        <div className="bg-white/5 border border-white/5 p-4 rounded-xl"> 
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-3">TARGET SPECIFIC ENTITY</p> 
          <div className="flex gap-2"> 
            {ghostTargets.map((ghost) => ( 
              <button 
                key={ghost.id} 
                onClick={() => {
                  if(!isHunting) {
                    setSelectedTarget(ghost.id);
                    playGhostSFX('click');
                  }
                }} 
                className={`flex-1 font-black py-2 rounded-lg border text-[10px] uppercase tracking-tighter transition-all ${ 
                  selectedTarget === ghost.id  
                    ? `${ghost.color} border-2 scale-105`  
                    : 'bg-[#111] border-white/5 text-gray-500 hover:text-white' 
                }`} 
              > 
                <div>{ghost.name}</div> 
                <div className="opacity-60 text-[8px] mt-0.5">{ghost.multiplier}x Payout</div> 
              </button> 
            ))} 
          </div> 
        </div> 
      </div> 
 
      {/* Primary Action Core Trigger */} 
      <button 
        onClick={handleHunt} 
        disabled={isHunting} 
        className={`w-full font-black py-4 rounded-xl text-center uppercase tracking-widest transition-all text-sm ${ 
          isHunting  
            ? 'bg-gray-900 text-gray-600 cursor-not-allowed'  
            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white active:scale-95 shadow-[0_0_30px_rgba(168,85,247,0.3)]' 
        }`} 
      > 
        {isHunting ? '⚡ SCANNING ROOM... ⚡' : '🔮 START EXORCISM SCAN 🔮'} 
      </button> 
 
    </div> 
  ); 
}; 
 
export default GhostHunter;