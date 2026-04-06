import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F2B5B',
          hover: '#1A3F7A'
        },
        accent: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7'
        },
        income: {
          DEFAULT: '#10B981',
          bg: '#ECFDF5'
        },
        expense: {
          DEFAULT: '#EF4444',
          bg: '#FEF2F2'
        },
        bg: '#FAFAFA',
        surface: '#FFFFFF',
        border: {
          DEFAULT: '#E5E7EB',
          strong: '#D1D5DB'
        },
        sidebar: {
          bg: '#0F2B5B',
          text: '#E2E8F0',
          hover: '#1A3F7A',
          active: '#F59E0B'
        }
      },
      fontFamily: {
        display: ['var(--font-dm-serif)', 'serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 6px -1px rgba(0,0,0,0.07)',
        lg: '0 10px 15px -3px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      }
    },
  },
  plugins: [],
};
export default config;
