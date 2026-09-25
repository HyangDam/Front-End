import type { PerfumeSummaryT, PerfumeT } from "@/types/perfume";
import { getPerfumeDisplay } from "@/utils/perfumeDisplay";

export const toPerfumeCardItem = (item: PerfumeSummaryT): PerfumeT => {
  const display = getPerfumeDisplay(item);
  return {
    id: item.perfume_id,
    name: display.name,
    brand: display.brand,
    brandKr: display.brand,
    price: "",
    img: item.image_url ?? undefined,
  };
};
