"use client";

type ChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
  disabled?: boolean;
};

function Chip({
  label,
  selected = false,
  onClick,
  size = "md",
  disabled = false,
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-pressed={selected}
      title={disabled ? "준비 중인 기능이에요" : undefined}
      className={`whitespace-nowrap rounded-full font-sans transition-colors ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${size === "sm" ? "px-[11px] py-1 text-[11px]" : "px-3.5 py-[7px] text-xs"} ${
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
