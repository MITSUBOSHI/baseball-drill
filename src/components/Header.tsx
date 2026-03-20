"use client";

import { useState } from "react";
import Link from "next/link";
import { FuriganaToggle } from "./FuriganaToggle";
import { FuriganaText } from "./FuriganaText";

const navLinks = [
  { href: "/drills/basics", label: "基本練習" },
  { href: "/drills/pitching", label: "投球" },
  { href: "/drills/batting", label: "打撃" },
  { href: "/drills/fielding", label: "守備" },
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
          <FuriganaToggle />
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
