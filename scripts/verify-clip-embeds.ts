#!/usr/bin/env npx tsx
/**
 * Verify that every Bluesky / Instagram / YouTube clip URL in the positions
 * library still resolves to an embeddable endpoint.
 *
 * Usage: npx tsx scripts/verify-clip-embeds.ts
 */
import { positionIssues } from "../shared/positions.ts";
import { getBlueskyOEmbedUrl } from "../shared/bluesky.ts";
import { getInstagramEmbedUrl } from "../shared/instagram.ts";

type Clip = NonNullable<(typeof positionIssues)[number]["clip"]>;

function allClips(): Clip[] {
  return positionIssues.flatMap((issue) =>
    [issue.clip, ...(issue.moreClips ?? [])].filter((clip): clip is Clip => Boolean(clip))
  );
}

async function check(url: string): Promise<number | "invalid"> {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { Accept: "application/json,text/html,*/*" }
    });
    return response.status;
  } catch {
    return "invalid";
  }
}

async function main() {
  const results: Array<{ label: string; status: number | "invalid"; url: string }> = [];

  for (const clip of allClips()) {
    if (clip.platform === "YouTube" && clip.youtubeId) {
      const start =
        clip.startSeconds && clip.startSeconds > 0 ? `&start=${Math.floor(clip.startSeconds)}` : "";
      const embed = `https://www.youtube-nocookie.com/embed/${clip.youtubeId}?rel=0${start}`;
      results.push({ label: `YouTube ${clip.youtubeId}`, status: await check(embed), url: embed });
      continue;
    }

    if (clip.platform === "Bluesky" || clip.alternates?.some((option) => option.platform === "Bluesky")) {
      const blueskyUrl =
        clip.platform === "Bluesky"
          ? clip.url
          : clip.alternates?.find((option) => option.platform === "Bluesky")?.url;
      if (blueskyUrl) {
        const oembed = getBlueskyOEmbedUrl(blueskyUrl);
        results.push({
          label: `Bluesky ${blueskyUrl}`,
          status: oembed ? await check(oembed) : "invalid",
          url: oembed ?? blueskyUrl
        });
      }
    }

    if (clip.platform === "Instagram") {
      const embed = getInstagramEmbedUrl(clip.url);
      results.push({
        label: `Instagram ${clip.url}`,
        status: embed ? await check(embed) : "invalid",
        url: embed ?? clip.url
      });
    }
  }

  let failed = 0;
  for (const result of results) {
    const ok = result.status === 200;
    if (!ok) failed += 1;
    console.log(`${ok ? "OK" : "FAIL"} ${result.status} ${result.label}`);
  }

  console.log(`\nChecked ${results.length} embeds; ${failed} failed.`);
  if (failed > 0) process.exitCode = 1;
}

void main();
