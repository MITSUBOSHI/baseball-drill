import Link from "next/link";
import { QuickCheck } from "@/components/QuickCheck";

const lessons = [
  ["01", "打率だけでは見えないこと", "打率の長所と弱点", "5 min", true],
  ["02", "出塁はアウトを減らすこと", "出塁率（OBP）の考え方", "7 min", false],
  ["03", "長打の価値を数える", "長打率（SLG）の仕組み", "6 min", false],
  ["04", "OPSで打者を比べてみる", "2つの力を一つの数字に", "8 min", false],
] as const;

export default function LearnPage() {
  return <div className="inner-page learn-page">
    <section className="page-hero"><span className="kicker">COURSE 01 · SABERMETRICS</span><h1>セイバーメトリクス<br/><em>はじめの一歩。</em></h1><p>「打つ人」から「得点を生み出す人」へ。<br/>数字の見方を少し変えて、選手の価値を考えよう。</p><div className="progress-block"><div><span>コース進捗</span><b>1 / 12</b></div><i><b/></i></div></section>
    <section className="content-shell lessons-section">
      <div className="lesson-intro"><span>CHAPTER 1</span><div><h2>打者をどう評価する？</h2><p>まずは、よく知っている「打率」から。<br/>見慣れた数字を疑うところから始めます。</p></div></div>
      <div className="lesson-list">{lessons.map(([n, title, desc, time, active]) => <article className={active ? "lesson-row active" : "lesson-row"} key={n}><span className="lesson-num">{n}</span><div><h3>{title}</h3><p>{desc}</p></div><small>{time}</small>{active ? <Link href="#quiz" aria-label={`${title}を開始`}>→</Link> : n === "02" ? <Link href="/learn/obp" aria-label={`${title}へ進む`}>→</Link> : <button aria-label={`${title}は準備中`}>○</button>}</article>)}</div>
      <QuickCheck />
    </section>
  </div>;
}
