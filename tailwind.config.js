/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { dark: '#09090d', card: '#101018', border: '#1a1a2e' },
        rux: { purple: '#7c3aed', pink: '#ec4899', cyan: '#06b6d4' }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        serif: ['Georgia', 'serif']
      }
    },
  },
  plugins: [],
};
