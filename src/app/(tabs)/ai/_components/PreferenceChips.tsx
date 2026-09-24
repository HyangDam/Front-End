"use client";

import { useGetCategoryLabel } from "@/hooks/useGetCategories";

import type { ChatPreferencesT } from "../_apis/chat";

type PreferenceChipsProps = {
  preferences: ChatPreferencesT;
};

/** AI가 문장에서 읽어낸 취향을 보여준다. 어떻게 이해했는지 드러내기 위한 것 */
function PreferenceChips({ preferences }: PreferenceChipsProps) {
  const { getCategoryLabel, getAvoidCategoryLabel } = useGetCategoryLabel();

  const selected = preferences.selected_categories ?? [];
  const avoided = preferences.avoid_categories ?? [];

  if (selected.length === 0 && avoided.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {selected.map((id) => (
        <span
          key={`selected-${id}`}
          className="rounded-full border border-sage/40 bg-sage/10 px-2.5 py-1 font-sans text-[11px] text-sage"
        >
          {getCategoryLabel(id)}
        </span>
      ))}
      {avoided.map((id) => (
        <span
          key={`avoid-${id}`}
          className="rounded-full border border-border-dark bg-transparent px-2.5 py-1 font-sans text-[11px] text-muted line-through"
        >
          {getAvoidCategoryLabel(id)}
        </span>
      ))}
    </div>
  );
}

export default PreferenceChips;
