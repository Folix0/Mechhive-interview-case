import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {    
    extend: {
      colors: {
        'primary': '#6100FF',
        'secondary': '#8E77BD',
        'button': '#DEC9FF',
      },
    },
  },
  plugins: [],
} satisfies Config;
