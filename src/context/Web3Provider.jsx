import React, { createContext } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Query Client setup
const queryClient = new QueryClient();

// Minimal Config (WagmiAdapter se pehle ye check karte hain)
const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(),
  },
});

export const Web3Context = createContext();

export function Web3Provider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Web3Context.Provider value={{ status: "Active" }}>
          {children}
        </Web3Context.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}