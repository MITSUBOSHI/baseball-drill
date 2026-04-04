"use client";

import Link from "next/link";
import { RulesQuiz } from "@/components/RulesQuiz";
import { FuriganaText } from "@/components/FuriganaText";

export default function MlbRulesQuizPage() {
  return (
    <div>
      <section className="bg-slate-900 text-white py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-slate-400 mb-4">
            <Link href="/rules" className="hover:text-white transition-colors">
              <FuriganaText text="ルールクイズ" />
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">MLB</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            <FuriganaText text="MLBルールクイズ" />
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            <FuriganaText text="MLB公式野球規則（2025年版）に基づく4択クイズ" />
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RulesQuiz />
      </section>
    </div>
  );
}
