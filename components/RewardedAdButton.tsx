"use client";

import { useState } from "react";

/**
 * 리워드형 광고 버튼.
 * 지금은 3초 타이머로 "광고 시청"을 흉내내는 시뮬레이션이고,
 * 실제 서비스에서는 이 자리에 리워드 광고 SDK(예: 모바일 앱이면 AdMob Rewarded Ad,
 * 웹이면 리워드형 배너/비디오 네트워크) 호출을 넣고 완료 콜백에서 onRewarded()를 호출하면 됩니다.
 */
export default function RewardedAdButton({
  label = "광고 보고 해설 보기",
  onRewarded,
}: {
  label?: string;
  onRewarded: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "playing" | "done">("idle");

  const handleClick = () => {
    if (status !== "idle") return;
    setStatus("playing");
    // TODO: 실제 리워드 광고 SDK 연동 지점
    setTimeout(() => {
      setStatus("done");
      onRewarded();
    }, 3000);
  };

  if (status === "done") return null;

  return (
    <button
      onClick={handleClick}
      disabled={status === "playing"}
      className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--brand-dark)] disabled:opacity-60"
    >
      {status === "playing" ? "광고 재생 중... (3초)" : label}
    </button>
  );
}
