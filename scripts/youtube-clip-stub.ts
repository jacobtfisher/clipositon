#!/usr/bin/env npx tsx
/**
 * Print a ready-to-paste youtubeClip(...) stub for a video id + start time.
 *
 * Usage:
 *   npx tsx scripts/youtube-clip-stub.ts VIDEO_ID [startSeconds] [duration]
 *
 * Example:
 *   npx tsx scripts/youtube-clip-stub.ts 9_R3JHg26qU 1234 1:05
 */
const [youtubeId, startRaw, duration = "0:00"] = process.argv.slice(2);

if (!youtubeId || !/^[\w-]{11}$/.test(youtubeId)) {
  console.error("Usage: npx tsx scripts/youtube-clip-stub.ts VIDEO_ID [startSeconds] [duration]");
  process.exit(1);
}

const startSeconds = startRaw ? Number(startRaw) : undefined;
if (startRaw && (!Number.isFinite(startSeconds) || (startSeconds ?? 0) < 0)) {
  console.error("startSeconds must be a non-negative number");
  process.exit(1);
}

const startArg =
  typeof startSeconds === "number" && startSeconds > 0 ? `,\n  ${Math.floor(startSeconds)}` : "";

const watchUrl = new URL(`https://www.youtube.com/watch?v=${youtubeId}`);
if (typeof startSeconds === "number" && startSeconds > 0) {
  watchUrl.searchParams.set("t", `${Math.floor(startSeconds)}s`);
}

const embedStart =
  typeof startSeconds === "number" && startSeconds > 0
    ? `&start=${Math.floor(startSeconds)}`
    : "";

console.log(`youtubeClip(
  "${youtubeId}",
  "${duration}",
  "TITLE_HERE",
  "QUOTE_HERE"${startArg ? ",\n  undefined" : ""}${startArg}
)`);
console.log(`\nWatch: ${watchUrl.toString()}`);
console.log(`Embed: https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0${embedStart}`);
