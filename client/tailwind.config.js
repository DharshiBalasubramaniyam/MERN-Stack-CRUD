/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        AfacadFlux: ['Afacad Flux', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

