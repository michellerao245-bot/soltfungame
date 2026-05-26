// 1. File ke sabse upar imports check kar lena bhai
import React, { useState } from 'react';
import RealDream11Web3 from '../components/RealDream11Web3';
import MyContestsLeaderboard from '../components/MyContestsLeaderboard';

// ... Casino component ke andar jahan game tabs handle ho rahe hain:

const [dream11Tab, setDream11Tab] = useState('lobby'); // 'lobby' ya 'leaderboard'

// ... Ab jahan tumhara render activeGame === 'dream11' chal raha hai, wahan ye lagao:
{activeGame === 'dream11' && (
  <div className="w-full min-h-screen bg-[#070707] p-4 text-white">
    
    {/* Tab Navigation Hub Bar */}
    <div className="flex bg-[#111] border border-white/5 p-1.5 rounded-2xl gap-3 max-w-md mx-auto mb-6">
      <button 
        onClick={() => setDream11Tab('lobby')} 
        className={`flex-1 py-2.5 text-xs font-black uppercase rounded-xl transition-all ${dream11Tab === 'lobby' ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.2)]' : 'text-gray-400 hover:text-white'}`}
      >
        🏏 Match Lobby
      </button>
      <button 
        onClick={() => setDream11Tab('leaderboard')} 
        className={`flex-1 py-2.5 text-xs font-black uppercase rounded-xl transition-all ${dream11Tab === 'leaderboard' ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.2)]' : 'text-gray-400 hover:text-white'}`}
      >
        🏆 My Contests
      </button>
    </div>

    {/* Dynamic Conditional Screen Router */}
    {dream11Tab === 'lobby' ? (
      <RealDream11Web3 
        currentBalance={balance} 
        onBalanceUpdate={handleBalanceUpdate}
        onTeamLocked={() => {
          // Alert ok hote hi automatic user leaderboard par chala jayega
          setDream11Tab('leaderboard'); 
        }} 
      />
    ) : (
      <MyContestsLeaderboard />
    )}
  </div>
)}