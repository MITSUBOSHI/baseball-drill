"use client";

import { useState } from "react";
import Link from "next/link";
import { use } from "react";
import { getDrillsByCategory } from "@/lib/drills";
import {
  CATEGORIES,
  CATEGORY_COLORS,
  LEVEL_LABELS,
  POSITION_LABELS,
  PITCHING_TYPE_LABELS,
  BATTING_TYPE_LABELS,
  type Category,
  type Level,
  type FieldingPosition,
  type PitchingType,
  type BattingType,
} from "@/types/drill";
import { DrillCard } from "@/components/DrillCard";
import { FuriganaText } from "@/components/FuriganaText";

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm transition-colors ${
        active
          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      }`}
    >
      <FuriganaText text={label} />
    </button>
  );
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);
  const [levelFilter, setLevelFilter] = useState<Level | "all">("all");
  const [positionFilter, setPositionFilter] = useState<
    FieldingPosition | "all"
  >("all");
  const [pitchingTypeFilter, setPitchingTypeFilter] = useState<
    PitchingType | "all"
  >("all");
  const [battingTypeFilter, setBattingTypeFilter] = useState<
    BattingType | "all"
  >("all");

  const categoryInfo = CATEGORIES.find((c) => c.id === category);
  if (!categoryInfo) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        カテゴリが見つかりません
      </div>
    );
  }

  const categoryDrills = getDrillsByCategory(category as Category);

  const filteredDrills = categoryDrills.filter((d) => {
    if (levelFilter !== "all" && d.level !== levelFilter) return false;
    if (
      category === "fielding" &&
      positionFilter !== "all" &&
      d.position !== positionFilter
    )
      return false;
    if (
      category === "pitching" &&
      pitchingTypeFilter !== "all" &&
      d.pitchingType !== pitchingTypeFilter
    )
      return false;
    if (
      category === "batting" &&
      battingTypeFilter !== "all" &&
      d.battingType !== battingTypeFilter
    )
      return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/" className="hover:text-orange-500 transition-colors">
          トップ
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-foreground font-medium">
          <FuriganaText text={categoryInfo.name} />
        </span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-1.5 h-8 rounded-full ${CATEGORY_COLORS[categoryInfo.id]}`}
          />
          <h1 className="text-3xl font-bold">
            <FuriganaText text={`${categoryInfo.name}の練習ドリル`} />
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          <FuriganaText text={categoryInfo.description} />
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex gap-2 items-center">
          <span className="text-sm font-medium text-gray-500">レベル:</span>
          {(["all", "beginner", "intermediate", "advanced"] as const).map(
            (level) => (
              <FilterButton
                key={level}
                active={levelFilter === level}
                onClick={() => setLevelFilter(level)}
                label={level === "all" ? "全て" : LEVEL_LABELS[level]}
              />
            )
          )}
        </div>

        {category === "pitching" && (
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-500">タイプ:</span>
            {(["all", "form", "control", "breaking"] as const).map((pt) => (
              <FilterButton
                key={pt}
                active={pitchingTypeFilter === pt}
                onClick={() => setPitchingTypeFilter(pt)}
                label={pt === "all" ? "全て" : PITCHING_TYPE_LABELS[pt]}
              />
            ))}
          </div>
        )}

        {category === "batting" && (
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-500">タイプ:</span>
            {(["all", "swing", "tee", "live"] as const).map((bt) => (
              <FilterButton
                key={bt}
                active={battingTypeFilter === bt}
                onClick={() => setBattingTypeFilter(bt)}
                label={bt === "all" ? "全て" : BATTING_TYPE_LABELS[bt]}
              />
            ))}
          </div>
        )}

        {category === "fielding" && (
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-500">
              ポジション:
            </span>
            {(["all", "catcher", "infield", "outfield"] as const).map(
              (pos) => (
                <FilterButton
                  key={pos}
                  active={positionFilter === pos}
                  onClick={() => setPositionFilter(pos)}
                  label={pos === "all" ? "全て" : POSITION_LABELS[pos]}
                />
              )
            )}
          </div>
        )}
      </div>

      {filteredDrills.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          <FuriganaText text="該当するドリルがありません" />
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrills.map((drill) => (
            <DrillCard key={drill.id} drill={drill} />
          ))}
        </div>
      )}
    </div>
  );
}
