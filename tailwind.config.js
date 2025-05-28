/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          blue: '#00dfff',
          purple: '#A855F7'
        },
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        muted: "hsl(var(--muted))",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: '50% 50%, 50% 50%' },
          to: { backgroundPosition: '350% 50%, 350% 50%' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        pulse: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.8 }
        },
        sparkle: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: 0 },
          '50%': { transform: 'scale(1) rotate(180deg)', opacity: 0.8 },
          '100%': { transform: 'scale(0) rotate(360deg)', opacity: 0 }
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'glow-border': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '400% 50%' }
        },
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'button-shimmer': {
          '0%': { transform: 'rotate(45deg) translateY(-100%)' },
          '100%': { transform: 'rotate(45deg) translateY(100%)' }
        },
      },
      animation: {
        aurora: 'aurora 15s linear infinite',
        gradient: 'gradient 10s ease infinite',
        pulse: 'pulse 3s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
        shine: 'shine 1.5s ease-in-out infinite',
        'glow-border': 'glow-border 10s linear infinite',
        'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
        'star-movement-top': 'star-movement-top linear infinite alternate',
        'float': 'float 5s ease-in-out infinite',
        'button-shimmer': 'button-shimmer 4s linear infinite',
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
      opacity: {
        '15': '0.15',
      }
    },
  },
  plugins: [],
};