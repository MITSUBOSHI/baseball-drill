"use client";

import { useFavorites } from "@/components/FavoritesProvider";
import { getDrillById } from "@/lib/drills";
import { DrillCard } from "@/components/DrillCard";
import { FuriganaText } from "@/components/FuriganaText";

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
          {drills.map((drill) => (
            <DrillCard key={drill.id} drill={drill} showCategory />
          ))}
        </div>
      )}
    </div>
  );
}
