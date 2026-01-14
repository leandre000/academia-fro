/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Black and white theme
        'bg-primary': '#000000',
        'bg-secondary': '#0a0a0a',
        'bg-tertiary': '#1a1a1a',
        'border': '#333333',
        'text-primary': '#ffffff',
        'text-secondary': '#cccccc',
        'text-muted': '#999999',
        'accent': '#ffffff',
      },
    },
  },
  plugins: [],
}

