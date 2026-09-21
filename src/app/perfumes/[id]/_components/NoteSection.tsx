import type { PerfumeNoteT } from "@/types/perfume";

type NoteSectionProps = {
  label: string;
  notes: PerfumeNoteT[];
};

function NoteSection({ label, notes }: NoteSectionProps) {
  if (notes.length === 0) return null;

  return (
    <div>
      <div className="mb-2.5 font-mono text-[9px] tracking-[2px] text-muted">{label}</div>
      <div className="flex flex-wrap gap-3.5">
        {notes.map((note) => (
          <div key={note.id} className="flex flex-col items-center gap-1.5">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[10px] border border-border bg-ivory-100 font-serif text-sm text-charcoal">
              {note.label_ko.slice(0, 1).toUpperCase()}
            </div>
            <span className="max-w-[58px] text-center font-sans text-[9px] leading-[1.4] text-muted">
              {note.label_ko}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteSection;
