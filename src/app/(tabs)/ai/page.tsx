"use client";

import { useEffect, useRef, useState } from "react";

import ChatHeader from "./_components/ChatHeader";
import ChatInput from "./_components/ChatInput";
import ChatMessage from "./_components/ChatMessage";
import QuickPrompts from "./_components/QuickPrompts";
import ThinkingDots from "./_components/ThinkingDots";
import {
  AI_DUMMY_RESPONSE,
  AI_INTRO_MESSAGE,
  AI_RESPONSE_DELAY_MS,
} from "./_consts/aiChat.const";
import type { ChatMessageT } from "./_types/chatMessage";

export default function AiPage() {
  const [messages, setMessages] = useState<ChatMessageT[]>([AI_INTRO_MESSAGE]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, isThinking]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setMessages((prev) => [...prev, AI_DUMMY_RESPONSE]);
    }, AI_RESPONSE_DELAY_MS);
  };

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-ivory">
      <ChatHeader />

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 pt-5">
        {messages.map((message, i) => (
          <ChatMessage key={i} message={message} />
        ))}
        {isThinking && <ThinkingDots />}
      </div>

      {messages.length === 1 && !isThinking && <QuickPrompts onSelect={handleSend} />}

      <ChatInput value={input} onChange={setInput} onSend={() => handleSend(input)} />
    </div>
  );
}
