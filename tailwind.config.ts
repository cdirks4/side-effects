import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mackinac: ['"P22 Mackinac Pro"', "serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
      },
      fontSize: {
        xs: "0.6rem",
        sm: "0.7rem",
        base: "0.8rem",
        lg: "0.9rem",
        xl: "1rem",
        "2xl": "1.125rem",
        "3xl": "1.35rem",
        "4xl": "1.7rem",
        "5xl": "2rem",
        "6xl": "2.75rem",
      },
      colors: {
        indigo: {
          600: "#4f46e5",
          700: "#4338ca",
          900: "#312e81",
        },
      },
      animation: {
        "slide-left": "slideLeft 1s ease-out",
        "fade-in": "fadeIn 1s ease-out",
      },
      keyframes: {
        slideLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class", // Enable dark mode
};

// Montserrat font classes

export default config;
