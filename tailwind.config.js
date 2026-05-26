/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dxDark: '#020202',
        dxCard: '#0c0c0c',
        neonYellow: '#facc15',
      }
    },
  },
  plugins: [],
}