import { HOME_MOODS } from "../_consts/homeMoods.const";

function MoodRail() {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-3.5 pb-1">
      {HOME_MOODS.map((mood) => (
        <button
          key={mood.id}
          type="button"
          className="flex min-w-[116px] flex-shrink-0 cursor-pointer flex-col items-start gap-2 rounded-[14px] px-4 py-3.5 text-left"
          style={{ background: `${mood.color}50`, border: `1px solid ${mood.color}` }}
        >
          <span className="text-2xl">{mood.emoji}</span>
          <div>
            <div className="mb-0.5 font-serif text-xs text-charcoal">{mood.label}</div>
            <div className="font-mono text-[8px] tracking-[0.5px] text-muted">
              {mood.sub}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default MoodRail;
