export type Category = "basics" | "strategy" | "pitching" | "batting" | "fielding";

export type Level = "beginner" | "intermediate" | "advanced";

export type FieldingPosition =
  | "catcher"
  | "infield"
  | "outfield"
  | "all";

export interface Drill {
  id: string;
  title: string;
  category: Category;
  level: Level;
  position?: FieldingPosition;
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
