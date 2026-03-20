import Link from "next/link";
import type { Metadata } from "next";
import drillsData from "@/data/drills.json";
import {
  CATEGORIES,
  LEVEL_LABELS,
  POSITION_LABELS,
  type Drill,
  type Level,
} from "@/types/drill";

const drills = drillsData as Drill[];

const LEVEL_BADGE_STYLES: Record<Level, string> = {
  beginner:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  intermediate:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/" className="hover:text-orange-500 transition-colors">
          トップ
        </Link>
        <span className="mx-2">&gt;</span>
        <Link
          href={`/drills/${category}`}
          className="hover:text-orange-500 transition-colors"
        >
          {categoryInfo.name}
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-foreground font-medium">{drill.title}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span
            className={`px-2.5 py-1 rounded text-xs font-medium ${LEVEL_BADGE_STYLES[drill.level]}`}
          >
            {LEVEL_LABELS[drill.level]}
          </span>
          {drill.position && (
            <span className="px-2.5 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
              {POSITION_LABELS[drill.position]}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-3">{drill.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {drill.description}
        </p>
        <div className="flex gap-6 text-sm text-gray-500">
          <span>&#128336; 所要時間: {drill.duration}</span>
          <span>&#128101; 人数: {drill.players}</span>
        </div>
      </div>

      <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 mb-10">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${drill.youtubeVideoId}`}
          title={drill.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="text-orange-500">&#9654;</span>
            練習手順
          </h2>
          <ol className="space-y-3">
            {drill.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="text-orange-500">&#9733;</span>
            ポイント
          </h2>
          <ul className="space-y-3">
            {drill.points.map((point, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm leading-relaxed"
              >
                <span className="flex-shrink-0 text-green-500 mt-0.5">
                  &#10003;
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-10 text-center">
        <Link
          href={`/drills/${category}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          &#8592; {categoryInfo.name}の一覧に戻る
        </Link>
      </div>
    </div>
  );
}
