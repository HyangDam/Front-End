export type GenderT = "male" | "female" | "other";

/** GET · PATCH /users/me 가 돌려주는 전체 프로필 */
export type UserT = {
  user_id: number;
  email: string | null;
  name: string | null;
  nickname: string | null;
  gender: GenderT | null;
  birth_date: string | null;
  age: number | null;
  profile_image_url: string | null;
  status: string;
  created_at: string | null;
};

/** 로그인 응답에 담기는 축약 프로필 (성별 · 생년월일 등은 포함되지 않는다) */
export type AuthUserT = Pick<
  UserT,
  "user_id" | "email" | "name" | "nickname" | "profile_image_url"
>;
