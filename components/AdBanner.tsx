"use client";

import KakaoAdFit from "./KakaoAdFit";

/**
 * 기본 배너 광고 슬롯 (카카오 애드핏 연동)
 * 사용자님이 발급받으실 실제 DAN- ID로 나중에 교체해야 합니다.
 */
export default function AdBanner({
  slot = "banner",
  className = "",
}: {
  slot?: string;
  className?: string;
}) {
  // TODO: 실제 카카오 애드핏 배너 광고 단위 ID(DAN-XXXX)로 교체하세요!
  const adUnitId = "DAN-placeholder-banner";
  
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <KakaoAdFit unit={adUnitId} width="320" height="100" />
    </div>
  );
}
