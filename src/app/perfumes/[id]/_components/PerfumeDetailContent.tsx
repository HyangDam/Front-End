"use client";

import { notFound } from "next/navigation";

import { ApiError } from "@/apis/apiError";

import AccordBars from "./AccordBars";
import DetailActionBar from "./DetailActionBar";
import DetailHeader from "./DetailHeader";
import DetailHeroImage from "./DetailHeroImage";
import FamilyBadges from "./FamilyBadges";
import NoteSection from "./NoteSection";
import ReviewList from "./ReviewList";
import StatsActionRow from "./StatsActionRow";
import { useGetPerfume, useGetPerfumeReviews } from "../_apis/perfume";
import { toFallbackNotes } from "../_utils/toFallbackNotes";

type PerfumeDetailContentProps = {
  perfumeId: number;
};

function PerfumeDetailContent({ perfumeId }: PerfumeDetailContentProps) {
  const { perfumeData, isPerfumeLoading, perfumeError } = useGetPerfume(perfumeId);
  const { perfumeReviewsData } = useGetPerfumeReviews(perfumeId);

  if (perfumeError instanceof ApiError && perfumeError.status === 404) notFound();

  if (perfumeError) {
    return (
      <div className="flex h-full flex-col bg-paper">
        <DetailHeader />
        <div className="flex flex-1 items-center justify-center px-6 text-center">
          <p className="font-sans text-[13px] text-muted">
            향수 정보를 불러오지 못했어요.
          </p>
        </div>
      </div>
    );
  }

  if (isPerfumeLoading || !perfumeData) {
    return (
      <div className="flex h-full flex-col bg-paper">
        <DetailHeader />
        <div className="flex flex-1 items-center justify-center">
          <p className="font-sans text-[13px] text-muted">불러오는 중...</p>
        </div>
      </div>
    );
  }

  const notePyramid = perfumeData.note_visualization?.note_pyramid;
  const hasNotePyramid = Boolean(
    notePyramid &&
    (notePyramid.top.length > 0 ||
      notePyramid.middle.length > 0 ||
      notePyramid.base.length > 0),
  );

  return (
    <div className="flex h-full flex-col bg-paper">
      <DetailHeader />

      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-border px-[22px] py-4">
          <h1 className="mb-1 text-center font-serif text-xl text-charcoal">
            {perfumeData.name}
          </h1>
          <div className="text-center font-mono text-[11px] tracking-[1.5px] text-muted">
            {perfumeData.brand}
          </div>
        </div>

        <DetailHeroImage
          name={perfumeData.name}
          brand={perfumeData.brand}
          imageUrl={perfumeData.image_url}
        />

        <FamilyBadges accords={perfumeData.note_visualization?.accord_bars ?? []} />

        {/* 좋아요·향수장 보유 API는 인증 처리 확인 후 2차 연동 예정 — 지금은 로컬 상태만 반영 */}
        <StatsActionRow
          perfumeId={perfumeId}
          ownedCount={perfumeData.owned_count}
          likeCount={perfumeData.like_count}
        />

        <AccordBars accords={perfumeData.note_visualization?.accord_bars ?? []} />

        <div className="flex flex-col gap-5 px-[22px] pb-6 pt-4">
          {hasNotePyramid ? (
            <>
              <NoteSection label="TOP NOTES" notes={notePyramid?.top ?? []} />
              <NoteSection label="MIDDLE NOTES" notes={notePyramid?.middle ?? []} />
              <NoteSection label="BASE NOTES" notes={notePyramid?.base ?? []} />
            </>
          ) : (
            <NoteSection label="NOTES" notes={toFallbackNotes(perfumeData.notes)} />
          )}
        </div>

        <ReviewList reviews={perfumeReviewsData?.results ?? []} />
      </main>

      <DetailActionBar perfumeId={perfumeId} />
    </div>
  );
}

export default PerfumeDetailContent;
