"use client";

import { useState } from "react";
import type { QuizQuestion as QuizQuestionType } from "@/types/quiz";
import { RuleExplanation } from "./RuleExplanation";
import { FuriganaText } from "./FuriganaText";

export function QuizQuestion({
  question,
  onNext,
  onAnswer,
  isLast,
}: {
  question: QuizQuestionType;
  onNext: () => void;
  onAnswer: (selectedIndex: number, isCorrect: boolean) => void;
  isLast: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === question.correctIndex;

  function handleSelect(index: number) {
    if (answered) return;
    setSelected(index);
    onAnswer(index, index === question.correctIndex);
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold leading-relaxed">
        <FuriganaText text={question.question} />
      </h3>

      <div className="space-y-2">
        {question.choices.map((choice, i) => {
          let style =
            "w-full text-left px-4 py-3 rounded-lg border transition-colors text-sm leading-relaxed";

          if (!answered) {
            style +=
              " border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950 cursor-pointer";
          } else if (i === question.correctIndex) {
            style +=
              " border-green-500 bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200";
          } else if (i === selected) {
            style +=
              " border-red-500 bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200";
          } else {
            style +=
              " border-gray-200 dark:border-gray-700 opacity-50";
          }

          return (
            <button
              key={i}
              type="button"
              className={style}
              onClick={() => handleSelect(i)}
              disabled={answered}
            >
              <span className="font-medium mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              <FuriganaText text={choice} />
            </button>
          );
        })}
      </div>

      {answered && (
        <>
          <div
            className={`text-sm font-semibold ${
              isCorrect
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {isCorrect ? "正解！" : "不正解..."}
          </div>

          <RuleExplanation
            ruleNumber={question.ruleNumber}
            originalRuleText={question.originalRuleText}
            japaneseTranslation={question.japaneseTranslation}
            explanation={question.explanation}
          />

          <button
            type="button"
            onClick={onNext}
            className="w-full mt-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            {isLast ? "結果を見る" : "次の問題へ"}
          </button>
        </>
      )}
    </div>
  );
}
