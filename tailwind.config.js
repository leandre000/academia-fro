/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Beautiful modern color scheme - Purple/Teal/Amber
        'bg-primary': '#fafafa',
        'bg-secondary': '#ffffff',
        'bg-tertiary': '#f5f5f5',
        'border': '#e5e7eb',
        'text-primary': '#111827',
        'text-secondary': '#374151',
        'text-muted': '#6b7280',
        // Primary accent - Purple
        'accent': '#7c3aed',
        'accent-hover': '#6d28d9',
        'accent-light': '#a78bfa',
        'accent-dark': '#5b21b6',
        // Keep for backward compatibility
        'gradient-purple': '#8b5cf6',
        'gradient-pink': '#ec4899',
        // Secondary accent - Teal
        'secondary-accent': '#14b8a6',
        'secondary-accent-light': '#5eead4',
        // Tertiary accent - Amber
        'tertiary-accent': '#f59e0b',
        'tertiary-accent-light': '#fbbf24',
        // Gradient colors
        'gradient-purple': '#8b5cf6',
        'gradient-teal': '#14b8a6',
        'gradient-amber': '#f59e0b',
        'gradient-pink': '#ec4899',
        // Status colors with variants
        'success': '#10b981',
        'success-light': '#d1fae5',
        'warning': '#f59e0b',
        'warning-light': '#fef3c7',
        'error': '#ef4444',
        'error-light': '#fee2e2',
        'info': '#06b6d4',
        'info-light': '#cffafe',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7c3aed 0%, #14b8a6 50%, #f59e0b 100%)',
        'gradient-soft': 'linear-gradient(135deg, #faf5ff 0%, #f0fdfa 50%, #fffbeb 100%)',
        'gradient-card': 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
        'gradient-accent': 'linear-gradient(135deg, #7c3aed 0%, #14b8a6 100%)',
        'gradient-purple-teal': 'linear-gradient(135deg, #8b5cf6 0%, #14b8a6 100%)',
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

