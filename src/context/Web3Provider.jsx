import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { bsc } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
const projectId = '36ab9bad9a38e511fd10489d2f947ceb'
const networks = [bsc]

const wagmiAdapter = new WagmiAdapter({ projectId, networks })

// Metadata ko pehle define karo
const metadata = {
  name: 'SoltHub',
  description: 'Soltchain Ecosystem Hub',
  url: 'https://soltfungame.vercel.app', // Yahan apni sahi URL likho
  icons: ['https://avatars.githubusercontent.com/u/177283245']
}

// Ensure createAppKit is called after adapter initialization
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata
})

export function Web3Provider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}