import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";

import Providers from "./providers";

// 로고(香談) 워드마크 전용 — 본문 폰트는 프리텐다드로 바뀌었지만 로고만 원래대로 유지
const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "향담 (香談) — 나만의 향을 찾아서",
  description: "취향 기반 향수 추천 & AI 조향사 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSerifKr.variable} h-full bg-white`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.css"
        />
      </head>
      <body className="mx-auto flex h-full min-h-screen w-full max-w-md flex-col overflow-hidden bg-ivory">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
