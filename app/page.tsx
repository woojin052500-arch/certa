import Link from "next/link";
import AdBanner from "@/components/AdBanner";

const FEATURES = [
  {
    href: "/compare",
    title: "비교·추천",
    desc: "응시료, 준비기간, 합격률을 자격증별로 한눈에 비교해요.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M4 19V10M12 19V5M20 19v-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/quiz",
    title: "문제풀이 · 모의고사",
    desc: "연습문제로 실력을 점검하고, 모의고사로 실전처럼 풀어봐요.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/community",
    title: "커뮤니티",
    desc: "같은 시험 준비하는 사람들과 정보를 나누고 스터디를 구해요.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-14">
      <section className="text-center pt-6 pb-2">
        <div className="mx-auto mb-6 inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-white px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
          자격증 108종 · 연습문제 300문항+
        </div>
        <h1 className="text-3xl md:text-[2.75rem] font-bold tracking-tight leading-[1.15]">
          어떤 자격증부터 따야 할지, <br className="hidden md:block" />
          <span className="text-[var(--brand)]">Certa</span>가 방향을 잡아드려요
        </h1>
        <p className="mt-5 text-[15px] text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
          응시료·준비기간·합격률까지 한눈에 비교하고, 나에게 맞는 자격증을 추천받고,
          기출 유형 연습문제로 바로 풀어보세요.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/recommend"
            className="rounded-lg bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(79,70,229,0.05)] transition hover:bg-[var(--brand-dark)]"
          >
            나에게 맞는 자격증 추천받기
          </Link>
          <Link
            href="/compare"
            className="rounded-lg border border-[var(--border-subtle)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)]/30 hover:bg-[var(--surface-muted)]"
          >
            자격증 비교하기
          </Link>
        </div>
      </section>

      <AdBanner slot="home-top" />

      <section className="grid gap-4 md:grid-cols-3">
        {FEATURES.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="group rounded-2xl border border-[var(--border-subtle)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[var(--brand)]/25 hover:shadow-[0_8px_24px_-12px_rgba(79,70,229,0.25)]"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]">
              {f.icon}
            </div>
            <h3 className="font-semibold mb-1.5">{f.title}</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
