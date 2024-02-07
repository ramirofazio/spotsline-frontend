import defaultTheme from "tailwindcss/defaultTheme";
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F9CE41",
        secondary: "#484640",
        background: "#FFFAED",
      },
      fontFamily: {
        primary: ["Titillium Web", "sans-serif"],
        secondary: ["Quicksand", "sans-serif"],
      },
      screens: {
        xs: "375px",
        s: "450px",
        ...defaultTheme,
      },
      backgroundImage: {
        empresaScaled: `url(https://www.spotsline.com.ar/wp-content/uploads/2021/05/empresa-scaled.jpg)`,
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
            secondary: "#484640",
            background: "#FFFAED",
          },
        },
      },
    }),
  ],
};
