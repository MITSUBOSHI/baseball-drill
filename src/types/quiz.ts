export type RulesLeague = "mlb" | "npb";

export type RuleSection =
  | "1.00"
  | "2.00"
  | "3.00"
  | "4.00"
  | "5.00"
  | "6.00"
  | "7.00"
  | "8.00"
  | "9.00";

export type QuizDifficulty = "easy" | "normal" | "hard";

export interface QuizQuestion {
  id: string;
  ruleSection: RuleSection;
  ruleNumber: string;
  difficulty: QuizDifficulty;
  question: string;
  choices: [string, string, string, string];
  correctIndex: number;
  originalRuleText: string;
  japaneseTranslation: string;
  explanation?: string;
}

export interface QuizResult {
  totalQuestions: number;
  correctCount: number;
  answers: {
    questionId: string;
    selectedIndex: number;
    isCorrect: boolean;
  }[];
}

export const RULE_SECTION_LABELS: Record<RuleSection, { en: string; ja: string }> = {
  "1.00": { en: "OBJECTIVES OF THE GAME", ja: "試合の目的" },
  "2.00": { en: "THE PLAYING FIELD", ja: "競技場" },
  "3.00": { en: "EQUIPMENT AND UNIFORMS", ja: "用具とユニフォーム" },
  "4.00": { en: "GAME PRELIMINARIES", ja: "試合の準備" },
  "5.00": { en: "PLAYING THE GAME", ja: "試合の進行" },
  "6.00": { en: "IMPROPER PLAY, ILLEGAL ACTION, AND MISCONDUCT", ja: "反則行為" },
  "7.00": { en: "ENDING THE GAME", ja: "試合の終了" },
  "8.00": { en: "THE UMPIRE", ja: "審判員" },
  "9.00": { en: "THE OFFICIAL SCORER", ja: "公式記録員" },
};

export const LEAGUE_INFO: Record<RulesLeague, { name: string; description: string }> = {
  mlb: {
    name: "MLB",
    description: "MLB公式野球規則（2025年版）に基づくクイズ",
  },
  npb: {
    name: "NPB",
    description: "日本プロ野球の公認野球規則に基づくクイズ（準備中）",
  },
};

export const MLB_RULES_PDF_URL =
  "https://mktg.mlbstatic.com/mlb/official-information/2025-official-baseball-rules.pdf";
