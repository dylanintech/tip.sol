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
        'dark-mode': '#2C3E50', //#2C3E50
        'gradient-start': '#141E30',
        'gradient-end': '#243B55',
        'button-gradient-start': '#360033',
        'button-gradient-end': '#0b8793'
      },
      fontFamily: {
        'dm-sans': ['DM Sans'],
      }
    },
  },
  plugins: [],
}
