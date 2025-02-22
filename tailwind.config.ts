import type { Config } from "tailwindcss";
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#F72585', 
        secondary: '#3A0CA3', 
      },
      fontFamily: {
        montserrat: ['Montserrat', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
