/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'solana-green': '#14F195',
        'solana-purple': '#9945FF',
        'dark-mode': '#2C3E50'
      },
      fontFamily: {
        'dm-sans': ['DM Sans'],
      }
    },
  },
  plugins: [],
}
