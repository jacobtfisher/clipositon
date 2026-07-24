import assert from "node:assert/strict";
import test from "node:test";
import { positionIssues } from "./positions.js";
import {
  allShortSlugs,
  issueIdForSlug,
  issueSlugById,
  issuesMissingSlugs,
  reservedSlugs,
  shortUrlForIssue,
  slugForIssue
} from "./slugs.js";

test("every position issue has a short slug", () => {
  assert.deepEqual(issuesMissingSlugs(), []);
  assert.equal(Object.keys(issueSlugById).length, positionIssues.length);
});

test("short slugs are unique and avoid reserved paths", () => {
  const slugs = Object.values(issueSlugById);
  assert.equal(new Set(slugs).size, slugs.length);

  for (const slug of slugs) {
    assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(!reservedSlugs.has(slug), `slug "${slug}" is reserved`);
  }
});

test("slug lookup round-trips", () => {
  for (const issue of positionIssues) {
    const slug = slugForIssue(issue.id);
    assert.ok(slug);
    assert.equal(issueIdForSlug(slug), issue.id);
    assert.equal(shortUrlForIssue(issue.id), `https://tools4abdul.com/${slug}`);
  }
});

test("aliases resolve to real issues", () => {
  const entries = allShortSlugs();
  assert.ok(entries.length >= positionIssues.length);
  for (const { slug, issueId } of entries) {
    assert.ok(positionIssues.some((issue) => issue.id === issueId), `${slug} -> ${issueId}`);
    assert.ok(!reservedSlugs.has(slug));
  }
  assert.equal(issueIdForSlug("m4a"), "medicare-for-all");
  assert.equal(issueIdForSlug("medicare-for-all"), "medicare-for-all");
});
