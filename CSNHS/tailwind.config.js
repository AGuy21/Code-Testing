/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        csblue: '#1f2f6e',
        csgold: '#FFD700',
        lightgray: '#F5F5F5', 
        darkgray: '#4B4B4B', 
        charcoal: '#333333', 
        darkbg: '#0d1117', // Your specified dark background
        darkheader: '#151b23',
        darkoutline: '#282d35',
        darkemphasized: '#262c36',
        textfordark: '#ced8ee',
        secondarydarktext: '#9198a1',
      }
    },
  },
  plugins: [],
}

