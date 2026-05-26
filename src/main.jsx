import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Wagmi & Reown Imports
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { bsc } from '@wagmi/core/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// 1. Setup QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Window focus par bar-bar refetch hoke screen freeze na ho
    },
  },
})

// 2. Setup Project ID
const projectId = '36ab9bad9a38e511fd10489d2f947ceb'

// 3. Setup Networks
const networks = [bsc]

// 4. Setup Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
})

// 5. Initialize AppKit
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  features: {
    analytics: true
  },
  themeMode: 'dark' // Cyberpunk / Dark premium aesthetic theme
})

// 6. Render App (STRICT MODE REMOVED FOR SMOOTH STATE TRANSITIONS)
createRoot(document.getElementById('root')).render(
  <WagmiProvider config={wagmiAdapter.wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </WagmiProvider>
)