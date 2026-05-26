import React, { useState, useEffect } from 'react';

const MarketingService = () => {
  // Modal aur structural data hook states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const [campaignData, setCampaignData] = useState({
    tokenName: '',
    bannerUrl: '',
    targetLink: '',
    duration: '3', // Default duration 3 days
    price: '10'    // Default price 10 SOLT
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // SOLT Token Matrix Sync Engine
  const handleDurationChange = (days) => {
    let priceCalculated = '10';
    if (days === '7') priceCalculated = '20';
    if (days === '30') priceCalculated = '70';
    
    setCampaignData({
      ...campaignData,
      duration: days,
      price: priceCalculated
    });
  };

  // Web3 Native SOLT Token Payment Executor
  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // FUTURE WEB3 IMPLEMENTATION HINT:
      // const tokenContract = new ethers.Contract(SOLT_ADDRESS, erc20ABI, signer);
      // await tokenContract.transfer(ADMIN_WALLET, ethers.utils.parseUnits(campaignData.price, 18));
      console.log("Initiating SOLT Token Web3 Payment Sequence:", campaignData);

      // Simulation delay for blockchain validation
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessMsg(`🎉 Payment of ${campaignData.price} SOLT Confirmed! Your banner campaign has been successfully deployed.`);
        
        // Form field absolute state clear (Default par reset)
        setCampaignData({ tokenName: '', bannerUrl: '', targetLink: '', duration: '3', price: '10' });
        
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccessMsg('');
        }, 4000);
      }, 2000);

    } catch (error) {
      console.error("Blockchain SOLT Transfer Failed:", error);
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      id: "banners",
      title: "Solt Ads Banner System",
      status: "Active",
      statusColor: "text-cyan-400 bg-cyan-400/10 border-cyan-500/20",
      description: "Get maximum visibility by placing your project's custom visual banners directly on top of SoltDex, SoltHub, and our high-traffic tracking dashboards.",
      badge: "High ROI",
      icon: (
        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500 flex flex-col items-center justify-center font-black tracking-wider text-xl md:text-3xl rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.15)] text-white">
          ADS BANNER
          <span className="text-xs font-mono font-normal tracking-widest text-cyan-200 mt-1">SOLT SYSTEM</span>
        </div>
      )
    },
    {
      id: "pinning",
      title: "Trending & Pinning Sale",
      status: "Coming Soon",
      statusColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      description: "Keep your presale locked right at the top of the pool explorer list. Pinning guarantees that every single user looking for active launchpads views your project first.",
      badge: "Hot Feature",
      icon: (
        <div className="w-full h-full bg-[#131e35] border border-gray-800 flex items-center justify-center rounded-xl relative group">
          <span className="text-5xl md:text-6xl filter drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-bounce duration-1000">📌</span>
          <div className="absolute inset-0 bg-red-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )
    },
    {
      id: "ama",
      title: "Book an AMA Session",
      status: "Coming Soon",
      statusColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      description: "Connect directly with the community. Schedule a live Ask-Me-Anything session hosted inside our official Soltcoin global channels to answer investor doubts and clear audits.",
      badge: "Community",
      icon: (
        <div className="w-full h-full bg-[#131e35] border border-gray-800 flex flex-col items-center justify-center rounded-xl relative group">
          <span className="text-5xl md:text-6xl filter drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] mb-1">💬</span>
          <span className="text-[10px] font-mono text-cyan-400/70 uppercase tracking-widest">Ask Me Anything</span>
        </div>
      )
    }
  ];
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 md:py-16 text-left relative">
      
      {/* Upper Meta Info */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-1 rounded-md uppercase tracking-wider">
          🛠️ Ecosystem Growth
        </span>
      </div>

      {/* Main Heading Panels */}
      <div className="border-b border-gray-800/60 pb-8 mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
          Advertising & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Marketing</span>
        </h1>
        <p className="text-sm md:text-base text-gray-400 mt-4 max-w-2xl font-light leading-relaxed">
          Boost your project's launch metrics. Use Soltchain's specialized Web3 advertising vectors to reach targeted DeFi investors, locked liquidity providers, and token buyers.
        </p>
      </div>

      {/* Grid Content Matrix */}
      <div className="space-y-8">
        {services.map((service) => (
          <div 
            key={service.id}
            className="group bg-[#0f172a]/40 border border-gray-800/80 rounded-2xl p-5 md:p-6 backdrop-blur-md flex flex-col md:flex-row gap-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_4px_30px_rgba(6,182,212,0.03)]"
          >
            {/* Left Graphic Grid Pillar */}
            <div className="w-full md:w-72 h-40 md:h-44 flex-shrink-0">
              {service.icon}
            </div>

            {/* Right Meta Grid Pillar */}
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                  <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h2>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${service.statusColor}`}>
                    {service.status}
                  </span>
                  {service.badge && (
                    <span className="text-[10px] font-mono text-gray-400 bg-gray-800/60 px-2 py-0.5 rounded-full">
                      {service.badge}
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Action Buttons Layer */}
              <div className="mt-5 pt-4 border-t border-gray-900 flex items-center justify-between">
                <span className="text-xs font-mono text-gray-500">
                  Target: Web3 Investors
                </span>
                {service.status === "Active" ? (
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs md:text-sm px-5 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-[1.02]"
                  >
                    Create Campaign
                  </button>
                ) : (
                  <button disabled className="bg-gray-800/40 text-gray-500 cursor-not-allowed font-medium text-xs md:text-sm px-5 py-2 rounded-xl border border-gray-800/60">
                    Locked
                  </button>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 🚀 PREMIUM SOLT UTILITY CAMPAIGN MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-[#0b1426] border border-cyan-500/30 rounded-2xl max-w-md w-full p-6 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative">
            
            {/* Close Trigger Cross */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-mono focus:outline-none"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <span>📢</span> Setup Ads Campaign
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Fill in your token details to deploy banners powered by SOLT.
            </p>

            {successMsg ? (
              <div className="py-12 text-center space-y-3">
                <div className="text-4xl">🚀</div>
                <p className="text-sm text-cyan-400 font-medium px-4 leading-relaxed">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleCreateCampaign} className="space-y-4 text-sm">
                
                {/* Token Name Input */}
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-1">Project / Token Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Soltcoin (SOLT)"
                    className="w-full bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    value={campaignData.tokenName}
                    onChange={(e) => setCampaignData({...campaignData, tokenName: e.target.value})}
                  />
                </div>

                {/* Banner Image URL Link */}
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-1">Banner Image URL</label>
                  <input 
                    type="url" 
                    required
                    placeholder="https://imgur.com/your-banner.png"
                    className="w-full bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    value={campaignData.bannerUrl}
                    onChange={(e) => setCampaignData({...campaignData, bannerUrl: e.target.value})}
                  />
                </div>

                {/* Target Destination Link */}
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-1">Target Redirect Link</label>
                  <input 
                    type="url" 
                    required
                    placeholder="https://soltdex.finance/presale/..."
                    className="w-full bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    value={campaignData.targetLink}
                    onChange={(e) => setCampaignData({...campaignData, targetLink: e.target.value})}
                  />
                </div>

                {/* Duration Dropdown Menu */}
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase mb-1">Campaign Duration</label>
                  <select 
                    className="w-full bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                    value={campaignData.duration}
                    onChange={(e) => handleDurationChange(e.target.value)}
                  >
                    <option value="3">3 Days Campaign — 10 SOLT</option>
                    <option value="7">7 Days Campaign — 20 SOLT</option>
                    <option value="30">30 Days Campaign — 70 SOLT</option>
                  </select>
                </div>

                {/* 💳 PREMIUM NATIVE SOLT COST CARD */}
                <div className="bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/20 rounded-xl p-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Total Amount</p>
                    <p className="text-xl font-black text-white mt-0.5">
                      {campaignData.price} <span className="text-cyan-400 text-sm font-bold">SOLT</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-gray-500">Asset Method</p>
                    <p className="text-xs text-gray-300 font-medium mt-0.5">Ecosystem Utility</p>
                  </div>
                </div>

                {/* Web3 Core Submit Trigger */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black py-3.5 rounded-xl transition-all shadow-[0_0_25px_rgba(6,182,212,0.25)] disabled:opacity-50 disabled:cursor-not-allowed uppercase text-xs tracking-wider"
                >
                  {isSubmitting ? 'Approving SOLT Transfer...' : `Pay & Deploy (${campaignData.price} SOLT)`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default MarketingService;