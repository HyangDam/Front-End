type EditorialBottleProps = {
  brand: string;
  height?: number;
};

function EditorialBottle({ brand, height = 140 }: EditorialBottleProps) {
  const bottleHeight = height * 0.72;
  const bottleWidth = bottleHeight * 0.46;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width={bottleWidth} height={bottleHeight} viewBox="0 0 46 100" fill="none">
        <rect x="16" y="0" width="14" height="10" rx="3" fill="#c8bfb4" opacity="0.9" />
        <rect x="19" y="9" width="8" height="14" rx="2" fill="#c8bfb4" opacity="0.8" />
        <rect x="4" y="22" width="38" height="72" rx="8" fill="#c8bfb4" opacity="0.65" />
        <rect x="9" y="34" width="28" height="22" rx="3" fill="white" opacity="0.5" />
        <rect x="7" y="26" width="6" height="40" rx="3" fill="white" opacity="0.2" />
      </svg>
      <span className="font-mono text-[7px] uppercase tracking-[1px] text-charcoal opacity-50">
        {brand}
      </span>
    </div>
  );
}

export default EditorialBottle;