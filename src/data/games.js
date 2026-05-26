import { EMPIRE_CONFIG } from '../utils/EmpireBridge';
 
export const GAMES_DATA = [
  {
    id: 1,
    title: "Cyber Dice",
    category: "Instant Win",
    image: "https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=400",
    link: EMPIRE_CONFIG.urls.dice,
    component: "DiceGame",
    slug: "cyber-dice",
    isHot: true
  },
  {
    id: 2,
    title: "PokerBaz Web3",
    category: "PvP Poker",
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=400",
    link: "#",
    component: "PokerGame",
    slug: "pokerbaz",
    isHot: true
  },
  {
    id: 3,
    title: "Think My11 Web3 Cricket",
    category: "Fantasy Cricket",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=400",
    link: "#",
    component: "CricketGame",
    slug: "think-my11",
    isHot: true
  },
  {
    id: 4,
    title: "SOLT Slots",
    category: "High-Stake Reels",
    image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?q=80&w=400",
    link: "#",
    component: "SoltSlots",
    slug: "solt-slots",
    isHot: true
  },
  {
    id: 5,
    title: "SOLT Crash",
    category: "Multiplayer",
    image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=400",
    link: "#",
    component: "CrashGame",
    slug: "solt-crash",
    isHot: false
  },
  {
    id: 6,
    title: "Empire Battle",
    category: "Web3 PvP Strategy",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400",
    link: "#",
    component: "EmpireBattle",
    slug: "empire-battle",
    isHot: true
  },
  {
    id: 7,
    title: "NeoRoulette",
    category: "Premium Table Game",
    image: "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?q=80&w=400",
    link: "#",
    component: "NeonRoulette",
    slug: "neo-roulette",
    isHot: true
  },
  {
    id: 8,
    title: "Ghost Hunter (Roulette Test)",
    category: "Premium Table Game",
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=400",
    link: "#",
    component: "GhostHunter", 
    slug: "ghost-hunter",
    isHot: false
  },
  {
    id: 9, // 🌕 Changed to 9 so it targets the 9th slot engine flawlessly
    title: "Moon Jump",
    category: "Skill Based",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=400",
    link: "#",
    component: "MoonJump",
    slug: "moon-jump",
    isHot: true
  },
  {
    id: 10,
    title: "Wheel of Fortune",
    category: "Luck Based",
    image: "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?q=80&w=400",
    link: "#",
    component: "WheelOfFortuneGame",
    slug: "wheel-of-fortune",
    isHot: false
  }
];