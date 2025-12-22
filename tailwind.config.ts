import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        teal: '#06B6D4',
        tealDark: '#0EA5A3',
        orange: '#F97316',
        surface: '#F8FAFC'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['"Noto Kufi Arabic"', '"Cairo"', 'Inter', 'sans-serif']
      },
      boxShadow: {
        card: '0 15px 50px rgba(15, 23, 42, 0.12)'
      }
    }
  },
  plugins: [forms]
};

export default config;
