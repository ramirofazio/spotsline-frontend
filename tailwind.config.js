import defaultTheme from "tailwindcss/defaultTheme";
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        glow: "glow 10s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: 0 },
          "2%": { opacity: 0.3 },
          "5%": { opacity: 0 },
          "7%": { opacity: 0.3 },
          "10%": { opacity: 0.25 },
          "15%": { opacity: 0 },
          "20%": { opacity: 0.45 },
          "80%": { opacity: 0.5 },
          "85%": { opacity: 0 },
        },
      },
      colors: {
        primary: "#F9CE41",
        secondary: "#3f3f3f",
        background: "#D9D9D9",
      },
      fontFamily: {
        primary: ["Titillium Web", "sans-serif"],
        secondary: ["Quicksand", "sans-serif"],
        slogan: ["Caveat", "sans-serif"],
      },
      screens: {
        xs: "375px",
        s: "450px",
        ...defaultTheme,
      },
      backgroundImage: {
        empresaScaled: `url(https://www.spotsline.com.ar/wp-content/uploads/2021/05/empresa-scaled.jpg)`,
        empresa2: `url("/empresa2.png")`,
        landingbg: `url("assets/landingbg.jpg")`,
        light: `url("assets/light.png")`,
        //! Esto tiene que volar!
      },
      transitionDuration: {
        DEFAULT: "500ms",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#F9CE41",
            secondary: "#3f3f3f",
            background: "#D9D9D9",
            focus: "transparent",
            //! Esto no va, pero era la unica forma de sacar los outline de las cosas de nextui
          },
        },
        dark: {
          colors: {
            primary: "#F9CE41",
            secondary: "#3f3f3f",
            background: "#D9D9D9",
            focus: "transparent",
            //! Esto no va, pero era la unica forma de sacar los outline de las cosas de nextui
          },
        },
      },
    }),
  ],
};
