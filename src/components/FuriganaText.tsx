"use client";

import { useFurigana } from "./FuriganaProvider";
import { annotateFurigana } from "@/lib/furigana-dict";

export function FuriganaText({ text }: { text: string }) {
  const { furigana } = useFurigana();

  if (!furigana) {
    return <>{text}</>;
  }

  const segments = annotateFurigana(text);

  return (
    <>
      {segments.map((seg, i) =>
        seg.type === "text" ? (
          <span key={i}>{seg.value}</span>
        ) : (
          <ruby key={i}>
            {seg.base}
            <rp>(</rp>
            <rt>{seg.reading}</rt>
            <rp>)</rp>
          </ruby>
        )
      )}
    </>
  );
}
