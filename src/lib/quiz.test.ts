import { getAllQuestions, getFilteredQuestions, shuffleQuestions } from "./quiz";
import { RULE_SECTION_LABELS } from "@/types/quiz";
import type { RuleSection } from "@/types/quiz";

describe("クイズデータの整合性", () => {
  it("全問題のIDが一意である", () => {
    const ids = getAllQuestions().map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("全問題が4つの選択肢と有効なcorrectIndexを持つ", () => {
    for (const q of getAllQuestions()) {
      expect(q.choices).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThanOrEqual(3);
    }
  });

  it("全セクションに最低1問ある（フィルタで0問にならない）", () => {
    const sections = Object.keys(RULE_SECTION_LABELS) as RuleSection[];
    for (const section of sections) {
      expect(getFilteredQuestions(section).length).toBeGreaterThan(0);
    }
  });
});

describe("getFilteredQuestions", () => {
  it("セクションと難易度で絞り込める", () => {
    const filtered = getFilteredQuestions("5.00", "normal");
    expect(filtered.length).toBeGreaterThan(0);
    for (const q of filtered) {
      expect(q.ruleSection).toBe("5.00");
      expect(q.difficulty).toBe("normal");
    }
  });

  it("引数なしなら全問題を返す", () => {
    expect(getFilteredQuestions()).toHaveLength(getAllQuestions().length);
  });
});

describe("shuffleQuestions", () => {
  it("countで指定した問題数を返す", () => {
    expect(shuffleQuestions(getAllQuestions(), 10)).toHaveLength(10);
  });

  it("countが0または未指定なら全問を返す", () => {
    const all = getAllQuestions();
    expect(shuffleQuestions(all, 0)).toHaveLength(all.length);
    expect(shuffleQuestions(all)).toHaveLength(all.length);
  });

  it("選択肢をシャッフルしてもcorrectIndexが正解の選択肢を指し続ける", () => {
    const all = getAllQuestions();
    const correctById = new Map(
      all.map((q) => [q.id, q.choices[q.correctIndex]])
    );
    // シャッフルはランダムなので複数回検証する
    for (let i = 0; i < 20; i++) {
      for (const q of shuffleQuestions(all)) {
        expect(q.choices[q.correctIndex]).toBe(correctById.get(q.id));
      }
    }
  });

  it("元の問題オブジェクトを変更しない", () => {
    const all = getAllQuestions();
    const original = JSON.stringify(all);
    shuffleQuestions(all, 5);
    expect(JSON.stringify(all)).toBe(original);
  });
});
