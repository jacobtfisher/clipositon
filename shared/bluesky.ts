const BLUESKY_POST_PATH = /^\/profile\/([^/]+)\/post\/([a-z0-9]+)\/?$/i;
const BLUESKY_AT_URI =
  /data-bluesky-uri="(at:\/\/did:[a-z0-9:.-]+\/app\.bsky\.feed\.post\/[a-z0-9]+)"/i;

export function getBlueskyOEmbedUrl(value: string, maxWidth = 430): string | null {
  try {
    const url = new URL(value);

    if (
      url.protocol !== "https:" ||
      url.hostname !== "bsky.app" ||
      !BLUESKY_POST_PATH.test(url.pathname)
    ) {
      return null;
    }

    url.search = "";
    url.hash = "";

    const oEmbedUrl = new URL("https://embed.bsky.app/oembed");
    oEmbedUrl.searchParams.set("url", url.toString());
    oEmbedUrl.searchParams.set("maxwidth", String(Math.min(600, Math.max(220, maxWidth))));
    return oEmbedUrl.toString();
  } catch {
    return null;
  }
}

export function getBlueskyIframeUrl(
  oEmbedHtml: string,
  frameId: string,
  referrerUrl?: string
): string | null {
  const atUri = oEmbedHtml.match(BLUESKY_AT_URI)?.[1];
  if (!atUri) return null;

  const iframeUrl = new URL(`https://embed.bsky.app/embed/${atUri.slice("at://".length)}`);
  iframeUrl.searchParams.set("id", frameId);
  if (referrerUrl?.startsWith("http")) iframeUrl.searchParams.set("ref_url", referrerUrl);
  return iframeUrl.toString();
}
