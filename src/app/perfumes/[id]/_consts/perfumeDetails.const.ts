import { PERFUMES } from "@/mocks/perfume";
import type { PerfumeDetailT, PerfumeReviewT, PerfumeT } from "@/types/perfume";

type PerfumeDetailExtraT = Omit<PerfumeDetailT, keyof PerfumeT>;

const PERFUME_DETAIL_EXTRA: Record<number, PerfumeDetailExtraT> = {
  1: {
    description:
      "샌달우드의 부드러움과 스파이시함이 어우러진 따뜻하고 크리미한 우디 향. 마치 두 번째 피부처럼 은은하게 스며드는 향수입니다.",
    families: [
      { name: "우디", color: "#c8b89a" },
      { name: "머스크", color: "#b8a898" },
      { name: "스파이시", color: "#a8a880" },
    ],
    accords: [
      { name: "우디", percent: 92 },
      { name: "샌달우드", percent: 85 },
      { name: "스파이시", percent: 60 },
      { name: "머스크", percent: 52 },
      { name: "앰버", percent: 38 },
    ],
    topNotes: [
      { name: "Papyrus", emoji: "🌾" },
      { name: "Violet", emoji: "🪻" },
    ],
    middleNotes: [
      { name: "Iris", emoji: "🌸" },
      { name: "Ambrette", emoji: "🌿" },
      { name: "Cardamom", emoji: "🫘" },
    ],
    baseNotes: [
      { name: "Sandalwood", emoji: "🪵" },
      { name: "Cedar", emoji: "🌲" },
      { name: "Musk", emoji: "🤍" },
    ],
    rating: 4.8,
    reviewCount: 234,
    ownedCount: 714,
    likeCount: 892,
  },
  2: {
    description:
      "작약과 자스민이 화사하게 피어나는 청순하고 우아한 플로럴 부케 향. 봄날의 정원을 그대로 담은 듯한 향수입니다.",
    families: [
      { name: "플로럴", color: "#e0b8c0" },
      { name: "프루티", color: "#e0d0c0" },
      { name: "플레시", color: "#b8d0c8" },
    ],
    accords: [
      { name: "플로럴", percent: 88 },
      { name: "프루티", percent: 65 },
      { name: "플레시", percent: 50 },
      { name: "머스크", percent: 40 },
    ],
    topNotes: [
      { name: "Peony", emoji: "🌸" },
      { name: "Bergamot", emoji: "🍋" },
    ],
    middleNotes: [
      { name: "Rose", emoji: "🌹" },
      { name: "Lily of the Valley", emoji: "🌼" },
    ],
    baseNotes: [
      { name: "White Musk", emoji: "🤍" },
      { name: "Amber", emoji: "🟡" },
    ],
    rating: 4.5,
    reviewCount: 312,
    ownedCount: 189,
    likeCount: 543,
  },
  3: {
    description:
      "자몽과 자스민이 조화롭게 어우러진 상쾌하고 부드러운 플로럴 향. 은은한 머스크로 마무리되는 세련된 시그니처 향수입니다.",
    families: [
      { name: "플로럴", color: "#e8c8a0" },
      { name: "시트러스", color: "#d0c8b8" },
      { name: "머스크", color: "#b8c8c0" },
    ],
    accords: [
      { name: "플로럴", percent: 85 },
      { name: "시트러스", percent: 70 },
      { name: "프루티", percent: 55 },
      { name: "머스크", percent: 45 },
    ],
    topNotes: [
      { name: "Grapefruit", emoji: "🍊" },
      { name: "Quince", emoji: "🍐" },
    ],
    middleNotes: [
      { name: "Jasmine", emoji: "🌼" },
      { name: "Iris", emoji: "🌸" },
      { name: "Hyacinth", emoji: "🪻" },
    ],
    baseNotes: [
      { name: "White Musk", emoji: "🤍" },
      { name: "Cedar", emoji: "🌲" },
      { name: "Amber", emoji: "🟡" },
    ],
    rating: 4.8,
    reviewCount: 421,
    ownedCount: 356,
    likeCount: 1024,
  },
  4: {
    description:
      "장미 정원을 거니는 듯 우아하고 로맨틱한 플로럴 향. 리치와 블랙커런트의 상큼함이 첫인상을 화사하게 열어줍니다.",
    families: [
      { name: "플로럴", color: "#e8b8b8" },
      { name: "프루티", color: "#c8d8c0" },
      { name: "우디", color: "#b8a898" },
    ],
    accords: [
      { name: "플로럴", percent: 90 },
      { name: "장미", percent: 85 },
      { name: "프루티", percent: 55 },
      { name: "우디", percent: 35 },
    ],
    topNotes: [
      { name: "Lychee", emoji: "🍈" },
      { name: "Blackcurrant", emoji: "🫐" },
    ],
    middleNotes: [
      { name: "Rose", emoji: "🌹" },
      { name: "Geranium", emoji: "🌺" },
    ],
    baseNotes: [
      { name: "Rosewood", emoji: "🪵" },
      { name: "Musk", emoji: "🤍" },
    ],
    rating: 4.7,
    reviewCount: 289,
    ownedCount: 241,
    likeCount: 467,
  },
};

export const PERFUME_REVIEWS: PerfumeReviewT[] = [
  {
    user: "향수덕후_민지",
    text: "정말 향이 오래가고 은은해서 매일 뿌리고 싶어요",
    rating: 5,
  },
  {
    user: "perfume_영지",
    text: "처음엔 강했지만 마르면 부드럽고 우아해져요",
    rating: 4,
  },
];

export const getPerfumeDetail = (id: number): PerfumeDetailT | undefined => {
  const base = PERFUMES.find((perfume) => perfume.id === id);
  const extra = PERFUME_DETAIL_EXTRA[id];
  if (!base || !extra) return undefined;
  return { ...base, ...extra };
};
