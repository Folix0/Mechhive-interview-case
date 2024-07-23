import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {    
    extend: {
      boxShadow: {
        'md-inner': '0 6px 6px -1px rgba(0, 0, 0, 0.1), inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'custom-inner-outer': 'inset 0 8px 10px 2px rgba(255, 255, 255, 0.2), 0 14px 10px -10px rgba(0, 0, 0, 0.5)',
      },
      colors: {
        'primary': '#6100FF',
        'secondary': '#8E77BD',
        'tertiary': '#7431e7',
        'button': '#DEC9FF',
      },
    },
  },
  plugins: [],
} satisfies Config;
