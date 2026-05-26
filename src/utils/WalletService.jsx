import { defaultWagmiConfig } from '@web3modal/wagmi/react/config' 
import { cookieStorage, createStorage } from 'wagmi' 
import { bsc, mainnet } from "viem/chains";
 
// Reown Project ID
export const projectId = '36ab9bad9a38e511fd10489d2f947ceb' 
 
const metadata = { 
  name: 'CyberDice Pro', 
  description: 'SoltChain Premium Web3 Gaming', 
  url: 'https://soltchain.vercel.app',  // Purana hata kar ye wala daal do
  icons: ['https://soltchain.vercel.app/logo.png'] 
}

 
// BSC ko pehle rakha hai kyunki SOLT BSC par hai
const chains = [bsc, mainnet] 
 
export const config = defaultWagmiConfig({ 
  chains, 
  projectId, 
  metadata, 
  ssr: true, // SSR support add kiya hai stability ke liye
  storage: createStorage({ 
    storage: cookieStorage 
  }), 
}) 
 
export const shortenAddress = (address) => { 
  if (!address) return ""; 
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`; 
};
export default WalletService;