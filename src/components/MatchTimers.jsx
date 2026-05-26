import React, { useState, useEffect } from 'react';

const MatchTimers = ({ matchStartTime, betCutoffTime }) => {
  // Example inputs: 
  // matchStartTime = "2026-05-18T19:30:00"
  // betCutoffTime = "2026-05-18T19:00:00"

  return (
    <div className="bg-neutral-900 border border-yellow-500/30 rounded-xl p-4 my-4 max-w-md shadow-[0_0_15px_rgba(234,179,8,0.1)]">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-2 mb-3">
        <span className="text-gray-400 text-sm font-medium">Match Schedule</span>
        <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-0.5 rounded border border-yellow-500/20 font-mono">
          T-20
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Match Start Box */}
        <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Match Starts</p>
          <p className="text-base font-bold text-white font-mono">07:30 PM</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Standard Time</p>
        </div>

        {/* Betting Cutoff Box */}
        <div className="bg-neutral-950 p-3 rounded-lg border border-red-500/20 bg-gradient-to-br from-neutral-950 to-red-950/20">
          <p className="text-xs text-red-400 uppercase tracking-wider mb-1 font-semibold">⚡ Bets Lock</p>
          <p className="text-base font-bold text-red-500 font-mono">07:00 PM</p>
          <p className="text-[10px] text-red-400/70 mt-0.5">Deadline (30m prior)</p>
        </div>
      </div>

      {/* Dynamic Status / Alert Banner */}
      <div className="mt-3 bg-neutral-950/50 rounded-lg p-2 text-center border border-neutral-800">
        <p className="text-xs text-yellow-500/90 font-medium">
          ⚠️ Note: Teams cannot be modified after 07:00 PM lock.
        </p>
      </div>
    </div>
  );
};

export default MatchTimers;