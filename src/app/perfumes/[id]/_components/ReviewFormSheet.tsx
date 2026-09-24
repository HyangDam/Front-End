"use client";

import { useEffect, useRef, useState } from "react";

type ReviewFormSheetProps = {
  isEditing: boolean;
  initialRating?: number;
  initialContent?: string;
  isSubmitting: boolean;
  errorMessage?: string;
  onSubmit: (values: { rating: number; content: string }) => void;
  onClose: () => void;
};

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function ReviewFormSheet({
  isEditing,
  initialRating = 0,
  initialContent = "",
  isSubmitting,
  errorMessage,
  onSubmit,
  onClose,
}: ReviewFormSheetProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [rating, setRating] = useState(initialRating);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialogEl = dialogRef.current;
    dialogEl?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogEl) return;

      const focusable = Array.from(
        dialogEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, []);

  const isValid = rating > 0 && content.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit({ rating, content: content.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-charcoal/35"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={isEditing ? "리뷰 수정" : "리뷰 작성"}
        className="relative w-full rounded-t-2xl border-t border-border bg-paper px-5 pb-6 pt-5"
      >
        <h2 className="mb-4 font-serif text-base text-charcoal">
          {isEditing ? "리뷰 수정" : "리뷰 작성"}
        </h2>

        <div className="mb-4 flex justify-center gap-1.5">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              aria-label={`${value}점`}
              aria-pressed={rating === value}
              className="cursor-pointer border-none bg-transparent text-2xl text-gold"
            >
              {value <= rating ? "★" : "☆"}
            </button>
          ))}
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="이 향수는 어떠셨나요?"
          rows={4}
          className="mb-4 w-full resize-none rounded-2xl border border-border-dark bg-transparent px-4 py-3 font-sans text-[13px] text-charcoal outline-none"
        />

        {errorMessage && (
          <p role="alert" className="mb-3 font-sans text-xs text-error">
            {errorMessage}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || !isValid}
          className="w-full cursor-pointer rounded-full bg-sage py-3 font-sans text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "저장 중..." : isEditing ? "수정 완료" : "작성 완료"}
        </button>
      </div>
    </div>
  );
}

export default ReviewFormSheet;
