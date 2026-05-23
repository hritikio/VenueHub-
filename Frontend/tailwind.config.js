/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        display: ["Fraunces", "serif"],
      },
      colors: {
        ink: "#2c2016",
      },
    },
  },
  plugins: [],
};
