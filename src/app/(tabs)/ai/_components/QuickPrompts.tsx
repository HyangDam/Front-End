import { AI_QUICK_PROMPTS } from "../_consts/aiChat.const";

type QuickPromptsProps = {
  onSelect: (prompt: string) => void;
};

/**
 * 첫 화면에서만 보여주는 예시 질문.
 * 세로로 쌓으면 입력창만큼 무거워 보여서, 가로로 흐르는 칩으로 가볍게 둔다.
 */
function QuickPrompts({ onSelect }: QuickPromptsProps) {
  return (
    <div className="no-scrollbar flex flex-shrink-0 gap-1.5 overflow-x-auto px-3.5 pb-2.5">
      {AI_QUICK_PROMPTS.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="cursor-pointer whitespace-nowrap rounded-full border border-border bg-paper px-3 py-1.5 font-sans text-[11.5px] text-muted transition-colors hover:border-border-dark hover:text-charcoal"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}

export default QuickPrompts;
