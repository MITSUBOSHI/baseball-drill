"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/types/quiz";
import { RuleExplanation } from "./RuleExplanation";
import { FuriganaText } from "./FuriganaText";

interface AnswerRecord {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
}

export function QuizResult({
  questions,
  answers,
  onRestart,
  onBackToSettings,
}: {
  questions: QuizQuestion[];
  answers: AnswerRecord[];
  onRestart: () => void;
  onBackToSettings: () => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const total = answers.length;
  const percent = Math.round((correctCount / total) * 100);

  let message: string;
  if (percent === 100) message = "パーフェクト！";
  else if (percent >= 80) message = "素晴らしい！";
  else if (percent >= 60) message = "よくできました！";
  else if (percent >= 40) message = "もう少し！";
  else message = "次はがんばろう！";

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="text-6xl font-bold text-indigo-600 dark:text-indigo-400">
          {percent}%
        </div>
        <p className="text-xl font-semibold">
          {total}問中 {correctCount}問正解
        </p>
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
        >
          もう一度
        </button>
        <button
          type="button"
          onClick={onBackToSettings}
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors"
        >
          設定に戻る
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">回答一覧</h3>
        {questions.map((q, i) => {
          const answer = answers[i];
          const isExpanded = expandedId === q.id;

          return (
            <div
              key={q.id}
              className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() =>
                  setExpandedId(isExpanded ? null : q.id)
                }
              >
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    answer.isCorrect ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {answer.isCorrect ? "\u2713" : "\u2717"}
                </span>
                <span className="flex-1 text-sm truncate">
                  <FuriganaText text={q.question} />
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`w-4 h-4 flex-shrink-0 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      あなたの回答：
                    </span>{" "}
                    <span
                      className={
                        answer.isCorrect
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {q.choices[answer.selectedIndex]}
                    </span>
                  </div>
                  {!answer.isCorrect && (
                    <div className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        正解：
                      </span>{" "}
                      <span className="text-green-600 dark:text-green-400">
                        {q.choices[q.correctIndex]}
                      </span>
                    </div>
                  )}
                  <RuleExplanation
                    ruleNumber={q.ruleNumber}
                    originalRuleText={q.originalRuleText}
                    japaneseTranslation={q.japaneseTranslation}
                    explanation={q.explanation}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
