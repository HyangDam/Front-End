import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AI_INTRO_MESSAGE } from "../_consts/aiChat.const";
import type { ChatMessageT } from "../_types/chatMessage";

type ChatStoreT = {
  messages: ChatMessageT[];
  appendMessage: (message: ChatMessageT) => void;
  resetMessages: () => void;
};

/**
 * 향수 상세로 갔다 돌아오면 화면이 새로 그려져 useState로는 대화가 사라진다.
 * 탭을 닫으면 비워지도록 sessionStorage에 둔다 — 지난 대화까지 남길 필요는 없다.
 */
export const useChatStore = create<ChatStoreT>()(
  persist(
    (set) => ({
      messages: [AI_INTRO_MESSAGE],
      appendMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      resetMessages: () => set({ messages: [AI_INTRO_MESSAGE] }),
    }),
    {
      name: "hyangdam-chat",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
