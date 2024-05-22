const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      indigo: colors.indigo,
      red: colors.red,
      rose: colors.rose,
      amber: colors.amber,
      yellow: colors.yellow,
      blue: colors.blue,
      green: colors.green,
      lime: colors.lime,
      purple: colors.purple,
      orange: colors.orange,
      'aha-green': {
        lighter: '#76D53A',
        light: '#519E2E',
        dark: '#425931',
        darker: '#0F2D1A',
      }
    },
    extend: {
      fontSize: {
        'xxs': '.65rem',
      },

      keyframes: {
        fold: {
          '0%': {
            transform: 'rotateX(-180deg)'
          },
          '100%': {
            transform: 'rotateX(0deg)'
          },
          // 'transform-style': 'preserve-3d',
        },

        unfold: {
          '0%': {
            transform: 'rotateX(0deg)'
          },
          '100%': {
            transform: 'rotateX(180deg)'
          },
          // 'transform-style': 'preserve-3d',
        }
      },


      animation: {
        'fold-card': 'fold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards',
        'unfold-card': 'unfold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}