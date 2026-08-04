import type { PerfumeT } from "@/types/perfume";

// 실제 API 연동 전까지 사용하는 목데이터. src/apis/perfume.ts의 getPerfumes()로 교체 예정
export const PERFUMES: PerfumeT[] = [
  {
    id: 1,
    name: "상탈 33",
    brand: "LE LABO",
    brandKr: "르 라보",
    price: "₩420,000",
    img: "https://fimgs.net/mdimg/perfume/375x500.30551.jpg",
    familyNames: ["우디", "머스크", "스파이시"],
  },
  {
    id: 2,
    name: "미스 디올 블루밍 부케",
    brand: "DIOR",
    brandKr: "디올",
    price: "₩195,000",
    img: "https://fimgs.net/mdimg/perfume/375x500.12207.jpg",
    familyNames: ["플로럴"],
  },
  {
    id: 3,
    name: "샹스 오 탕드르",
    brand: "CHANEL",
    brandKr: "샤넬",
    price: "₩260,000",
    img: "https://fimgs.net/mdimg/perfume/375x500.18188.jpg",
    familyNames: ["플로럴", "시트러스", "머스크"],
  },
  {
    id: 4,
    name: "오 로즈",
    brand: "DIPTYQUE",
    brandKr: "딥티크",
    price: "₩175,000",
    img: "https://fimgs.net/mdimg/perfume/375x500.22388.jpg",
    familyNames: ["플로럴", "우디"],
  },
];
