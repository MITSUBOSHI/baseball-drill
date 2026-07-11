import Link from "next/link";
import { OpsCalculator } from "@/components/OpsCalculator";

export default function StatsLabPage() {
  return (
    <div className="inner-page">
      <section className="page-hero compact">
        <span className="kicker">STATS LAB</span>
        <h1>数字を触ると、<br/><em>野球が見えてくる。</em></h1>
        <p>成績を入力して、指標が何を表しているか体感しよう。</p>
      </section>
      <section className="content-shell lab-section">
        <div className="lab-heading">
          <div>
            <span>01 / BATTING</span>
            <h2>OPSを計算する</h2>
          </div>
          <p>OPSは「出塁する力」と「長打を打つ力」を足した指標。<br/>同じ打率でも、四球や長打の数で評価が変わります。</p>
        </div>
        <OpsCalculator />
        <div className="formula-row">
          <div>
            <small>STEP 1</small>
            <b>出塁率</b>
            <code>(安打 + 四死球) ÷ (打数 + 四死球 + 犠飛)</code>
          </div>
          <span>＋</span>
          <div>
            <small>STEP 2</small>
            <b>長打率</b>
            <code>塁打 ÷ 打数</code>
          </div>
          <span>＝</span>
          <div className="accent">
            <small>RESULT</small>
            <b>OPS</b>
            <code>得点への貢献をざっくり測る</code>
          </div>
        </div>
        <aside className="learning-note">
          <b>覚えておこう</b>
          <p>OPSは手軽で便利な一方、球場やリーグの得点環境、走塁・守備は考慮しません。選手を一つの数字だけで決めつけず、複数の視点で見るのがセイバーメトリクスの基本です。</p>
        </aside>
        <Link href="/learn" className="button primary">レッスンで詳しく学ぶ <span>→</span></Link>
      </section>
    </div>
  );
}
