import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { GAMES_DATA } from "./data/games";

// Components
import Footer from "./components/Footer";
import GhostHunter from "./components/GhostHunter";
import SoltSlots from "./components/SoltSlots";
import DiceGame from "./components/DiceGame";
import CrashGame from "./components/CrashGame";
import EmpireBattle from "./components/EmpireBattle";
import MoonJump from "./components/MoonJump";
import PokerGame from "./components/PokerGame";
import NeonRoulette from "./components/NeonRoulette";
import WheelOfFortuneGame from "./components/WheelOfFortuneGame";
import RealDream11Web3 from "./components/RealDream11Web3";
import MyContestsLeaderboard from "./components/MyContestsLeaderboard";
import LegalSection from "./pages/LegalSection";
import DepositModal from "./components/DepositModal";
import WithdrawModal from "./components/WithdrawModal";
import TransactionSuccessModal from "./components/TransactionSuccessModal";
import WalletDisplay from "./components/WalletDisplay";

export default function Casino() {
  const [activeGame, setActiveGame] = useState(null);
  const [dream11Tab, setDream11Tab] = useState('lobby');
  const [balance, setBalance] = useState(100.00);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBalanceUpdate = (amount) => setBalance(prev => parseFloat((prev + amount).toFixed(2)));

  const renderGame = () => {
    if (activeGame === 'dream11') {
      return (
        <div className="w-full min-h-screen bg-[#070707] p-4 text-white">
          <div className="flex bg-[#111] border border-white/5 p-1.5 rounded-2xl gap-3 max-w-md mx-auto mb-6">
            <button onClick={() => setDream11Tab('lobby')} className={`flex-1 py-2.5 text-xs font-black uppercase rounded-xl transition-all ${dream11Tab === 'lobby' ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.2)]' : 'text-gray-400 hover:text-white'}`}>🏏 Match Lobby</button>
            <button onClick={() => setDream11Tab('leaderboard')} className={`flex-1 py-2.5 text-xs font-black uppercase rounded-xl transition-all ${dream11Tab === 'leaderboard' ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.2)]' : 'text-gray-400 hover:text-white'}`}>🏆 My Contests</button>
          </div>
          {dream11Tab === 'lobby' ? (
            <RealDream11Web3 currentBalance={balance} onBalanceUpdate={handleBalanceUpdate} onTeamLocked={() => setDream11Tab('leaderboard')} />
          ) : (
            <MyContestsLeaderboard />
          )}
        </div>
      );
    }

    switch (activeGame) {
      case 1: return <GhostHunter />;
      case 2: return <SoltSlots />;
      case 3: return <DiceGame />;
      case 4: return <CrashGame />;
      case 5: return <EmpireBattle />;
      case 6: return <MoonJump />;
      case 7: return <PokerGame />;
      case 8: return <NeonRoulette />;
      case 9: return <WheelOfFortuneGame />;
      default: return <div className="text-center py-20">Game coming soon!</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 flex flex-col">
      <div className="flex justify-end mb-8">
        <WalletDisplay empireBalance={balance} onDepositClick={() => setIsDepositOpen(true)} onWithdrawClick={() => setIsWithdrawOpen(true)} />
      </div>

      <div className="flex-grow">
        {!activeGame ? (
          <>
            <header className="text-center pt-10 mb-16">
              <h1 className="text-6xl font-black tracking-tighter">SOLT<span className="text-yellow-400">CASINO</span> HUB</h1>
            </header>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {GAMES_DATA.map((game) => (
                <div key={game.id} className="bg-[#111] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold mb-4">{game.title}</h3>
                  <button onClick={() => setActiveGame(game.id === 3 ? 'dream11' : game.id)} className="w-full bg-yellow-400 text-black font-black py-4 rounded-xl">PLAY NOW</button>
                </div>
              ))}
            </div>
            <Footer />
          </>
        ) : (
          <div className="max-w-7xl mx-auto pt-10">
            <button onClick={() => setActiveGame(null)} className="flex items-center gap-2 text-gray-500 mb-8 hover:text-yellow-400"><ArrowLeft /> Back</button>
            {renderGame()}
            <LegalSection />
          </div>
        )}
      </div>

      <DepositModal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} onUpdate={handleBalanceUpdate} />
      <WithdrawModal isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} currentEmpireBalance={balance} onUpdate={handleBalanceUpdate} />
      <TransactionSuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </div>
  );
}