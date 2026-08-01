import type { ReactNode } from "react";

import PillBtn from "@/components/pill-btn";

import ProgressDots from "./ProgressDots";

type OnboardShellProps = {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
  eyebrow: string;
  children: ReactNode;
  backHref: string;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
};

function OnboardShell({
  step,
  total,
  title,
  subtitle,
  eyebrow,
  children,
  backHref,
  onNext,
  nextDisabled = false,
  nextLabel,
}: OnboardShellProps) {
  return (
    <main className="flex h-full flex-1 flex-col overflow-hidden bg-ivory">
      <div className="flex-shrink-0 px-7 pt-6">
        <ProgressDots step={step} total={total} />
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[1.5px] text-rose">
          {eyebrow}
        </p>
        <h1
          className={`whitespace-pre-line font-serif text-[22px] leading-[1.55] text-charcoal ${
            subtitle ? "mb-1.5" : "mb-6"
          }`}
        >
          {title}
        </h1>
        {subtitle && <p className="mb-6 font-sans text-xs text-muted">{subtitle}</p>}
      </div>

      <div className="flex-1 overflow-y-auto px-7">{children}</div>

      <div className="flex flex-shrink-0 gap-2.5 px-7 pb-7 pt-4">
        <PillBtn label="이전" href={backHref} variant="ghost" />
        <div className="flex-1">
          <PillBtn
            label={nextLabel ?? "다음"}
            onClick={onNext}
            variant="primary"
            full
            disabled={nextDisabled}
          />
        </div>
      </div>
    </main>
  );
}

export default OnboardShell;
