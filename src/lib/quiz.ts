import quizData from "@/data/mlb-rules-quiz.json";
import type { QuizQuestion, RuleSection, QuizDifficulty } from "@/types/quiz";

const questions = quizData as QuizQuestion[];

export function getAllQuestions(): QuizQuestion[] {
  return questions;
}

export function getFilteredQuestions(
  section?: RuleSection,
  difficulty?: QuizDifficulty
): QuizQuestion[] {
  return questions.filter((q) => {
    if (section && q.ruleSection !== section) return false;
    if (difficulty && q.difficulty !== difficulty) return false;
    return true;
  });
}

export function shuffleQuestions(
  qs: QuizQuestion[],
  count?: number
): QuizQuestion[] {
  const shuffled = [...qs].sort(() => Math.random() - 0.5);
  return count ? shuffled.slice(0, count) : shuffled;
}
