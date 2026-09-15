"use client";

import Link from "next/link";
import { useState } from "react";

import PerfumeCard from "@/components/perfume-card";
import { useGetCategories } from "@/hooks/useGetCategories";

import { getMoodStyle } from "../_consts/moodStyle.const";
import { useGetPerfumesByCategory } from "../_hooks/useGetPerfumesByCategory";
import { toPerfumeCardItem } from "../_utils/toPerfumeCardItem";

function MoodRail() {
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);
  const { categories: moods, isCategoriesPending } = useGetCategories("mood");
  const { perfumesByCategory, isPerfumesByCategoryPending } =
    useGetPerfumesByCategory(selectedMoodId);

  const handleSelectMood = (moodId: string) => {
    setSelectedMoodId((prev) => (prev === moodId ? null : moodId));
  };

  if (isCategoriesPending) return null;

  return (
    <div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-3.5 pb-1">
        {moods.map((mood) => {
          const style = getMoodStyle(mood.id);
          const isSelected = selectedMoodId === mood.id;
          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => handleSelectMood(mood.id)}
              aria-pressed={isSelected}
              className={`flex min-w-[116px] flex-shrink-0 cursor-pointer flex-col items-start gap-2 rounded-[14px] px-4 py-3.5 text-left ${
                isSelected ? "ring-2 ring-charcoal" : ""
              }`}
              style={{
                background: `${style.color}50`,
                border: `1px solid ${style.color}`,
              }}
            >
              <span className="text-2xl">{style.emoji}</span>
              <div>
                <div className="mb-0.5 font-serif text-xs text-charcoal">
                  {mood.label}
                </div>
                <div className="font-mono text-[8px] tracking-[0.5px] text-muted">
                  {mood.sub_label}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedMoodId && (
        <div className="no-scrollbar flex gap-2.5 overflow-x-auto px-3.5 pb-1 pt-3">
          {isPerfumesByCategoryPending ? (
            <p className="px-1 py-2 font-sans text-xs text-muted">불러오는 중...</p>
          ) : perfumesByCategory.length === 0 ? (
            <p className="px-1 py-2 font-sans text-xs text-muted">
              해당하는 향수가 없어요
            </p>
          ) : (
            perfumesByCategory.map((item) => {
              const perfume = toPerfumeCardItem(item);
              return (
                <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
                  <PerfumeCard perfume={perfume} variant="hscroll" />
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default MoodRail;
