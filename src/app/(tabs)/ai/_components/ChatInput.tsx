import Image from "next/image";
import type { KeyboardEvent } from "react";

import sendMutedIcon from "@/assets/icons/chat/send-muted.svg";
import sendIcon from "@/assets/icons/chat/send.svg";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

function ChatInput({ value, onChange, onSend, disabled = false }: ChatInputProps) {
  const canSend = value.trim().length > 0 && !disabled;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) onSend();
  };

  return (
    <div className="flex-shrink-0 border-t border-border px-3.5 py-2.5">
      <div className="flex items-center gap-2 rounded-full border border-border bg-paper py-1.5 pl-4 pr-1.5">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
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
            canSend ? "cursor-pointer bg-charcoal" : "cursor-default bg-ivory-200"
          }`}
        >
          <Image src={canSend ? sendIcon : sendMutedIcon} alt="" width={14} height={14} />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
