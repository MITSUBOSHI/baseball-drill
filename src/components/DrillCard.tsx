"use client";
import Link from "next/link";
import { CATEGORIES, LEVEL_LABELS, POSITION_LABELS, type Drill } from "@/types/drill";
import { FuriganaText } from "./FuriganaText";

export function DrillCard({ drill, showCategory = false }: { drill: Drill; showCategory?: boolean }) {
  const category = CATEGORIES.find((c) => c.id === drill.category);
  return (
    <Link href={`/drills/${drill.category}/${drill.id}`} className="new-drill-card">
      <div className={`drill-visual visual-${drill.category}`}>
        <span>{category?.name}</span>
        <div className="play-mark">▶</div>
        <b>{drill.id.slice(-3)}</b>
      </div>
      <div className="drill-card-body">
        <div className="drill-tags">
          {showCategory && <span>{category?.name}</span>}
          <span>{LEVEL_LABELS[drill.level]}</span>
          {drill.position && <span>{POSITION_LABELS[drill.position]}</span>}
        </div>
        <h3><FuriganaText text={drill.title}/></h3>
        <p><FuriganaText text={drill.description}/></p>
        <footer>
          <span>◷ {drill.duration}</span>
          <span>{drill.players}</span>
          <b>→</b>
        </footer>
      </div>
    </Link>
  );
}
