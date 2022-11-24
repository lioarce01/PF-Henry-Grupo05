/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xsm': '320px'
      },
      keyframes:{
        customPing:{
          '75%':{ transform : 'scale(1.5)',
                  opacity: '0'},
          '100%':{ transform : 'scale(1.5)',
                  opacity: '0'},
        }
      },
      animation: {
        'custom-ping': 'customPing 4s cubic-bezier(0, 0, 0.2, 1) infinite'
      }
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
