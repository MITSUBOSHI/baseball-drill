import Link from "next/link";

const courses = [
  {
    label: "数字で観る",
    title: "セイバーメトリクス入門",
    description: "打率の先へ。出塁率・長打率・OPSを、NPBの試合を想定したケースで理解します。",
    meta: "全12レッスン · 初級",
    href: "/learn",
    color: "mint",
    icon: "chart",
  },
  {
    label: "プレーを観る",
    title: "投球・打撃の技術",
    description: "配球、リリース、打球角度。中継を見る目が変わる技術の要点を学びます。",
    meta: "全18レッスン · 初級〜中級",
    href: "/drills",
    color: "blue",
    icon: "ball",
  },
  {
    label: "采配を読む",
    title: "野球戦術とゲーム理論",
    description: "バント、継投、守備シフト。その一手が得点期待値をどう変えるか考えます。",
    meta: "全10レッスン · 中級",
    href: "/drills/strategy",
    color: "orange",
    icon: "diamond",
  },
] as const;

const topics = ["OPS", "得点期待値", "配球", "守備シフト", "WAR", "走塁判断"];

function CourseIcon({ type }: { type: string }) {
  if (type === "chart") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 36V25m10 11V17m10 19V11m9 28H7" /></svg>;
  if (type === "ball") return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="16"/><path d="M14 12c5 5 5 19 0 24M34 12c-5 5-5 19 0 24M13 18l4 1m-4 6 4 1m18-8-4 1m4 6-4 1" /></svg>;
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="m24 7 17 17-17 17L7 24 24 7Z"/><circle cx="24" cy="24" r="3"/><path d="M24 10v7m14 7h-7M24 38v-7M10 24h7" /></svg>;
}

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-shell">
        <div className="hero-copy">
          <div className="eyebrow"><span /> BASEBALL, DECODED.</div>
          <h1>野球がわかると、<br/><em>観戦はもっと面白い。</em></h1>
          <p>データ、技術、戦術。NPBを題材に、野球の「なぜ？」を<br className="desktop-only"/>やさしく、深く学べるラーニングアプリ。</p>
          <div className="hero-actions">
            <Link href="/learn" className="button primary">無料で学びはじめる <span>→</span></Link>
            <Link href="/stats-lab" className="text-link">指標を試してみる <span>↗</span></Link>
          </div>
          <div className="hero-note"><span>✓</span> 登録不要　<span>✓</span> すべての基礎コンテンツが無料</div>
        </div>
        <div className="score-visual" aria-label="架空の試合データを使った分析カード">
          <div className="stadium-lines" />
          <div className="score-card">
            <div className="score-top"><span>LIVE ANALYSIS</span><b>7回裏</b></div>
            <div className="matchup">
              <div><small>ビジター</small><strong>3</strong></div><span>—</span><div><small>ホーム</small><strong>3</strong></div>
            </div>
            <div className="situation"><span className="base-diamond active"/><span className="base-diamond active"/><span className="base-diamond"/><b>1 OUT</b></div>
            <div className="decision-card">
              <div><span className="pulse"/><small>この場面、あなたなら？</small></div>
              <strong>無死ではなく1死一・二塁。送りバントの価値は？</strong>
              <div className="expectancy"><span>強攻</span><i><b style={{width:"68%"}}/></i><em>0.91</em></div>
              <div className="expectancy muted"><span>バント</span><i><b style={{width:"52%"}}/></i><em>0.69</em></div>
              <small className="caption">得点期待値（架空データ）</small>
            </div>
          </div>
          <div className="floating-stat stat-one"><small>打者 OPS</small><b>.842</b><span>リーグ平均より +12%</span></div>
          <div className="floating-stat stat-two"><small>勝利確率</small><b>58<sup>%</sup></b><span>▲ 7.4%</span></div>
        </div>
      </section>

      <section className="topic-strip" aria-label="学べるテーマ">
        <div><span>このアプリで学べること</span>{topics.map((topic) => <b key={topic}>{topic}</b>)}</div>
      </section>

      <section className="section-shell course-section">
        <div className="section-heading">
          <div><span className="kicker">LEARNING PATH</span><h2>気になるテーマから、<br/>自分のペースで。</h2></div>
          <p>難しい数式や専門用語は後回し。<br/>実際のプレーをイメージしながら、一歩ずつ理解できます。</p>
        </div>
        <div className="course-grid">
          {courses.map((course, index) => (
            <Link href={course.href} className={`course-card ${course.color}`} key={course.title}>
              <div className="course-number">0{index + 1}</div>
              <div className="course-icon"><CourseIcon type={course.icon}/></div>
              <span className="course-label">{course.label}</span>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-footer"><small>{course.meta}</small><span>→</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell daily-card">
        <div className="daily-date"><b>11</b><span>JUL<br/>2026</span></div>
        <div className="daily-copy"><span>TODAY&apos;S QUESTION</span><h2>「出塁率」は、なぜ打率より<br className="desktop-only"/>得点との関係が強い？</h2><p>3分でわかる、今日の野球クイズ。</p></div>
        <Link href="/learn#quiz" className="round-link" aria-label="今日の問題に挑戦">→</Link>
      </section>
    </div>
  );
}
