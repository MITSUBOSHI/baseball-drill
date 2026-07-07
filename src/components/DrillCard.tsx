"use client";

import Link from "next/link";
import {
  CATEGORIES,
  CATEGORY_COLORS,
  LEVEL_BADGE_STYLES,
  LEVEL_LABELS,
  POSITION_LABELS,
  type Drill,
} from "@/types/drill";
import { FuriganaText } from "./FuriganaText";

export function DrillCard({
  drill,
  showCategory = false,
}: {
  drill: Drill;
  showCategory?: boolean;
}) {
  const categoryInfo = CATEGORIES.find((c) => c.id === drill.category);

  return (
    <Link
      href={`/drills/${drill.category}/${drill.id}`}
      className="group block rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-2 mb-3">
        {showCategory && categoryInfo && (
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium text-white ${CATEGORY_COLORS[drill.category]}`}
          >
            <FuriganaText text={categoryInfo.name} />
          </span>
        )}
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
  );
}
