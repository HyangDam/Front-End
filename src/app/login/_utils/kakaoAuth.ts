const KAKAO_AUTHORIZE_URL = "https://kauth.kakao.com/oauth/authorize";

/** 카카오 콘솔의 Redirect URI에 등록되어 있어야 하는 경로 */
const KAKAO_REDIRECT_PATH = "/login/kakao/callback";

/**
 * 백엔드가 인가 코드를 토큰으로 교환할 때 인가 요청과 완전히 같은 redirect_uri를
 * 보내야 하므로, 로그인 요청과 콜백 양쪽에서 이 함수를 쓴다.
 */
export const getKakaoRedirectUri = () =>
  `${window.location.origin}${KAKAO_REDIRECT_PATH}`;

/**
 * 카카오 로그인 페이지로 이동한다.
 *
 * JS SDK를 쓰지 않고 인가 URL을 직접 만드는 이유는, SDK가 JavaScript 키로 코드를
 * 발급하는데 교환은 백엔드가 REST API 키로 하기 때문이다. 두 client_id가 다르면
 * 카카오가 KOE114(Application ID mismatch)로 교환을 거부한다.
 */
export const redirectToKakaoLogin = () => {
  const restApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  if (!restApiKey) {
    throw new Error("카카오 REST API 키가 설정되지 않았어요.");
  }

  const params = new URLSearchParams({
    client_id: restApiKey,
    redirect_uri: getKakaoRedirectUri(),
    response_type: "code",
  });

  window.location.href = `${KAKAO_AUTHORIZE_URL}?${params}`;
};
