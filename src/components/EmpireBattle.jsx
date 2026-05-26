import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import canvasConfetti from 'canvas-confetti';

// ⚙️ REAL DYNAMIC MATH ENGINE OVERRIDE (Forcing actual Wins & Losses)
export const EMPIRE_UNITS = [
  { id: 'infantry', name: 'Cyber Infantry', power: 15, multiplier: 1.5, costMultiplier: 1 },
  { id: 'mecha', name: 'Heavy Mecha', power: 42, multiplier: 2.2, costMultiplier: 2 },
  { id: 'drones', name: 'Strike Drones', power: 89, multiplier: 3.5, costMultiplier: 3 }
];

export const ENEMY_BASES = [
  { level: 1, name: 'Outpost Sector', defense: 50 },
  { level: 2, name: 'Fortified Redoubt', defense: 180 },
  { level: 3, name: 'Command Citadel', defense: 450 }
];

export const calculateBattleOutcome = (unitId, squadSize, baseLevel) => {
  const unit = EMPIRE_UNITS.find(u => u.id === unitId);
  const base = ENEMY_BASES.find(b => b.level === baseLevel);
  
  const playerPower = squadSize * unit.power;
  // Dynamic Scaling: Level badhne par enemy defense exponentally strong hoga
  const enemyPower = base.defense * (baseLevel === 3 ? 3.5 : baseLevel === 2 ? 1.8 : 1); 

  // Win probability calculation (Minimum 10%, Maximum 90%)
  let winChance = Math.floor((playerPower / (playerPower + enemyPower)) * 100);
  winChance = Math.max(10, Math.min(90, winChance));

  // 🎲 Actual Hardware Crypto RNG Simulation
  const randomRoll = Math.floor(Math.random() * 100) + 1;
  
  // User tabhi jeetega jab randomRoll winChance ke andar aayega
  const victory = randomRoll <= winChance;

  const betCost = squadSize * unit.costMultiplier;
  const payout = victory ? Math.floor(betCost * unit.multiplier) : 0;
  const profit = victory ? (payout - betCost) : -betCost;

  return {
    victory,
    winChance,
    playerPower,
    enemyPower,
    betCost,
    payout,
    profit
  };
};

// 🔊 PURE JAVASCRIPT CYBER AUDIO ENGINE
let audioCtx = null;

const playSynthSound = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const ctx = audioCtx;
    
    switch(type) {
      case 'click': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
        break;
      }
      case 'deploy': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 1.5);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.5);
        break;
      }
      case 'victory': {
        const notes = [440, 554, 659, 880];
        notes.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.1);
          gain.gain.setValueAtTime(0.1, ctx.currentTime + index * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + index * 0.1 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + index * 0.1);
          osc.stop(ctx.currentTime + index * 0.1 + 0.3);
        });
        break;
      }
      case 'defeat': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
        break;
      }
      default:
        break;
    }
  } catch (e) {
    console.log("Audio context execution error:", e);
  }
};

