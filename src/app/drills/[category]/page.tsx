"use client";

import { useState } from "react";
import Link from "next/link";
import { use } from "react";
import drillsData from "@/data/drills.json";
import {
  CATEGORIES,
  LEVEL_LABELS,
  POSITION_LABELS,
  type Drill,
  type Level,
  type FieldingPosition,
} from "@/types/drill";
import { FuriganaText } from "@/components/FuriganaText";

const drills = drillsData as Drill[];

const CATEGORY_COLORS: Record<string, string> = {
  basics: "bg-blue-500",
  strategy: "bg-purple-500",
  pitching: "bg-red-500",
  batting: "bg-orange-500",
  fielding: "bg-green-500",
};

const LEVEL_BADGE_STYLES: Record<Level, string> = {
  beginner:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  intermediate:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

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

  const categoryInfo = CATEGORIES.find((c) => c.id === category);
  if (!categoryInfo) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        カテゴリが見つかりません
      </div>
    );
  }

  const categoryDrills = drills.filter((d) => d.category === category);

  const filteredDrills = categoryDrills.filter((d) => {
    if (levelFilter !== "all" && d.level !== levelFilter) return false;
    if (
      category === "fielding" &&
      positionFilter !== "all" &&
      d.position !== positionFilter
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
            className={`w-1.5 h-8 rounded-full ${CATEGORY_COLORS[category]}`}
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
              <button
                key={level}
                onClick={() => setLevelFilter(level)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  levelFilter === level
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <FuriganaText
                  text={level === "all" ? "全て" : LEVEL_LABELS[level]}
                />
              </button>
            )
          )}
        </div>

        {category === "fielding" && (
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-500">
              ポジション:
            </span>
            {(["all", "catcher", "infield", "outfield"] as const).map(
              (pos) => (
                <button
                  key={pos}
                  onClick={() => setPositionFilter(pos)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    positionFilter === pos
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <FuriganaText
                    text={pos === "all" ? "全て" : POSITION_LABELS[pos]}
                  />
                </button>
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
            <Link
              key={drill.id}
              href={`/drills/${category}/${drill.id}`}
              className="group block rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${LEVEL_BADGE_STYLES[drill.level]}`}
                >
                  <FuriganaText text={LEVEL_LABELS[drill.level]} />
                </span>
                {drill.position && (
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                    <FuriganaText text={POSITION_LABELS[drill.position]} />
                  </span>
                )}
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-orange-500 transition-colors">
                <FuriganaText text={drill.title} />
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                <FuriganaText text={drill.description} />
              </p>
              <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-500">
                <span>&#128336; {drill.duration}</span>
                <span>&#128101; {drill.players}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
