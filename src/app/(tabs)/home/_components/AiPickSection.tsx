"use client";

import Link from "next/link";

import PerfumeCard from "@/components/perfume-card";

import SectionHeader from "./SectionHeader";
import { useGetAiPickPerfumes } from "../_hooks/useGetAiPickPerfumes";
import { getMatchLabel } from "../_utils/getMatchLabel";
import { toPerfumeCardItem } from "../_utils/toPerfumeCardItem";

function AiPickSection() {
  const { aiPickPerfumes, isAiPickPerfumesPending } = useGetAiPickPerfumes();

  if (!isAiPickPerfumesPending && aiPickPerfumes.length === 0) return null;

  return (
    <section className="pt-[18px]">
      <SectionHeader title="당신을 위한 AI 픽" subtitle="AI CURATED · PERSONALIZED" />
      <div className="no-scrollbar flex gap-2.5 overflow-x-auto px-3.5 pb-1">
        {isAiPickPerfumesPending ? (
          <p className="px-1 py-2 font-sans text-xs text-muted">불러오는 중...</p>
        ) : (
          aiPickPerfumes.map((item) => {
            const perfume = toPerfumeCardItem(item);
            return (
              <Link
                key={perfume.id}
                href={`/perfumes/${perfume.id}`}
                className="w-[116px] flex-shrink-0"
              >
                <PerfumeCard perfume={perfume} variant="hscroll" />
                <p className="mt-1 line-clamp-2 h-[26px] px-0.5 font-sans text-[10px] leading-[1.3] text-muted">
                  {getMatchLabel(item.score)}
                </p>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}

export default AiPickSection;
