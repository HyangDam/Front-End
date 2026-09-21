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
      <div className="flex flex-wrap gap-2">
        {notes.map((note) => (
          <span
            key={note.id}
            className="rounded-full border border-border-dark px-3 py-1.5 font-sans text-[11px] text-charcoal"
          >
            {note.label_ko}
          </span>
        ))}
      </div>
    </div>
  );
}

export default NoteSection;
