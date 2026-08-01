import { AI_QUICK_PROMPTS } from "../_consts/aiChat.const";

type QuickPromptsProps = {
  onSelect: (prompt: string) => void;
};

function QuickPrompts({ onSelect }: QuickPromptsProps) {
  return (
    <div className="flex-shrink-0 px-3.5 pb-2">
      <p className="mb-2 font-mono text-[9px] tracking-[1.2px] text-muted">
        이렇게 물어보세요
      </p>
      <div className="flex flex-col gap-1.5">
        {AI_QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onSelect(prompt)}
            className="cursor-pointer rounded-[18px] border border-border bg-paper px-3.5 py-2.5 text-left font-sans text-xs text-charcoal"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickPrompts;
