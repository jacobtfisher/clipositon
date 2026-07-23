import assert from "node:assert/strict";
import test from "node:test";
import { positionIssues } from "./positions.js";

const supportedClipPlatforms = new Set([
  "YouTube",
  "Instagram",
  "TikTok",
  "Facebook",
  "Bluesky",
  "X"
]);

test("position library ships a comprehensive, unique MVP", () => {
  assert.ok(positionIssues.length >= 25);
  assert.ok(positionIssues.length <= 40);
  assert.equal(new Set(positionIssues.map((issue) => issue.id)).size, positionIssues.length);
  assert.ok(positionIssues.filter((issue) => issue.clip).length >= 12);
});

function assertClip(clip: NonNullable<(typeof positionIssues)[number]["clip"]>) {
  assert.match(clip.url, /^https:\/\//);
  assert.ok(supportedClipPlatforms.has(clip.platform));
  assert.ok(clip.title.length > 0);
  assert.ok(clip.quote.length > 0);

  if (clip.platform === "YouTube") {
    assert.match(clip.youtubeId ?? "", /^[\w-]{11}$/);
    assert.match(clip.duration ?? "", /^\d+:\d{2}$/);
    assert.equal(clip.url, `https://www.youtube.com/watch?v=${clip.youtubeId}`);
  } else {
    assert.equal(clip.youtubeId, undefined);
  }

  for (const alternate of clip.alternates ?? []) {
    assert.match(alternate.url, /^https:\/\//);
    assert.ok(supportedClipPlatforms.has(alternate.platform));
    assert.notEqual(alternate.url, clip.url);
  }
}

test("every issue is sourced and searchable", () => {
  const ids = new Set(positionIssues.map((issue) => issue.id));

  for (const issue of positionIssues) {
    assert.match(issue.source.url, /^https:\/\//);
    assert.ok(issue.summary.length > 40);
    assert.ok(issue.points.length >= 2);
    assert.ok(issue.tags.length >= 3);

    if (issue.clip) assertClip(issue.clip);
    for (const clip of issue.moreClips ?? []) assertClip(clip);

    for (const relatedId of issue.relatedIssueIds ?? []) {
      assert.ok(ids.has(relatedId), `unknown related issue: ${relatedId}`);
      assert.notEqual(relatedId, issue.id);
    }
  }
});
