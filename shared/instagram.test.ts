import assert from "node:assert/strict";
import test from "node:test";
import { getInstagramEmbedUrl } from "./instagram.js";

test("builds safe Instagram embed URLs for posts and reels", () => {
  assert.equal(
    getInstagramEmbedUrl("https://www.instagram.com/reel/DYXmsEbuVG-/"),
    "https://www.instagram.com/reel/DYXmsEbuVG-/embed/"
  );
  assert.equal(
    getInstagramEmbedUrl("https://www.instagram.com/p/DYH3ATfgMEF?utm_source=ig_web_copy_link"),
    "https://www.instagram.com/p/DYH3ATfgMEF/embed/"
  );
});

test("rejects non-media and untrusted Instagram URLs", () => {
  assert.equal(getInstagramEmbedUrl("https://example.com/reel/DYXmsEbuVG-/"), null);
  assert.equal(getInstagramEmbedUrl("https://www.instagram.com/abdulelsayed/"), null);
  assert.equal(getInstagramEmbedUrl("not a URL"), null);
});
