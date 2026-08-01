"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ANALYSIS_MESSAGES } from "./_consts/analysisMessages.const";

const ANALYSIS_DURATION_MS = 3200;
const PROGRESS_TICK_MS = 60;
const MESSAGE_TICK_MS = 900;

export default function LoadingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const done = setTimeout(() => router.push("/home"), ANALYSIS_DURATION_MS);
    const progressTimer = setInterval(
      () => setProgress((prev) => Math.min(prev + 2, 100)),
      PROGRESS_TICK_MS,
    );
    const messageTimer = setInterval(
      () => setMessageIndex((prev) => (prev + 1) % ANALYSIS_MESSAGES.length),
      MESSAGE_TICK_MS,
    );

    return () => {
      clearTimeout(done);
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, [router]);

  return (
    <main className="flex h-full flex-1 flex-col items-center justify-center gap-9 bg-ivory px-10 text-center">
      <div className="relative">
        <div className="flex h-[100px] w-[100px] animate-[spin-slow_8s_linear_infinite] items-center justify-center rounded-full border-2 border-rose/15">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-sage/10">
            <span className="font-serif text-4xl tracking-[2px] text-charcoal/85">
              香
            </span>
          </div>
        </div>
        <div className="absolute -top-1 left-1/2 -ml-[5px] h-2.5 w-2.5 animate-[spin_3s_linear_infinite] rounded-full bg-rose [transform-origin:5px_58px]" />
      </div>

      <div>
        <p className="mb-2.5 font-serif text-lg leading-[1.6] text-charcoal">
          향담이 분석하고 있어요
        </p>
        <p className="min-h-10 font-sans text-[13px] leading-[1.9] text-muted">
          {ANALYSIS_MESSAGES[messageIndex]}
        </p>
      </div>

      <div className="w-full">
        <div className="h-[3px] w-full overflow-hidden rounded-sm bg-border">
          <div
            className="h-full rounded-sm bg-gradient-to-r from-rose to-sage transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-right font-sans text-[11px] text-muted-light">
          {progress}%
        </p>
      </div>
    </main>
  );
}
