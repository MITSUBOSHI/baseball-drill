import { annotateFurigana } from "./furigana-dict";
import drillsData from "@/data/drills.json";
import quizData from "@/data/mlb-rules-quiz.json";
import {
  CATEGORIES,
  CATEGORY_LONG_DESCRIPTIONS,
  LEVEL_LABELS,
  POSITION_LABELS,
  PITCHING_TYPE_LABELS,
  BATTING_TYPE_LABELS,
} from "@/types/drill";
import type { Drill } from "@/types/drill";
import { RULE_SECTION_LABELS, LEAGUE_INFO } from "@/types/quiz";
import type { QuizQuestion } from "@/types/quiz";

const drills = drillsData as Drill[];
const quizQuestions = quizData as QuizQuestion[];

// 漢字判定（CJK統合漢字 + CJK統合漢字拡張A/B）
function isKanji(ch: string): boolean {
  const code = ch.codePointAt(0)!;
  return (
    (code >= 0x4e00 && code <= 0x9fff) ||
    (code >= 0x3400 && code <= 0x4dbf) ||
    (code >= 0x20000 && code <= 0x2a6df)
  );
}

// テキスト中でふりがなが付かない漢字を抽出する
function findUncoveredKanji(text: string): string[] {
  const segments = annotateFurigana(text);
  const uncovered: string[] = [];
  for (const seg of segments) {
    if (seg.type === "text") {
      for (const ch of seg.value) {
        if (isKanji(ch)) {
          uncovered.push(ch);
        }
      }
    }
  }
  return uncovered;
}

// FuriganaText に渡されるすべてのテキストを収集
function collectAllTexts(): string[] {
  const texts: string[] = [];

  // ドリルデータ
  for (const drill of drills) {
    texts.push(drill.title);
    texts.push(drill.description);
    texts.push(...drill.steps);
    texts.push(...drill.points);
  }

  // カテゴリ情報
  for (const cat of CATEGORIES) {
    texts.push(cat.name);
    texts.push(cat.description);
    texts.push(`${cat.name}の練習ドリル`);
  }
  texts.push(...Object.values(CATEGORY_LONG_DESCRIPTIONS));

  // クイズデータ（設問・選択肢・日本語訳・解説がFuriganaTextで表示される）
  for (const q of quizQuestions) {
    texts.push(q.question);
    texts.push(...q.choices);
    texts.push(q.japaneseTranslation);
    if (q.explanation) texts.push(q.explanation);
  }

  // クイズ関連のラベル
  for (const label of Object.values(RULE_SECTION_LABELS)) {
    texts.push(label.ja);
  }
  for (const info of Object.values(LEAGUE_INFO)) {
    texts.push(info.description);
  }

  // ラベル
  texts.push(...Object.values(LEVEL_LABELS));
  texts.push(...Object.values(POSITION_LABELS));
  texts.push(...Object.values(PITCHING_TYPE_LABELS));
  texts.push(...Object.values(BATTING_TYPE_LABELS));

  // UI固定テキスト
  texts.push("野球道場");
  texts.push("すべてのプレーに、確かな技術を。");
  texts.push("基本から応用まで、動画で学べる野球練習ドリル集");
  texts.push("カテゴリから探す");
  texts.push("該当するドリルがありません");
  texts.push("お気に入りドリル");
  texts.push("お気に入りのドリルがありません");
  texts.push("ドリル検索");
  texts.push("練習手順");
  texts.push("所要時間");
  texts.push("人数");

  // クイズ・ルール関連のUI固定テキスト
  texts.push("ルールを学ぶ");
  texts.push("ルールクイズ");
  texts.push("ルールクイズに戻る");
  texts.push("野球の公式ルールをクイズで学ぼう");
  texts.push("MLBルールクイズ");
  texts.push("NPBルールクイズ");
  texts.push("MLB公式野球規則（2025年版）に基づく4択クイズ");
  texts.push("MLB公式野球規則（2025年版）に基づくクイズ。原文と日本語訳つき。");
  texts.push("MLB公式野球規則（2025年版）を4択クイズで学ぼう。原文と日本語訳つき。");
  texts.push("日本プロ野球の公認野球規則に基づくクイズ（近日公開予定）");
  texts.push("NPBの公認野球規則に基づくクイズは現在準備中です。近日公開予定ですので、お楽しみに！");
  texts.push("準備中");
  texts.push("セクション");
  texts.push("難易度");
  texts.push("問題数");
  texts.push("クイズを始める");

  return texts;
}

describe("ふりがな辞書カバレッジ", () => {
  it("すべてのテキスト中の漢字にふりがなが付いている", () => {
    const texts = collectAllTexts();
    const uncoveredMap = new Map<string, Set<string>>();

    for (const text of texts) {
      const uncovered = findUncoveredKanji(text);
      for (const kanji of uncovered) {
        if (!uncoveredMap.has(kanji)) {
          uncoveredMap.set(kanji, new Set());
        }
        uncoveredMap.get(kanji)!.add(text);
      }
    }

    if (uncoveredMap.size > 0) {
      const report = Array.from(uncoveredMap.entries())
        .map(([kanji, contexts]) => {
          const examples = Array.from(contexts).slice(0, 3);
          return `  「${kanji}」← ${examples.map((t) => `"${t.slice(0, 30)}"`).join(", ")}`;
        })
        .join("\n");
      throw new Error(
        `ふりがな未対応の漢字が ${uncoveredMap.size} 件あります:\n${report}`
      );
    }
  });
});
