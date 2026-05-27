import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { bsc } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';

const projectId = '36ab9bad9a38e511fd10489d2f947ceb';

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [bsc]
});

// Yahan logic change kiya hai:
export const initializeAppKit = () => {
  if (typeof window !== 'undefined') {
    createAppKit({
      adapters: [wagmiAdapter],
      networks: [bsc],
      projectId,
      metadata: { 
        name: 'SoltHub', 
        description: 'Soltchain', 
        url: 'https://soltfungame.vercel.app', 
        icons: [''] 
      }
    });
  }
};