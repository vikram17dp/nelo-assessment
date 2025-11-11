/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        priority: {
          low: '#16a34a', // green-600
          medium: '#ca8a04', // yellow-600
          high: '#dc2626', // red-600
        },
      },
    },
  },
  plugins: [],
}

