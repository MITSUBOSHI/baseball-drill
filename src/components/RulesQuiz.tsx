"use client";

import { useState, useCallback, type ReactNode } from "react";
import type { AnswerRecord, QuizQuestion as QuizQuestionType, RuleSection, QuizDifficulty } from "@/types/quiz";
import { RULE_SECTION_LABELS } from "@/types/quiz";
import { getFilteredQuestions, shuffleQuestions } from "@/lib/quiz";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResult } from "./QuizResult";
import { FuriganaText } from "./FuriganaText";

type Phase = "settings" | "active" | "result";

const QUESTION_COUNTS = [10, 20] as const;
const DIFFICULTY_OPTIONS: { value: QuizDifficulty | "all"; label: string }[] = [
  { value: "all", label: "全て" },
  { value: "easy", label: "かんたん" },
  { value: "normal", label: "ふつう" },
  { value: "hard", label: "むずかしい" },
];

function questionPool(
  section: RuleSection | "all",
  difficulty: QuizDifficulty | "all"
): QuizQuestionType[] {
  return getFilteredQuestions(
    section === "all" ? undefined : section,
    difficulty === "all" ? undefined : difficulty
  );
}

function OptionButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
        active
          ? "bg-indigo-600 text-white border-indigo-600"
          : "border-gray-300 dark:border-gray-600 hover:border-indigo-400"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function RulesQuiz() {
  const [phase, setPhase] = useState<Phase>("settings");
  const [section, setSection] = useState<RuleSection | "all">("all");
  const [difficulty, setDifficulty] = useState<QuizDifficulty | "all">("all");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [questions, setQuestions] = useState<QuizQuestionType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const startQuiz = useCallback(() => {
    const selected = shuffleQuestions(questionPool(section, difficulty), questionCount);
    if (selected.length === 0) return;
    setQuestions(selected);
    setCurrentIndex(0);
    setAnswers([]);
    setPhase("active");
  }, [section, difficulty, questionCount]);

  const handleAnswer = useCallback(
    (selectedIndex: number, isCorrect: boolean) => {
      const q = questions[currentIndex];
      setAnswers((prev) => [
        ...prev,
        {
          questionId: q.id,
          selectedIndex,
          isCorrect,
        },
      ]);
    },
    [questions, currentIndex]
  );

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setPhase("result");
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, questions.length]);

  const handleBackToSettings = useCallback(() => {
    setPhase("settings");
  }, []);

  const availableCount = questionPool(section, difficulty).length;

  if (phase === "settings") {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-400">
            <FuriganaText text="セクション" />
          </h3>
          <div className="flex flex-wrap gap-2">
            <OptionButton active={section === "all"} onClick={() => setSection("all")}>
              全セクション
            </OptionButton>
            {(Object.keys(RULE_SECTION_LABELS) as RuleSection[]).map((s) => (
              <OptionButton key={s} active={section === s} onClick={() => setSection(s)}>
                <FuriganaText text={RULE_SECTION_LABELS[s].ja} />
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-400">
            <FuriganaText text="難易度" />
          </h3>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTY_OPTIONS.map((opt) => (
              <OptionButton
                key={opt.value}
                active={difficulty === opt.value}
                onClick={() => setDifficulty(opt.value)}
              >
                {opt.label}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-400">
            <FuriganaText text="問題数" />
          </h3>
          <div className="flex flex-wrap gap-2">
            {QUESTION_COUNTS.map((count) => (
              <OptionButton
                key={count}
                active={questionCount === count}
                onClick={() => setQuestionCount(count)}
              >
                {count}問
              </OptionButton>
            ))}
            <OptionButton active={questionCount === 0} onClick={() => setQuestionCount(0)}>
              全問（{availableCount}問）
            </OptionButton>
          </div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          出題可能な問題数：{availableCount}問
        </div>

        <button
          type="button"
          onClick={startQuiz}
          disabled={availableCount === 0}
          className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
        >
          <FuriganaText text="クイズを始める" />
        </button>
      </div>
    );
  }

  if (phase === "active" && questions.length > 0) {
    return (
      <div>
        <QuizProgress current={currentIndex + 1} total={questions.length} />
        <QuizQuestion
          key={questions[currentIndex].id}
          question={questions[currentIndex]}
          onNext={handleNext}
          onAnswer={handleAnswer}
          isLast={currentIndex + 1 >= questions.length}
        />
      </div>
    );
  }

  if (phase === "result") {
    return (
      <QuizResult
        questions={questions}
        answers={answers}
        onRestart={startQuiz}
        onBackToSettings={handleBackToSettings}
      />
    );
  }

  return null;
}
