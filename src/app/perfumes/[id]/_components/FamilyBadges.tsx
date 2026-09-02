import { getFragranceFamilyInfo } from "../_consts/perfumeFamily.const";

type FamilyBadgesProps = {
  category: string;
};

function FamilyBadges({ category }: FamilyBadgesProps) {
  const { label, color } = getFragranceFamilyInfo(category);

  return (
    <div className="flex justify-center gap-[18px] border-b border-border px-[22px] py-5">
      <div className="flex flex-col items-center gap-2">
        <div
          className="h-[68px] w-[68px] rounded-full"
          style={{
            background: color,
            boxShadow: `0 3px 12px ${color}55`,
          }}
        />
        <span className="font-sans text-[11px] text-charcoal">{label}</span>
      </div>
    </div>
  );
}

export default FamilyBadges;
