/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  darkMode: 'selector',
  theme: {
    extend: {
      boxShadow: {
        customOne: '0px 2px 16px 0px rgba(153, 155, 168, 0.23)'
      }
    }
  },
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: []
};
