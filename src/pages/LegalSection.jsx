import React from 'react';
import { ShieldCheck, Gavel, Scale } from 'lucide-react';

const LegalSection = () => {
  return (
    <footer className="max-w-7xl mx-auto mt-32 pb-20 border-t border-white/5 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
        {/* Fair Play */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-yellow-400">
            <ShieldCheck size={24} />
            <h4 className="font-black text-sm uppercase tracking-[0.3em]">Fair Play Protocol</h4>
          </div>
          <p className="text-[10px] text-gray-600 uppercase leading-loose tracking-widest">
            Our aggregator ecosystem uses Cryptographically Secure Random Number Generators (RNG) verified on-chain. Every transaction across our gaming hub is provably fair.
          </p>
        </div>
        
        {/* Legal Compliance */}
        <div className="space-y-6 border-x border-white/5 px-16">
          <div className="flex items-center gap-3 text-yellow-400">
            <Gavel size={24} />
            <h4 className="font-black text-sm uppercase tracking-[0.3em]">Legal Compliance</h4>
          </div>
          <p className="text-[10px] text-gray-600 uppercase leading-loose tracking-widest">
            SoltCasino Hub operates under SoltChain Decentralized Licenses. Participation involves financial risk. Restricted for users under 18 or in prohibited jurisdictions.
          </p>
        </div>

        {/* Terms of Service */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-yellow-400">
            <Scale size={24} />
            <h4 className="font-black text-sm uppercase tracking-[0.3em]">Terms of Service</h4>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#" className="text-[10px] font-black text-white hover:text-yellow-400 transition-colors uppercase tracking-widest">Risk Disclosure Statement</a>
            <a href="#" className="text-[10px] font-black text-white hover:text-yellow-400 transition-colors uppercase tracking-widest">Privacy & Data Encryption</a>
            <a href="#" className="text-[10px] font-black text-white hover:text-yellow-400 transition-colors uppercase tracking-widest">Anti-Money Laundering (AML)</a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 opacity-40">
        <span className="text-[11px] font-black tracking-[0.5em] uppercase">© 2026 SOLTCHAIN TECHNOLOGIES ALL RIGHTS RESERVED</span>
        <div className="flex gap-8 mt-6 md:mt-0">
          <span className="text-[10px] font-black uppercase">V1.0.8 HUB PREMIUM</span>
          <span className="text-[10px] font-black uppercase text-green-500 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Network: SoltMainnet
          </span>
        </div>
      </div>
    </footer>
  );
};

export default LegalSection;