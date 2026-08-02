type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  action?: string;
};

function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="mb-3 flex items-baseline justify-between px-3.5">
      <div>
        <div className="font-serif text-[15px] text-charcoal">{title}</div>
        {subtitle && (
          <div className="mt-0.5 font-mono text-[9px] tracking-[1px] text-muted">
            {subtitle}
          </div>
        )}
      </div>
      {action && (
        <button
          type="button"
          className="cursor-pointer border-none bg-transparent font-sans text-[11px] text-muted"
        >
          {action} ›
        </button>
      )}
    </div>
  );
}

export default SectionHeader;
