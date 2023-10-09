/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './index.html',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // primary: '#171c30',
        // secondary: '#262d47',
        // text: '#646e8d',
        // 'blue-600': '#181B24',
        // 'blue-400': '#242635',
        'blue-600': '#171c30',
        'blue-400': '#262d47',
        'blue-300': '#343947',
        'blue-200': '#303240',
        'blue-100': '#8C8D95',
        'red-400': '#B1354A',
        'red-100': '#CC324C',
      },
      backgroundColor: {
        // primary: '#171c30',
        // secondary: '#262d47',
        // text: '#646e8d',
        'blue-600': '#171c30',
        'blue-400': '#262d47',
        'blue-300': '#343947',
        'blue-200': '#303240',
        'blue-100': '#8C8D95',
        'red-400': '#B1354A',
        'red-100': '#CC324C',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'idea-svg': "url('/src/assets/idea_icon.svg')",
        'writer-woman': "url('/src/assets/female-writer.webp')",
        'writer-man': "url('/src/assets/writer.webp')",
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
