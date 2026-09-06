"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getPopularBrands } from "@/apis/brand";
import Chip from "@/components/chip";
import PillBtn from "@/components/pill-btn";
import { useGetCategories } from "@/hooks/useGetCategories";

import ProfileImageField from "./ProfileImageField";

const BRAND_LIMIT = 30;
const NICKNAME_MAX_LENGTH = 20;

const toggleInArray = (list: string[], value: string) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

export type ProfileEditValuesT = {
  nickname: string;
  selectedCategories: string[];
  preferredBrands: string[];
};

type ProfileEditFieldsProps = {
  imageUrl: string | null;
  initialValues: ProfileEditValuesT;
  isSaving: boolean;
  errorMessage?: string;
  onSave: (values: ProfileEditValuesT) => void;
};

function ProfileEditFields({
  imageUrl,
  initialValues,
  isSaving,
  errorMessage,
  onSave,
}: ProfileEditFieldsProps) {
  const [nickname, setNickname] = useState(initialValues.nickname);
  const [selectedCategories, setSelectedCategories] = useState(
    initialValues.selectedCategories,
  );
  const [preferredBrands, setPreferredBrands] = useState(initialValues.preferredBrands);

  const { categories } = useGetCategories("note_family");
  const { data: popularBrandsData } = useQuery({
    queryKey: ["popularBrands", BRAND_LIMIT],
    queryFn: () => getPopularBrands(BRAND_LIMIT),
  });

  const handleSave = () =>
    onSave({ nickname: nickname.trim(), selectedCategories, preferredBrands });

  return (
    <>
      <main className="flex-1 overflow-y-auto px-4 py-5">
        <ProfileImageField imageUrl={imageUrl} />

        <section className="mb-7 mt-4">
          <label
            htmlFor="nickname"
            className="mb-2.5 block font-sans text-[11px] tracking-[0.5px] text-muted"
          >
            닉네임
          </label>
          <input
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요"
            maxLength={NICKNAME_MAX_LENGTH}
            className="w-full rounded-2xl border border-border-dark bg-paper px-4 py-3.5 font-sans text-[14px] text-charcoal outline-none transition-colors placeholder:text-muted-light focus:border-rose"
          />
        </section>

        <section className="mb-7">
          <p className="mb-2.5 font-sans text-[11px] tracking-[0.5px] text-muted">
            선호하는 향 계열
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map(({ id, label }) => (
              <Chip
                key={id}
                label={label}
                selected={selectedCategories.includes(id)}
                onClick={() => setSelectedCategories((prev) => toggleInArray(prev, id))}
              />
            ))}
          </div>
        </section>

        <section className="mb-4">
          <p className="mb-2.5 font-sans text-[11px] tracking-[0.5px] text-muted">
            선호하는 브랜드
          </p>
          <div className="flex flex-wrap gap-2">
            {(popularBrandsData?.brands ?? []).map(({ brand }) => (
              <Chip
                key={brand}
                label={brand}
                selected={preferredBrands.includes(brand)}
                onClick={() => setPreferredBrands((prev) => toggleInArray(prev, brand))}
              />
            ))}
          </div>
        </section>

        {errorMessage && (
          <p role="alert" className="pb-2 text-center font-sans text-xs text-error">
            {errorMessage}
          </p>
        )}
      </main>

      <div className="flex-shrink-0 border-t border-border bg-ivory px-4 py-3">
        <PillBtn
          label={isSaving ? "저장 중이에요" : "저장하기"}
          onClick={handleSave}
          variant="primary"
          full
          disabled={nickname.trim().length === 0 || isSaving}
        />
      </div>
    </>
  );
}

export default ProfileEditFields;
