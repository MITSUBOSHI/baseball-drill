import Link from "next/link";
import { getAllDrills, getDrillsByCategory } from "@/lib/drills";
import { CATEGORIES } from "@/types/drill";

const categoryMeta = {
  basics: { number: "01", label: "FOUNDATION", lead: "すべてのプレーの土台をつくる", glyph: "◇" },
  pitching: { number: "02", label: "PITCHING", lead: "再現性のある投球動作を身につける", glyph: "●" },
  batting: { number: "03", label: "BATTING", lead: "強く、確実に捉える技術を磨く", glyph: "↗" },
  fielding: { number: "04", label: "FIELDING", lead: "捕る・投げる・連携するを学ぶ", glyph: "□" },
  running: { number: "05", label: "BASERUNNING", lead: "一つ先の塁を奪う判断を鍛える", glyph: "≫" },
  strategy: { number: "06", label: "STRATEGY", lead: "状況を読み、チームで勝ちに近づく", glyph: "△" },
  training: { number: "07", label: "TRAINING", lead: "野球の動きを支える身体をつくる", glyph: "+" },
} as const;

export default function DrillsPage() {
  return (
    <div className="drills-hub inner-page">
      <section className="page-hero compact">
        <span className="kicker">PRACTICE LIBRARY</span>
        <h1>知ったことを、<br/><em>できることへ。</em></h1>
        <p>{CATEGORIES.length}つのテーマ、{getAllDrills().length}本の動画ドリル。<br/>いま伸ばしたいプレーから始めよう。</p>
      </section>
      <section className="drills-hub-content">
        <div className="hub-intro">
          <div>
            <span className="kicker">CHOOSE YOUR FOCUS</span>
            <h2>何を伸ばしたい？</h2>
          </div>
          <p>レベルやポジションで絞り込みながら、<br/>自分に合う練習を見つけられます。</p>
        </div>
        <div className="category-list">
          {CATEGORIES.map((category) => {
            const meta = categoryMeta[category.id];
            const count = getDrillsByCategory(category.id).length;
            return (
              <Link href={`/drills/${category.id}`} className={`category-row category-${category.id}`} key={category.id}>
                <span className="category-number">{meta.number}</span>
                <div className="category-glyph">{meta.glyph}</div>
                <div className="category-copy">
                  <small>{meta.label}</small>
                  <h3>{category.name}</h3>
                  <p>{meta.lead}</p>
                </div>
                <div className="category-count">
                  <b>{count}</b>
                  <span>DRILLS</span>
                </div>
                <span className="category-arrow">→</span>
              </Link>
            );
          })}
        </div>
        <div className="hub-tools">
          <div>
            <span className="kicker">NOT SURE WHERE TO START?</span>
            <h2>キーワードから探す</h2>
            <p>「送球」「体幹」「変化球」など、課題が決まっているなら横断検索が便利です。</p>
          </div>
          <Link href="/search" className="button primary">ドリルを検索 <span>→</span></Link>
        </div>
      </section>
    </div>
  );
}
