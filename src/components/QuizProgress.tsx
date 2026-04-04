"use client";

export function QuizProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
        <span>
          問題 {current} / {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
