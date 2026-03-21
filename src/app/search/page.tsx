"use client";

import { useState } from "react";
import Link from "next/link";
import { searchDrills } from "@/lib/drills";
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

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = searchDrills(query);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">
        <FuriganaText text="ドリル検索" />
      </h1>

      <div className="mb-8">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="キーワードで検索..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {query.trim() && (
        <p className="text-sm text-gray-500 mb-4">
          {results.length}件のドリルが見つかりました
        </p>
      )}

      {query.trim() && results.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          <FuriganaText text="該当するドリルがありません" />
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((drill) => {
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
                <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-500">
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
