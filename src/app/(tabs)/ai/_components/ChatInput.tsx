import Image from "next/image";
import type { KeyboardEvent } from "react";

import sendMutedIcon from "@/assets/icons/chat/send-muted.svg";
import sendIcon from "@/assets/icons/chat/send.svg";

import { CHAT_MESSAGE_MAX_LENGTH } from "../_apis/chat";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

function ChatInput({ value, onChange, onSend, disabled = false }: ChatInputProps) {
  const canSend = value.trim().length > 0 && !disabled;
  // 500자를 넘기면 서버가 422로 거절하므로 입력 단계에서 알린다
  const isNearLimit = value.length >= CHAT_MESSAGE_MAX_LENGTH - 50;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) onSend();
  };

  return (
    <div className="flex-shrink-0 px-3.5 pb-2.5 pt-1">
      <div className="flex items-center gap-2 rounded-full border border-border bg-paper py-1.5 pl-4 pr-1.5">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          maxLength={CHAT_MESSAGE_MAX_LENGTH}
          placeholder="조향사에게 물어보기..."
          aria-label="조향사에게 물어보기"
          className="flex-1 border-0 bg-transparent font-sans text-[13px] text-charcoal outline-none"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={!canSend}
          aria-label="전송"
          className={`flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full ${
            canSend ? "cursor-pointer bg-rose" : "cursor-default bg-ivory-200"
          }`}
        >
          <Image src={canSend ? sendIcon : sendMutedIcon} alt="" width={14} height={14} />
        </button>
      </div>

      {isNearLimit && (
        <p className="mt-1.5 pr-1.5 text-right font-sans text-[10px] text-muted-light">
          {value.length} / {CHAT_MESSAGE_MAX_LENGTH}
        </p>
      )}
    </div>
  );
}

export default ChatInput;
