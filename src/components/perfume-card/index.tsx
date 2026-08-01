"use client";

import Image from "next/image";
import { useState } from "react";
import type { MouseEvent } from "react";

import type { PerfumeT } from "@/types/perfume";

import EditorialBottle from "./EditorialBottle";
import {
  PERFUME_CARD_BOTTLE_HEIGHT,
  PERFUME_CARD_IMAGE_HEIGHT,
  PERFUME_CARD_NAME_MAX_LENGTH,
} from "./perfumeCard.const";
import type { PerfumeCardVariant } from "./perfumeCard.const";

type PerfumeCardProps = {
  perfume: PerfumeT;
  variant?: PerfumeCardVariant;
  liked?: boolean;
  onLike?: (id: number) => void;
  onPress?: () => void;
  rank?: number;
};

const truncateName = (name: string, variant: PerfumeCardVariant) => {
  const max = PERFUME_CARD_NAME_MAX_LENGTH[variant];
  if (!max || name.length <= max) return name;
  return `${name.slice(0, max)}..`;
};

function PerfumeCard({
  perfume,
  variant = "default",
  liked = false,
  onLike,
  onPress,
  rank,
}: PerfumeCardProps) {
  const [imgError, setImgError] = useState(false);
  const showLikeButton = Boolean(onLike) && variant !== "hscroll";

  const handleLikeClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onLike?.(perfume.id);
  };

  return (
    <div
      onClick={onPress}
      className={`cursor-pointer overflow-hidden rounded-[10px] border border-border bg-paper ${
        variant === "hscroll" ? "w-[116px] flex-shrink-0" : ""
      }`}
    >
      <div
        className="relative flex items-center justify-center bg-[#fafaf7]"
        style={{ height: PERFUME_CARD_IMAGE_HEIGHT[variant] }}
      >
        {perfume.img && !imgError ? (
          // 백엔드 이미지 도메인이 아직 확정되지 않아 remotePatterns 없이 unoptimized로 사용
          <Image
            src={perfume.img}
            alt={perfume.name}
            fill
            unoptimized
            sizes="128px"
            className={
              variant === "default" ? "object-contain p-3" : "object-contain p-2"
            }
            onError={() => setImgError(true)}
          />
        ) : (
          <EditorialBottle
            brand={perfume.brand}
            height={PERFUME_CARD_BOTTLE_HEIGHT[variant]}
          />
        )}

        {typeof rank === "number" && variant === "hscroll" && (
          <div
            className={`absolute left-1.5 top-1.5 flex h-[22px] w-[22px] items-center justify-center rounded-full font-serif text-[10px] font-bold ${
              rank <= 3 ? "bg-charcoal text-white" : "bg-white/90 text-charcoal"
            }`}
          >
            {rank}
          </div>
        )}

        {showLikeButton && (
          <button
            type="button"
            onClick={handleLikeClick}
            className={`absolute flex cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-sm ${
              variant === "default"
                ? "right-2 top-2 h-7 w-7"
                : "right-[5px] top-[5px] h-[22px] w-[22px]"
            }`}
          >
            <svg
              width={variant === "default" ? 13 : 10}
              height={variant === "default" ? 13 : 10}
              viewBox="0 0 24 24"
              fill={liked ? "#c4a090" : "none"}
              stroke={liked ? "#c4a090" : "#7d756c"}
              strokeWidth={variant === "default" ? 2.2 : 2.5}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}
      </div>

      <div
        className={`border-t border-border ${
          variant === "default" ? "px-3 pb-[13px] pt-2.5" : "px-2 pb-2.5 pt-1.5"
        }`}
      >
        <div
          className={`font-mono uppercase text-muted ${
            variant === "default"
              ? "mb-1 text-[8px] tracking-[1.5px]"
              : "mb-0.5 text-[7px] tracking-[0.8px]"
          }`}
        >
          {variant === "default" ? perfume.brand : perfume.brandKr}
        </div>
        <div
          className={`font-serif text-charcoal ${
            variant === "default"
              ? "mb-[7px] text-[13px] leading-[1.4]"
              : "text-[11px] leading-[1.35]"
          }`}
        >
          {variant === "default" ? perfume.name : truncateName(perfume.name, variant)}
        </div>
        {variant === "default" && (
          <div className="font-sans text-[11px] text-muted">{perfume.price}</div>
        )}
      </div>
    </div>
  );
}

export default PerfumeCard;
