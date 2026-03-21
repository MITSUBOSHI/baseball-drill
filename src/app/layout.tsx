import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FuriganaProvider } from "@/components/FuriganaProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FavoritesProvider } from "@/components/FavoritesProvider";
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
  metadataBase: new URL("https://mitsuboshi.github.io/baseball-drill"),
  title: "野球道場 | 動画で学べる野球練習ドリル集",
  description:
    "基本練習から投球・打撃・守備・走塁・戦略まで、カテゴリ別の練習ドリルを動画付きで紹介。すべてのレベルの選手と指導者のための野球技術向上サイト。",
  manifest: "/manifest.json",
  openGraph: {
    title: "野球道場 | 動画で学べる野球練習ドリル集",
    description:
      "基本練習から投球・打撃・守備・走塁・戦略まで、カテゴリ別の練習ドリルを動画付きで紹介。",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "野球道場",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "野球道場 | 動画で学べる野球練習ドリル集",
    description:
      "基本練習から投球・打撃・守備・走塁・戦略まで、カテゴリ別の練習ドリルを動画付きで紹介。",
    images: ["/og-image.png"],
  },
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-white focus:rounded"
        >
          メインコンテンツへスキップ
        </a>
        <ThemeProvider>
          <FuriganaProvider>
            <FavoritesProvider>
              <Header />
              <main id="main-content" className="flex-1">{children}</main>
              <Footer />
            </FavoritesProvider>
          </FuriganaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
