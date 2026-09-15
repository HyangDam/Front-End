import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "fimgs.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // 소셜 로그인 프로필 이미지
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "k.kakaocdn.net" },
      { protocol: "https", hostname: "img1.kakaocdn.net" },
    ],
  },
};

export default nextConfig;
