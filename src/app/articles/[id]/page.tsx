import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageHeader from "@/components/page-header";
import { ARTICLES } from "@/consts/articles.const";

type ArticleDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { id } = await params;
  const article = ARTICLES.find((a) => a.id === Number(id));

  if (!article) notFound();

  return (
    <div className="flex h-full flex-col bg-ivory">
      <PageHeader title={article.tag} />

      <main className="flex-1 overflow-y-auto pb-8">
        <div className="relative h-[260px] bg-border-dark">
          {/* 백엔드 이미지 도메인이 아직 확정되지 않아 remotePatterns 없이 unoptimized로 사용 */}
          <Image
            src={article.img}
            alt={article.title}
            fill
            unoptimized
            sizes="420px"
            className="object-cover"
          />
        </div>

        <div className="px-5 pt-5">
          <div className="mb-1 font-sans text-[11px] text-muted">{article.eyebrow}</div>
          <h1 className="mb-4 whitespace-pre-line font-serif text-xl leading-[1.4] text-charcoal">
            {article.title}
          </h1>
          <p className="mb-6 font-sans text-[13px] leading-[1.85] text-muted">
            {article.body}
          </p>

          <Link
            href={article.ctaHref}
            className="flex items-center justify-center rounded-full bg-sage py-3 font-sans text-[13px] font-semibold text-white"
          >
            {article.ctaLabel}
          </Link>
        </div>
      </main>
    </div>
  );
}
