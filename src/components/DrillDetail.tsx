"use client";
import Link from "next/link";
import { FuriganaText } from "./FuriganaText";
import { FavoriteButton } from "./FavoriteButton";
import { LEVEL_LABELS, POSITION_LABELS, type Drill } from "@/types/drill";

export function DrillDetail({ drill, category, categoryName }: { drill: Drill; category: string; categoryName: string }) {
  return <article className="drill-detail inner-page">
    <header className="detail-header"><nav><Link href="/drills">PRACTICE LIBRARY</Link><span>/</span><Link href={`/drills/${category}`}>{categoryName}</Link></nav><div className="drill-tags"><span>{LEVEL_LABELS[drill.level]}</span>{drill.position && <span>{POSITION_LABELS[drill.position]}</span>}</div><h1><FuriganaText text={drill.title}/></h1><p><FuriganaText text={drill.description}/></p><div className="detail-meta"><span>◷ 所要時間　<b>{drill.duration}</b></span><span>参加人数　<b>{drill.players}</b></span><FavoriteButton drillId={drill.id}/></div></header>
    <div className="detail-content"><div className="video-frame"><iframe src={`https://www.youtube.com/embed/${drill.youtubeVideoId}`} title={drill.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"/></div>
      <div className="detail-columns"><section><span className="kicker">HOW TO PRACTICE</span><h2>練習の進め方</h2><ol>{drill.steps.map((step,i)=><li key={i}><b>{String(i+1).padStart(2,"0")}</b><FuriganaText text={step}/></li>)}</ol></section><section className="key-points"><span className="kicker">KEY POINTS</span><h2>意識するポイント</h2><ul>{drill.points.map((point,i)=><li key={i}><span>✓</span><FuriganaText text={point}/></li>)}</ul></section></div>
      <Link href={`/drills/${category}`} className="back-link">← {categoryName}のドリル一覧へ</Link>
    </div>
  </article>;
}
