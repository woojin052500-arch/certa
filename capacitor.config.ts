import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Certa Android 앱 설정
 *
 * 이 앱은 Next.js 서버 컴포넌트에서 Supabase를 직접 조회하는 구조라 정적 export가 안 됩니다.
 * 그래서 WebView가 배포된 Vercel URL을 그대로 불러오는 방식(server.url)을 사용합니다.
 * 즉, 웹앱을 그대로 Android 셸로 감싸는 구조이며, 여기에 AdMob 등 네이티브 플러그인을
 * 추가해 앱스토어 "최소 기능" 정책을 충족시켜야 합니다 (단순 웹뷰 래핑만으로는 반려될 수 있음).
 *
 * server.url을 실제 배포 도메인으로 반드시 교체하세요. (예: https://certa.vercel.app)
 */
const config: CapacitorConfig = {
  appId: "com.wjedulab.certa",
  appName: "Certa",
  webDir: "public",
  server: {
    // TODO: Vercel 배포 후 실제 프로덕션 URL로 교체
    url: "https://certa.vercel.app",
    cleartext: false,
  },
};

export default config;
