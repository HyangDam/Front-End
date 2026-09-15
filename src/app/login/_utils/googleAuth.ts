export const GOOGLE_SDK_URL = "https://accounts.google.com/gsi/client";

/**
 * 구글 OAuth 팝업을 띄우고 provider access token을 받아온다.
 * 기본 제공되는 구글 버튼(renderButton) 대신 팝업 방식을 쓰는 이유는
 * 로그인 화면의 버튼 디자인을 그대로 유지하기 위해서다.
 */
export const loginWithGoogle = () =>
  new Promise<string>((resolve, reject) => {
    const google = window.google;
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!google) {
      reject(new Error("구글 로그인을 불러오지 못했어요. 잠시 후 다시 시도해주세요."));
      return;
    }
    if (!clientId) {
      reject(new Error("구글 클라이언트 ID가 설정되지 않았어요."));
      return;
    }

    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: ({ access_token }) => {
        if (access_token) resolve(access_token);
        else reject(new Error("구글 로그인에 실패했어요."));
      },
      error_callback: () => reject(new Error("구글 로그인이 취소되었어요.")),
    });

    tokenClient.requestAccessToken();
  });
