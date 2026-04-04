"use client";

import { useState } from "react";
import Link from "next/link";
import { FuriganaToggle } from "./FuriganaToggle";
import { ThemeToggle } from "./ThemeToggle";
import { FuriganaText } from "./FuriganaText";

const navLinks = [
  { href: "/drills/basics", label: "基本練習" },
  { href: "/drills/pitching", label: "投球" },
  { href: "/drills/batting", label: "打撃" },
  { href: "/drills/fielding", label: "守備" },
  { href: "/drills/running", label: "走塁" },
  { href: "/drills/strategy", label: "戦略" },
  { href: "/drills/training", label: "筋トレ" },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <FuriganaText text="野球道場" />
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex gap-6 text-sm">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-orange-400 transition-colors"
              >
                <FuriganaText text={label} />
              </Link>
            ))}
          </nav>
          <Link href="/rules" className="p-1 hover:text-orange-400 transition-colors" aria-label="ルールクイズ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </Link>
          <Link href="/search" className="p-1 hover:text-orange-400 transition-colors" aria-label="検索">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </Link>
          <Link href="/favorites" className="p-1 hover:text-orange-400 transition-colors" aria-label="お気に入り">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </Link>
          <FuriganaToggle />
          <ThemeToggle />
          <button
            type="button"
            className="sm:hidden p-1"
            aria-label="メニューを開く"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="sm:hidden border-t border-slate-700">
          <ul className="flex flex-col">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block px-6 py-3 text-sm hover:bg-slate-800 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <FuriganaText text={label} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
