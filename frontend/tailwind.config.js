/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: 'hsl(0 0% 5%)',
        border: 'hsl(var(--border))',
        'hero-subtitle': 'var(--hero-subtitle)',
        primary: {
          light: '#A78BFA',
          dark: '#8B5CF6',
        },
        clay: {
          white: '#F0F2F5',
          shadow: '#D1D9E6',
          highlight: '#FFFFFF',
          darkShadow: '#121416',
          darkHighlight: '#22252A',
        },
        portfolio: {
          purple: '#6366F1',
          rose: '#EC4899',
          orange: '#F97316',
          violet: '#8B5CF6',
        },
        shopper: {
          emerald: '#10B981',
          mint: '#F0FDF4',
          'emerald-light': '#34D399',
          'emerald-dark': '#059669',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
      },
      boxShadow: {
        '3d-soft': '0 20px 50px rgba(0,0,0,0.05)',
        '3d-vibrant': '0 20px 50px rgba(236,72,153,0.3)',
        '3d-emerald': '0 20px 50px rgba(16,185,129,0.2)',
        '3d-mint': '0 15px 35px rgba(240,253,244,0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
    },
  },
  plugins: [],
}
