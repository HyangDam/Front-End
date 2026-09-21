/**
 * 서버 카테고리에는 이모지가 없어서 화면 표시용으로만 id에 매핑한다.
 * 매핑에 없는 id는 기본 이모지로 그린다.
 */
export const SCENT_EMOJI: Record<string, string> = {
  floral: "🌸",
  woody: "🌲",
  musk: "🫧",
  citrus: "🍋",
  oriental: "✨",
  aquatic: "🌊",
  green: "🌿",
  spicy: "🌶",
  powdery: "🧸",
  gourmand: "🍯",
  fresh: "💨",
  earthy: "🪨",
};

export const DEFAULT_SCENT_EMOJI = "🕯";
