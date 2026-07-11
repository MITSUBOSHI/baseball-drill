import type { Metadata } from "next";
import { getAllDrills, getDrillById } from "@/lib/drills";
import { CATEGORIES } from "@/types/drill";
import { DrillDetail } from "@/components/DrillDetail";

export async function generateStaticParams() {
  return getAllDrills().map((drill) => ({
    category: drill.category,
    id: drill.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const drill = getDrillById(id);
  if (!drill) return { title: "ドリルが見つかりません | BALLIQ" };

  const categoryInfo = CATEGORIES.find((c) => c.id === drill.category);
  return {
    title: `${drill.title} | ${categoryInfo?.name} | BALLIQ`,
    description: `${drill.title}の練習方法を動画付きで詳しく解説。${drill.duration}・${drill.players}で実践できます。`,
  };
}

export default async function DrillPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;

  const drill = getDrillById(id);
  const categoryInfo = CATEGORIES.find((c) => c.id === category);

  if (!drill || !categoryInfo) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        ドリルが見つかりません
      </div>
    );
  }

  return (
    <DrillDetail
      drill={drill}
      category={category}
      categoryName={categoryInfo.name}
    />
  );
}
