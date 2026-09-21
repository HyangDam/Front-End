import type { PerfumeAccordT } from "@/types/perfume";

const FAMILY_BADGE_COUNT = 3;

type FamilyBadgesProps = {
  accords: PerfumeAccordT[];
};

function FamilyBadges({ accords }: FamilyBadgesProps) {
  const topAccords = accords.slice(0, FAMILY_BADGE_COUNT);
  if (topAccords.length === 0) return null;

  return (
    <div className="flex justify-center gap-[18px] border-b border-border px-[22px] py-5">
      {topAccords.map((accord) => (
        <div key={accord.id} className="flex flex-col items-center gap-2">
          <div
            className="h-[68px] w-[68px] rounded-full"
            style={{
              background: accord.color,
              boxShadow: `0 3px 12px ${accord.color}55`,
            }}
          />
          <span className="font-sans text-[11px] text-charcoal">{accord.label}</span>
        </div>
      ))}
    </div>
  );
}

export default FamilyBadges;
