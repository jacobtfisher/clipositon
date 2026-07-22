import assert from "node:assert/strict";
import test from "node:test";
import { positionIssues } from "./positions.js";

test("position library ships a comprehensive, unique MVP", () => {
  assert.ok(positionIssues.length >= 12);
  assert.ok(positionIssues.length <= 20);
  assert.equal(new Set(positionIssues.map((issue) => issue.id)).size, positionIssues.length);
  assert.ok(positionIssues.filter((issue) => issue.clip).length >= 12);
});

test("every issue is sourced and searchable", () => {
  for (const issue of positionIssues) {
    assert.match(issue.source.url, /^https:\/\//);
    assert.ok(issue.summary.length > 40);
    assert.ok(issue.points.length >= 2);
    assert.ok(issue.tags.length >= 3);
    if (issue.clip) {
      assert.match(issue.clip.youtubeId, /^[\w-]{11}$/);
      assert.ok(issue.clip.quote.length > 0);
    }
  }
});
