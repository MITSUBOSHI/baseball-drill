export type Category = "basics" | "strategy" | "pitching" | "batting" | "fielding" | "running" | "training";

export type Level = "beginner" | "intermediate" | "advanced";

export type FieldingPosition =
  | "catcher"
  | "infield"
  | "outfield"
  | "all";

export type PitchingType =
  | "form"
  | "control"
  | "breaking"
  | "all";

export type BattingType =
  | "swing"
  | "tee"
  | "live"
  | "all";

export const PITCHING_TYPE_LABELS: Record<PitchingType, string> = {
  form: "フォーム",
  control: "コントロール",
  breaking: "変化球",
  all: "全タイプ",
};

export const BATTING_TYPE_LABELS: Record<BattingType, string> = {
  swing: "スイング",
  tee: "ティー",
  live: "実打",
  all: "全タイプ",
};

export interface Drill {
  id: string;
  title: string;
  category: Category;
  level: Level;
  position?: FieldingPosition;
  pitchingType?: PitchingType;
  battingType?: BattingType;
  description: string;
  steps: string[];
  points: string[];
  youtubeVideoId: string;
  duration: string;
  players: string;
}

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  icon: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "basics",
    name: "基本練習",
    description: "キャッチボール、ランニング、ストレッチなど野球の基礎となる練習",
    icon: "diamond",
  },
  {
    id: "strategy",
    name: "戦略",
    description: "サインプレー、走塁判断、状況別の戦術練習",
    icon: "clipboard",
  },
  {
    id: "pitching",
    name: "投球",
    description: "ピッチングフォーム、変化球、コントロール練習",
    icon: "flame",
  },
  {
    id: "batting",
    name: "打撃",
    description: "バッティングフォーム、ティーバッティング、実打練習",
    icon: "zap",
  },
  {
    id: "fielding",
    name: "守備",
    description: "ポジション別の守備練習、連携プレー、送球練習",
    icon: "shield",
  },
  {
    id: "running",
    name: "走塁",
    description: "ベースランニング、盗塁、走塁判断など走塁技術の練習",
    icon: "runner",
  },
  {
    id: "training",
    name: "筋トレ",
    description: "野球に必要な筋力・体幹・瞬発力を鍛えるトレーニング",
    icon: "dumbbell",
  },
];

export const LEVEL_LABELS: Record<Level, string> = {
  beginner: "初級",
  intermediate: "中級",
  advanced: "上級",
};

export const POSITION_LABELS: Record<FieldingPosition, string> = {
  catcher: "捕手",
  infield: "内野手",
  outfield: "外野手",
  all: "全ポジション",
};
