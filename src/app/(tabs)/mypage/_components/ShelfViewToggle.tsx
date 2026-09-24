"use client";

import { cn } from "@/utils/cn";

export type ShelfViewT = "shelf3d" | "grid";

type ShelfViewToggleProps = {
  view: ShelfViewT;
  onChange: (view: ShelfViewT) => void;
};

const VIEW_OPTIONS: { id: ShelfViewT; label: string }[] = [
  { id: "shelf3d", label: "진열장" },
  { id: "grid", label: "목록" },
];

/** 3D 진열장과 목록을 오갈 수 있게 한다 */
function ShelfViewToggle({ view, onChange }: ShelfViewToggleProps) {
  return (
    <div className="mb-2.5 flex justify-start">
      <div
        role="group"
        aria-label="향수장 보기 방식"
        className="flex gap-0.5 rounded-full border border-border bg-paper p-0.5"
      >
        {VIEW_OPTIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={view === id}
            className={cn(
              "cursor-pointer rounded-full px-3 py-1 font-sans text-[11px] transition-colors",
              view === id ? "bg-rose-fill font-semibold text-charcoal" : "text-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ShelfViewToggle;
