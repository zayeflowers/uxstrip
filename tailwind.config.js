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
        textDark: '#212121',   // Text (Dark)
        textBody: '#333333',   // Body Text
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        menu: ['"Montserrat Subrayada"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em', // -4%
        tagline: '-0.5px',
      },
      fontWeight: {
        extralight: '275',
      },
    },
  },
  plugins: [],
}
