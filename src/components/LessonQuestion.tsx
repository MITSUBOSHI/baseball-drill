"use client";
import { useState } from "react";

export function LessonQuestion({
  question,
  choices,
  correctIndex,
  explanation,
}: {
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section className="lesson-question">
      <span className="kicker">QUICK CHECK</span>
      <h2>{question}</h2>
      <div>
        {choices.map((choice, index) => (
          <button
            type="button"
            key={choice}
            aria-pressed={selected === index}
            className={selected === index ? (index === correctIndex ? "correct" : "wrong") : ""}
            onClick={() => setSelected(index)}
          >
            <b>{String.fromCharCode(65 + index)}</b>{choice}
          </button>
        ))}
      </div>
      {selected !== null && (
        <p role="status">
          <strong>{selected === correctIndex ? "正解です。" : `正解は「${choices[correctIndex]}」です。`}</strong>
          {explanation}
        </p>
      )}
    </section>
  );
}
