"use client";

import { useChatStore } from "../_hooks/useChatStore";

function ChatHeader() {
  const { messages, resetMessages } = useChatStore();
  const hasConversation = messages.length > 1;

  return (
    <header className="relative flex flex-shrink-0 items-center justify-center border-b border-border px-4 py-3">
      <h1 className="font-serif text-lg text-charcoal">나만의 조향사</h1>

      {/* 대화가 남아 있으니 새로 시작할 방법이 필요하다 */}
      {hasConversation && (
        <button
          type="button"
          onClick={resetMessages}
          className="absolute right-4 cursor-pointer rounded-full border border-border px-2.5 py-1 font-sans text-[11px] text-muted transition-colors hover:border-border-dark hover:text-charcoal"
        >
          새 대화
        </button>
      )}
    </header>
  );
}

export default ChatHeader;
