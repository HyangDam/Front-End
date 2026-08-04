import { notFound } from "next/navigation";

import AccordBars from "./_components/AccordBars";
import DetailActionBar from "./_components/DetailActionBar";
import DetailHeader from "./_components/DetailHeader";
import DetailHeroImage from "./_components/DetailHeroImage";
import FamilyBadges from "./_components/FamilyBadges";
import NoteSection from "./_components/NoteSection";
import StatsActionRow from "./_components/StatsActionRow";
import { getPerfumeDetail } from "./_consts/perfumeDetails.const";

type PerfumeDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PerfumeDetailPage({ params }: PerfumeDetailPageProps) {
  const { id } = await params;
  const perfume = getPerfumeDetail(Number(id));

  if (!perfume) notFound();

  return (
    <div className="flex h-full flex-col bg-paper">
      <DetailHeader />

      <div className="flex-1 overflow-y-auto">
        <div className="border-b border-border px-[22px] py-4">
          <div className="mb-1 text-center font-serif text-xl text-charcoal">
            {perfume.name}
          </div>
          <div className="text-center font-mono text-[11px] tracking-[1.5px] text-muted">
            {perfume.brand}
          </div>
        </div>

        <DetailHeroImage perfume={perfume} />

        <FamilyBadges families={perfume.families} />

        <StatsActionRow
          perfumeId={perfume.id}
          ownedCount={perfume.ownedCount}
          likeCount={perfume.likeCount}
        />

        <AccordBars accords={perfume.accords} />

        <div className="flex flex-col gap-5 px-[22px] pb-[100px] pt-4">
          <NoteSection label="TOP NOTES" notes={perfume.topNotes} />
          <NoteSection label="MIDDLE NOTES" notes={perfume.middleNotes} />
          <NoteSection label="BASE NOTES" notes={perfume.baseNotes} />
        </div>
      </div>

      <DetailActionBar perfumeId={perfume.id} />
    </div>
  );
}
