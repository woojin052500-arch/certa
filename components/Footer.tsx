export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] mt-16">
      <div className="mx-auto max-w-5xl px-4 py-10 flex items-center justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Certa" width={20} height={20} className="rounded-[5px] opacity-70" />
        <p className="text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} Certa. 자격증 비교·추천·커뮤니티 플랫폼.
        </p>
      </div>
    </footer>
  );
}
