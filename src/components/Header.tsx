"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/learn", label: "学ぶ" },
  { href: "/stats-lab", label: "指標ラボ" },
  { href: "/drills", label: "技術ドリル" },
  { href: "/rules", label: "ルール" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="BALLIQ ホーム">
          <span className="brand-mark"><i/><i/><i/></span><b>BALL<span>IQ</span></b><small>BASEBALL INTELLIGENCE</small>
        </Link>
        <nav className={open ? "main-nav open" : "main-nav"} aria-label="メインナビゲーション">
          {navLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link href="/search" className="search-link" aria-label="検索"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg></Link>
          <Link href="/learn" className="header-cta">学習をはじめる</Link>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="メニュー" aria-expanded={open}><span/><span/></button>
        </div>
      </div>
    </header>
  );
}
