/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heebo: ["Heebo", "sans-serif"],
      },
      colors: {
        // ============ CUSTOM BRAND COLORS BASED ON #da9a52 ============
        primary: {
          50: "#fef8f0",
          100: "#fdefdc",
          200: "#fbddb8",
          300: "#f8c68a",
          400: "#f4a85a",
          500: "#da9a52", // Main brand color
          600: "#c8823a",
          700: "#a66a2d",
          800: "#85552a",
          900: "#6d4626",
        },
        accent: {
          50: "#f0fdfc",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6", // Turquoise
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "soft-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
};
