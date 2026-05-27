import React, { createContext } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiAdapter } from '../config'; // config.js se import karenge

const queryClient = new QueryClient();

export const Web3Context = createContext();

export function Web3Provider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Web3Context.Provider value={{ status: "Active" }}>
          {children}
        </Web3Context.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}