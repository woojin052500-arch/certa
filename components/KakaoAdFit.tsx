"use client";

import { useEffect, useRef } from "react";

export default function KakaoAdFit({
  unit,
  width,
  height,
  disabled = false,
}: {
  unit: string;
  width: string;
  height: string;
  disabled?: boolean;
}) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;
    
    // 이전에 로드된 스크립트나 태그가 있다면 초기화
    if (adRef.current) {
      adRef.current.innerHTML = "";
      
      const ins = document.createElement("ins");
      ins.className = "kakao_ad_area";
      ins.style.display = "none";
      ins.setAttribute("data-ad-unit", unit);
      ins.setAttribute("data-ad-width", width);
      ins.setAttribute("data-ad-height", height);

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
      script.async = true;

      adRef.current.appendChild(ins);
      adRef.current.appendChild(script);
    }
  }, [unit, width, height, disabled]);

  if (disabled) return null;

  return <div ref={adRef} className="flex items-center justify-center w-full my-4" />;
}
