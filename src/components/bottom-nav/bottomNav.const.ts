export type BottomNavTabIdT = "home" | "search" | "ai" | "mypage";

export type BottomNavTabT = {
  id: BottomNavTabIdT;
  label: string;
  href: string;
};

export const BOTTOM_NAV_TABS: BottomNavTabT[] = [
  { id: "home", label: "홈", href: "/home" },
  { id: "search", label: "검색", href: "/search" },
  { id: "ai", label: "AI 조향사", href: "/ai" },
  { id: "mypage", label: "마이페이지", href: "/mypage" },
];

export const BOTTOM_NAV_ROSE_TABS: BottomNavTabIdT[] = ["search", "ai"];
