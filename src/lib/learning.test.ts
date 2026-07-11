import { learningLessons, metricPurposes } from "@/data/learning";

describe("セイバーメトリクス教材", () => {
  test("24レッスンすべてに測定目的と確認問題がある", () => {
    expect(learningLessons).toHaveLength(24);
    for (const lesson of learningLessons) {
      expect(metricPurposes[lesson.slug]).toBeTruthy();
      expect(lesson.choices.length).toBeGreaterThanOrEqual(2);
      expect(lesson.correctIndex).toBeGreaterThanOrEqual(0);
      expect(lesson.correctIndex).toBeLessThan(lesson.choices.length);
      expect(lesson.explanation).toBeTruthy();
    }
  });

  test("slugとレッスン番号が重複しない", () => {
    expect(new Set(learningLessons.map((lesson) => lesson.slug)).size).toBe(24);
    expect(new Set(learningLessons.map((lesson) => lesson.number)).size).toBe(24);
  });
});
