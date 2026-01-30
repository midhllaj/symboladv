/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        clash: ['ClashDisplay-Variable', 'ClashDisplay-Regular', 'sans-serif'],
        stardom: ['Stardom', 'sans-serif'],
      },
      colors: {
        'primary-red': '#D64545',
        'dark-charcoal': '#000000', // STRICT BLACK
        'brand-black': '#000000',
        'brand-white': '#FFFFFF',
        'medium-grey': '#1A1A1A',   // Almost black
        'light-grey': '#FFFFFF',    // Force distinct white
      },
    },
  },
  plugins: [],
}
