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
      keyframes: {
        bounceX: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(5px)' },
        }
      },
      animation: {
        bounceX: 'bounceX 1s ease-in-out infinite'
      }
      // keyframes: {
      //   bounce-h: {
      //       '0%, 100%': { transform: 'translateX(3px)'},
      //       '50%': { transform: 'translateX(-3px)'}
      //     }
      // },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
