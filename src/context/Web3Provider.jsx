import React, { createContext, useEffect } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { bsc } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

const queryClient = new QueryClient();
const projectId = '36ab9bad9a38e511fd10489d2f947ceb';

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [bsc]
});

export const Web3Context = createContext();

export function Web3Provider({ children }) {
  useEffect(() => {
    // Dynamic import taaki Vercel server par crash na ho
    import('@reown/appkit/react').then(({ createAppKit }) => {
      createAppKit({
        adapters: [wagmiAdapter],
        networks: [bsc],
        projectId,
        metadata: {
          name: 'SoltHub',
          description: 'Soltchain Ecosystem Hub',
          url: 'https://soltfungame.vercel.app',
          icons: ['https://avatars.githubusercontent.com/u/177283245']
        }
      });
    });
  }, []);

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