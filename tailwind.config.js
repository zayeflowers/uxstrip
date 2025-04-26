/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        dark: '#2d3748',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        comic: ['Comic Sans MS', 'cursive'],
      },
    },
  },
  plugins: [],
}
