import React from 'react';
import { Wallet, PlusCircle, ArrowUpCircle, LogOut } from 'lucide-react';
// Hum yahan 'wagmi' ke hooks ko hatane ki jagah 'try-catch' logic ya conditional rendering use karenge
// Lekin abhi ke liye, agar provider hataya hai, toh ye dummy data dikhayega:

const WalletDisplay = ({ empireBalance, onDepositClick, onWithdrawClick }) => {
  // Mock data: kyunki humne Web3Provider hata diya hai
  const isConnected = false;
  const address = null;

  return (
    <div className="flex flex-col items-end gap-3">
      <div className="flex gap-2 items-stretch">
        {/* Empire Balance Card */}
        <div className="bg-[#111] border border-white/10 px-5 py-3 rounded-2xl flex flex-col items-start min-w-[130px]">
          <span className="text-[7px] font-black text-gray-500 uppercase tracking-[0.2em]">Empire Balance</span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-yellow-400">{empireBalance?.toFixed(2) || '0.00'}</span>
            <span className="text-[9px] font-black text-gray-400">SOLT</span>
          </div>
        </div>

        {/* Connect Button (Ab redirected button ki tarah kaam karega) */}
        <div
          onClick={() => window.location.href = 'https://link-to-your-other-project.com'}
          className="bg-[#111] border border-white/10 px-5 py-3 rounded-2xl flex flex-col items-start cursor-pointer hover:border-yellow-500/40 transition-colors"
        >
          <span className="text-[7px] font-black text-gray-500 uppercase tracking-[0.2em]">Offline</span>
          <div className="flex items-center gap-2 mt-1">
            <Wallet size={12} className="text-yellow-400" />
            <span className="text-[9px] font-black text-gray-400 italic uppercase">Connect Wallet</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 w-full">
        <button onClick={onDepositClick} className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 font-black uppercase italic text-[10px]">
          <PlusCircle size={14} strokeWidth={3} /> Deposit
        </button>
        <button onClick={onWithdrawClick} className="flex-1 bg-green-500 hover:bg-green-400 text-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 font-black uppercase italic text-[10px]">
          <ArrowUpCircle size={14} strokeWidth={3} /> Withdraw
        </button>
      </div>
    </div>
  );
};

export default WalletDisplay;