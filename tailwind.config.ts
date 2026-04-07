import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium dark theme — slate base with indigo/violet accents
        background: {
          DEFAULT: '#f8fafc',   // light
          dark: '#0f172a',      // slate-900
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1e293b',      // slate-800
        },
        border: {
          DEFAULT: '#e2e8f0',   // slate-200
          dark: '#334155',      // slate-700
        },
        accent: {
          DEFAULT: '#6366f1',   // indigo-500
          hover: '#4f46e5',     // indigo-600
          light: '#a5b4fc',     // indigo-300
        },
        secondary: {
          DEFAULT: '#8b5cf6',   // violet-500
          hover: '#7c3aed',     // violet-600
        },
        muted: {
          DEFAULT: '#64748b',   // slate-500
          dark: '#94a3b8',      // slate-400
        },
        success: '#22c55e',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
