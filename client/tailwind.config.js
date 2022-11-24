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
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
<<<<<<< HEAD
      
      animation: {
        
      },
=======
        tracking: {
          '0%':{
            'letter-spacing': '-0.5em',
           ' opacity':' 0'
          },
          '40%':{
           ' opacity':' 0.6'
          },
          '100%': {
           ' opacity':' 1'
          },
        },
        delete:{
          '0%': {
            '-webkit-transform': 'translateZ(0)',
            'transform': 'translateZ(0)',
            'opacity': '1'
          },
          '100%': {
            '-webkit-transform': 'translateZ(-1100px)',
            'transform': 'translateZ(-1100px)',
            'opacity': '0'
          }
        },
        create:{
          '0%': {
            '-webkit-transform': 'translate(0)',
                    'transform': 'translate(0)',
          },
          '20%': {
            '-webkit-transform': 'translate(-2px, 2px)',
                    'transform': 'translate(-2px, 2px)'
          },
         '40%': {
            '-webkit-transform': 'translate(-2px, -2px)',
                   ' transform': 'translate(-2px, -2px)'
          },
          '60%': {
           ' -webkit-transform': 'translate(2px, 2px)',
                   ' transform':' translate(2px, 2px)'
          },
         ' 80%': {
            '-webkit-transform': 'translate(2px, -2px)',
                    'transform': 'translate(2px, -2px)',
          },
          '100%': {
            '-webkit-transform': 'translate(0)',
                   ' transform': 'translate(0)',
          },
        },
        bounceX: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(5px)' },
        }
      },
      animation: {
        'waving-hand': 'wave 2s linear infinite',
        'errors-animation': 'wave 0.4s linear 1',
        'tracking-animation': 'tracking 3s ease-out 1',
        'delete-animation': 'delete 1s ',
        'create-animation': 'create 1s linear infinite',
        'bounceX': 'bounceX 1s ease-in-out infinite'
>>>>>>> develop
      },
    },
    screens:{
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
