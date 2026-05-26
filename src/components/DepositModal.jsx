import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowDownCircle, Info, ShieldCheck, Loader2 } from 'lucide-react';

// Wagmi hooks transaction track karne ke liye
import { useBalance, useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { parseEther } from 'viem';

const SOLT_CONTRACT = '0x6C8942407c65D0f038b04DD5DA3420eC826Cc8d9';
const DESTINATION_WALLET = '0x6C8942407c65D0f038b04DD5DA3420eC826Cc8d9'; 

const ERC20_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "recipient", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const DepositModal = ({ isOpen, onClose, onUpdate }) => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState(null);
  const [syncingDb, setSyncingDb] = useState(false);

  // 1. Transaction init karne ke liye hook
  const { writeContractAsync } = useWriteContract();

  // 2. Blockchain par block confirm hone ka wait karne wala hook
  const { isLoading: isWaitingForTx, isSuccess: isTxConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
    chainId: bsc.id
  });

  // Wallet balance fetcher
  const { data: balanceData, refetch: refetchWalletBalance } = useBalance({
    address: address,
    token: SOLT_CONTRACT,
    chainId: bsc.id,
  });

  const walletBalanceFormatted = balanceData?.formatted && !isNaN(balanceData.formatted) 
    ? balanceData.formatted 
    : '0.00';

  // Jab blockchain par transaction confirm ho jaye, tab yeh chalega:
  useEffect(() => {
    const handleSuccessSync = async () => {
      if (isTxConfirmed && txHash) {
        console.log("🔥 Tx Confirmed on Chain! Initiating Backend DB Sync...");
        setSyncingDb(true);
        
        try {
          // Send transaction details to Render backend
          const response = await fetch('https://soltchain-backend.onrender.com/api/deposit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              address: address,          // Dono naming patterns bhej rahe hain backend compatibility ke liye
              walletAddress: address, 
              amount: amount.toString(), 
              txHash: txHash,
              transactionHash: txHash 
            })
          });

          if (!response.ok) {
            throw new Error(`Server returned status ${response.status}`);
          }

          const resData = await response.json();
          console.log("🔄 Backend Sync Response:", resData);

          // Refresh native Web3 wallet balance
          await refetchWalletBalance();

          // Trigger state update in App.jsx (Empire Balance update)
          if (onUpdate) {
            await onUpdate();
          }

          alert(`Successfully Deposited ${amount} SOLT!`);
          setAmount('');
          setTxHash(null);
          setLoading(false);
          setSyncingDb(false);
          onClose();
        } catch (err) {
          console.error("❌ DB Sync Error:", err);
          alert(`Blockchain Tx Success, but DB Sync failed: ${err.message}. Please refresh page.`);
          
          // Force update in UI as fallback
          if (onUpdate) {
            await onUpdate();
          }
          setLoading(false);
          setSyncingDb(false);
        }
      }
    };

    handleSuccessSync();
  }, [isTxConfirmed, txHash]);

  const handleMax = () => {
    if (parseFloat(walletBalanceFormatted) > 0) {
      setAmount(walletBalanceFormatted);
    }
  };

  const handleSubmit = async () => {
    if (!amount || amount <= 0 || isNaN(amount)) {
      alert("Please enter a valid amount!");
      return;
    }

    setLoading(true);
    try {
      console.log(`[BSC Live Tx] Launching Metamask for ${amount} SOLT...`);
      
      const hash = await writeContractAsync({
        chainId: bsc.id,
        address: SOLT_CONTRACT,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [
          DESTINATION_WALLET,
          parseEther(amount)
        ],
      });

      setTxHash(hash);
      console.log("Tx broadcasted. Hash saved:", hash);

    } catch (error) {
      console.error("Metamask Error:", error);
      setLoading(false);
      if (error?.message?.includes("user rejected")) {
        alert("Transaction cancelled by user.");
      } else {
        alert("Transaction failed on network.");
      }
    }
  };

  if (!isOpen) return null;

  const isButtonDisabled = !amount || amount <= 0 || loading || isWaitingForTx || syncingDb;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

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
            <div className="bg-yellow-400/10 p-4 rounded-full mb-4">
              <ArrowDownCircle className="text-yellow-400" size={32} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">
              Deposit <span className="text-yellow-400">SOLT</span>
            </h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
              Move tokens to game wallet
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2 px-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Amount to Deposit
                </label>
                <button onClick={handleMax} className="text-[10px] font-black text-yellow-400 hover:underline uppercase">
                  Use Max
                </button>
              </div>
              
              <div className="bg-black border border-white/5 rounded-2xl p-4 flex items-center gap-4 focus-within:border-yellow-400/50 transition-all">
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
                Available in Wallet: {parseFloat(walletBalanceFormatted).toFixed(2)} SOLT
              </p>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl flex gap-3">
              <Info className="text-blue-400 shrink-0" size={16} />
              <p className="text-[9px] leading-relaxed text-blue-400/80 font-bold uppercase tracking-wider">
                These tokens will be sent to the smart contract to facilitate instant betting. You can withdraw them anytime.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isButtonDisabled}
              className="w-full bg-yellow-400 text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-yellow-300 transition-all shadow-[0_10px_30px_rgba(250,204,21,0.2)] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2"
            >
              {syncingDb ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Updating Game Balance...
                </>
              ) : isWaitingForTx ? (
                <>
                  <Loader2 className="animate-spin" size6={16} />
                  Confirming on BSC Block...
                </>
              ) : loading ? (
                "Check MetaMask..."
              ) : (
                "Confirm Deposit"
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

export default DepositModal;