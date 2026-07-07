"use client";

import { useMemo, useState } from "react";
import { Certification } from "@/lib/types";

export default function CompareTable({ certs }: { certs: Certification[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("전체");
  const [sortKey, setSortKey] = useState<keyof Certification>("pass_rate");
  const [onlyVerified, setOnlyVerified] = useState(false);

  const categories = useMemo(
    () => ["전체", ...Array.from(new Set(certs.map((c) => c.category))).sort()],
    [certs]
  );

  const filtered = useMemo(() => {
    let list =
      category === "전체" ? certs : certs.filter((c) => c.category === category);
    if (onlyVerified) list = list.filter((c) => c.verified);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.issuing_org.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => {
      if (a.verified !== b.verified) return a.verified ? -1 : 1;
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") return bv - av;
      return String(av).localeCompare(String(bv));
    });
  }, [certs, category, sortKey, onlyVerified, query]);

  return (
    <div>
      <div className="relative mb-4">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="자격증 이름, 분야, 주관기관으로 검색"
          className="w-full rounded-xl border border-[var(--border-subtle)] bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[var(--brand)]/40 focus:ring-2 focus:ring-[var(--brand)]/10"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${
                category === c
                  ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                  : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:bg-[var(--surface-muted)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={(e) => setOnlyVerified(e.target.checked)}
            />
            통계 확인된 것만
          </label>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as keyof Certification)}
            className="text-xs border border-[var(--border-subtle)] rounded-md px-2 py-1.5 bg-white"
          >
            <option value="pass_rate">합격률순</option>
            <option value="exam_fee">응시료순</option>
            <option value="prep_weeks">준비기간순</option>
            <option value="difficulty">난이도순</option>
          </select>
        </div>
      </div>

      <p className="text-xs text-[var(--text-muted)] mb-3">
        총 {filtered.length}개 · 통계 확인된 자격증{" "}
        {filtered.filter((c) => c.verified).length}개
      </p>

      <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-white">
        <table className="w-full text-sm">
          <thead className="bg-[var(--surface-muted)] text-[var(--text-muted)] text-xs">
            <tr>
              <th className="text-left px-4 py-3 font-medium">자격증</th>
              <th className="text-left px-4 py-3 font-medium">주관</th>
              <th className="text-right px-4 py-3 font-medium">응시료</th>
              <th className="text-right px-4 py-3 font-medium">준비기간</th>
              <th className="text-right px-4 py-3 font-medium">합격률</th>
              <th className="text-right px-4 py-3 font-medium">난이도</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-t border-[var(--border-subtle)]">
                <td className="px-4 py-3">
                  <div className="font-medium flex items-center gap-1.5">
                    {c.name}
                    {c.verified && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        확인됨
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">{c.category}</div>
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">{c.issuing_org}</td>
                {c.verified ? (
                  <>
                    <td className="px-4 py-3 text-right">
                      {c.exam_fee.toLocaleString()}원
                    </td>
                    <td className="px-4 py-3 text-right">{c.prep_weeks}주</td>
                    <td className="px-4 py-3 text-right">{c.pass_rate}%</td>
                    <td className="px-4 py-3 text-right">
                      {"★".repeat(c.difficulty)}
                    </td>
                  </>
                ) : (
                  <td
                    colSpan={4}
                    className="px-4 py-3 text-right text-xs text-[var(--text-muted)]"
                  >
                    통계 확인 중
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-sm text-[var(--text-muted)] py-10">
          검색 결과가 없어요. 다른 검색어를 입력해보세요.
        </p>
      )}
    </div>
  );
}
