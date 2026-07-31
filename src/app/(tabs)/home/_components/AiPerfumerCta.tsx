import Link from "next/link";

function AiPerfumerCta() {
  return (
    <Link
      href="/ai"
      className="flex w-full cursor-pointer items-center justify-between rounded-[14px] px-[18px] py-[18px] text-left"
      style={{
        background: "linear-gradient(135deg, #1a1814 0%, #2a2620 100%)",
        boxShadow: "0 4px 16px rgba(28,28,24,0.18)",
      }}
    >
      <div>
        <div className="mb-[5px] font-mono text-[9px] tracking-[1.5px] text-rose">
          AI PERFUMER
        </div>
        <div className="mb-[3px] font-serif text-[15px] text-white">
          나만의 조향사와 대화하기
        </div>
        <div className="font-sans text-[10px] text-white/60">
          오늘 어울리는 향수를 추천해드려요
        </div>
      </div>
      <div className="text-[28px]">✨</div>
    </Link>
  );
}

export default AiPerfumerCta;
