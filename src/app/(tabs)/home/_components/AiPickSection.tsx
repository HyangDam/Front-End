"use client";

import Link from "next/link";

import PerfumeCard from "@/components/perfume-card";

import SectionHeader from "./SectionHeader";
import { useGetAiPickPerfumes } from "../_hooks/useGetAiPickPerfumes";
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
              <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
                <PerfumeCard perfume={perfume} variant="hscroll" />
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}

export default AiPickSection;
