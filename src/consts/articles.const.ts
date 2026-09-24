export type ArticleT = {
  id: number;
  tag: string;
  eyebrow: string;
  title: string;
  img: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export const ARTICLES: ArticleT[] = [
  {
    id: 1,
    tag: "EVENT",
    eyebrow: "무더운 여름날",
    title: "청량한 시트러스 향으로\n더위를 식혀보세요",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700&q=80&auto=format&fit=crop",
    body: "베르가못, 유자, 자몽처럼 톡 쏘는 시트러스 노트는 더위에 지친 하루를 산뜻하게 리프레시해줘요. 가볍고 청량한 느낌이라 데일리로 부담 없이 뿌리기 좋고, 땀과 섞여도 쉽게 무너지지 않는 편이라 여름철에 특히 잘 어울립니다.",
    ctaLabel: "시트러스 향수 둘러보기",
    ctaHref: "/search",
  },
  {
    id: 2,
    tag: "SEASONAL",
    eyebrow: "가을 산책길",
    title: "가을에 어울리는\n우디 플로럴 향수 TOP 5",
    img: "https://images.unsplash.com/photo-1490750967868-88df5691cc4c?w=700&q=80&auto=format&fit=crop",
    body: "선선한 바람이 불기 시작하면 가벼운 시트러스보다 조금 더 묵직한 향이 생각나죠. 장미나 자스민 같은 플로럴 노트에 샌달우드·시더 같은 우디 노트가 더해지면 따뜻하고 우아한 인상을 남길 수 있어요. 계열 필터에서 '우디'와 '플로럴'을 함께 선택해 취향에 맞는 향수를 찾아보세요.",
    ctaLabel: "우디·플로럴 향수 둘러보기",
    ctaHref: "/search",
  },
  {
    id: 3,
    tag: "GUIDE",
    eyebrow: "향수 초심자를 위해",
    title: "나에게 맞는 향수 고르는 법\n완벽 가이드",
    img: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=700&q=80&auto=format&fit=crop",
    body: "향수가 처음이라면 향 계열부터 하나씩 맡아보는 게 좋아요. 시트러스는 상큼하고 가벼운 인상을, 플로럴은 화사하고 로맨틱한 인상을, 우디는 차분하고 성숙한 인상을 줍니다. 말로 설명하기 어렵다면 AI 조향사에게 원하는 느낌을 편하게 이야기해보세요, 어울리는 향수를 함께 찾아드려요.",
    ctaLabel: "AI 조향사에게 물어보기",
    ctaHref: "/ai",
  },
];
