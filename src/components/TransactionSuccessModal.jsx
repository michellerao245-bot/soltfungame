import React from 'react';  
import { motion, AnimatePresence } from 'framer-motion';  
import { CheckCircle, ExternalLink, X, ArrowRight } from 'lucide-react';  

const TransactionSuccessModal = ({ isOpen, onClose, userAddress, amount }) => {  
  if (!isOpen) return null;  

  // ✅ Clean & Strict URL logic (Syntax error fixed)
  // Seedha user ke wallet ka link with Token Transactions tab 
  // Agar userAddress nahi hoga toh ye BscScan ka home page khol dega 
  const bscScanUrl = userAddress  
    ? `https://bscscan.com/address/${userAddress}#tokentxns` 
    : 'https://bscscan.com';  

  return (  
    <AnimatePresence>  
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">  
        <motion.div   
          initial={{ scale: 0.9, opacity: 0, y: 20 }}   
          animate={{ scale: 1, opacity: 1, y: 0 }}   
          exit={{ scale: 0.9, opacity: 0, y: 20 }}  
          className="bg-[#0c0c0c] border border-green-500/30 w-full max-w-sm rounded-[3rem] p-10 relative text-center shadow-[0_0_80px_rgba(34,197,94,0.15)]"  
        >  
          {/* Close Icon */}  
          <button onClick={onClose} className="absolute top-8 right-8 text-gray-600 hover:text-white transition-colors">  
            <X size={20} />  
          </button>  

          <div className="relative w-24 h-24 mx-auto mb-8">  
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-full h-full bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)]">  
              <CheckCircle size={48} className="text-black" strokeWidth={3} />  
            </motion.div>  
          </div>  

          <h2 className="text-3xl font-black uppercase italic text-white mb-2">SENT!</h2>  
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-8">Withdrawal Confirmed</p>  

          <div className="bg-black/50 border border-white/5 rounded-2xl p-6 mb-8 text-left">  
             <div className="flex justify-between items-center mb-2">  
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Amount Sent</span>  
                <span className="text-sm font-black text-green-500">{amount} SOLT</span>  
             </div>  
             <div className="h-[1px] bg-white/5 w-full my-3" />  
             <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">  
                <span className="text-gray-600">Network</span>  
                <span className="text-white">BNB Smart Chain</span>  
             </div>  
          </div>  

          <div className="space-y-3">  
            {/* Ye button ab seedha BSCScan kholega */} 
            <a   
              href={bscScanUrl}   
              target="_blank"   
              rel="noopener noreferrer"  
              className="w-full py-5 rounded-2xl bg-white text-black font-black text-xs uppercase flex items-center justify-center gap-3 hover:bg-gray-200 transition-all active:scale-95"  
            >  
              View on BscScan <ExternalLink size={16} />  
            </a>  
              
            <button onClick={onClose} className="w-full py-4 text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 hover:text-white transition-all flex items-center justify-center gap-2">  
              Back to Game <ArrowRight size={12} />  
            </button>  
          </div>  
        </motion.div>  
      </div>  
    </AnimatePresence>  
  );  
};  
  
export default TransactionSuccessModal;