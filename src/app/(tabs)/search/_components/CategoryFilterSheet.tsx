"use client";

import { useEffect, useRef, useState } from "react";

import Chip from "@/components/chip";

import { SEARCH_FAMILY_TO_CATEGORY } from "../_consts/search.const";
import type { SearchNonAllFamilyFilterT } from "../_consts/search.const";

type CategoryFilterSheetProps = {
  selectedFilters: SearchNonAllFamilyFilterT[];
  onApply: (filters: SearchNonAllFamilyFilterT[]) => void;
  onClose: () => void;
};

const ALL_FAMILY_FILTERS = Object.keys(
  SEARCH_FAMILY_TO_CATEGORY,
) as SearchNonAllFamilyFilterT[];

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function CategoryFilterSheet({
  selectedFilters,
  onApply,
  onClose,
}: CategoryFilterSheetProps) {
  const [draftFilters, setDraftFilters] =
    useState<SearchNonAllFamilyFilterT[]>(selectedFilters);
  const dialogRef = useRef<HTMLDivElement>(null);

  // 열릴 때 첫 컨트롤로 포커스 이동, Tab/Shift+Tab을 시트 안에 가두고,
  // 닫힐 때 트리거로 포커스를 되돌린다 (aria-modal만으로는 브라우저가
  // 포커스를 가둬주지 않는다)
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

  const handleToggle = (filter: SearchNonAllFamilyFilterT) => {
    setDraftFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter],
    );
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
        aria-label="향 계열 필터"
        className="relative w-full rounded-t-2xl border-t border-border bg-paper px-5 pb-6 pt-5"
      >
        <div className="mb-1.5 flex items-baseline justify-between">
          <h2 className="font-serif text-base text-charcoal">향 계열 필터</h2>
          <button
            type="button"
            onClick={() => setDraftFilters([])}
            disabled={draftFilters.length === 0}
            className={`cursor-pointer border-none bg-transparent font-sans text-xs text-muted ${
              draftFilters.length === 0 ? "invisible" : ""
            }`}
          >
            초기화
          </button>
        </div>

        <p className="mb-3 font-sans text-[11px] text-muted">
          원하는 향을 모두 선택해주세요
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {ALL_FAMILY_FILTERS.map((f) => (
            <Chip
              key={f}
              label={f}
              selected={draftFilters.includes(f)}
              onClick={() => handleToggle(f)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => onApply(draftFilters)}
          className="w-full cursor-pointer rounded-full bg-sage py-3 font-sans text-[13px] font-semibold text-white"
        >
          적용하기
        </button>
      </div>
    </div>
  );
}

export default CategoryFilterSheet;
