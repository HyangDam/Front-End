import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { PerfumeT } from "@/types/perfume";

type LikedPerfumeRowProps = {
  perfume: PerfumeT;
  onUnlike: (id: number) => void;
};

function LikedPerfumeRow({ perfume, onUnlike }: LikedPerfumeRowProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center gap-3 border-b border-border py-3 last:border-b-0">
      <Link
        href={`/perfumes/${perfume.id}`}
        className="flex flex-1 cursor-pointer items-center gap-3"
      >
        <div className="flex h-[54px] w-[50px] flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-[#fafaf7]">
          {perfume.img && !imgError ? (
            <div className="relative h-full w-full">
              <Image
                src={perfume.img}
                alt={perfume.name}
                fill
                unoptimized
                sizes="50px"
                className="object-contain p-1"
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <span className="text-lg">🧴</span>
          )}
        </div>
        <div className="flex-1">
          <p className="mb-[3px] font-mono text-[8px] uppercase tracking-[1.2px] text-muted">
            {perfume.brand}
          </p>
          <p className="mb-[3px] font-serif text-[13px] text-charcoal">{perfume.name}</p>
          <p className="font-sans text-[11px] text-muted">{perfume.price}</p>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => onUnlike(perfume.id)}
        aria-label="좋아요 취소"
        className="flex cursor-pointer items-center justify-center p-1.5"
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
