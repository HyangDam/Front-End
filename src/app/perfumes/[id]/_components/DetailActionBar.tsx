"use client";

type DetailActionBarProps = {
  isOwned: boolean;
  isLiked: boolean;
  onToggleOwned: () => void;
  onToggleLike: () => void;
};

function DetailActionBar({
  isOwned,
  isLiked,
  onToggleOwned,
  onToggleLike,
}: DetailActionBarProps) {
  return (
    <div className="flex flex-shrink-0 gap-2.5 border-t border-border bg-paper px-4 py-[18px]">
      <button
        type="button"
        onClick={onToggleLike}
        aria-label="좋아요"
        aria-pressed={isLiked}
        className={`flex h-[46px] w-[46px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full border ${
          isLiked ? "border-rose bg-rose-light" : "border-border bg-transparent"
        }`}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill={isLiked ? "#c4a090" : "none"}
          stroke={isLiked ? "#c4a090" : "#7d756c"}
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={onToggleOwned}
        aria-pressed={isOwned}
        className={`h-[46px] flex-1 cursor-pointer rounded-[23px] font-sans text-[13px] font-semibold ${
          isOwned
            ? "border border-border bg-ivory-200 text-muted"
            : "border-none bg-sage text-white"
        }`}
      >
        {isOwned ? "✓ 향수장에 추가됨" : "나의 향수장에 추가하기"}
      </button>
    </div>
  );
}

export default DetailActionBar;
