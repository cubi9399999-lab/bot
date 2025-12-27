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
        primary: '#5D87FF',
        secondary: '#212121',
        pera: '#707070',
        hover: '#2A5CEB',
        footerBg: '#17243A',
        copyRightBg: '#1C2940',
        footerLink: '#D1D5DB',
      },
      maxWidth: {
        container: '1400px'
      },
      backgroundImage: {
        bannerBg: "url('/bg-1.png')"
      }
    },
  },
  plugins: [],
};
