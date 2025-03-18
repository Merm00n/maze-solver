import { nextui } from "@nextui-org/react";
import { space } from "postcss/lib/list";
/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
    }
  },

  plugins: [nextui(), require("tailwindcss-animate")],
};
