"use client";

import { useAppStore } from "@/hooks/useAppStore";

type StatsActionRowProps = {
  perfumeId: number;
  ownedCount: number;
  likeCount: number;
};

function StatsActionRow({ perfumeId, ownedCount, likeCount }: StatsActionRowProps) {
  const { likes, owned, toggleLike, toggleOwned } = useAppStore();
  const isLiked = likes.includes(perfumeId);
  const isOwned = owned.includes(perfumeId);

  return (
    <div className="border-b border-border px-[22px] py-3.5">
      <div className="mb-4 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => toggleOwned(perfumeId)}
          className="flex cursor-pointer items-center gap-1.5 border-none bg-transparent"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke={isOwned ? "#4a5a45" : "#7d756c"}
              strokeWidth="1.8"
              fill={isOwned ? "#e4ebe2" : "none"}
            />
            {isOwned && (
              <path
                d="M7.5 12l3 3 6-6"
                stroke="#4a5a45"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
          <span
            className={`font-sans text-[13px] ${isOwned ? "text-sage" : "text-muted"}`}
          >
            보유 {ownedCount + (isOwned ? 1 : 0)}
          </span>
        </button>
        <div className="h-4 w-px bg-border" />
        <button
          type="button"
          onClick={() => toggleLike(perfumeId)}
          className="flex cursor-pointer items-center gap-1.5 border-none bg-transparent"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill={isLiked ? "#c4a090" : "none"}
            stroke={isLiked ? "#c4a090" : "#7d756c"}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span
            className={`font-sans text-[13px] ${isLiked ? "text-rose" : "text-muted"}`}
          >
            좋아요 {likeCount + (isLiked ? 1 : 0)}
          </span>
        </button>
      </div>
      <div className="flex gap-2.5">
        <button
          type="button"
          className="flex-1 cursor-pointer rounded-[22px] border border-border-dark bg-transparent py-2.5 font-sans text-[13px] text-charcoal"
        >
          가격 비교
        </button>
        <button
          type="button"
          className="flex-1 cursor-pointer rounded-[22px] border border-border-dark bg-transparent py-2.5 font-sans text-[13px] text-charcoal"
        >
          매장 위치
        </button>
      </div>
    </div>
  );
}

export default StatsActionRow;
