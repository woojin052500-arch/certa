"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

const NAV = [
  { href: "/compare", label: "비교" },
  { href: "/recommend", label: "추천받기" },
  { href: "/quiz", label: "문제풀이" },
  { href: "/community", label: "커뮤니티" },
];

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 현재 세션 가져오기
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // 로그인/로그아웃 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-10 border-b border-[var(--border-subtle)] bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            aria-label="Certa 홈으로 이동"
            className="shrink-0 transition-transform hover:scale-[1.04] active:scale-95"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Certa" width={34} height={34} className="rounded-[9px]" />
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-[var(--text-muted)]">
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

        <div className="flex items-center gap-4">
          {!isLoading && (
            user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {user.user_metadata?.avatar_url && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src={user.user_metadata.avatar_url} 
                      alt="profile" 
                      className="w-7 h-7 rounded-full border border-slate-200"
                    />
                  )}
                  <span className="text-sm font-medium hidden sm:inline-block">
                    {user.user_metadata?.full_name || "사용자"}님
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 text-sm font-medium bg-white border border-slate-200 hover:bg-slate-50 transition-colors px-3 py-1.5 rounded-full shadow-sm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  <path d="M1 1h22v22H1z" fill="none"/>
                </svg>
                구글 로그인
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
}
