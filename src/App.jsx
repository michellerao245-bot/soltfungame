import React, { useState, useEffect } from "react";
import { GAMES_DATA } from "./data/games";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, ExternalLink, ArrowLeft } from "lucide-react";
// Web3Provider ko filhal comment rakha hai taaki black screen na aaye
// import { Web3Provider } from "./context/Web3Provider"; 

// Components import...
import Footer from "./components/Footer";
import DepositModal from "./components/DepositModal";
import WithdrawModal from "./components/WithdrawModal";
import TransactionSuccessModal from "./components/TransactionSuccessModal";
import WalletDisplay from "./components/WalletDisplay";

function CasinoApp() {
  const [activeGame, setActiveGame] = useState(null);
  const [betAmount] = useState(10);
  const [balance, setBalance] = useState(100.00); // Default balance
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Mock variables taaki code error na de
  const address = "0x000...000"; 
  const isConnected = true; 

  const handleBalanceUpdate = (amountChange) => {
    setBalance((prev) => parseFloat((prev + amountChange).toFixed(2)));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans flex flex-col">
      <div className="flex justify-end mb-8">
        <WalletDisplay 
          empireBalance={balance} 
          onDepositClick={() => setIsDepositOpen(true)} 
          onWithdrawClick={() => setIsWithdrawOpen(true)} 
        />
      </div>
      
      <div className="flex-grow">
        {!activeGame ? (
          <>
            <header className="max-w-7xl mx-auto mb-16 text-center pt-10">
              <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl font-black tracking-tighter mb-4">
                SOLT<span className="text-yellow-400">CASINO</span> HUB
              </motion.h1>
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
                    <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer">
                      PLAY NOW <ExternalLink size={18} />
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
        {/* Baaki routes... */}
      </Routes>
    </BrowserRouter>
  );
}