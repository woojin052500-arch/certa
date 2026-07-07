import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://certa-theta.vercel.app"),
  title: "Certa - 나에게 맞는 자격증 찾기",
  description: "자격증 비교·추천, 문제풀이, 스터디 커뮤니티까지 한 곳에서.",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Certa - 나에게 맞는 자격증 찾기",
    description: "자격증 비교·추천, 문제풀이, 스터디 커뮤니티까지 한 곳에서.",
    url: "https://certa-theta.vercel.app",
    siteName: "Certa",
    locale: "ko_KR",
    type: "website",
  },
  other: {
    "google-adsense-account": "ca-pub-9094489069910640",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9094489069910640"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
