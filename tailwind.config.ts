import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#0300a9",
          normal: "#020089",
          dark: "#3a1065",
        },
        secondary: {
          light: "#fbbf24",
          normal: '#f59e0b',
        },
        success: '#15B097',
        error: '#C03744',
        borderColor: '#E4E4E4',
      },
      boxShadow: {
        custom: "0px 2px 10px 0px #0000001A",
        "3xl":
          "0px 9.40171px 9.40171px -4.70085px rgba(0, 0, 0, 0.04), 0px 18.8034px 23.5043px -4.70085px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
