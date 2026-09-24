"use client";

import { useMutation } from "@tanstack/react-query";

import { postChatRecommend } from "../_apis/chat";
import { useChatStore } from "./useChatStore";

const CHAT_TOP_N = 5;
const CHAT_ERROR_TEXT = "추천을 받아오지 못했어요. 잠시 후 다시 시도해주세요.";

/** 채팅 목록과 전송을 함께 관리한다 */
export const usePostChatRecommend = () => {
  const { messages, appendMessage, resetMessages } = useChatStore();

  const { mutate: postChatRecommendMutation, isPending: isChatRecommendPending } =
    useMutation({
      mutationFn: (message: string) =>
        postChatRecommend({ message, top_n: CHAT_TOP_N }),
      onSuccess: ({ assistant_message, preferences, results }) =>
        appendMessage({
          role: "ai",
          text: assistant_message,
          preferences,
          recommendations: results,
        }),
      // 실패도 대화 흐름 안에서 보여줘야 사용자가 무슨 일이 있었는지 안다
      onError: (error) =>
        appendMessage({
          role: "ai",
          text: error instanceof Error ? error.message : CHAT_ERROR_TEXT,
          isError: true,
        }),
    });

  const sendMessage = (text: string) => {
    const message = text.trim();
    if (!message || isChatRecommendPending) return;

    appendMessage({ role: "user", text: message });
    postChatRecommendMutation(message);
  };

  return { messages, sendMessage, isChatRecommendPending, resetMessages };
};
