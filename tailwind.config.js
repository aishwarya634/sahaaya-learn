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
        brand: {
          50: '#eef6ff',
          100: '#d9ebff',
          200: '#bcdbff',
          300: '#8ec2ff',
          400: '#599eff',
          500: '#327bf7',
          600: '#1d5ee9',
          700: '#1749d6',
          800: '#193cac',
          900: '#1a3687',
        },
        isl: {
          light: '#e0f2fe',
          DEFAULT: '#0284c7',
          dark: '#0369a1',
        },
        aac: {
          light: '#f0fdf4',
          DEFAULT: '#16a34a',
          dark: '#15803d',
        },
        vision: {
          light: '#fef3c7',
          DEFAULT: '#d97706',
          dark: '#b45309',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        accessible: ['Atkinson Hyperlegible', 'OpenDyslexic', 'Comic Sans MS', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
