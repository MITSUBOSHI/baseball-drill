import type { Metadata } from "next";
import drillsData from "@/data/drills.json";
import { CATEGORIES, type Drill } from "@/types/drill";
import { DrillDetail } from "@/components/DrillDetail";

const drills = drillsData as Drill[];

export async function generateStaticParams() {
  return drills.map((drill) => ({
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
  const drill = drills.find((d) => d.id === id);
  if (!drill) return { title: "ドリルが見つかりません | 野球道場" };

  const categoryInfo = CATEGORIES.find((c) => c.id === drill.category);
  return {
    title: `${drill.title} | ${categoryInfo?.name} | 野球道場`,
    description: `${drill.title}の練習方法を動画付きで詳しく解説。${drill.duration}・${drill.players}で実践できます。`,
  };
}

export default async function DrillPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;

  const drill = drills.find((d) => d.id === id);
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
