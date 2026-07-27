#!/usr/bin/env npx tsx
/**
 * List recent posts from Abdul's Bluesky that look like video embeds,
 * optionally filtered by a keyword. Useful for gap-filling clip research.
 *
 * Usage:
 *   npx tsx scripts/list-bluesky-posts.ts [keyword] [pages]
 */
const handle = "abdulelsayed.bsky.social";
const keyword = (process.argv[2] ?? "").toLowerCase();
const pages = Math.min(20, Math.max(1, Number(process.argv[3] ?? 5) || 5));

async function main() {
  const { did } = (await (
    await fetch(`https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${handle}`)
  ).json()) as { did: string };

  let cursor: string | undefined;
  let shown = 0;

  for (let page = 0; page < pages; page += 1) {
    const api = new URL("https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed");
    api.searchParams.set("actor", did);
    api.searchParams.set("limit", "100");
    api.searchParams.set("filter", "posts_no_replies");
    if (cursor) api.searchParams.set("cursor", cursor);

    const data = (await (await fetch(api)).json()) as {
      cursor?: string;
      feed?: Array<{
        post?: {
          uri?: string;
          embed?: { $type?: string };
          record?: { text?: string; createdAt?: string };
        };
      }>;
    };

    for (const item of data.feed ?? []) {
      const post = item.post;
      const text = String(post?.record?.text ?? "").replace(/\s+/g, " ").trim();
      if (!text) continue;
      if (keyword && !text.toLowerCase().includes(keyword)) continue;

      const embedType = post?.embed?.$type ?? "";
      const hasVideo = /video/i.test(embedType);
      const rkey = post?.uri?.split("/").pop();
      if (!rkey) continue;

      console.log(
        `${hasVideo ? "VID" : "TXT"} ${(post?.record?.createdAt ?? "").slice(0, 10)} https://bsky.app/profile/${handle}/post/${rkey}`
      );
      console.log(`    ${text.slice(0, 200)}`);
      shown += 1;
    }

    cursor = data.cursor;
    if (!cursor) break;
  }

  console.log(`\nListed ${shown} posts${keyword ? ` matching "${keyword}"` : ""}.`);
}

void main();
