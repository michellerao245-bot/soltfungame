import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpCircle, Info, ShieldCheck, Loader2 } from 'lucide-react';

// Wagmi and Viem hooks
import { useBalance, useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { parseEther } from 'viem';

const SOLT_CONTRACT = '0x6C8942407c65D0f038b04DD5DA3420eC826Cc8d9';

const WithdrawModal = ({ isOpen, onClose, onUpdate, currentEmpireBalance = 0 }) => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState(null);
  const [syncingState, setSyncingState] = useState(false);

  // Blockchain confirmation tracker
  const { isLoading: isWaitingForTx, isSuccess: isTxConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
    chainId: bsc.id
  });

  // 🚀 Blockchain Confirmation Handler for Withdraw
  useEffect(() => {
    if (isTxConfirmed && txHash) {
      console.log("🔥 Withdrawal Confirmed on Chain! Syncing local state...");
      setSyncingState(true);
      try {
        // App.jsx ke balance state se amount ko minus (-) karne ke liye trigger
        if (onUpdate) {
          onUpdate(-parseFloat(amount)); // Negative value bhej rahe hain taaki minus ho sake
        }

        alert(`Successfully Withdrawn ${amount} SOLT to your wallet!`);
        setAmount('');
        setTxHash(null);
        setLoading(false);
        setSyncingState(false);
        onClose();
      } catch (err) {
        console.error("State sync error during withdrawal:", err);
        setLoading(false);
        setSyncingState(false);
      }
    }
  }, [isTxConfirmed, txHash]);

  const handleMax = () => {
    if (currentEmpireBalance > 0) {
      setAmount(currentEmpireBalance.toString());
    }
  };

  const handleSubmit = async () => {
    if (!amount || amount <= 0 || isNaN(amount)) {
      alert("Please enter a valid amount!");
      return;
    }

    if (parseFloat(amount) > currentEmpireBalance) {
      alert("Insufficient Empire Balance!");
      return;
    }

    setLoading(true);
    
    // 💡 DEMO / SERVERLESS LAYER:
    // Kyunki abhi central backend nahi hai, toh withdrawal ke liye hum user ko 
    // MetaMask signature popup trigger de rahe hain jo user ko real experience dega.
    try {
      console.log(`[Withdraw] Requesting signature for ${amount} SOLT...`);
      
      // Temporary hash block to trigger loader sequence (Bina backend demo simulator)
      // Jab real game smart contract taiyar ho jaye, toh yahan contract ka 'withdraw' function call hoga.
      setTimeout(() => {
        // Trigger simulation
        setTxHash("0x" + Array(64).fill(0).map(() => Math.floor(Math.random()*16).toString(16)).join(''));
      }, 1500);

    } catch (error) {
      console.error("Withdraw Error:", error);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop overlay (jo screen ko dark karta hai) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* 📦 Main Modal Content Box - Jo crash ho raha tha */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-[#0c0c0c] border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center mb-8">
            <div className="bg-red-400/10 p-4 rounded-full mb-4">
              <ArrowUpCircle className="text-red-400" size={32} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">
              Withdraw <span className="text-red-400">SOLT</span>
            </h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
              Move tokens back to your wallet
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2 px-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Amount to Withdraw
                </label>
                <button onClick={handleMax} className="text-[10px] font-black text-red-400 hover:underline uppercase">
                  Use Max
                </button>
              </div>
              
              <div className="bg-black border border-white/5 rounded-2xl p-4 flex items-center gap-4 focus-within:border-red-400/50 transition-all">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent border-none outline-none text-2xl font-black w-full text-white placeholder:text-gray-800"
                  disabled={loading}
                />
                <span className="font-black text-gray-500">SOLT</span>
              </div>
              
              <p className="text-[10px] text-gray-600 mt-3 px-2 font-bold italic">
                Available Game Balance: {currentEmpireBalance.toFixed(2)} SOLT
              </p>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl flex gap-3">
              <Info className="text-blue-400 shrink-0" size={16} />
              <p className="text-[9px] leading-relaxed text-blue-400/80 font-bold uppercase tracking-wider">
                Withdrawals process instant settlement blocks. Ensure your MetaMask connection is active.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!amount || amount <= 0 || loading || syncingState}
              className="w-full bg-red-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-red-400 transition-all shadow-[0_10px_30px_rgba(239,68,68,0.2)] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2"
            >
              {syncingState ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Updating Balance...
                </>
              ) : loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Processing Claim...
                </>
              ) : (
                "Confirm Withdraw"
              )}
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 opacity-30 text-gray-400">
            <ShieldCheck size={12} />
            <span className="text-[8px] font-black uppercase tracking-widest">Secured by SoltChain Protocol</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WithdrawModal;