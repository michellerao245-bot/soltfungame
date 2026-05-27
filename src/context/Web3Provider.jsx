import React, { useEffect } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiAdapter } from '../config';
import { initializeAppKit } from '../config'; // Naya function import kiya

const queryClient = new QueryClient();

export function Web3Provider({ children }) {
  useEffect(() => {
    initializeAppKit(); // Sirf browser mein call hoga
  }, []);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}