"use client";

import KakaoAdFit from "./KakaoAdFit";

/**
 * 기본 배너 광고 슬롯 (카카오 애드핏 연동)
 * 사용자님이 발급받으실 실제 DAN- ID로 나중에 교체해야 합니다.
 */
export default function AdBanner({
  slot = "banner",
  className = "",
  unit = "DAN-Jdt1adls7aCA1gf3", // Default: 320x100
  width = "320",
  height = "100"
}: {
  slot?: string;
  className?: string;
  unit?: string;
  width?: string;
  height?: string;
}) {
  return (
    <div className={`w-full flex justify-center overflow-hidden my-4 ${className}`}>
      <KakaoAdFit unit={unit} width={width} height={height} />
    </div>
  );
}
