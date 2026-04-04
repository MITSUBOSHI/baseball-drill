"use client";

import { MLB_RULES_PDF_URL } from "@/types/quiz";
import { FuriganaText } from "./FuriganaText";

export function RuleExplanation({
  ruleNumber,
  originalRuleText,
  japaneseTranslation,
  explanation,
}: {
  ruleNumber: string;
  originalRuleText: string;
  japaneseTranslation: string;
  explanation?: string;
}) {
  return (
    <div className="mt-4 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950 p-4 space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
        <span>Rule {ruleNumber}</span>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-2 border-indigo-300 dark:border-indigo-600 pl-3">
          {originalRuleText}
        </p>
        <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
          <FuriganaText text={japaneseTranslation} />
        </p>
      </div>

      {explanation && (
        <div className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 rounded p-2">
          <FuriganaText text={explanation} />
        </div>
      )}

      <a
        href={MLB_RULES_PDF_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-3 h-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
        MLB公式規則PDF（2025年版）
      </a>
    </div>
  );
}
