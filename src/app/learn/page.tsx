import Link from "next/link";
import { learningLessons, lessonChapters, metricPurposes } from "@/data/learning";

export default function LearnPage() {
  return (
    <div className="inner-page learn-page">
      <section className="page-hero">
        <span className="kicker">COURSE 01 · SABERMETRICS</span>
        <h1>セイバーメトリクス<br/><em>{learningLessons.length}のレッスン。</em></h1>
        <p>打者・投手・戦術・チーム評価。<br/>各指標が「何を測るか」から、好きな順番で学べます。</p>
        <div className="open-course-note">全レッスン公開中 · 回答によるロックはありません</div>
      </section>
      <section className="content-shell lessons-section">
        <div className="lesson-intro">
          <span>ALL LESSONS</span>
          <div>
            <h2>気になる数字から始めよう</h2>
            <p>順番に進めても、観戦中に気になった指標だけ選んでもOKです。</p>
          </div>
        </div>
        {lessonChapters.map((chapter, chapterIndex) => (
          <section className="chapter-group" key={chapter}>
            <header>
              <span>CHAPTER {chapterIndex + 1}</span>
              <h2>{chapter}</h2>
            </header>
            <div className="lesson-list">
              {learningLessons
                .filter((lesson) => lesson.chapter === chapter)
                .map((lesson) => (
                  <Link href={`/learn/${lesson.slug}`} className="lesson-row" key={lesson.slug}>
                    <span className="lesson-num">{lesson.number}</span>
                    <div>
                      <h3>{lesson.title}</h3>
                      <p>{lesson.subtitle}</p>
                      <span className="lesson-purpose">{metricPurposes[lesson.slug]}</span>
                    </div>
                    <small>{lesson.minutes} min</small>
                    <span className="lesson-open">→</span>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </section>
    </div>
  );
}
