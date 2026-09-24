import type { ChatPreferencesT, ChatRecommendationT } from "../_apis/chat";

export type ChatMessageRoleT = "ai" | "user";

export type ChatMessageT = {
  role: ChatMessageRoleT;
  text: string;
  /** AI 답변에 딸려오는 추천 향수. 서버 응답을 그대로 담는다 */
  recommendations?: ChatRecommendationT[];
  /** AI가 문장에서 읽어낸 취향 */
  preferences?: ChatPreferencesT;
  /** 전송에 실패한 메시지. 다시 시도할 수 있게 표시한다 */
  isError?: boolean;
};
