/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Reference Design Colors - Dark Sidebar, Light Header, White Content
        'sidebar': {
          DEFAULT: '#1f2937', // Dark grey sidebar
          light: '#374151',
          dark: '#111827',
        },
        'header': {
          DEFAULT: '#f9fafb', // Light grey header
          border: '#e5e7eb',
        },
        // Primary Brand - Purple (matching reference)
        'brand': {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed', // Primary purple
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        // Accent - Purple variants
        'accent': {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        // Semantic Colors
        'success': {
          DEFAULT: '#10b981',
          light: '#d1fae5',
          dark: '#059669',
        },
        'warning': {
          DEFAULT: '#f59e0b',
          light: '#fef3c7',
          dark: '#d97706',
        },
        'error': {
          DEFAULT: '#ef4444',
          light: '#fee2e2',
          dark: '#dc2626',
        },
        'info': {
          DEFAULT: '#3b82f6',
          light: '#dbeafe',
          dark: '#2563eb',
        },
        // Surface Colors - Matching reference
        'surface': {
          primary: '#ffffff', // White content area
          secondary: '#f9fafb', // Light grey background
          tertiary: '#f3f4f6', // Very light grey
          elevated: '#ffffff',
        },
        // Text Colors - Professional greys
        'text': {
          primary: '#111827', // Dark grey text
          secondary: '#6b7280', // Medium grey
          tertiary: '#9ca3af', // Light grey
          disabled: '#d1d5db', // Very light grey
          inverse: '#ffffff', // White text
          muted: '#6b7280',
        },
        // Border Colors
        'border': {
          DEFAULT: '#e5e7eb',
          light: '#f3f4f6',
          medium: '#d1d5db',
          dark: '#9ca3af',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.25rem', letterSpacing: '0.01em', fontWeight: '400' }],
        'sm': ['0.875rem', { lineHeight: '1.375rem', letterSpacing: '0.01em', fontWeight: '400' }],
        'base': ['0.9375rem', { lineHeight: '1.5rem', letterSpacing: '0em', fontWeight: '400' }],
        'lg': ['1.0625rem', { lineHeight: '1.625rem', letterSpacing: '-0.01em', fontWeight: '500' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em', fontWeight: '600' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em', fontWeight: '600' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em', fontWeight: '600' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'large': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'brand': '0 4px 14px 0 rgba(124, 58, 237, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-up': 'fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-down': 'fadeInDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
