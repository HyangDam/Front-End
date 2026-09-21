/** 구글 로그인 SDK가 script 태그로 주입하는 전역 객체 타입 */

type GoogleTokenResponseT = {
  access_token?: string;
  error?: string;
};

type GoogleTokenClientT = {
  requestAccessToken: () => void;
};

declare global {
  interface Window {
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
