import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9d31f1",
        secondary: "#f9f2ff",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["forest"],
  },
};
