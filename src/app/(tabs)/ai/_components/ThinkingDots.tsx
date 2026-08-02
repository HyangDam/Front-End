const DOT_DELAYS_MS = [0, 150, 300];

function ThinkingDots() {
  return (
    <div className="mb-3.5 flex items-start gap-2">
      <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-charcoal to-[#3a3530] text-xs">
        ✨
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-[4px] border border-border bg-paper px-4 py-3">
        {DOT_DELAYS_MS.map((delay) => (
          <span
            key={delay}
            style={{ animationDelay: `${delay}ms` }}
            className="h-1.5 w-1.5 animate-[bounce-dot_1.2s_ease-in-out_infinite] rounded-full bg-muted-light"
          />
        ))}
      </div>
    </div>
  );
}

export default ThinkingDots;
