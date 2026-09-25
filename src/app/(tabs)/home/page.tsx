import Link from "next/link";

import PerfumeCard from "@/components/perfume-card";

import AiPerfumerCta from "./_components/AiPerfumerCta";
import AiPickSection from "./_components/AiPickSection";
import ArticleHero from "./_components/ArticleHero";
import MoodRail from "./_components/MoodRail";
import SectionHeader from "./_components/SectionHeader";
import WeeklyPopularSection from "./_components/WeeklyPopularSection";
import { HOME_PERFUMES } from "./_consts/homePerfumes.const";

export default function HomePage() {
  return (
    <div className="bg-ivory">
      <header className="sticky top-0 z-10 flex items-center justify-center border-b border-border bg-ivory px-4 py-3">
        <h1 className="font-logo text-[26px] tracking-[6px] text-charcoal">香談</h1>
      </header>

      <ArticleHero />

      <AiPickSection />

      <section className="pt-[26px]">
        <SectionHeader title="향 분위기로 찾기" subtitle="DISCOVER BY MOOD" />
        <MoodRail />
      </section>

      <WeeklyPopularSection />

      <section className="pb-6 pt-[26px]">
        <SectionHeader title="새로 나온 향수" subtitle="NEW IN" />
        <div className="grid grid-cols-3 gap-2 px-3.5">
          {HOME_PERFUMES.slice(0, 6).map((perfume) => (
            <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
              <PerfumeCard perfume={perfume} variant="compact" />
            </Link>
          ))}
        </div>
      </section>

      <div className="px-3.5 pb-7">
        <AiPerfumerCta />
      </div>
    </div>
  );
}
