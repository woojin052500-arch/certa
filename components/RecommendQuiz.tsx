"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Certification } from "@/lib/types";
import AdBanner from "@/components/AdBanner";

const PREP_OPTIONS = [
  { label: "4주 이내", value: 4 },
  { label: "3개월 이내", value: 12 },
  { label: "6개월 이내", value: 26 },
  { label: "상관없어요", value: 999 },
];

const FEE_OPTIONS = [
  { label: "2만원 이하", value: 20000 },
  { label: "5만원 이하", value: 50000 },
  { label: "상관없어요", value: 999999 },
];

export default function RecommendQuiz({ certs: allCerts }: { certs: Certification[] }) {
  const certs = useMemo(() => allCerts, [allCerts]);
  const categories = useMemo(
    () => Array.from(new Set(certs.map((c) => c.category))),
    [certs]
  );

  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<string | null>(null);
  const [maxWeeks, setMaxWeeks] = useState<number | null>(null);
  const [maxFee, setMaxFee] = useState<number | null>(null);

  const result = useMemo(() => {
    if (step < 3) return [];
    return certs
      .filter((c) => (category ? c.category === category : true))
      .filter((c) => (maxWeeks ? c.prep_weeks <= maxWeeks : true))
      .filter((c) => (maxFee ? c.exam_fee <= maxFee : true))
      .sort((a, b) => b.pass_rate - a.pass_rate)
      .slice(0, 3);
  }, [certs, category, maxWeeks, maxFee, step]);

  if (step === 3) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">이런 자격증이 잘 맞아요</h2>
        {result.length === 0 ? (
          <p className="text-sm text-slate-500 mb-6">
            조건에 딱 맞는 자격증을 못 찾았어요. 조건을 조금 넓혀서 다시
            시도해보세요.
          </p>
        ) : (
          <div className="grid gap-4 mb-6">
            {result.map((c, i) => (
              <Link
                key={c.id}
                href={`/quiz/${c.id}`}
                className="block rounded-xl border border-slate-200 p-5 relative hover:border-indigo-400 hover:shadow-md transition"
              >
                {i === 0 && (
                  <span className="absolute -top-2 -left-2 text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                    1순위 추천
                  </span>
                )}
                <h3 className="font-semibold text-indigo-900 group-hover:text-indigo-600">{c.name}</h3>
                <p className="text-xs text-slate-400 mb-2">
                  {c.category} · {c.issuing_org}
                </p>
                <div className="flex gap-4 text-xs text-slate-500">
                  <span>응시료 {c.exam_fee === 0 ? "정보없음" : `${c.exam_fee.toLocaleString()}원`}</span>
                  <span>준비 {c.prep_weeks === 0 ? "정보없음" : `${c.prep_weeks}주`}</span>
                  <span>합격률 {c.pass_rate === 0 ? "정보없음" : `${c.pass_rate}%`}</span>
                </div>
                {c.description && <p className="text-sm text-slate-600 mt-3 line-clamp-2">{c.description}</p>}
                
                <div className="mt-4 inline-block text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-md">
                  문제 풀러가기 →
                </div>
              </Link>
            ))}
          </div>
        )}
        <AdBanner slot="recommend-result" className="mb-6" />
        <div className="flex gap-3">
          <button
            onClick={() => {
              setStep(0);
              setCategory(null);
              setMaxWeeks(null);
              setMaxFee(null);
            }}
            className="text-sm rounded-md border border-slate-300 px-4 py-2 hover:bg-slate-50"
          >
            다시 추천받기
          </button>
          <Link
            href="/compare"
            className="text-sm rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700"
          >
            전체 비교표 보기
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    {
      title: "어떤 분야에 관심 있으세요?",
      options: categories.map((c) => ({ label: c, value: c })),
      onSelect: (v: string) => {
        setCategory(v);
        setStep(1);
      },
    },
    {
      title: "준비 가능한 기간은요?",
      options: PREP_OPTIONS,
      onSelect: (v: number) => {
        setMaxWeeks(v);
        setStep(2);
      },
    },
    {
      title: "응시료 예산은요?",
      options: FEE_OPTIONS,
      onSelect: (v: number) => {
        setMaxFee(v);
        setStep(3);
      },
    },
  ];

  const current = steps[step];

  return (
    <div>
      <div className="flex gap-1 mb-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i <= step ? "bg-indigo-600" : "bg-slate-200"
            }`}
          />
        ))}
      </div>
      <h2 className="text-xl font-bold mb-6">{current.title}</h2>
      <div className="grid gap-3">
        {current.options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => current.onSelect(opt.value as never)}
            className="text-left rounded-lg border border-slate-200 px-4 py-3 hover:border-indigo-400 hover:bg-indigo-50 transition text-sm font-medium"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
