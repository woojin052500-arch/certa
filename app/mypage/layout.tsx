import AuthGuard from "@/components/AuthGuard";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
