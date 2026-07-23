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
  assert.ok(positionIssues.length <= 30);
  assert.equal(new Set(positionIssues.map((issue) => issue.id)).size, positionIssues.length);
  assert.ok(positionIssues.filter((issue) => issue.clip).length >= 12);
});

test("every issue is sourced and searchable", () => {
  for (const issue of positionIssues) {
    assert.match(issue.source.url, /^https:\/\//);
    assert.ok(issue.summary.length > 40);
    assert.ok(issue.points.length >= 2);
    assert.ok(issue.tags.length >= 3);

    if (!issue.clip) continue;

    assert.match(issue.clip.url, /^https:\/\//);
    assert.ok(supportedClipPlatforms.has(issue.clip.platform));
    assert.ok(issue.clip.title.length > 0);
    assert.ok(issue.clip.quote.length > 0);

    if (issue.clip.platform === "YouTube") {
      assert.match(issue.clip.youtubeId ?? "", /^[\w-]{11}$/);
      assert.match(issue.clip.duration ?? "", /^\d+:\d{2}$/);
      assert.equal(issue.clip.url, `https://www.youtube.com/watch?v=${issue.clip.youtubeId}`);
    } else {
      assert.equal(issue.clip.youtubeId, undefined);
    }

    for (const alternate of issue.clip.alternates ?? []) {
      assert.match(alternate.url, /^https:\/\//);
      assert.ok(supportedClipPlatforms.has(alternate.platform));
      assert.notEqual(alternate.url, issue.clip.url);
    }
  }
});
