"use client";

import Link from "next/link";

import PerfumeCard from "@/components/perfume-card";

import SectionHeader from "./SectionHeader";
import { useGetWeeklyPopularPerfumes } from "../_hooks/useGetWeeklyPopularPerfumes";
import { toPerfumeCardItem } from "../_utils/toPerfumeCardItem";

function WeeklyPopularSection() {
  const { weeklyPopularPerfumes, isWeeklyPopularPerfumesPending } =
    useGetWeeklyPopularPerfumes();

  if (!isWeeklyPopularPerfumesPending && weeklyPopularPerfumes.length === 0) return null;

  return (
    <section className="pt-[26px]">
      <SectionHeader title="이번 주 인기 향수" subtitle="WEEKLY TOP 10" />
      <div className="no-scrollbar flex gap-2.5 overflow-x-auto px-3.5 pb-1">
        {isWeeklyPopularPerfumesPending ? (
          <p className="px-1 py-2 font-sans text-xs text-muted">불러오는 중...</p>
        ) : (
          weeklyPopularPerfumes.map((item, i) => {
            const perfume = toPerfumeCardItem(item);
            return (
              <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
                <PerfumeCard perfume={perfume} variant="hscroll" rank={i + 1} />
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}

export default WeeklyPopularSection;
