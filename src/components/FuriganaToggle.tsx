"use client";

import { useFurigana } from "./FuriganaProvider";

export function FuriganaToggle() {
  const { furigana, toggleFurigana } = useFurigana();

  return (
    <button
      onClick={toggleFurigana}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
        furigana
          ? "bg-orange-500 text-white"
          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
      }`}
      aria-label={furigana ? "ふりがなをオフにする" : "ふりがなをオンにする"}
    >
      {furigana ? "ふりがな ON" : "ふりがな OFF"}
    </button>
  );
}
