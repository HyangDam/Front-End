import type { PerfumeSummaryT, PerfumeT } from "@/types/perfume";

export const toPerfumeCardItem = (item: PerfumeSummaryT): PerfumeT => ({
  id: item.perfume_id,
  name: item.name,
  brand: item.brand,
  brandKr: item.brand,
  price: "",
  img: item.image_url ?? undefined,
});
