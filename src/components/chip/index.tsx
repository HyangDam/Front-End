"use client";

type ChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
};

function Chip({ label, selected = false, onClick, size = "md" }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`cursor-pointer whitespace-nowrap rounded-full font-sans transition-colors ${
        size === "sm" ? "px-[11px] py-1 text-[11px]" : "px-3.5 py-[7px] text-xs"
      } ${
        selected
          ? "border-[1.5px] border-rose bg-rose font-semibold text-white"
          : "border border-border-dark bg-transparent font-normal text-charcoal"
      }`}
    >
      {label}
    </button>
  );
}

export default Chip;
