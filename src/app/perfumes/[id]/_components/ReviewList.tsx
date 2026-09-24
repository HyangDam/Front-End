"use client";

import { useState } from "react";

import ConfirmDialog from "@/components/confirm-dialog";
import { useAuthStore } from "@/hooks/useAuthStore";
import type { PerfumeReviewT } from "@/types/perfume";

type ReviewListProps = {
  reviews: PerfumeReviewT[];
  canWriteReview?: boolean | null;
  isDeletingReview: boolean;
  onWriteReview: () => void;
  onEditReview: (review: PerfumeReviewT) => void;
  onDeleteReview: (reviewId: number, onSuccess: () => void) => void;
};

function ReviewList({
  reviews,
  canWriteReview,
  isDeletingReview,
  onWriteReview,
  onEditReview,
  onDeleteReview,
}: ReviewListProps) {
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<number | null>(null);
  const sessionUser = useAuthStore((state) => state.user);

  return (
    <div className="border-t border-border px-[22px] pb-[100px]">
      <div className="mb-3 mt-4 flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-[1.5px] text-muted">
          Reviews
        </div>
        {canWriteReview && (
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
          // 백엔드 my_review_id가 항상 null이라 세션 유저 id로 직접 판별한다
          const isMine = review.user_id === sessionUser?.user_id;

          return (
            <div
              key={review.review_id}
              className={`py-3 ${i < reviews.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="mb-1.5 flex justify-between">
                <span className="font-sans text-xs font-semibold text-charcoal">
                  {isMine
                    ? (sessionUser?.name ?? review.nickname ?? `사용자 ${review.user_id}`)
                    : (review.nickname ?? `사용자 ${review.user_id}`)}
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
                  <button
                    type="button"
                    onClick={() => setConfirmingDeleteId(review.review_id)}
                    className="cursor-pointer border-none bg-transparent font-sans text-[11px] text-muted"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}

      {confirmingDeleteId !== null && (
        <ConfirmDialog
          title="리뷰를 삭제할까요?"
          description="삭제한 리뷰는 복구할 수 없어요."
          confirmLabel="삭제"
          destructive
          isPending={isDeletingReview}
          onConfirm={() =>
            onDeleteReview(confirmingDeleteId, () => setConfirmingDeleteId(null))
          }
          onCancel={() => setConfirmingDeleteId(null)}
        />
      )}
    </div>
  );
}

export default ReviewList;
