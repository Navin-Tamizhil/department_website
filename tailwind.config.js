/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
      animation: {
        scroll: 'scroll 12s linear infinite',
      },
    },
  },
  plugins: [],
}

