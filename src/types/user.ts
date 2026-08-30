export type GenderT = "male" | "female" | "other";

export type UserT = {
  user_id: number;
  email: string;
  name: string | null;
  nickname: string | null;
  gender: GenderT | null;
  birth_date: string | null;
  age: number | null;
  profile_image_url?: string | null;
  created_at?: string;
  updated_at?: string;
};
