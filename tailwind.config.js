import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#FFFAED",
        yellow: "#F9CE41",
        gray: "#1A1A1A",
        white: colors.white,
        black: colors.black,
      },
      fontFamily: {
        primary: ["Dosis", "sans-serif"],
        secondary: ["Quicksand", "sans-serif"],
      },
      screens: {
        xs: "375px",
        s: "450px",
        ...defaultTheme,
      },
      backgroundImage: {
        empresaScaled: `url(https://www.spotsline.com.ar/wp-content/uploads/2021/05/empresa-scaled.jpg)`,
      },
      transitionDuration: {
        DEFAULT: "500ms",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        fontFamily: {
          primary: ["Dosis", "sans-serif"],
          secondary: ["Quicksand", "sans-serif"],
        },
        lineHeight: {
          large: "2px",
        },
      },
    }),
  ],
};
