"use client";

import { useState } from "react";

import ErrorState from "@/components/error-state";
import type { PerfumeSummaryT } from "@/types/perfume";

import { useGetLikedPerfumes } from "../_hooks/useGetLikedPerfumes";
import { useGetMyPerfumes } from "../_hooks/useGetMyPerfumes";
import LikedPerfumeRow from "./LikedPerfumeRow";
import PerfumeShelf3D from "./PerfumeShelf3D";

type MypageTab = "shelf" | "liked";

const MYPAGE_TABS: { id: MypageTab; label: string }[] = [
  { id: "shelf", label: "나의 향수 저장소" },
  { id: "liked", label: "좋아요" },
];

type LikedTabProps = {
  perfumes: PerfumeSummaryT[];
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
  onUnlike: (perfumeId: number) => void;
};

function LikedTab({ perfumes, isPending, isError, onRetry, onUnlike }: LikedTabProps) {
  if (isPending) {
    return (
      <p className="py-12 text-center font-sans text-[13px] text-muted">
        불러오는 중이에요
      </p>
    );
  }

  // 조회 실패를 "좋아요한 향수가 없어요"로 보여주지 않는다
  if (isError) {
    return <ErrorState message="좋아요 목록을 불러오지 못했어요." onRetry={onRetry} />;
  }

  if (perfumes.length === 0) {
    return (
      <p className="py-12 text-center font-sans text-[13px] text-muted">
        좋아요한 향수가 없어요
      </p>
    );
  }

  return perfumes.map((perfume) => (
    <LikedPerfumeRow key={perfume.perfume_id} perfume={perfume} onUnlike={onUnlike} />
  ));
}

function MypageContent() {
  const [tab, setTab] = useState<MypageTab>("shelf");

  const {
    likedPerfumes,
    isLikedPerfumesPending,
    isLikedPerfumesError,
    refetchLikedPerfumes,
    deletePerfumeLikeMutation,
  } = useGetLikedPerfumes();

  const { myPerfumes, isMyPerfumesPending, isMyPerfumesError, refetchMyPerfumes } =
    useGetMyPerfumes();

  return (
    <div className="px-4 pb-8">
      <button
        type="button"
        onClick={() => setTab("liked")}
        className="flex w-full cursor-pointer items-center gap-3.5 rounded-xl border border-border bg-paper px-4 py-3.5 text-left"
      >
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-ivory-200 text-lg">
          🫙
        </div>
        <div className="flex-1">
          <p className="mb-0.5 font-sans text-[13px] font-semibold text-charcoal">
            좋아요한 향수 목록
          </p>
          <p className="font-sans text-[11px] text-muted">
            {isLikedPerfumesError ? "-" : `${likedPerfumes.length}개`}
          </p>
        </div>
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden>
          <path
            d="M1 1l5 5-5 5"
            stroke="#7d756c"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="mt-2.5 flex border-b border-border">
        {MYPAGE_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            aria-pressed={tab === t.id}
            className={`flex-1 cursor-pointer border-b-2 py-2.5 font-sans text-[11px] ${
              tab === t.id
                ? "border-sage font-bold text-sage"
                : "border-transparent font-normal text-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="pt-4">
        {tab === "shelf" ? (
          <PerfumeShelf3D
            myPerfumes={myPerfumes}
            isPending={isMyPerfumesPending}
            isError={isMyPerfumesError}
            onRetry={refetchMyPerfumes}
          />
        ) : (
          <LikedTab
            perfumes={likedPerfumes}
            isPending={isLikedPerfumesPending}
            isError={isLikedPerfumesError}
            onRetry={refetchLikedPerfumes}
            onUnlike={deletePerfumeLikeMutation}
          />
        )}
      </div>
    </div>
  );
}

export default MypageContent;
