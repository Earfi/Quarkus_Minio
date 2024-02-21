/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  extend: {
    backgroundImage: {
      'login': "url('./public/login//crash.jpg')", 
    }
  },
  plugins: [require("daisyui")],
}

