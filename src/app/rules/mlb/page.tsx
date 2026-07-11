"use client";

import Link from "next/link";
import { RulesQuiz } from "@/components/RulesQuiz";
import { FuriganaText } from "@/components/FuriganaText";

export default function MlbRulesQuizPage() {
  return (
    <div className="quiz-page inner-page">
      <section className="page-hero compact">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-slate-400 mb-4">
            <Link href="/rules" className="hover:text-white transition-colors">
              <FuriganaText text="ルールクイズ" />
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">MLB</span>
          </nav>
          <span className="kicker">RULE BOOK CHALLENGE</span><h1>
            <FuriganaText text="MLBルールクイズ" />
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            <FuriganaText text="MLB公式野球規則（2025年版）に基づく4択クイズ" />
          </p>
        </div>
      </section>

      <section className="quiz-shell">
        <RulesQuiz />
      </section>
    </div>
  );
}
