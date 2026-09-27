import AiPerfumerCta from "./_components/AiPerfumerCta";
import AiPickSection from "./_components/AiPickSection";
import ArticleHero from "./_components/ArticleHero";
import MoodRail from "./_components/MoodRail";
import SectionHeader from "./_components/SectionHeader";
import WeeklyPopularSection from "./_components/WeeklyPopularSection";

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

      <div className="px-3.5 pb-7 pt-[26px]">
        <AiPerfumerCta />
      </div>
    </div>
  );
}
