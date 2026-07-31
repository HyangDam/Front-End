export type HomeMoodT = {
  id: string;
  label: string;
  sub: string;
  color: string;
  emoji: string;
};

export const HOME_MOODS: HomeMoodT[] = [
  {
    id: "spring",
    label: "봄날의 꽃밭",
    sub: "플로럴 · 그린",
    color: "#f0c4cc",
    emoji: "🌸",
  },
  { id: "forest", label: "깊은 숲속", sub: "우디 · 이끼", color: "#c4d4b0", emoji: "🌲" },
  {
    id: "ocean",
    label: "바다의 아침",
    sub: "아쿠아틱 · 시트러스",
    color: "#b0c8d8",
    emoji: "🌊",
  },
  {
    id: "cafe",
    label: "오후의 카페",
    sub: "구르망 · 파우더리",
    color: "#e8d0a8",
    emoji: "☕",
  },
  {
    id: "night",
    label: "도시의 야경",
    sub: "머스크 · 우디",
    color: "#c8c0d4",
    emoji: "✨",
  },
];
