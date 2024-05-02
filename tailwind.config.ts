import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "hsl(313, 29%, 42%)",
        accent: "hsl(358, 98%, 83%)",
        gold: "hsl(55, 66%, 69%)",
        mainTxt: "hsl(0, 0%, 100%)",
        altTxt: "hsl(234, 22%, 37%)",
        darkAccent: "hsl(357, 96%, 79%)",
        mainBg: "hsl(0, 0%, 96%)",
      },
      screens: {
        'max-md': { max: '47.98em' },
      },
    },
  },
  plugins: [],
};
export default config;
