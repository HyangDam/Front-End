export const KAKAO_SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.6/kakao.min.js";

/** 카카오 로그인 팝업을 띄우고 provider access token을 받아온다 */
export const loginWithKakao = () =>
  new Promise<string>((resolve, reject) => {
    const kakao = window.Kakao;
    const javascriptKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

    if (!kakao) {
      reject(new Error("카카오 로그인을 불러오지 못했어요. 잠시 후 다시 시도해주세요."));
      return;
    }
    if (!javascriptKey) {
      reject(new Error("카카오 앱 키가 설정되지 않았어요."));
      return;
    }

    if (!kakao.isInitialized()) kakao.init(javascriptKey);

    kakao.Auth.login({
      success: ({ access_token }) => resolve(access_token),
      fail: () => reject(new Error("카카오 로그인에 실패했어요.")),
    });
  });
