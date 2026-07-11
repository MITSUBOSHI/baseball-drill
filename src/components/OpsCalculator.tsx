"use client";

import { useMemo, useState } from "react";

export function OpsCalculator() {
  const [pa, setPa] = useState(100);
  const [ab, setAb] = useState(88);
  const [hits, setHits] = useState(25);
  const [doubles, setDoubles] = useState(5);
  const [triples, setTriples] = useState(1);
  const [homers, setHomers] = useState(4);
  const [walks, setWalks] = useState(10);
  const [hbp, setHbp] = useState(1);
  const [sac, setSac] = useState(1);

  const result = useMemo(() => {
    const singles = Math.max(0, hits - doubles - triples - homers);
    const obpDenominator = ab + walks + hbp + sac;
    const obp = obpDenominator ? (hits + walks + hbp) / obpDenominator : 0;
    const slg = ab ? (singles + doubles * 2 + triples * 3 + homers * 4) / ab : 0;
    return { obp, slg, ops: obp + slg };
  }, [ab, hits, doubles, triples, homers, walks, hbp, sac]);

  const input = (label: string, value: number, setter: (n: number) => void) => (
    <label><span>{label}</span><input type="number" min="0" value={value} onChange={(e) => setter(Math.max(0, Number(e.target.value)))} /></label>
  );

  return <div className="calculator-card">
    <div className="calc-inputs">
      {input("打席", pa, setPa)}{input("打数", ab, setAb)}{input("安打", hits, setHits)}{input("二塁打", doubles, setDoubles)}
      {input("三塁打", triples, setTriples)}{input("本塁打", homers, setHomers)}{input("四球", walks, setWalks)}{input("死球", hbp, setHbp)}{input("犠飛", sac, setSac)}
    </div>
    <div className="calc-result">
      <span>YOUR RESULT</span><small>OPS</small><strong>{result.ops.toFixed(3).replace(/^0/, "")}</strong>
      <div><p><span>出塁率</span><b>{result.obp.toFixed(3).replace(/^0/, "")}</b></p><p><span>長打率</span><b>{result.slg.toFixed(3).replace(/^0/, "")}</b></p></div>
      <p className="result-note">{result.ops >= .8 ? "中軸級の高い打撃貢献が期待できる水準です。" : result.ops >= .7 ? "おおむね平均的なOPSの目安です。" : "出塁か長打のどちらを伸ばせるか見てみましょう。"}</p>
    </div>
  </div>;
}
