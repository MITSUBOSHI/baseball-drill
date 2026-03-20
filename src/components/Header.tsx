"use client";

import Link from "next/link";
import { FuriganaToggle } from "./FuriganaToggle";
import { FuriganaText } from "./FuriganaText";

export function Header() {
  return (
    <header className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <FuriganaText text="野球道場" />
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex gap-6 text-sm">
            <Link
              href="/drills/basics"
              className="hover:text-orange-400 transition-colors"
            >
              <FuriganaText text="基本練習" />
            </Link>
            <Link
              href="/drills/pitching"
              className="hover:text-orange-400 transition-colors"
            >
              <FuriganaText text="投球" />
            </Link>
            <Link
              href="/drills/batting"
              className="hover:text-orange-400 transition-colors"
            >
              <FuriganaText text="打撃" />
            </Link>
            <Link
              href="/drills/fielding"
              className="hover:text-orange-400 transition-colors"
            >
              <FuriganaText text="守備" />
            </Link>
            <Link
              href="/drills/strategy"
              className="hover:text-orange-400 transition-colors"
            >
              <FuriganaText text="戦略" />
            </Link>
          </nav>
          <FuriganaToggle />
        </div>
      </div>
    </header>
  );
}
