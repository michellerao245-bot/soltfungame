import React from 'react'; 
import { Wallet, PlusCircle, ArrowUpCircle, LogOut } from 'lucide-react'; 
import { useAccount, useDisconnect } from 'wagmi'; 
import { useAppKit } from '@reown/appkit/react';

const WalletDisplay = ({ empireBalance, onDepositClick, onWithdrawClick }) => { 
  const { address, isConnected } = useAccount(); 
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();

  // Wallet connection trigger function
  const handleConnectToggle = async () => {
    if (!isConnected) {
      await open({ view: 'Connect' });
    }
  };

  // Clean disconnect with local session clear-out
  const handleDisconnect = async () => {
    await disconnect();
    localStorage.removeItem('wagmi.connected');
    localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE');
    localStorage.removeItem('walletconnect');
  };

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
 
        {/* Wallet Address / Connect Status Card */}
        <div 
          onClick={handleConnectToggle}
          className={`bg-[#111] border border-white/10 px-5 py-3 rounded-2xl flex flex-col items-start select-none ${!isConnected ? 'cursor-pointer hover:border-yellow-500/40 transition-colors' : ''}`}
        > 
          <span className="text-[7px] font-black text-gray-500 uppercase tracking-[0.2em]"> 
            {isConnected && address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Disconnected'} 
          </span> 
          <div className="flex items-center gap-2 mt-1"> 
             <Wallet size={12} className={isConnected ? "text-green-400" : "text-yellow-400"} /> 
             <span className="text-[9px] font-black text-gray-400 italic uppercase">
               {isConnected ? 'In Wallet' : 'Connect Wallet'}
             </span> 
          </div> 
        </div>

        {/* Dynamic Disconnect Button - Sirf connected state me layout balance rakhega */}
        {isConnected && (
          <button
            onClick={handleDisconnect}
            title="Disconnect Wallet"
            className="bg-[#111] border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300 px-3 rounded-2xl flex items-center justify-center transition-all active:scale-95"
          >
            <LogOut size={14} />
          </button>
        )}
      </div> 
 
      {/* Action Buttons: Deposit / Withdraw */}
      <div className="flex gap-2 w-full"> 
        <button  
          onClick={onDepositClick} 
          className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 font-black uppercase italic text-[10px]" 
        > 
          <PlusCircle size={14} strokeWidth={3} /> 
          Deposit 
        </button> 
 
        <button  
          onClick={onWithdrawClick} 
          className="flex-1 bg-green-500 hover:bg-green-400 text-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 font-black uppercase italic text-[10px] shadow-lg shadow-green-500/20" 
        > 
          <ArrowUpCircle size={14} strokeWidth={3} /> 
          Withdraw 
        </button> 
      </div> 
    </div> 
  ); 
}; 
 
export default WalletDisplay;