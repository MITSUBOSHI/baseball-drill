"use client";
import { useMemo, useState } from "react";

export function OpsCalculator() {
  const [ab,setAb]=useState(88),[hits,setHits]=useState(25),[doubles,setDoubles]=useState(5),[triples,setTriples]=useState(1),[homers,setHomers]=useState(4),[walks,setWalks]=useState(10),[hbp,setHbp]=useState(1),[sacFly,setSacFly]=useState(1);
  const values=[ab,hits,doubles,triples,homers,walks,hbp,sacFly];
  const error=!values.every(Number.isInteger)?"すべて整数で入力してください。":hits>ab?"安打数は打数以下にしてください。":doubles+triples+homers>hits?"二塁打・三塁打・本塁打の合計は安打数以下にしてください。":"";
  const result=useMemo(()=>{const singles=hits-doubles-triples-homers;const obp=(hits+walks+hbp)/(ab+walks+hbp+sacFly||1);const slg=(singles+doubles*2+triples*3+homers*4)/(ab||1);return{obp,slg,ops:obp+slg}},[ab,hits,doubles,triples,homers,walks,hbp,sacFly]);
  const input=(label:string,value:number,setter:(n:number)=>void)=><label><span>{label}</span><input type="number" min="0" step="1" value={value} onChange={(e)=>setter(Math.max(0,Number(e.target.value)))}/></label>;
  return <div className="calculator-card"><div className="calc-inputs">{input("打数",ab,setAb)}{input("安打",hits,setHits)}{input("二塁打",doubles,setDoubles)}{input("三塁打",triples,setTriples)}{input("本塁打",homers,setHomers)}{input("四球",walks,setWalks)}{input("死球",hbp,setHbp)}{input("犠飛",sacFly,setSacFly)}{error&&<p className="calc-error" role="alert">{error}</p>}</div><div className="calc-result"><span>YOUR RESULT</span><small>OPS</small><strong>{error?"—":result.ops.toFixed(3).replace(/^0/,"")}</strong><div><p><span>出塁率</span><b>{error?"—":result.obp.toFixed(3).replace(/^0/,"")}</b></p><p><span>長打率</span><b>{error?"—":result.slg.toFixed(3).replace(/^0/,"")}</b></p></div><p className="result-note">{error?"入力内容を確認してください。":"OPSは年度・リーグ・球場を補正しない指標です。同じ環境の選手同士で比較しましょう。"}</p></div></div>;
}
