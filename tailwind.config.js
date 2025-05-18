/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7209b7',
          light: '#9d4edd',
        },
        secondary: {
          DEFAULT: '#00c2b3',
          light: '#4ad3c5',
        },
        accent: '#f72585',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay-1': 'float 6s 1s ease-in-out infinite',
        'float-delay-2': 'float 6s 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(114, 9, 183, 0.3), 0 0 30px rgba(0, 194, 179, 0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(114, 9, 183, 0.5), 0 0 50px rgba(0, 194, 179, 0.3)' },
        },
      },
    },
  },
  plugins: [],
};