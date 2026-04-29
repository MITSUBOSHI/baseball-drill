#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const drillsPath = resolve(here, "..", "src", "data", "drills.json");

const drills = JSON.parse(await readFile(drillsPath, "utf8"));

const idToDrillIds = new Map();
for (const d of drills) {
  if (!d.youtubeVideoId) continue;
  const list = idToDrillIds.get(d.youtubeVideoId) ?? [];
  list.push(d.id);
  idToDrillIds.set(d.youtubeVideoId, list);
}

const ids = [...idToDrillIds.keys()];
const concurrency = 5;
const results = [];
let cursor = 0;

async function worker() {
  while (cursor < ids.length) {
    const i = cursor++;
    const id = ids[i];
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${encodeURIComponent(id)}&format=json`;
    try {
      const res = await fetch(url, { method: "GET" });
      results.push({ id, status: res.status });
    } catch (err) {
      results.push({ id, status: 0, error: err.message });
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, worker));
results.sort((a, b) => a.id.localeCompare(b.id));

const broken = [];
for (const { id, status, error } of results) {
  if (status === 200) {
    console.log(`OK     ${id}`);
  } else {
    const drillIds = idToDrillIds.get(id).join(", ");
    const detail = error ? `error=${error}` : `status=${status}`;
    console.log(`BROKEN ${id} (${detail}) drills=[${drillIds}]`);
    broken.push(id);
  }
}

console.log("");
console.log(`checked=${ids.length} broken=${broken.length}`);

if (broken.length > 0) {
  process.exit(1);
}
