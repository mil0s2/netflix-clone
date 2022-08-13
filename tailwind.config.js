/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#e5e5e5',
        darkCream: '#b3b3b3',
        customBlack: '#141414',
        customIndigo: '#010511',
      },
    },
  },
  plugins: [],
};
