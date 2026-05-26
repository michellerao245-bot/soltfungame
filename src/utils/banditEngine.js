// 🔥 Exact Multiplier Setup matches your UI dashboard configuration
export const BOUNTY_ITEMS = [
  { symbol: '💎', name: 'Diamond', multiplier: 10, weight: 12 },
  { symbol: '🎰', name: 'Slot Machine', multiplier: 5, weight: 18 },
  { symbol: '🔥', name: 'Fire', multiplier: 3, weight: 25 },
  { symbol: '⚡', name: 'Lightning', multiplier: 2, weight: 35 },
  { symbol: '🍒', name: 'Cherry', multiplier: 1.5, weight: 50 },
];

// Weighted random logic for fair house edge
export const getRandomBanditSymbol = () => {
  const totalWeight = BOUNTY_ITEMS.reduce((acc, item) => acc + item.weight, 0);
  let random = Math.random() * totalWeight;
  for (let item of BOUNTY_ITEMS) {
    if (random < item.weight) return item.symbol;
    random -= item.weight;
  }
  return BOUNTY_ITEMS[BOUNTY_ITEMS.length - 1].symbol;
};

// Web Audio Policy Bypass
export const createBanditAudio = (ctxRef, type, startFreq, endFreq, duration, volume) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!ctxRef.current && AudioContext) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current && ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    
    const ctx = ctxRef.current;
    if (!ctx) return;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    if (endFreq) {
      osc.frequency.linearRampToValueAtTime(endFreq, ctx.currentTime + duration);
    }
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.log("Audio silent bypass");
  }
};