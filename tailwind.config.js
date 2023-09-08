/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serr'],
        alqalamquran: ['Al Qalam Quran', 'sans-serr'],
      },
      colors:{
        primary:'#1F1F1F',
        unggu:'#FFFFFF',
        border: '#515782',
        grey:'131D4A',
      }

    },
  },
  plugins: [],
}
