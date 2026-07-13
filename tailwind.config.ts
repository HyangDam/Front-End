import type { Config } from "tailwindcss";

// Design tokens ported from the 향담 prototype (향담-shared.jsx: T / SER / JAK / MONO)
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#fdf8f1", // T.bg — app background
          100: "#f5efe3", // T.bg2
          200: "#ede6da", // T.bg3
        },
        paper: "#ffffff", // T.paper — card surfaces
        rose: {
          DEFAULT: "#c4a090", // T.rose
          light: "#f0ddd6", // T.roseLight
          fill: "#e2c8bf", // T.roseFill
        },
        sage: {
          DEFAULT: "#4a5a45", // T.sage
          light: "#e4ebe2", // T.sageLight
        },
        charcoal: "#1a1814", // T.charcoal
        muted: {
          DEFAULT: "#7d756c", // T.muted
          light: "#b0a89e", // T.mutedLight
        },
        border: {
          DEFAULT: "#ddd6cc", // T.border
          dark: "#c8bfb4", // T.borderDark
        },
        gold: "#c8a870", // T.gold
        kakao: "#FEE500",
        naver: "#03C75A",
      },
      fontFamily: {
        serif: ["var(--font-noto-serif-kr)", "serif"], // SER — headings, wordmark
        sans: ["var(--font-plus-jakarta-sans)", "sans-serif"], // JAK — body text
        mono: ['"Courier New"', "Courier", "monospace"], // MONO — eyebrows, labels
      },
    },
  },
  plugins: [],
} satisfies Config;
