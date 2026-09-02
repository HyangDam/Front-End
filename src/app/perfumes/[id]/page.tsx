import { notFound } from "next/navigation";

import PerfumeDetailContent from "./_components/PerfumeDetailContent";

type PerfumeDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PerfumeDetailPage({ params }: PerfumeDetailPageProps) {
  const { id } = await params;
  const perfumeId = Number(id);

  if (!Number.isInteger(perfumeId)) notFound();

  return <PerfumeDetailContent perfumeId={perfumeId} />;
}
