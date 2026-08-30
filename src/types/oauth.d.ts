/** 카카오 · 구글 로그인 SDK가 script 태그로 주입하는 전역 객체 타입 */

type KakaoAuthSuccessT = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

type GoogleTokenResponseT = {
  access_token?: string;
  error?: string;
};

type GoogleTokenClientT = {
  requestAccessToken: () => void;
};

declare global {
  interface Window {
    Kakao?: {
      init: (javascriptKey: string) => void;
      isInitialized: () => boolean;
      Auth: {
        login: (options: {
          success: (response: KakaoAuthSuccessT) => void;
          fail: (error: unknown) => void;
        }) => void;
      };
    };
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: GoogleTokenResponseT) => void;
            error_callback?: (error: unknown) => void;
          }) => GoogleTokenClientT;
        };
      };
    };
  }
}

export {};
