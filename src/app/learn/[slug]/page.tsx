import Link from "next/link";
import { notFound } from "next/navigation";
import { learningLessons } from "@/data/learning";
import { LessonQuestion } from "@/components/LessonQuestion";

export function generateStaticParams(){return learningLessons.map(({slug})=>({slug}));}

export default async function LessonPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const index=learningLessons.findIndex((lesson)=>lesson.slug===slug); if(index<0) notFound();
  const lesson=learningLessons[index]; const previous=learningLessons[index-1]; const next=learningLessons[index+1];
  return <div className="inner-page lesson-page"><section className="page-hero compact"><span className="kicker">COURSE 01 · LESSON {lesson.number}</span><h1>{lesson.title}</h1><p>{lesson.subtitle}</p><div className="progress-block"><div><span>コース進捗の目安</span><b>{Number(lesson.number)} / 12</b></div><i><b style={{width:`${Number(lesson.number)/12*100}%`}}/></i></div></section><article className="lesson-article"><nav><Link href="/learn">← 全12レッスン</Link><span>{lesson.minutes} MIN</span></nav><span className="kicker">{lesson.kicker}</span><h2>{lesson.heading}</h2><p>{lesson.body}</p><div className="lesson-example">{lesson.example.map((item)=><div key={item.label}><small>{item.label}</small><b>{item.value}</b></div>)}</div><aside><b>POINT</b><p>{lesson.takeaway}</p></aside><LessonQuestion question={lesson.question} choices={lesson.choices} correctIndex={lesson.correctIndex} explanation={lesson.explanation}/><div className="lesson-actions">{previous?<Link href={`/learn/${previous.slug}`}>← {previous.number}. {previous.title}</Link>:<Link href="/learn">← 一覧へ</Link>}{next?<Link href={`/learn/${next.slug}`} className="button primary">{next.number}. {next.title} <span>→</span></Link>:<Link href="/stats-lab" className="button primary">指標ラボへ <span>→</span></Link>}</div></article></div>;
}
