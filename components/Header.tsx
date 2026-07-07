"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/compare", label: "비교" },
  { href: "/recommend", label: "추천받기" },
  { href: "/quiz", label: "문제풀이" },
  { href: "/community", label: "커뮤니티" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-[var(--border-subtle)] bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5">
        <Link
          href="/"
          aria-label="Certa 홈으로 이동"
          className="shrink-0 transition-transform hover:scale-[1.04] active:scale-95"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Certa" width={34} height={34} className="rounded-[9px]" />
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium text-[var(--text-muted)]">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-1.5 transition-colors ${
                  active
                    ? "bg-[var(--brand)]/10 text-[var(--brand)]"
                    : "hover:bg-black/[0.03] hover:text-[var(--foreground)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
