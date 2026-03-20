import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FuriganaProvider } from "@/components/FuriganaProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
        <FuriganaProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </FuriganaProvider>
      </body>
    </html>
  );
}
