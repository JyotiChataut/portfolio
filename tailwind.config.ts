import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F0E0CF",
        deep: "#1C0902",
        mocha: "#5A2604",
        rust: "#B85E10",
        "rust-text": "#7A3A06",
        gold: "#EDB534",
        greige: "#C4A882",
        ivory: "#F5EBDF",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        thread: "0 18px 60px rgba(28, 9, 2, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
