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
        primary: '#2196F3',    // Primary Blue
        secondary: '#FFC107',  // Accent Yellow
        background: '#FAFAFA', // Background
        textDark: '#212121',   // Text (Dark)
        textBody: '#333333',   // Body Text
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        comic: ['Comic Neue', 'Baloo 2', 'Fredoka', 'cursive'],
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
}
