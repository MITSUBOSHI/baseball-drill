import Link from "next/link";

export default function ObpLessonPage() {
  return <div className="inner-page lesson-page">
    <section className="page-hero compact"><span className="kicker">COURSE 01 · LESSON 02</span><h1>出塁は、<br/><em>アウトを減らすこと。</em></h1><p>ヒットでなくても、攻撃はつながる。<br/>出塁率が得点と深く関係する理由を考えよう。</p><div className="progress-block"><div><span>コース進捗</span><b>2 / 12</b></div><i><b style={{width:"16.66%"}}/></i></div></section>
    <article className="lesson-article"><nav><Link href="/learn">← コース一覧へ</Link><span>7 MIN</span></nav><span className="kicker">WHY OBP MATTERS</span><h2>野球では、27個のアウトを取られると<br/>攻撃が終わる。</h2><p>安打でも四球でも、アウトにならず一塁へ進めば、次の打者へ攻撃をつなげられます。打率は安打だけを数えますが、出塁率は四球や死球も含めて「アウトにならなかった割合」を見ます。</p><div className="obp-compare"><div><small>PLAYER A</small><b>.280</b><span>打率</span><strong>.310</strong><span>出塁率</span></div><div className="better"><small>PLAYER B</small><b>.280</b><span>打率</span><strong>.375</strong><span>出塁率</span></div></div><aside><b>同じ打率でも差がつく</b><p>Bは四球を多く選ぶため、Aより多く攻撃機会を残します。後続打者に長打が出たとき、ホームへ還る走者になる可能性も高まります。</p></aside><div className="lesson-actions"><Link href="/learn">← レッスン一覧</Link><Link href="/stats-lab" className="button primary">数字で試してみる <span>→</span></Link></div></article>
  </div>;
}
