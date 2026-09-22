"use client";

import { useState } from "react";

import type { PerfumeReviewT } from "@/types/perfume";

type ReviewListProps = {
  reviews: PerfumeReviewT[];
  canWriteReview?: boolean | null;
  myReviewId?: number | null;
  isDeletingReview: boolean;
  onWriteReview: () => void;
  onEditReview: (review: PerfumeReviewT) => void;
  onDeleteReview: (reviewId: number) => void;
};

function ReviewList({
  reviews,
  canWriteReview,
  myReviewId,
  isDeletingReview,
  onWriteReview,
  onEditReview,
  onDeleteReview,
}: ReviewListProps) {
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<number | null>(null);

  return (
    <div className="border-t border-border px-[22px] pb-[100px]">
      <div className="mb-3 mt-4 flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-[1.5px] text-muted">
          Reviews
        </div>
        {canWriteReview && !myReviewId && (
          <button
            type="button"
            onClick={onWriteReview}
            className="cursor-pointer border-none bg-transparent font-sans text-[11px] text-sage"
          >
            리뷰 작성
          </button>
        )}
      </div>

      {reviews.length === 0 ? (
        <p className="py-8 text-center font-sans text-xs text-muted">
          아직 작성된 리뷰가 없어요
        </p>
      ) : (
        reviews.map((review, i) => {
          const isMine = review.review_id === myReviewId;

          return (
            <div
              key={review.review_id}
              className={`py-3 ${i < reviews.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="mb-1.5 flex justify-between">
                <span className="font-sans text-xs font-semibold text-charcoal">
                  {review.nickname ?? `사용자 ${review.user_id}`}
                </span>
                <span className="text-[11px] text-gold">{"★".repeat(review.rating)}</span>
              </div>
              <div className="font-sans text-xs leading-[1.75] text-muted">
                {review.content}
              </div>

              {isMine && (
                <div className="mt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => onEditReview(review)}
                    className="cursor-pointer border-none bg-transparent font-sans text-[11px] text-muted"
                  >
                    수정
                  </button>
                  {confirmingDeleteId === review.review_id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => onDeleteReview(review.review_id)}
                        disabled={isDeletingReview}
                        className="cursor-pointer border-none bg-transparent font-sans text-[11px] text-error disabled:opacity-50"
                      >
                        {isDeletingReview ? "삭제 중..." : "정말 삭제할까요?"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmingDeleteId(null)}
                        className="cursor-pointer border-none bg-transparent font-sans text-[11px] text-muted"
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmingDeleteId(review.review_id)}
                      className="cursor-pointer border-none bg-transparent font-sans text-[11px] text-muted"
                    >
                      삭제
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default ReviewList;
