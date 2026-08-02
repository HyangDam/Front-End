import type { ChatMessageT } from "../_types/chatMessage";

export const AI_INTRO_MESSAGE: ChatMessageT = {
  role: "ai",
  text: "안녕하세요 ✨\n저는 향담의 AI 조향사예요.\n\n오늘 어떤 향을 찾고 계신가요?\n기분, 상황, 어울리고 싶은 분위기를 자유롭게 말씀해주세요.",
};

export const AI_QUICK_PROMPTS = [
  "봄에 어울리는 향 추천해줘",
  "데이트할 때 좋은 향수",
  "사무실에서 부담 없는 향",
  "겨울에 따뜻한 우디 향",
];

export const AI_DUMMY_RESPONSE: ChatMessageT = {
  role: "ai",
  text: "취향을 분석해보니, 따뜻하면서도 우아한 향이 잘 어울리실 것 같아요.\n다음 향수를 추천드릴게요:",
  perfumeIds: [1, 2, 3],
  note: "이 중에서 더 자세히 알아보고 싶은 향수가 있으신가요?",
};

export const AI_RESPONSE_DELAY_MS = 1400;
