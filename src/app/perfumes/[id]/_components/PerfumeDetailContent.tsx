"use client";

import { useQueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ApiError } from "@/apis/apiError";
import { useMyPerfume } from "@/hooks/useMyPerfume";
import { usePerfumeLike } from "@/hooks/usePerfumeLike";
import type { PerfumeReviewT } from "@/types/perfume";

import AccordBars from "./AccordBars";
import DetailActionBar from "./DetailActionBar";
import DetailHeader from "./DetailHeader";
import DetailHeroImage from "./DetailHeroImage";
import FamilyBadges from "./FamilyBadges";
import NoteSection from "./NoteSection";
import ReviewFormSheet from "./ReviewFormSheet";
import ReviewList from "./ReviewList";
import StatsActionRow from "./StatsActionRow";
import {
  useDeleteReview,
  useGetPerfume,
  useGetPerfumeReviews,
  usePatchReview,
  usePostReview,
} from "../_apis/perfume";
import { getNoteColorMap } from "../_utils/getNoteColorMap";
import { toFallbackNotes } from "../_utils/toFallbackNotes";

type PerfumeDetailContentProps = {
  perfumeId: number;
};

function PerfumeDetailContent({ perfumeId }: PerfumeDetailContentProps) {
  const { perfumeData, isPerfumeLoading, perfumeError } = useGetPerfume(perfumeId);
  const { perfumeReviewsData } = useGetPerfumeReviews(perfumeId);

  const [isReviewSheetOpen, setIsReviewSheetOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<PerfumeReviewT | null>(null);

  const { postReviewMutation, isPostReviewPending, postReviewError } =
    usePostReview(perfumeId);
  const { patchReviewMutation, isPatchReviewPending, patchReviewError } =
    usePatchReview(perfumeId);
  const { deleteReviewMutation, isDeleteReviewPending } = useDeleteReview(perfumeId);

  const { isLiked: getIsLiked, toggleLikeMutation, canToggleLike } = usePerfumeLike();
  const {
    isOwned: getIsOwned,
    toggleOwnedMutation,
    canToggleOwned,
    isToggleOwnedPending,
  } = useMyPerfume();

  const queryClient = useQueryClient();
  const wasTogglingOwnedRef = useRef(false);
  useEffect(() => {
    // 향수장 목록만 갱신되고 상세의 can_write_review·is_owned는 그대로 남아있어 직접 새로고침한다
    if (wasTogglingOwnedRef.current && !isToggleOwnedPending) {
      queryClient.invalidateQueries({ queryKey: ["perfume", perfumeId] });
    }
    wasTogglingOwnedRef.current = isToggleOwnedPending;
  }, [isToggleOwnedPending, perfumeId, queryClient]);

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

  const accordBars = perfumeData.note_visualization?.accord_bars ?? [];
  const noteColorMap = getNoteColorMap(accordBars);
  const notePyramid = perfumeData.note_visualization?.note_pyramid;
  const hasNotePyramid = Boolean(
    notePyramid &&
    (notePyramid.top.length > 0 ||
      notePyramid.middle.length > 0 ||
      notePyramid.base.length > 0),
  );

  const handleWriteReview = () => {
    setEditingReview(null);
    setIsReviewSheetOpen(true);
  };

  const handleEditReview = (review: PerfumeReviewT) => {
    setEditingReview(review);
    setIsReviewSheetOpen(true);
  };

  const handleSubmitReview = (values: { rating: number; content: string }) => {
    if (editingReview) {
      patchReviewMutation(
        { reviewId: editingReview.review_id, body: values },
        { onSuccess: () => setIsReviewSheetOpen(false) },
      );
    } else {
      postReviewMutation(values, { onSuccess: () => setIsReviewSheetOpen(false) });
    }
  };

  const reviewError = editingReview ? patchReviewError : postReviewError;

  const isLiked = getIsLiked(perfumeId);
  const isOwned = getIsOwned(perfumeId);

  // 좋아요·향수장 목록 갱신 전에도 개수가 바로 바뀐 것처럼 보이도록 상세 조회 시점 값과 비교해 보정한다
  const wasLiked = perfumeData.is_liked ?? false;
  const likeCount = perfumeData.like_count + (Number(isLiked) - Number(wasLiked));
  const wasOwned = perfumeData.is_owned ?? false;
  const ownedCount = perfumeData.owned_count + (Number(isOwned) - Number(wasOwned));

  const handleToggleLike = () => toggleLikeMutation(perfumeId);
  const handleToggleOwned = () => toggleOwnedMutation(perfumeId);

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

        <FamilyBadges accords={accordBars} />

        <StatsActionRow
          perfumeId={perfumeId}
          ownedCount={ownedCount}
          likeCount={likeCount}
          isOwned={isOwned}
          isLiked={isLiked}
          isLikeDisabled={!canToggleLike}
          isOwnedDisabled={!canToggleOwned}
          onToggleOwned={handleToggleOwned}
          onToggleLike={handleToggleLike}
        />

        <AccordBars accords={accordBars} />

        <div className="flex flex-col gap-5 px-[22px] pb-6 pt-4">
          {hasNotePyramid ? (
            <>
              <NoteSection
                label="TOP NOTES"
                notes={notePyramid?.top ?? []}
                noteColorMap={noteColorMap}
              />
              <NoteSection
                label="MIDDLE NOTES"
                notes={notePyramid?.middle ?? []}
                noteColorMap={noteColorMap}
              />
              <NoteSection
                label="BASE NOTES"
                notes={notePyramid?.base ?? []}
                noteColorMap={noteColorMap}
              />
            </>
          ) : (
            <NoteSection
              label="NOTES"
              notes={toFallbackNotes(perfumeData.notes)}
              noteColorMap={noteColorMap}
            />
          )}
        </div>

        <ReviewList
          reviews={perfumeReviewsData?.results ?? []}
          canWriteReview={perfumeData.can_write_review}
          isDeletingReview={isDeleteReviewPending}
          onWriteReview={handleWriteReview}
          onEditReview={handleEditReview}
          onDeleteReview={(reviewId, onSuccess) =>
            deleteReviewMutation(reviewId, { onSuccess })
          }
        />
      </main>

      <DetailActionBar
        isOwned={isOwned}
        isLiked={isLiked}
        isLikeDisabled={!canToggleLike}
        isOwnedDisabled={!canToggleOwned}
        onToggleOwned={handleToggleOwned}
        onToggleLike={handleToggleLike}
      />

      {isReviewSheetOpen && (
        <ReviewFormSheet
          isEditing={editingReview !== null}
          initialRating={editingReview?.rating}
          initialContent={editingReview?.content}
          isSubmitting={editingReview ? isPatchReviewPending : isPostReviewPending}
          errorMessage={reviewError instanceof Error ? reviewError.message : undefined}
          onSubmit={handleSubmitReview}
          onClose={() => setIsReviewSheetOpen(false)}
        />
      )}
    </div>
  );
}

export default PerfumeDetailContent;
