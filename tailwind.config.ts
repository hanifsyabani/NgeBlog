import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': "#45C4F9",
        'secondary' : "#7D09FF",
        'tersier': "#FF0BE5",
      },
      fontFamily:{
        
      }
    },
  },
  plugins: [],
};
export default config;
