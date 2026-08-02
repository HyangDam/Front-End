import Link from "next/link";

import PerfumeCard from "@/components/perfume-card";
import { PERFUMES } from "@/mocks/perfume";
import type { ChatMessageT } from "../_types/chatMessage";

type ChatMessageProps = {
  message: ChatMessageT;
};

function ChatMessage({ message }: ChatMessageProps) {
  const isAi = message.role === "ai";
  const recommendedPerfumes = (message.perfumeIds ?? [])
    .map((id) => PERFUMES.find((perfume) => perfume.id === id))
    .filter((perfume) => perfume !== undefined);

  return (
    <div className={`mb-3.5 flex items-start gap-2 ${isAi ? "flex-row" : "flex-row-reverse"}`}>
      {isAi && (
        <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-charcoal to-[#3a3530] text-xs">
          ✨
        </div>
      )}
      <div className={`flex max-w-[78%] flex-col gap-2 ${isAi ? "items-start" : "items-end"}`}>
        <div
          className={`whitespace-pre-line rounded-2xl px-3.5 py-2.5 font-sans text-[12.5px] leading-[1.65] ${
            isAi
              ? "rounded-tl-[4px] border border-border bg-paper text-charcoal"
              : "rounded-tr-[4px] bg-charcoal text-white"
          }`}
        >
          {message.text}
        </div>

        {recommendedPerfumes.length > 0 && (
          <div className="no-scrollbar flex max-w-full gap-2 overflow-x-auto py-0.5">
            {recommendedPerfumes.map((perfume) => (
              <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
                <PerfumeCard perfume={perfume} variant="hscroll" />
              </Link>
            ))}
          </div>
        )}

        {message.note && (
          <div className="rounded-2xl rounded-tl-[4px] border border-border bg-paper px-3.5 py-2.5 font-sans text-xs leading-[1.6] text-charcoal">
            {message.note}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
