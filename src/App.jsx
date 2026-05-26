import React, { useState, useEffect } from "react";
import { GAMES_DATA } from "./data/games";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, ExternalLink, ArrowLeft } from "lucide-react";
//import { useAccount } from "wagmi";
import { Web3Provider } from "./context/Web3Provider";



// 🎯 Connected Game Components
import GhostHunter from "./components/GhostHunter";
import SoltSlots from "./components/SoltSlots";
import Footer from "./components/Footer";
import DiceGame from "./components/DiceGame";
import CrashGame from "./components/CrashGame";
import EmpireBattle from "./components/EmpireBattle";
import MoonJump from './components/MoonJump';
import PokerGame from "./components/PokerGame";
import NeonRoulette from "./components/NeonRoulette";
import WheelOfFortuneGame from "./components/WheelOfFortuneGame";
import RealDream11Web3 from './components/RealDream11Web3';

// 📜 Legal Pages & Services Imports
import TermsOfUse from "./pages/TermsOfUse";
import PrivatePolicy from "./pages/PrivatePolicy";
import Documentation from "./pages/Documentation";
import MarketingService from "./pages/MarketingService";

import LegalSection from "./pages/LegalSection";
import DepositModal from "./components/DepositModal";
import WithdrawModal from "./components/WithdrawModal";
import TransactionSuccessModal from "./components/TransactionSuccessModal";
import WalletDisplay from "./components/WalletDisplay";

function CasinoApp() {
 // const { address, isConnected } = useAccount();

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

 // useEffect(() => {
   // if (isConnected && address) {
   //   loadUserData(address);
   // } else {
    //  setBalance(0);
     // setGameHistory([]);
   // }
  //}, [isConnected, address]);

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

      if (isUserWin) {
        setShowSuccess(true);
      }
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
      <WalletDisplay
        empireBalance={balance}
        onDepositClick={() => setIsDepositOpen(true)}
        onWithdrawClick={() => setIsWithdrawOpen(true)}
        onUpdate={() => loadUserData(address)}
      />
    </div>
<div className="flex-grow">
        {!activeGame ? (
          <>
            <header className="max-w-7xl mx-auto mb-16 text-center pt-10">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl font-black tracking-tighter mb-4"
              >
                SOLT<span className="text-yellow-400">CASINO</span> HUB
              </motion.h1>
              <p className="text-gray-500 uppercase tracking-[0.3em] text-sm font-bold">
                The Ultimate DeFi Game Aggregator
              </p>
            </header>
‌
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {GAMES_DATA.map((game) => (
                <motion.div
                  whileHover={{ y: -10 }}
                  key={game.id}
                  className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300"
                >
                  <div className="relative group">
                    <img src={game.image} className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={game.title} />
                    {game.isHot && (
                      <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                        <Flame size={12} /> HOT
                      </div>
                    )}
                  </div>
                 
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-1">{game.title}</h3>
                    <p className="text-yellow-500/60 text-xs font-bold uppercase mb-6">{game.category}</p>
                   
                    <button
                      onClick={() => {
                        const cleanTitle = game.title.replace(/\s+/g, '').toLowerCase();
                        const currentId = Number(game.id);

                        // 🎯 BULLETPROOF STRUCTURAL BYPASS ROUTING ENGINE
                        if (currentId === 10 || cleanTitle.includes("wheel") || cleanTitle.includes("fortune")) {
                          setActiveGame("wheeloffortune");
                        } else if (currentId === 3 || cleanTitle.includes("my11") || cleanTitle.includes("cricket")) {
                          setActiveGame("fantasycricket");
                        } else if (currentId === 9 || cleanTitle.includes("jump")) {
                          setActiveGame("moonjump");
                        } else if (currentId === 8 || cleanTitle.includes("ghost")) {
                          setActiveGame("ghosthunter");
                        } else if (currentId === 7 || cleanTitle.includes("roulette")) {
                          setActiveGame("roulette");
                        } else if (cleanTitle.includes("dice")) {
                          setActiveGame("dice");
                        } else if (cleanTitle.includes("crash")) {
                          setActiveGame("crash");
                        } else if (cleanTitle.includes("slots")) {
                          setActiveGame("slots");
                        } else if (cleanTitle.includes("battle") || cleanTitle.includes("empire")) {
                          setActiveGame("empirebattle");
                        } else if (cleanTitle.includes("poker") || currentId === 2) {
                          setActiveGame("poker");
                        } else if (currentId === 11) {
                          window.location.href = "/pvp-arena";
                        } else if (game.link && game.link !== "#") {
                          window.open(game.link, "_blank");
                        } else {
                          alert(`${game.title} coming soon!`);
                        }
                      }}
                      className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_30px_rgba(250,204,21,0.1)] cursor-pointer"
                    >
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
            <button
              onClick={() => setActiveGame(null)}
              className="flex items-center gap-2 text-gray-500 hover:text-yellow-400 mb-8 font-black uppercase tracking-widest transition-colors cursor-pointer"
            >
              <ArrowLeft size={20} /> Back to Hub
            </button>
           
            {/* 🎯 Master Router Pipeline Mapping */}
            {activeGame === "dice" && (
              <DiceGame
                betAmount={betAmount}
                setBetAmount={setBetAmount}
                rollUnder={rollUnder}
                setRollUnder={setRollUnder}
                isRolling={isRolling}
                playDice={playDice}
                lastResult={lastResult}
                gameHistory={gameHistory}
              />
            )}
            {activeGame === "crash" && (
              <CrashGame currentBalance={balance} onBalanceUpdate={handleBalanceUpdate} />
            )}
            {activeGame === "empirebattle" && (
              <EmpireBattle currentBalance={balance} onBalanceUpdate={handleBalanceUpdate} />
            )}
            {activeGame === "poker" && (
              <PokerGame currentBalance={balance} onBalanceUpdate={handleBalanceUpdate} />
            )}
            {activeGame === "roulette" && (
              <NeonRoulette currentBalance={balance} onBalanceUpdate={handleBalanceUpdate} />
            )}
            {activeGame === "slots" && (
              <SoltSlots currentBalance={balance} onBalanceUpdate={handleBalanceUpdate} />
            )}
            {activeGame === "ghosthunter" && (
              <GhostHunter currentBalance={balance} onBalanceUpdate={handleBalanceUpdate} />
            )}
            {activeGame === "moonjump" && (
              <MoonJump currentBalance={balance} onBalanceUpdate={handleBalanceUpdate} />
            )}
            {activeGame === "wheeloffortune" && (
              <WheelOfFortuneGame currentBalance={balance} onBalanceUpdate={handleBalanceUpdate} />
            )}
            {activeGame === "fantasycricket" && (
              <RealDream11Web3 currentBalance={balance} onBalanceUpdate={handleBalanceUpdate} />
            )}
‌
            <LegalSection />
          </div>
        )}
      </div>
‌
      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onUpdate={handleBalanceUpdate}
      />
     
      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        currentEmpireBalance={balance}
        onUpdate={handleBalanceUpdate}
      />
     
      <TransactionSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        userAddress={address}
        amount={betAmount}
      />
    </div>
  );
}

export default function App() {
  return (
    <Web3Provider>
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element={<CasinoApp />} />
          
          {/* Footer Pages */}
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivatePolicy />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/marketing" element={<MarketingService />} />
        </Routes>
      </BrowserRouter>
    </Web3Provider>
  );
}