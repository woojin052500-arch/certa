"use client";

/**
 * 배너 광고 슬롯.
 * 지금은 자리표시자(placeholder)이고, 실제 서비스에서는 아래 자리에
 * Google AdSense(<ins class="adsbygoogle">) 스크립트나 다른 배너 네트워크 태그를 넣으면 됩니다.
 *
 * AdSense 연동 예시:
 * 1. app/layout.tsx <head>에 AdSense 스크립트 태그 추가
 * 2. 아래 placeholder div를 <ins className="adsbygoogle" data-ad-client="ca-pub-XXXX" .../> 로 교체
 */
export default function AdBanner({
  slot = "banner",
  className = "",
}: {
  slot?: string;
  className?: string;
}) {
  return (
    <div
      className={`w-full flex items-center justify-center rounded-xl border border-dashed border-[var(--border-subtle)] bg-[var(--surface-muted)] text-[var(--text-muted)] text-xs py-6 ${className}`}
      data-ad-slot={slot}
    >
      광고 영역 (배너)
    </div>
  );
}
