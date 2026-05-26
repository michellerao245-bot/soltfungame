import { createClient } from '@supabase/supabase-js';

// 1. .env ki jagah direct yahan values daal do
const EMPIRE_SUPABASE_URL = "https://asiqpiwrynxemhqsmhgx.supabase.co"; 
const EMPIRE_SUPABASE_ANON_KEY = "sb_publishable_YktV4zmND0AZCANPCuS1nw_e1yFsb65"; // Jo key dashboard pe dikhi thi wo paste karo

console.log("TESTING WITH HARDCODED URL:", EMPIRE_SUPABASE_URL);

// 2. Client create karo
export const empireStorage = createClient(EMPIRE_SUPABASE_URL, EMPIRE_SUPABASE_ANON_KEY);

/**
 * 1. Balance Fetcher
 */
export const getEmpireBalance = async (address) => {
  if (!address) return 0;
  try {
    const { data, error } = await empireStorage
      .from('user_balances')
      .select('balance')
      .eq('wallet_address', address.toLowerCase())
      .single();
    
    if (error) throw error;
    return data ? data.balance : 0;
  } catch (err) {
    console.error("Balance fetch error:", err);
    return 0;
  }
};

export const getUnifiedBalance = getEmpireBalance;

/**
 * 2. Game History Fetcher
 */
export const getGameHistory = async (address) => {
  if (!address) return [];
  try {
    const { data, error } = await empireStorage
      .from('game_history')
      .select('*')
      .eq('wallet_address', address.toLowerCase())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("History fetch error:", err);
    return [];
  }
};

/**
 * 3. Main Game Logic
 */
export const playDiceGame = async (walletAddress, betAmount, rollUnder) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  const win = luckyNumber < rollUnder;
  
  console.log(`Game Result: ${luckyNumber}, Win: ${win}`);
  
  return {
    number: luckyNumber,
    win: win
  };
};