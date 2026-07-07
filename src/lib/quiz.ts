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

// Fisher-Yates。sort(() => Math.random() - 0.5) は偏るため使わない
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// 選択肢の並びも問題ごとにシャッフルし、correctIndex を並び替え後の位置に付け替える
function shuffleChoices(question: QuizQuestion): QuizQuestion {
  const order = shuffle([0, 1, 2, 3]);
  return {
    ...question,
    choices: order.map((i) => question.choices[i]) as QuizQuestion["choices"],
    correctIndex: order.indexOf(question.correctIndex),
  };
}

export function shuffleQuestions(
  qs: QuizQuestion[],
  count?: number
): QuizQuestion[] {
  const shuffled = shuffle(qs);
  const selected = count ? shuffled.slice(0, count) : shuffled;
  return selected.map(shuffleChoices);
}
