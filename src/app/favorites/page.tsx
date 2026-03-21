"use client";

import Link from "next/link";
import { useFavorites } from "@/components/FavoritesProvider";
import { getDrillById } from "@/lib/drills";
import { CATEGORIES, LEVEL_LABELS, type Level } from "@/types/drill";
import { FuriganaText } from "@/components/FuriganaText";

const CATEGORY_COLORS: Record<string, string> = {
  basics: "bg-blue-500",
  strategy: "bg-purple-500",
  pitching: "bg-red-500",
  batting: "bg-orange-500",
  fielding: "bg-green-500",
  running: "bg-teal-500",
  training: "bg-amber-500",
};

const LEVEL_BADGE_STYLES: Record<Level, string> = {
  beginner:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  intermediate:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const drills = favorites
    .map((id) => getDrillById(id))
    .filter((d) => d !== undefined);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">
        <FuriganaText text="お気に入りドリル" />
      </h1>

      {drills.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          <FuriganaText text="お気に入りのドリルがありません" />
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {drills.map((drill) => {
            const categoryInfo = CATEGORIES.find(
              (c) => c.id === drill.category
            );
            return (
              <Link
                key={drill.id}
                href={`/drills/${drill.category}/${drill.id}`}
                className="group block rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium text-white ${CATEGORY_COLORS[drill.category]}`}
                  >
                    {categoryInfo?.name}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${LEVEL_BADGE_STYLES[drill.level]}`}
                  >
                    <FuriganaText text={LEVEL_LABELS[drill.level]} />
                  </span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-orange-500 transition-colors">
                  <FuriganaText text={drill.title} />
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  <FuriganaText text={drill.description} />
                </p>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>&#128336; {drill.duration}</span>
                  <span>&#128101; {drill.players}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
