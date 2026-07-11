"use client";

import { useState } from "react";
import { searchDrills } from "@/lib/drills";
import { DrillCard } from "@/components/DrillCard";
import { FuriganaText } from "@/components/FuriganaText";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = searchDrills(query);

  return (
    <div className="utility-page inner-page">
      <header><span className="kicker">FIND YOUR PRACTICE</span><h1>
        <FuriganaText text="ドリル検索" />
      </h1><p>技術、ポジション、課題から実践ドリルを探せます。</p></header><main>

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
      )}</main>

      {query.trim() && results.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          <FuriganaText text="該当するドリルがありません" />
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((drill) => (
            <DrillCard key={drill.id} drill={drill} showCategory />
          ))}
        </div>
      )}
    </div>
  );
}
