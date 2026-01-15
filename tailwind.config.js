/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional HRMS-inspired color scheme
        'bg-primary': '#f5f7fa',
        'bg-secondary': '#ffffff',
        'bg-tertiary': '#f8fafc',
        'border': '#e4e7eb',
        'text-primary': '#1a202c',
        'text-secondary': '#4a5568',
        'text-muted': '#718096',
        'accent': '#4f46e5',
        'accent-hover': '#4338ca',
        'accent-light': '#6366f1',
        'accent-dark': '#3730a3',
        // Professional gradient colors
        'gradient-start': '#4f46e5',
        'gradient-end': '#7c3aed',
        'gradient-purple': '#8b5cf6',
        'gradient-pink': '#ec4899',
        // Status colors with variants
        'success': '#10b981',
        'success-light': '#d1fae5',
        'warning': '#f59e0b',
        'warning-light': '#fef3c7',
        'error': '#ef4444',
        'error-light': '#fee2e2',
        'info': '#3b82f6',
        'info-light': '#dbeafe',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
        'gradient-soft': 'linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%)',
        'gradient-card': 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        'gradient-accent': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

