/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-clash)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-departure)', 'monospace'],
        display: ['var(--font-nippo)', 'sans-serif'],
      },
      colors: {
        ink: '#0A0A0F',
        surface: '#0F0F1A',
        panel: '#13131F',
        border: '#1E1E30',
        accent: '#5B5BFF',
        'accent-2': '#FF5B8D',
        'accent-3': '#5BFFC8',
        muted: '#6B6B8A',
        bright: '#E8E8FF',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(91, 91, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(91, 91, 255, 0.7)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
