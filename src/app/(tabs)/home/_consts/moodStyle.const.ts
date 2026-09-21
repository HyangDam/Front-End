type MoodStyleT = {
  color: string;
  emoji: string;
};

// 백엔드 /categories(mood 그룹)는 색상·이모지를 안 줘서 프론트에서 매핑한다
const MOOD_STYLE_MAP: Record<string, MoodStyleT> = {
  clean: { color: "#b0c8d8", emoji: "🧼" },
  sweet: { color: "#e8d0a8", emoji: "🍯" },
  elegant: { color: "#c8c0d4", emoji: "🌹" },
};

const DEFAULT_MOOD_STYLE: MoodStyleT = { color: "#c8c0b0", emoji: "✨" };

export const getMoodStyle = (moodId: string): MoodStyleT =>
  MOOD_STYLE_MAP[moodId] ?? DEFAULT_MOOD_STYLE;
