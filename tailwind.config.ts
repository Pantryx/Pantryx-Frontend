import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Legal documents and other content modules carry their own markup.
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          soft: "rgb(var(--ink-soft) / <alpha-value>)",
        },
        paper: "rgb(var(--paper) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        subtle: "rgb(var(--subtle) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      fontSize: {
        "display-1": ["clamp(2.75rem, 7vw + 0.5rem, 6rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-2": ["clamp(2rem, 4.5vw + 0.5rem, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-3": ["clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "lead": ["clamp(1.075rem, 0.6vw + 1rem, 1.25rem)", { lineHeight: "1.55" }],
      },
      spacing: {
        section: "clamp(4rem, 10vw, 10rem)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
