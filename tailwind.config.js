/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0F",
          2: "#12121A",
          3: "#1B1B26",
        },
        ivory: {
          DEFAULT: "#F5F1E8",
          dim: "rgba(245, 241, 232, 0.62)",
          faint: "rgba(245, 241, 232, 0.36)",
        },
        champagne: "#D4B896",
        aurora: "#5EEAD4",
        rose: "#E8B4B8",
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Fraunces', 'serif'],
        body: ['"Manrope Variable"', 'Manrope', 'system-ui', 'sans-serif'],
        numeric: ['"Outfit Variable"', 'Outfit', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        ultra: "0.42em",
      },
      backdropBlur: {
        glass: "18px",
      },
      animation: {
        "spin-slow": "spin 28s linear infinite",
        "float-y": "floatY 6s ease-in-out infinite",
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
