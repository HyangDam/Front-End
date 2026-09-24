"use client";

import { useEffect, useRef, useState } from "react";

import ChatHeader from "./_components/ChatHeader";
import ChatInput from "./_components/ChatInput";
import ChatMessage from "./_components/ChatMessage";
import QuickPrompts from "./_components/QuickPrompts";
import ThinkingDots from "./_components/ThinkingDots";
import { usePostChatRecommend } from "./_hooks/usePostChatRecommend";

export default function AiPage() {
  const { messages, sendMessage, isChatRecommendPending } = usePostChatRecommend();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, isChatRecommendPending]);

  const handleSend = (text: string) => {
    sendMessage(text);
    setInput("");
  };

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-ivory">
      <ChatHeader />

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 pt-5">
        {messages.map((message, i) => (
          <ChatMessage key={i} message={message} />
        ))}
        {isChatRecommendPending && <ThinkingDots />}
      </div>

      {messages.length === 1 && !isChatRecommendPending && (
        <QuickPrompts onSelect={handleSend} />
      )}

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={() => handleSend(input)}
        disabled={isChatRecommendPending}
      />
    </div>
  );
}
