/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        primary: "rgb(19, 32, 73)",
        "primary-alt": "rgb(0, 51, 153)",
        "primary-light": "rgba(19, 31, 73, 0.1)",
        secondary: "rgb(182, 152, 43)",
        "secondary-alt": "rgb(245, 218, 204)",
        "secondary-light": "rgba(182, 152, 43, 0.1);",
        body: "rgb(84, 93, 109)",
        bg: "rgb(249, 250, 251)",
        white: "rgb(255, 255, 255)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
