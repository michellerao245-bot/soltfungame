import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, ExternalLink } from "lucide-react";
import { GAMES_DATA } from "./data/games";

// --- Baki imports baad mein karenge ---
import Footer from "./components/Footer";

function CasinoApp() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans">
      <header className="max-w-7xl mx-auto mb-16 text-center pt-10">
        <h1 className="text-6xl font-black tracking-tighter mb-4">
          SOLT<span className="text-yellow-400">CASINO</span> HUB
        </h1>
        <p className="text-gray-500 uppercase tracking-[0.3em] text-sm font-bold">
          The Ultimate DeFi Game Aggregator
        </p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GAMES_DATA.map((game) => (
          <div key={game.id} className="bg-[#111] border border-white/5 rounded-2xl p-6">
            <h3 className="text-2xl font-bold mb-4">{game.title}</h3>
            <button className="w-full bg-yellow-400 text-black font-black py-4 rounded-xl">
              PLAY NOW <ExternalLink size={18} className="inline ml-2" />
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CasinoApp />} />
      </Routes>
    </BrowserRouter>
  );
}