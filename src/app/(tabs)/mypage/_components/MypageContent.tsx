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
  { id: "shelf", label: "나의 향수장" },
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

  return (
    <div className="flex flex-col gap-2.5">
      {perfumes.map((perfume) => (
        <LikedPerfumeRow key={perfume.perfume_id} perfume={perfume} onUnlike={onUnlike} />
      ))}
    </div>
  );
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
      <div className="flex border-b border-border">
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
