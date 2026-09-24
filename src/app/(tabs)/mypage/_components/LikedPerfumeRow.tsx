import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { PerfumeSummaryT } from "@/types/perfume";
import { getPerfumeDisplay } from "@/utils/perfumeDisplay";

type LikedPerfumeRowProps = {
  perfume: PerfumeSummaryT;
  onUnlike: (perfumeId: number) => void;
};

function LikedPerfumeRow({ perfume, onUnlike }: LikedPerfumeRowProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const { name, brand, notes } = getPerfumeDisplay(perfume);

  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-border bg-paper p-3">
      {/* min-w-0이 없으면 긴 노트 때문에 카드가 늘어나 하트 버튼이 밀려난다 */}
      <Link
        href={`/perfumes/${perfume.perfume_id}`}
        className="flex min-w-0 flex-1 cursor-pointer items-center gap-3.5"
      >
        <div className="flex h-[60px] w-[56px] flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
          {perfume.image_url && !hasImageError ? (
            <div className="relative h-full w-full">
              <Image
                src={perfume.image_url}
                alt={name}
                fill
                unoptimized
                sizes="56px"
                className="object-contain p-1.5"
                onError={() => setHasImageError(true)}
              />
            </div>
          ) : (
            <span className="text-xl">🧴</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-1 truncate font-mono text-[8px] uppercase tracking-[1.2px] text-muted">
            {brand}
          </p>
          <p className="truncate font-serif text-[14px] leading-snug text-charcoal">
            {name}
          </p>
          {notes && (
            <p className="mt-1 truncate font-sans text-[11px] text-muted-light">
              {notes}
            </p>
          )}
        </div>
      </Link>

      <button
        type="button"
        onClick={() => onUnlike(perfume.perfume_id)}
        aria-label="좋아요 취소"
        className="flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-ivory-200"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#c4a090" stroke="#c4a090">
          <path
            strokeWidth="1.8"
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          />
        </svg>
      </button>
    </div>
  );
}

export default LikedPerfumeRow;
