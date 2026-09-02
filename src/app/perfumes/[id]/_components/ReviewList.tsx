import type { PerfumeReviewT } from "@/types/perfume";

type ReviewListProps = {
  reviews: PerfumeReviewT[];
};

function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="border-t border-border px-[22px] pb-[100px]">
      <div className="mb-3 mt-4 font-mono text-[10px] uppercase tracking-[1.5px] text-muted">
        Reviews
      </div>
      {reviews.length === 0 ? (
        <p className="py-8 text-center font-sans text-xs text-muted">
          아직 작성된 리뷰가 없어요
        </p>
      ) : (
        reviews.map((review, i) => (
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
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewList;
