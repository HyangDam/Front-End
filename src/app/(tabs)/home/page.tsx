import Link from "next/link";

import PerfumeCard from "@/components/perfume-card";

import AiPerfumerCta from "./_components/AiPerfumerCta";
import ArticleHero from "./_components/ArticleHero";
import MoodRail from "./_components/MoodRail";
import SectionHeader from "./_components/SectionHeader";
import { HOME_PERFUMES } from "./_consts/homePerfumes.const";

export default function HomePage() {
  return (
    <div className="bg-ivory">
      <header className="sticky top-0 z-10 flex items-center justify-center border-b border-border bg-ivory px-4 py-3">
        <h1 className="font-serif text-[26px] tracking-[6px] text-charcoal">香談</h1>
        <Link
          href="/mypage"
          className="absolute right-4 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-sage font-serif text-xs text-white"
        >
          담
        </Link>
      </header>

      <ArticleHero />

      <section className="pt-[18px]">
        <SectionHeader
          title="당신을 위한 AI 픽"
          subtitle="AI CURATED · PERSONALIZED"
          action="전체보기"
        />
        <div className="no-scrollbar flex gap-2.5 overflow-x-auto px-3.5 pb-1">
          {HOME_PERFUMES.slice(0, 5).map((perfume) => (
            <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
              <PerfumeCard perfume={perfume} variant="hscroll" />
            </Link>
          ))}
        </div>
      </section>

      <section className="pt-[26px]">
        <SectionHeader title="향 분위기로 찾기" subtitle="DISCOVER BY MOOD" />
        <MoodRail />
      </section>

      <section className="pt-[26px]">
        <SectionHeader
          title="이번 주 인기 향수"
          subtitle="WEEKLY TOP 10"
          action="전체보기"
        />
        <div className="no-scrollbar flex gap-2.5 overflow-x-auto px-3.5 pb-1">
          {HOME_PERFUMES.slice(0, 6).map((perfume, i) => (
            <Link key={perfume.id} href={`/perfumes/${perfume.id}`}>
              <PerfumeCard perfume={perfume} variant="hscroll" rank={i + 1} />
            </Link>
          ))}
        </div>
      </section>

      <section className="px-3.5 pb-6 pt-[26px]">
        <SectionHeader title="새로 나온 향수" subtitle="NEW IN" />
        <div className="grid grid-cols-3 gap-2">
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