export default function EmpireBattle({ currentBalance = 0, onBalanceUpdate }) {
  const [selectedUnit, setSelectedUnit] = useState('infantry');
  const [selectedBase, setSelectedBase] = useState(1);
  const [squadSize, setSquadSize] = useState(5);
  const [isDeploying, setIsDeploying] = useState(false);
  const [battleReport, setBattleReport] = useState(null);
  const [warHistory, setWarHistory] = useState([]);

  const currentUnitData = EMPIRE_UNITS.find(u => u.id === selectedUnit);
  const currentBaseData = ENEMY_BASES.find(b => b.level === selectedBase);
  const totalBetCost = squadSize * (currentUnitData ? currentUnitData.costMultiplier : 1);

  const handleLaunchAttack = () => {
    if (isDeploying || totalBetCost <= 0) return;
    if (currentBalance < totalBetCost) {
      alert("Insufficient SOLT Balance to deploy squad!");
      return;
    }

    if (onBalanceUpdate) onBalanceUpdate(-totalBetCost);
    setIsDeploying(true);
    setBattleReport(null);
    playSynthSound('deploy'); 

    setTimeout(() => {
      const outcome = calculateBattleOutcome(selectedUnit, squadSize, selectedBase);
      setBattleReport(outcome);
      
      if (outcome.victory) {
        playSynthSound('victory'); 
        if (onBalanceUpdate) onBalanceUpdate(outcome.payout);
        try { canvasConfetti({ particleCount: 80, spread: 60 }); } catch (e) {}
      } else {
        playSynthSound('defeat'); 
      }

      setWarHistory(prev => [
        {
          id: Date.now(),
          unit: currentUnitData.name,
          target: currentBaseData.name,
          cost: outcome.betCost,
          status: outcome.victory ? 'VICTORY' : 'DEFEATED',
          profit: outcome.profit
        },
        ...prev
      ].slice(0, 5));
      
      setIsDeploying(false);
    }, 2000);
  };

  return (
    <div className="relative max-w-6xl mx-auto p-4 text-white font-sans select-none">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-red-500 to-amber-700 uppercase">
          EMPIRE BATTLE ​⚔️
        </h1>
        <p className="text-red-500/60 font-black text-xs uppercase tracking-[0.3em] mt-1">
          Web3 Tactical PvP Strategy • Deploy & Conquer
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#111] border border-white/5 rounded-3xl p-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider block mb-2">1. Choose Unit Type</label>
              <div className="grid grid-cols-1 gap-2">
                {EMPIRE_UNITS.map((unit) => (
                  <button key={unit.id} onClick={() => { setSelectedUnit(unit.id); playSynthSound('click'); }} className={`p-3 rounded-xl border text-left flex justify-between items-center transition-all ${selectedUnit === unit.id ? 'bg-red-500/10 border-red-500 text-white' : 'bg-[#050505] border-white/5 text-gray-400 hover:border-white/10'}`}>
                    <div>
                      <p className="font-black text-sm">{unit.name}</p>
                      <p className="text-[10px] text-gray-500">Base Power: {unit.power}</p>
                    </div>
                    <span className="text-xs font-black text-red-400">x{unit.multiplier} Payout</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider block mb-2">2. Target Location</label>
              <div className="grid grid-cols-3 gap-2">
                {ENEMY_BASES.map((base) => (
                  <button key={base.level} onClick={() => { setSelectedBase(base.level); playSynthSound('click'); }} className={`p-2.5 rounded-xl border text-center transition-all ${selectedBase === base.level ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-[#050505] border-white/5 text-gray-400 hover:border-white/10'}`}>
                    <p className="text-xs font-black">LVL {base.level}</p>
                    <p className="text-[9px] text-gray-500 mt-0.5 truncate">{base.name.split(' ')[0]}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">
                <span>3. Squad Size</span>
                <span className="text-white">{squadSize} Units</span>
              </div>
              <input type="range" min="1" max="20" value={squadSize} onChange={(e) => setSquadSize(parseInt(e.target.value))} className="w-full h-1 bg-[#050505] rounded-lg appearance-none cursor-pointer accent-red-500" />
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 mt-4 space-y-3">
            <div className="flex justify-between items-center bg-[#050505] p-3 rounded-xl border border-white/5 text-xs font-bold">
              <span className="text-gray-400">Deployment Cost:</span>
              <span className="text-amber-500 font-black text-sm">{totalBetCost} SOLT</span>
            </div>
            <button onClick={handleLaunchAttack} disabled={isDeploying || totalBetCost <= 0} className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-xl text-sm uppercase tracking-wider transition-all active:scale-95 disabled:bg-neutral-800 disabled:text-neutral-600 shadow-[0_0_30px_rgba(220,38,38,0.15)]">
              {isDeploying ? 'WAR COMMENCING...' : 'LAUNCH ASSAULT ⚔️'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 min-h-[320px] flex flex-col items-center justify-center relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-[#111] to-[#111]">
            <AnimatePresence mode="wait">
              {isDeploying ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-3">
                  <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-600 rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-black tracking-widest text-red-500 uppercase animate-pulse">Infiltrating Target Sectors...</p>
                </motion.div>
              ) : battleReport ? (
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-4 w-full max-w-sm">
                  <div className={`p-4 rounded-2xl border ${battleReport.victory ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                    <h2 className={`text-3xl font-black uppercase tracking-tight ${battleReport.victory ? 'text-green-500' : 'text-red-500'}`}>
                      {battleReport.victory ? 'MISSION VICTORY' : 'SQUAD WIPED'}
                    </h2>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase">Win probability was {battleReport.winChance}%</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-left text-xs bg-[#050505] p-3 rounded-xl border border-white/5">
                    <p className="text-gray-500 font-bold">Your Power:</p>
                    <p className="text-white font-black text-right">{battleReport.playerPower} ATK</p>
                    <p className="text-gray-500 font-bold">Base Def:</p>
                    <p className="text-white font-black text-right">{battleReport.enemyPower} DEF</p>
                    <p className="text-gray-500 font-bold border-t border-white/5 pt-1.5 mt-1.5">Net Return:</p>
                    <p className={`font-black text-right border-t border-white/5 pt-1.5 mt-1.5 ${battleReport.victory ? 'text-green-400' : 'text-red-400'}`}>
                      {battleReport.victory ? `+${battleReport.payout}` : `-${battleReport.betCost}`} SOLT
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center space-y-1 opacity-40">
                  <p className="text-4xl">🛰️</p>
                  <p className="text-xs font-black uppercase tracking-wider text-gray-400">Tactical Satellite Feed Idle</p>
                  <p className="text-[10px] text-gray-500">Configure parameters on left command deck to engage</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-3xl p-5">
            <h3 className="font-black uppercase text-xs tracking-wider text-gray-400 mb-3">Recent Infiltration Logs</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-gray-500 border-b border-white/5 uppercase font-black">
                    <th className="pb-2">Squad Composition</th>
                    <th className="pb-2">Target Base</th>
                    <th className="pb-2 text-right">War Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {warHistory.map((log) => (
                    <tr key={log.id} className="border-b border-white/5 font-medium">
                      <td className="py-2 text-gray-300">{log.unit}</td>
                      <td className="py-2 text-gray-400">{log.target}</td>
                      <td className={`py-2 text-right font-black ${log.status === 'VICTORY' ? 'text-green-500' : 'text-red-500'}`}>
                        {log.status === 'VICTORY' ? `+${log.profit}` : `${log.profit}`} SOLT
                      </td>
                    </tr>
                  ))}
                  {warHistory.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-gray-600 font-black text-[10px] uppercase">No deployment vectors mapped yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}