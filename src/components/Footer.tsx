"use client";

import { FuriganaText } from "./FuriganaText";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
        <p className="font-medium text-white mb-1">
          <FuriganaText text="野球道場" />
        </p>
        <p>
          <FuriganaText text="すべてのプレーに、確かな技術を。" />
        </p>
      </div>
    </footer>
  );
}
