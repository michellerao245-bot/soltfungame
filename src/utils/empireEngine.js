// 🪖 Empire Battle Troops Config with Risk/Reward Profiles
export const EMPIRE_UNITS = [
  { id: 'infantry', name: 'Cyber Infantry', power: 15, multiplier: 1.5, costMultiplier: 1 },
  { id: 'mechs', name: 'Heavy Mechs', power: 40, multiplier: 2.2, costMultiplier: 2.5 },
  { id: 'drones', name: 'Strike Drones', power: 85, multiplier: 3.5, costMultiplier: 5 }
];

// Enemy Base Types for dynamic AI difficulty matching
export const ENEMY_BASES = [
  { level: 1, name: 'Outpost Sector', defensePower: 30, winChanceBonus: 10 },
  { level: 2, name: 'Fortified Core', defensePower: 75, winChanceBonus: 0 },
  { level: 3, name: 'Command Citadel', defensePower: 180, winChanceBonus: -15 }
];

/**
 * Calculates battle result based on deployed strength vs base defense
 */
export const calculateBattleOutcome = (unitId, squadCount, baseLevel) => {
  const selectedUnit = EMPIRE_UNITS.find(u => u.id === unitId);
  const selectedBase = ENEMY_BASES.find(b => b.level === baseLevel);
  
  if (!selectedUnit || !selectedBase) return null;

  const playerPower = selectedUnit.power * squadCount;
  const baseDefense = selectedBase.defensePower;
  
  // Power ratio calculation with difficulty modifiers
  const powerRatio = playerPower / (playerPower + baseDefense);
  let baseWinChance = powerRatio * 100 + selectedBase.winChanceBonus;
  
  // Clamp win chance between 10% and 90% for active risk profile
  const finalWinChance = Math.max(10, Math.min(90, baseWinChance));
  const roll = Math.random() * 100;
  const isVictory = roll <= finalWinChance;
  
  const totalBet = squadCount * selectedUnit.costMultiplier;
  const totalPayout = isVictory ? parseFloat((totalBet * selectedUnit.multiplier).toFixed(2)) : 0;
  
  return {
    victory: isVictory,
    winChance: Math.round(finalWinChance),
    playerPower,
    enemyPower: baseDefense,
    betCost: totalBet,
    payout: totalPayout,
    profit: isVictory ? parseFloat((totalPayout - totalBet).toFixed(2)) : -totalBet
  };
};