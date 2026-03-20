import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "野球道場 | 動画で学べる野球練習ドリル集",
  description:
    "基本練習から投球・打撃・守備・戦略まで、カテゴリ別の練習ドリルを動画付きで紹介。すべてのレベルの選手と指導者のための野球技術向上サイト。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <header className="bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              野球道場
            </Link>
            <nav className="hidden sm:flex gap-6 text-sm">
              <Link
                href="/drills/basics"
                className="hover:text-orange-400 transition-colors"
              >
                基本練習
              </Link>
              <Link
                href="/drills/pitching"
                className="hover:text-orange-400 transition-colors"
              >
                投球
              </Link>
              <Link
                href="/drills/batting"
                className="hover:text-orange-400 transition-colors"
              >
                打撃
              </Link>
              <Link
                href="/drills/fielding"
                className="hover:text-orange-400 transition-colors"
              >
                守備
              </Link>
              <Link
                href="/drills/strategy"
                className="hover:text-orange-400 transition-colors"
              >
                戦略
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
            <p className="font-medium text-white mb-1">野球道場</p>
            <p>すべてのプレーに、確かな技術を。</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
