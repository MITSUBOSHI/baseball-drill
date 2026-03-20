import Link from "next/link";
import { CATEGORIES } from "@/types/drill";

const CATEGORY_COLORS: Record<string, string> = {
  basics: "bg-blue-500",
  strategy: "bg-purple-500",
  pitching: "bg-red-500",
  batting: "bg-orange-500",
  fielding: "bg-green-500",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  basics:
    "キャッチボール、ゴロ捕球、ベースランニングなど、野球のすべてのプレーの土台となる基本技術を磨きます。",
  strategy:
    "サインプレー、走塁判断、バント戦術など、試合で勝つための頭脳的なプレーを学びます。",
  pitching:
    "ピッチングフォーム、コントロール、変化球まで、投手に必要な技術を段階的に習得できます。",
  batting:
    "素振り、ティーバッティング、実打練習まで、確実にミートするための技術を体に覚えさせます。",
  fielding:
    "内野・外野・捕手のポジション別に、守備の基本から連携プレーまでカバーします。",
};

const CATEGORY_ICONS: Record<string, string> = {
  basics: "&#9898;",
  strategy: "&#128203;",
  pitching: "&#128293;",
  batting: "&#9889;",
  fielding: "&#128737;",
};

export default function Home() {
  return (
    <div>
      <section className="bg-slate-900 text-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            すべてのプレーに、確かな技術を。
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            基本から応用まで、動画で学べる野球練習ドリル集
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">
          カテゴリから探す
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/drills/${cat.id}`}
              className="group block rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className={`h-1.5 ${CATEGORY_COLORS[cat.id]}`} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-2xl"
                    dangerouslySetInnerHTML={{
                      __html: CATEGORY_ICONS[cat.id],
                    }}
                  />
                  <h3 className="text-lg font-semibold group-hover:text-orange-500 transition-colors">
                    {cat.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {CATEGORY_DESCRIPTIONS[cat.id]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
