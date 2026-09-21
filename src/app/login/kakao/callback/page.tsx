import KakaoCallback from "./_components/KakaoCallback";

type KakaoCallbackPageProps = {
  searchParams: Promise<{ code?: string; error?: string }>;
};

export default async function KakaoCallbackPage({
  searchParams,
}: KakaoCallbackPageProps) {
  const { code, error } = await searchParams;

  return <KakaoCallback code={code} error={error} />;
}
