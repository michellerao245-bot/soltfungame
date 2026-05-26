import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Agar @tailwindcss/vite install hai toh use yahan add karna hoga
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5176, // 🚀 Yeh line aapke fun game ko automatic 5176 port par lock kar degi
  }
})