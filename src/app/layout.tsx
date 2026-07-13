import type { Metadata } from "next";
import { Noto_Serif_KR, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html
      lang="ko"
      className={`${notoSerifKr.variable} ${plusJakartaSans.variable} h-full`}
    >
      <body className="mx-auto flex h-full min-h-screen w-full max-w-md flex-col overflow-hidden bg-ivory">
        {children}
      </body>
    </html>
  );
}
