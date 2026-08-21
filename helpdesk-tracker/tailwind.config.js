/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#1A2233',
          light: '#525C72',
        },
        surface: '#FFFFFF',
        canvas: '#F5F6F9',
        line: '#E4E7EE',
        brand: {
          50: '#EEF0FD',
          100: '#DDE1FB',
          400: '#7A72F0',
          500: '#4F46E5',
          600: '#4038C4',
          700: '#332DA0',
        },
        navy: {
          900: '#0D1120',
          800: '#12172B',
          700: '#1B2140',
          600: '#2A3260',
        },
        status: {
          open: '#F59E0B',
          openBg: '#FEF3E2',
          progress: '#3B82F6',
          progressBg: '#E9F1FE',
          resolved: '#10B981',
          resolvedBg: '#E6F8F1',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(13,17,32,0.04), 0 1px 12px rgba(13,17,32,0.05)',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
}
