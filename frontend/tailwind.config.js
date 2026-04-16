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
        background: {
          light: '#F0F2F5',
          dark: '#1A1C1E',
        },
        primary: {
          light: '#A78BFA', // Soft Lavender
          dark: '#8B5CF6',
        },
        secondary: {
          light: '#34D399', // Mint
          dark: '#10B981',
        },
        text: {
          light: '#4B5563',
          dark: '#E5E7EB',
        },
        clay: {
          white: '#F0F2F5',
          shadow: '#D1D9E6',
          highlight: '#FFFFFF',
          darkShadow: '#121416',
          darkHighlight: '#22252A',
        }
      },
      boxShadow: {
        'neumo-sm': '6px 6px 12px #D1D9E6, -6px -6px 12px #FFFFFF',
        'neumo-md': '10px 10px 20px #D1D9E6, -10px -10px 20px #FFFFFF',
        'neumo-inner': 'inset 6px 6px 12px #D1D9E6, inset -6px -6px 12px #FFFFFF',
        'neumo-dark-sm': '6px 6px 12px #121416, -6px -6px 12px #22252A',
        'neumo-dark-md': '10px 10px 20px #121416, -10px -10px 20px #22252A',
        'neumo-dark-inner': 'inset 6px 6px 12px #121416, inset -6px -6px 12px #22252A',
      },
      borderRadius: {
        'clay': '2rem',
        'clay-sm': '1rem',
      }
    },
  },
  plugins: [],
}
