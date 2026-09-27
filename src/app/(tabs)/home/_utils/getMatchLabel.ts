/**
 * 추천 score(코사인 유사도 등, 0~1)를 사용자에게 보여줄 문구로 변환한다.
 * 경계값은 실제 응답 분포(상위 5개 기준 대략 0.27~0.44)를 보고 잡았다.
 */
export const getMatchLabel = (score: number) => {
  if (score >= 0.35) return "취향과 잘 맞아요";
  if (score >= 0.3) return "선호 조건을 일부 반영했어요";
  return "새로운 취향으로 탐색해보세요";
};
