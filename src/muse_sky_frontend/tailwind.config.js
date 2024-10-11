module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFC252',
      },
      fontFamily: {
        'onest': ['Onest', 'sans-serif'],
        'archivo': ['Archivo', 'sans-serif'],
        'oxanium': ['Oxanium', 'cursive'],
        'bricolage': ['Bricolage Grotesque', 'sans-serif'],
      },
      backgroundImage: {
        'subtract': "url('../src/assets/images/Subtract.png')",
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateX(-4px)' },
        },
        'bounce-text': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        'stretch-right': {
          '0%': { transform: 'translateX(0) scaleX(1) rotate(45deg)' },
          '25%': { transform: 'translateX(10) rotate(45deg)' },
          '70%': { transform: 'translateX(20px) scaleX(1.1) rotate(45deg)' },
          '100%': { transform: 'translateX(10px) scaleX(1) rotate(45deg)' },
        },
        'go-left': {
          '0%': { transform: 'translateX(0) scaleX(1) rotate(45deg)'},
          '25%': { transform: 'translateX(-10) rotate(45deg)' },
          '70%': { transform: 'translateX(-20px) scaleX(1.1) rotate(45deg)'},
          '100%': { transform: 'translateX(-10px) scaleX(1) rotate(45deg)' },
        },
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% / 3))' },
        },
        'scroll-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(100% / 3))' },
        },
      },
      animation: {
        'bounce-text': 'bounce-text 0.3s ease-in 2 reverse',
        'stretch-right': 'stretch-right .5s ease-in-out forwards',
        'go-left': 'go-left .5s ease-in-out forwards',
        'bounce-subtle': 'bounce-subtle 1s ease-in-out infinite',
        'scroll-left': 'scroll-left 10s linear infinite',
        'scroll-right': 'scroll-right 10s linear infinite',
      },
    },
  },
  plugins: [],
}