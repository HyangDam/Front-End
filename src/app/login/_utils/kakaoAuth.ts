export const KAKAO_SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.6/kakao.min.js";

/** 카카오 콘솔의 Redirect URI에 등록되어 있어야 하는 경로 */
const KAKAO_REDIRECT_PATH = "/login/kakao/callback";

/**
 * 백엔드가 인가 코드를 토큰으로 교환할 때 여기서 만든 값과 완전히 같은
 * redirect_uri를 보내야 하므로, 로그인 요청과 콜백 양쪽에서 이 함수를 쓴다.
 */
export const getKakaoRedirectUri = () =>
  `${window.location.origin}${KAKAO_REDIRECT_PATH}`;

/**
 * 카카오 로그인 페이지로 이동한다. JS SDK v2에는 access token을 바로 주는
 * 팝업 로그인이 없어서, 인가 코드를 받아 백엔드가 교환하는 방식을 쓴다.
 * 이 함수는 페이지를 떠나므로 값을 반환하지 않는다.
 */
export const redirectToKakaoLogin = () => {
  const kakao = window.Kakao;
  const javascriptKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

  if (!kakao) {
    throw new Error("카카오 로그인을 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
  }
  if (!javascriptKey) {
    throw new Error("카카오 앱 키가 설정되지 않았어요.");
  }

  if (!kakao.isInitialized()) kakao.init(javascriptKey);

  kakao.Auth.authorize({ redirectUri: getKakaoRedirectUri() });
};
