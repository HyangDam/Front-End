"use client";

import { useEffect, useRef } from "react";

import { useGetPerfumePriceComparison } from "../_apis/perfume";

type PriceComparisonSheetProps = {
  perfumeId: number;
  onClose: () => void;
};

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// 백엔드가 값이 없을 때 문자열 "nan"을 그대로 내려주는 버그가 있어 방어한다
const isValidUrl = (url: string) => /^https?:\/\//.test(url);

function PriceComparisonSheet({ perfumeId, onClose }: PriceComparisonSheetProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { perfumePriceComparisonData, isPerfumePriceComparisonLoading } =
    useGetPerfumePriceComparison(perfumeId, true);

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

  const validLinks =
    perfumePriceComparisonData?.links.filter((link) => isValidUrl(link.url)) ?? [];

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
        aria-label="가격 비교"
        className="relative w-full rounded-t-2xl border-t border-border bg-paper px-5 pb-6 pt-5"
      >
        <h2 className="mb-3 font-serif text-base text-charcoal">가격 비교</h2>

        {isPerfumePriceComparisonLoading ? (
          <p className="py-8 text-center font-sans text-[13px] text-muted">
            불러오는 중...
          </p>
        ) : (
          <>
            <p className="mb-4 font-sans text-[12px] leading-[1.6] text-muted">
              {perfumePriceComparisonData?.message ?? "가격 정보를 불러오지 못했어요."}
            </p>
            {validLinks.length > 0 && (
              <div className="flex flex-col gap-2">
                {validLinks.map((link) => (
                  <a
                    key={link.retailer}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-full border border-border-dark px-4 py-3 font-sans text-[13px] text-charcoal"
                  >
                    {link.retailer}에서 찾아보기
                    <span className="text-muted">›</span>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PriceComparisonSheet;
