import type { PerfumeFamilyT } from "@/types/perfume";

type FamilyBadgesProps = {
  families: PerfumeFamilyT[];
};

function FamilyBadges({ families }: FamilyBadgesProps) {
  return (
    <div className="flex justify-center gap-[18px] border-b border-border px-[22px] py-5">
      {families.map((family) => (
        <div key={family.name} className="flex flex-col items-center gap-2">
          <div
            className="h-[68px] w-[68px] rounded-full"
            style={{
              background: family.color,
              boxShadow: `0 3px 12px ${family.color}55`,
            }}
          />
          <span className="font-sans text-[11px] text-charcoal">{family.name}</span>
        </div>
      ))}
    </div>
  );
}

export default FamilyBadges;
