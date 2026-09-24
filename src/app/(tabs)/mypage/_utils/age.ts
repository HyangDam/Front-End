/**
 * "YYYY-MM-DD" 생년월일로 만 나이를 계산한다.
 * 서버가 내려주는 age를 믿지 않고 직접 계산하는 이유는, 값이 0으로 오는 경우가 있어서다.
 */
export const calculateAge = (birthDate: string | null | undefined) => {
  if (!birthDate) return null;

  const [year, month, day] = birthDate.split("-").map(Number);
  if (!year || !month || !day) return null;

  const today = new Date();
  const hasHadBirthday =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);
  const age = today.getFullYear() - year - (hasHadBirthday ? 0 : 1);

  // 미래 날짜나 잘못된 값이 저장돼 있으면 나이를 숨긴다
  return age >= 0 && age < 120 ? age : null;
};
