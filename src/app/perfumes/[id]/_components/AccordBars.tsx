import type { PerfumeAccordT } from "@/types/perfume";

type AccordBarsProps = {
  accords: PerfumeAccordT[];
};

function AccordBars({ accords }: AccordBarsProps) {
  return (
    <div className="border-b border-border px-[22px] py-4">
      <div className="mb-3.5 font-mono text-[10px] uppercase tracking-[1.5px] text-muted">
        메인 어코드
      </div>
      <div className="flex flex-col gap-2.5">
        {accords.map((accord) => (
          <div key={accord.name} className="flex items-center gap-3">
            <div className="w-[68px] flex-shrink-0 font-sans text-xs text-charcoal">
              {accord.name}
            </div>
            <div className="h-1.5 flex-1 overflow-hidden rounded-[3px] bg-ivory-200">
              <div
                className="h-full rounded-[3px] bg-charcoal"
                style={{ width: `${accord.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccordBars;
