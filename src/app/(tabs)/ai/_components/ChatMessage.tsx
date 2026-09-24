import Link from "next/link";

import PerfumeCard from "@/components/perfume-card";
import type { PerfumeT } from "@/types/perfume";
import { getPerfumeDisplay } from "@/utils/perfumeDisplay";

import type { ChatRecommendationT } from "../_apis/chat";
import type { ChatMessageT } from "../_types/chatMessage";
import PreferenceChips from "./PreferenceChips";

type ChatMessageProps = {
  message: ChatMessageT;
};

const toPerfumeCardItem = (recommendation: ChatRecommendationT): PerfumeT => {
  const { name, brand } = getPerfumeDisplay(recommendation);
  return {
    id: recommendation.perfume_id,
    name,
    brand,
    brandKr: brand,
    price: "",
    img: recommendation.image_url ?? undefined,
  };
};

function ChatMessage({ message }: ChatMessageProps) {
  const isAi = message.role === "ai";
  const recommendations = message.recommendations ?? [];

  return (
    <div
      className={`mb-3.5 flex items-start gap-2 ${isAi ? "flex-row" : "flex-row-reverse"}`}
    >
      {isAi && (
        <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-fill text-xs">
          ✨
        </div>
      )}
      <div
        className={`flex max-w-[78%] flex-col gap-2 ${isAi ? "items-start" : "items-end"}`}
      >
        <div
          className={`whitespace-pre-line rounded-2xl px-3.5 py-2.5 font-sans text-[12.5px] leading-[1.65] ${
            isAi
              ? message.isError
                ? "rounded-tl-[4px] border border-error/30 bg-error/5 text-error"
                : "rounded-tl-[4px] border border-border bg-paper text-charcoal"
              : "rounded-tr-[4px] bg-rose-fill text-charcoal"
          }`}
          {...(message.isError && { role: "alert" })}
        >
          {message.text}
        </div>

        {message.preferences && <PreferenceChips preferences={message.preferences} />}

        {recommendations.length > 0 && (
          <div className="no-scrollbar flex max-w-full gap-2 overflow-x-auto py-0.5">
            {recommendations.map((recommendation) => (
              <Link
                key={recommendation.perfume_id}
                href={`/perfumes/${recommendation.perfume_id}`}
              >
                <PerfumeCard
                  perfume={toPerfumeCardItem(recommendation)}
                  variant="hscroll"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
