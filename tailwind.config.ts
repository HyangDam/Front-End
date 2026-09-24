import type { Config } from "tailwindcss";

// Design tokens ported from the 향담 prototype (향담-shared.jsx: T / SER / JAK / MONO)
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#ffffff", // 전체 배경 흰색 요청으로 변경 (기존 #fdf8f1)
          100: "#f5efe3", // T.bg2
          200: "#ede6da", // T.bg3
        },
        /** 앱 컨테이너 바깥(데스크톱 여백) 배경 — 흰 앱 화면과 구분되도록 한 톤 어둡게 */
        basement: "#f4f4f6",
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
        charcoal: "#191b1f", // 흰 배경에서 갈색기가 탁해 보여 중성 회색으로 변경 (기존 #1a1814)
        muted: {
          DEFAULT: "#7d756c", // T.muted
          light: "#b0a89e", // T.mutedLight
        },
        border: {
          DEFAULT: "#ddd6cc", // T.border
          dark: "#c8bfb4", // T.borderDark
        },
        gold: "#c8a870", // T.gold
        error: "#b4463c", // 에러 메시지 — 팔레트 톤에 맞춘 붉은 계열
        kakao: "#FEE500",
        naver: "#03C75A",
      },
      fontFamily: {
        serif: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ], // 프리텐다드 요청으로 변경 (기존 Noto Serif KR)
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ], // 프리텐다드 요청으로 변경 (기존 Plus Jakarta Sans)
        mono: ['"Courier New"', "Courier", "monospace"], // MONO — eyebrows, labels
        logo: ["var(--font-noto-serif-kr)", "serif"], // 香談 워드마크 전용, 프리텐다드 전환 대상 아님
      },
    },
  },
  plugins: [],
} satisfies Config;
