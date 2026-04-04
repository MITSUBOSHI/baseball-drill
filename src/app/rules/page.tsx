"use client";

import Link from "next/link";
import { FuriganaText } from "@/components/FuriganaText";

export default function RulesPage() {
  return (
    <div>
      <section className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            <FuriganaText text="ルールクイズ" />
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            <FuriganaText text="野球の公式ルールをクイズで学ぼう" />
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link
            href="/rules/mlb"
            className="group block rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="h-1.5 bg-indigo-500" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">&#9918;</span>
                <h2 className="text-lg font-semibold group-hover:text-indigo-500 transition-colors">
                  MLB
                </h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <FuriganaText text="MLB公式野球規則（2025年版）に基づくクイズ。原文と日本語訳つき。" />
              </p>
            </div>
          </Link>

          <div className="relative block rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden opacity-60">
            <div className="h-1.5 bg-rose-500" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">&#127471;&#127477;</span>
                <h2 className="text-lg font-semibold">NPB</h2>
                <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                  準備中
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <FuriganaText text="日本プロ野球の公認野球規則に基づくクイズ（近日公開予定）" />
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
