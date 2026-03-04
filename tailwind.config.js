/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Montserrat', 'sans-serif'],
      },
      colors: {
        oro: '#c4b087',
        teal: {
          DEFAULT: '#2d8b8a',
          600: '#2d8b8a',
        },
        fondo: '#020305',
        sistema: '#090a0c',
      },
      animation: {
        'pulse-subtle': 'subtle-pulse 8s infinite ease-in-out',
        'scan-slow': 'scan-slow 15s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        'subtle-pulse': {
          '0%, 100%': { opacity: '0.15', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(1.01)' },
        },
        'scan-slow': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      aspectRatio: {
        'social': '1200 / 630',
        'story': '9 / 16',
      },
    },
  },
  plugins: [],
}