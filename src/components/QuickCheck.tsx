"use client";
import { useState } from "react";
import Link from "next/link";

export function QuickCheck() {
  const [answer, setAnswer] = useState<"a" | "b" | null>(null);
  const correct = answer === "b";
  return <div className="mini-quiz" id="quiz">
    <div><span>QUICK CHECK</span><h2>打率が同じ .280 の二人。<br/>より得点に貢献しそうなのは？</h2></div>
    <div className="player-choice" aria-label="回答を選択">
      <button type="button" className={answer === "a" ? "selected wrong" : ""} aria-pressed={answer === "a"} onClick={() => setAnswer("a")}><b>A</b><span>四球が少なく<br/>単打が多い打者</span></button>
      <button type="button" className={answer === "b" ? "selected correct" : ""} aria-pressed={answer === "b"} onClick={() => setAnswer("b")}><b>B</b><span>四球と長打が<br/>多い打者</span></button>
    </div>
    {answer === null ? <p>ヒント：アウトにならないことと、より多くの塁を進むことを考えよう。</p> : <div className={correct ? "quiz-feedback correct" : "quiz-feedback wrong"} role="status" aria-live="polite"><strong>{correct ? "正解！ Bの打者です。" : "惜しい！ 正解はBです。"}</strong><p>四球はアウトを増やさず、長打は走者をより遠くへ進めます。同じ打率でも、出塁率と長打率が高い打者のほうが得点につながりやすいと考えられます。</p>{correct && <Link href="/learn/obp" className="next-lesson-link">次のレッスン：出塁率へ <span>→</span></Link>}<Link href="/stats-lab" className="side-trip-link">寄り道：OPSを計算する ↗</Link></div>}
  </div>;
}
