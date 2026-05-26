import React, { useState } from 'react';
import { Trophy, Medal, ArrowLeft, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';

function MyContestsLeaderboard({ currentBalance, onBackToHub }) {
  // Dummy data: Real backend mein yeh data Express API se load hoga
  const [myRankData, setMyRankData] = useState({
    myRank: 14,
    totalParticipants: 2500,
    myTotalPoints: 342.5,
    matchTeams: "CSK vs MI",
    poolSize: "10 Crore SOLT",
    status: "LIVE" // LIVE, COMPLETED
  });

  // Top 20 Leaderboard users list
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: "CryptoWhale_1", points: 412.0, prize: "4,000,000 SOLT", isMe: false },
    { rank: 2, name: "SoltKing", points: 398.5, prize: "2,000,000 SOLT", isMe: false },
    { rank: 3, name: "Web3_Bouncer", points: 391.0, prize: "1,000,000 SOLT", isMe: false },
    { rank: 12, name: "DeFi_Ninja", points: 348.0, prize: "50,000 SOLT", isMe: false },
    { rank: 13, name: "AlphaSeeker", points: 345.5, prize: "50,000 SOLT", isMe: false },
    { rank: 14, name: "Harish (You)", points: 342.5, prize: "25,000 SOLT", isMe: true }, // User khud
    { rank: 15, name: "Matrix_Neo", points: 339.0, prize: "25,000 SOLT", isMe: false },
    { rank: 16, name: "BscScanner_Pro", points: 331.5, prize: "10,000 SOLT", isMe: false },
  ]);

  // Mere upar kitne log hain calculation
  const playersAboveMe = myRankData.myRank - 1;

  return (
    <div className="w-full bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 max-w-4xl mx-auto shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      
      {/* Top Header Navigation */}
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
        <button onClick={onBackToHub} className="flex items-center gap-2 text-gray-500 hover:text-yellow-400 font-bold uppercase text-xs cursor-pointer">
          <ArrowLeft size={16} /> Hub Par Wapas Chalein
        </button>
        <span className="bg-green-600/20 text-green-500 border border-green-500/30 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase animate-pulse">
          {myRankData.status} MATCH ARENA
        </span>
      </div>
      {/* Live Rank Analytics Banner */}
      <div className="bg-gradient-to-r from-[#121212] to-[#1a1a1a] border border-white/5 rounded-2xl p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">{myRankData.matchTeams}</h3>
          <p className="text-xs text-gray-500 font-bold uppercase mt-1">Pool Size: <span className="text-green-400">{myRankData.poolSize}</span></p>
        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto text-center">
          <div className="bg-black/50 border border-white/5 p-3 rounded-xl min-w-[110px]">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-wider">Aapka Rank</p>
            <p className="text-yellow-400 font-black text-2xl mt-1">#{myRankData.myRank}</p>
          </div>
          <div className="bg-black/50 border border-white/5 p-3 rounded-xl min-w-[110px]">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-wider">Aapke Upar</p>
            <p className="text-red-500 font-black text-2xl mt-1">{playersAboveMe} Log</p>
          </div>
          <div className="bg-black/50 border border-white/5 p-3 rounded-xl min-w-[110px]">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-wider">Total Points</p>
            <p className="text-white font-black text-2xl mt-1">{myRankData.myTotalPoints}</p>
          </div>
        </div>
      </div>

      {/* Winning Zone Status Toast Notification */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6 flex items-center gap-3">
        <CheckCircle2 className="text-green-400 flex-shrink-0" size={20} />
        <div>
          <p className="text-sm font-bold text-white">Aap abhi Winning Zone mein hain, bhai!</p>
          <p className="text-xs text-gray-400">Agar match abhi khatam hota hai toh aap <span className="text-yellow-400 font-black">25,000 SOLT</span> jeet jayenge.</p>
        </div>
      </div>
      {/* Main Leaderboard Render Board */}
      <div className="space-y-2">
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Trophy size={14} className="text-yellow-400" /> Live Board Ranking
        </h4>

        {/* Board Header Labels */}
        <div className="flex text-gray-500 text-[10px] font-black uppercase tracking-wider px-4 mb-2">
          <div className="w-16">Rank</div>
          <div className="flex-1">Player Username</div>
          <div className="w-24 text-center">Points</div>
          <div className="w-32 text-right">Estimated Prize</div>
        </div>

        {/* Ranks Iterator Loop */}
        <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
          {leaderboard.map((row) => (
            <div 
              key={row.rank}
              className={`flex items-center px-4 py-3 rounded-xl border transition-all ${
                row.isMe 
                  ? 'bg-yellow-400/10 border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.15)]' 
                  : 'bg-[#111] border-white/5'
              }`}
            >
              {/* Rank Position */}
              <div className="w-16 flex items-center gap-1.5">
                {row.rank <= 3 ? (
                  <Medal size={16} className={row.rank === 1 ? "text-yellow-400" : row.rank === 2 ? "text-gray-400" : "text-amber-600"} />
                ) : null}
                <span className={`font-black text-sm ${row.isMe ? 'text-yellow-400' : 'text-white'}`}>#{row.rank}</span>
              </div>

              {/* Username Tag */}
              <div className={`flex-1 font-bold text-sm ${row.isMe ? 'text-yellow-400' : 'text-gray-300'}`}>
                {row.name}
              </div>

              {/* Live Scored Metrics Points */}
              <div className="w-24 text-center font-black text-sm text-white">
                {row.points.toFixed(1)}
              </div>

              {/* Reward Distributed Tokens allocation */}
              <div className={`w-32 text-right font-black text-sm ${row.rank <= 3 ? 'text-green-400' : 'text-gray-400'}`}>
                {row.prize}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default MyContestsLeaderboard;