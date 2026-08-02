export type HomeArticleT = {
  id: number;
  tag: string;
  eyebrow: string;
  title: string;
  img: string;
};

export const HOME_ARTICLES: HomeArticleT[] = [
  {
    id: 1,
    tag: "EVENT",
    eyebrow: "무더운 여름날",
    title: "청량한 시트러스 향으로\n더위를 식혀보세요",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700&q=80&auto=format&fit=crop",
  },
  {
    id: 2,
    tag: "SEASONAL",
    eyebrow: "가을 산책길",
    title: "가을에 어울리는\n우디 플로럴 향수 TOP 5",
    img: "https://images.unsplash.com/photo-1490750967868-88df5691cc4c?w=700&q=80&auto=format&fit=crop",
  },
  {
    id: 3,
    tag: "GUIDE",
    eyebrow: "향수 초심자를 위해",
    title: "나에게 맞는 향수 고르는 법\n완벽 가이드",
    img: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=700&q=80&auto=format&fit=crop",
  },
];
