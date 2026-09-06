import Image from "next/image";
import Link from "next/link";

import type { MyPerfumeT } from "@/apis/user";

type PerfumeShelf3DProps = {
  myPerfumes: MyPerfumeT[];
};

/** 3D 진열장은 준비 중이라, 담아둔 향수를 우선 격자로 보여준다 */
function PerfumeShelf3D({ myPerfumes }: PerfumeShelf3DProps) {
  if (myPerfumes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-paper px-6 py-16 text-center">
        <span className="text-3xl">🧴</span>
        <p className="font-serif text-sm text-charcoal">향수장이 비어 있어요</p>
        <p className="font-sans text-xs text-muted">
          마음에 드는 향수를 향수장에 담아보세요
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {myPerfumes.map(({ id, perfume }) => (
        <Link
          key={id}
          href={`/perfumes/${perfume.perfume_id}`}
          className="flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border border-border bg-paper px-2 py-3"
        >
          <div className="relative h-14 w-full">
            {perfume.image_url ? (
              <Image
                src={perfume.image_url}
                alt={perfume.name}
                fill
                unoptimized
                sizes="80px"
                className="object-contain"
              />
            ) : (
              <span className="flex h-full items-center justify-center text-2xl">🧴</span>
            )}
          </div>
          <p className="w-full truncate text-center font-mono text-[8px] uppercase tracking-[1px] text-muted">
            {perfume.brand}
          </p>
          <p className="w-full truncate text-center font-serif text-[11px] text-charcoal">
            {perfume.name}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default PerfumeShelf3D;
