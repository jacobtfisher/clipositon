import assert from "node:assert/strict";
import test from "node:test";
import { getBlueskyIframeUrl, getBlueskyOEmbedUrl } from "./bluesky.js";

test("builds a Bluesky oEmbed request for a public post", () => {
  const result = getBlueskyOEmbedUrl(
    "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mlgkramruc2i"
  );
  const url = new URL(result ?? "");

  assert.equal(url.origin, "https://embed.bsky.app");
  assert.equal(url.pathname, "/oembed");
  assert.equal(
    url.searchParams.get("url"),
    "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mlgkramruc2i"
  );
  assert.equal(url.searchParams.get("maxwidth"), "430");
});

test("extracts a trusted iframe URL from Bluesky oEmbed HTML", () => {
  const html =
    '<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:abc123/app.bsky.feed.post/3mlgkramruc2i"></blockquote>';
  const result = getBlueskyIframeUrl(html, "frame-1", "https://example.com/positions/");
  const url = new URL(result ?? "");

  assert.equal(url.origin, "https://embed.bsky.app");
  assert.equal(url.pathname, "/embed/did:plc:abc123/app.bsky.feed.post/3mlgkramruc2i");
  assert.equal(url.searchParams.get("id"), "frame-1");
  assert.equal(url.searchParams.get("ref_url"), "https://example.com/positions/");
});

test("rejects unsupported Bluesky and oEmbed values", () => {
  assert.equal(getBlueskyOEmbedUrl("https://example.com/profile/person/post/abc"), null);
  assert.equal(getBlueskyOEmbedUrl("https://bsky.app/profile/abdulelsayed.bsky.social"), null);
  assert.equal(getBlueskyIframeUrl("<blockquote>unsafe</blockquote>", "frame-1"), null);
});
