import React, { useState, useEffect } from "react";
import { GAMES_DATA } from "./data/games";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, ExternalLink, ArrowLeft } from "lucide-react";
import { useAccount } from "wagmi"; // 1. IMPORT UNCOMMENT KIYA
import { Web3Provider } from "./context/Web3Provider";

// ... (Baaki saare components ke imports wahi rahenge)

function CasinoApp() {
  const { address, isConnected } = useAccount(); // 2. Yahan UNCOMMENT KIYA

  const [activeGame, setActiveGame] = useState(null);
  const [betAmount, setBetAmount] = useState(10);
  const [rollUnder, setRollUnder] = useState(50);
  const [isRolling, setIsRolling] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [balance, setBalance] = useState(0);

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 3. EFFECT BHI UNCOMMENT KIYA TAAKI DATA LOAD HO SAKE
  useEffect(() => {
    if (isConnected && address) {
      loadUserData(address);
    } else {
      setBalance(0);
      setGameHistory([]);
    }
  }, [isConnected, address]);

  const loadUserData = (walletAddr) => {
    if (!walletAddr) return;
    const localBalance = localStorage.getItem(`empire_bal_${walletAddr}`);
    if (localBalance === null) {
      localStorage.setItem(`empire_bal_${walletAddr}`, "100.00");
      setBalance(100.00);
    } else {
      setBalance(parseFloat(parseFloat(localBalance).toFixed(2)));
    }
    const localHist = localStorage.getItem(`empire_hist_${walletAddr}`);
    setGameHistory(localHist ? JSON.parse(localHist) : []);
  };

  const handleBalanceUpdate = (amountChange) => {
    if (!address) return;
    setBalance((prevBalance) => {
      const currentNum = parseFloat(prevBalance) || 0;
      const changeNum = parseFloat(amountChange) || 0;
      const newBalance = currentNum + changeNum;
      const finalizedBalance = parseFloat(newBalance.toFixed(2));
      localStorage.setItem(`empire_bal_${address}`, finalizedBalance.toFixed(2));
      return finalizedBalance;
    });
  };

  const playDice = async () => {
    if (!isConnected || !address) {
      alert("Please connect your wallet first!");
      return;
    }
    if (balance < betAmount) {
      alert("Insufficient Balance in your Empire Wallet!");
      return;
    }
    setIsRolling(true);
    try {
      setTimeout(() => {
        const rolledNumber = Math.floor(Math.random() * 100) + 1;
        const isUserWin = rolledNumber < rollUnder;
        const multiplier = 98 / rollUnder;
        const profit = isUserWin ? (betAmount * multiplier) - betAmount : -betAmount;
        handleBalanceUpdate(profit);
        const newHistoryItem = {
          id: Date.now(),
          game: "Cyber Dice",
          bet: betAmount,
          roll: rolledNumber,
          val: rolledNumber,
          target: rollUnder,
          win: isUserWin,
          profit: parseFloat(profit.toFixed(2)),
          time: new Date().toLocaleTimeString()
        };
        setGameHistory((prev) => {
          const currentHist = Array.isArray(prev) ? prev : [];
          const updatedHist = [newHistoryItem, ...currentHist].slice(0, 10);
          localStorage.setItem(`empire_hist_${address}`, JSON.stringify(updatedHist));
          return updatedHist;
        });
        setLastResult(rolledNumber);
        setIsRolling(false);
        if (isUserWin) { setShowSuccess(true); }
      }, 2000);
    } catch (error) {
      console.error("Game Transaction Play Error:", error);
      setIsRolling(false);
      alert("Transaction failed or execution rejected.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans flex flex-col">
      <div className="flex justify-end mb-8">
        <WalletDisplay empireBalance={balance} onDepositClick={() => setIsDepositOpen(true)} onWithdrawClick={() => setIsWithdrawOpen(true)} onUpdate={() => loadUserData(address)} />
      </div>
      <div className="flex-grow">
        {!activeGame ? (
          <>
            <header className="max-w-7xl mx-auto mb-16 text-center pt-10">
              <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl font-black tracking-tighter mb-4">SOLT<span className="text-yellow-400">CASINO</span> HUB</motion.h1>
              <p className="text-gray-500 uppercase tracking-[0.3em] text-sm font-bold">The Ultimate DeFi Game Aggregator</p>
            </header>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {GAMES_DATA.map((game) => (
                <motion.div whileHover={{ y: -10 }} key={game.id} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300">
                  <div className="relative group">
                    <img src={game.image} className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={game.title} />
                    {game.isHot && <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1"><Flame size={12} /> HOT</div>}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-1">{game.title}</h3>
                    <p className="text-yellow-500/60 text-xs font-bold uppercase mb-6">{game.category}</p>
                    <button onClick={() => { /* ...router logic yahan rahega... */ }} className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_30px_rgba(250,204,21,0.1)] cursor-pointer">
                      {Number(game.id) === 11 ? 'ENTER ARENA' : 'PLAY NOW'} <ExternalLink size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <Footer />
          </>
        ) : (
          <div className="max-w-7xl mx-auto pt-10">
            <button onClick={() => setActiveGame(null)} className="flex items-center gap-2 text-gray-500 hover:text-yellow-400 mb-8 font-black uppercase tracking-widest transition-colors cursor-pointer">
              <ArrowLeft size={20} /> Back to Hub
            </button>
            {/* ...Gaming Components yahan... */}
            <LegalSection />
          </div>
        )}
      </div>
      <DepositModal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} onUpdate={handleBalanceUpdate} />
      <WithdrawModal isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} currentEmpireBalance={balance} onUpdate={handleBalanceUpdate} />
      <TransactionSuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} userAddress={address} amount={betAmount} />
    </div>
  );
}

export default function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CasinoApp />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivatePolicy />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/marketing" element={<MarketingService />} />
        </Routes>
      </BrowserRouter>
    
  );
}