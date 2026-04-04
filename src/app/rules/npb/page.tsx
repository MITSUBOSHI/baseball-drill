"use client";

import Link from "next/link";
import { FuriganaText } from "@/components/FuriganaText";

export default function NpbRulesQuizPage() {
  return (
    <div>
      <section className="bg-slate-900 text-white py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-slate-400 mb-4">
            <Link href="/rules" className="hover:text-white transition-colors">
              <FuriganaText text="ルールクイズ" />
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">NPB</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            <FuriganaText text="NPBルールクイズ" />
          </h1>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-6xl mb-6">&#128679;</div>
        <h2 className="text-xl font-semibold mb-3">
          <FuriganaText text="準備中" />
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          <FuriganaText text="NPBの公認野球規則に基づくクイズは現在準備中です。近日公開予定ですので、お楽しみに！" />
        </p>
        <Link
          href="/rules"
          className="inline-flex px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
        >
          <FuriganaText text="ルールクイズに戻る" />
        </Link>
      </section>
    </div>
  );
}
