// ==========================================
// SOLTCHAIN ECOSYSTEM CENTRAL BRIDGE
// ==========================================

const isLocal = window.location.hostname === "localhost";

export const EMPIRE_CONFIG = {
    // 1. Database & Backend Connections
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    backendApi: "https://solt-backend.render.com",

    // 2. Blockchain Settings (BSC Mainnet)
    networks: {
        chainId: 56,
        chainName: "BNB Smart Chain",
        nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
        rpcUrls: ["https://bsc-dataseed.binance.org/"],
        blockExplorerUrls: ["https://bscscan.com"],
    },

    // 3. Token & Contract Addresses
    contracts: {
        soltToken: "0x6C8942407c65D0f038b04DD5DA3420eC826Cc8d9", // Apna token address daal
        feeEngine: "0xC30050aBe984c3B3929822E3BbF33fbBE6b3C423",
    },

    // 4. Ecosystem Navigation (Redirect Logic)
    // Agar localhost pe hai toh local ports use honge, varna live domains
    urls: {
        empire: isLocal ? "http://localhost:5173" : "https://soltcoin-empire.netlify.app",
        dice: isLocal ? "http://localhost:5174" : "https://dice.soltcoin.com",
    }
};

/**
 * BscScan ke links banane ke liye helper function
 */
export const getBscScanLink = (data, type = "address") => {
    const base = EMPIRE_CONFIG.networks.blockExplorerUrls[0];
    if (type === "tx") return `${base}/tx/${data}`;
    return `${base}/address/${data}#tokentxns`;
};

/**
 * LocalStorage se user session handle karne ke liye (Optional)
 */
export const empireSession = {
    set: (key, value) => localStorage.setItem(`solt_${key}`, JSON.stringify(value)),
    get: (key) => JSON.parse(localStorage.getItem(`solt_${key}`)),
    clear: () => localStorage.clear(),
};