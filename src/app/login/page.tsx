import SocialLoginSection from "./_components/SocialLoginSection";

export default function LoginPage() {
  return (
    <main className="flex h-full flex-1 flex-col items-center overflow-y-auto px-8 pt-[18vh]">
      <div className="flex flex-col items-center text-center">
        <p className="mb-[18px] font-mono text-[10px] uppercase tracking-[3px] text-muted">
          Perfume Finder
        </p>
        <h1 className="mb-4 font-serif text-[58px] leading-none tracking-[8px] text-charcoal">
          香談
        </h1>
        <div className="flex items-center justify-center gap-2.5">
          <span className="h-px w-7 bg-rose" />
          <p className="font-sans text-[10px] tracking-[2px] text-muted">
            나만의 향을 찾아서
          </p>
          <span className="h-px w-7 bg-rose" />
        </div>
      </div>

      <SocialLoginSection />
    </main>
  );
}
