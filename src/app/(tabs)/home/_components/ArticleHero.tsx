"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { HOME_ARTICLES } from "../_consts/homeArticles.const";

function ArticleHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HOME_ARTICLES.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const handleNextClick = () => {
    setCurrent((prev) => (prev + 1) % HOME_ARTICLES.length);
  };

  const article = HOME_ARTICLES[current];

  return (
    <div>
      <div className="relative h-[218px] overflow-hidden bg-border-dark">
        {/* 백엔드 이미지 도메인이 아직 확정되지 않아 remotePatterns 없이 unoptimized로 사용 */}
        <Image
          src={article.img}
          alt={article.title}
          fill
          unoptimized
          sizes="420px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/60" />
        <div className="absolute left-3.5 top-3.5 rounded-[11px] bg-rose px-2.5 py-[3px] font-mono text-[9px] tracking-[1.5px] text-white">
          {article.tag}
        </div>
        <div className="absolute bottom-4 left-4 right-11">
          <div className="mb-1 font-sans text-[10px] text-white/70">
            {article.eyebrow}
          </div>
          <div
            className="whitespace-pre-line font-serif text-[19px] leading-[1.45] text-white"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.35)" }}
          >
            {article.title}
          </div>
        </div>
        <button
          type="button"
          onClick={handleNextClick}
          className="absolute bottom-[18px] right-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/45 bg-white/30"
        >
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path
              d="M1 1l6 5-6 5"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-center gap-1.5 py-2">
        {HOME_ARTICLES.map((a, i) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setCurrent(i)}
            className={`h-1.5 cursor-pointer rounded-full transition-all ${
              i === current ? "w-[18px] bg-rose" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ArticleHero;
