import Image from "next/image";
import Link from "next/link";

import type { MyPerfumeT } from "@/apis/user";
import { getPerfumeDisplay } from "@/utils/perfumeDisplay";

type PerfumeShelfGridProps = {
  myPerfumes: MyPerfumeT[];
};

/** 3D 진열장을 그릴 수 없는 환경에서 대신 보여주는 격자 */
function PerfumeShelfGrid({ myPerfumes }: PerfumeShelfGridProps) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {myPerfumes.map(({ id, perfume }) => {
        const { name, brand } = getPerfumeDisplay(perfume);

        return (
          <Link
            key={id}
            href={`/perfumes/${perfume.perfume_id}`}
            className="flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border border-border bg-paper px-2 py-3"
          >
            <div className="relative h-14 w-full">
              {perfume.image_url ? (
                <Image
                  src={perfume.image_url}
                  alt={name}
                  fill
                  unoptimized
                  sizes="80px"
                  className="object-contain"
                />
              ) : (
                <span className="flex h-full items-center justify-center text-2xl">
                  🧴
                </span>
              )}
            </div>
            <p className="w-full truncate text-center font-mono text-[8px] uppercase tracking-[1px] text-muted">
              {brand}
            </p>
            <p className="w-full truncate text-center font-serif text-[11px] text-charcoal">
              {name}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

export default PerfumeShelfGrid;
