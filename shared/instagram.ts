const INSTAGRAM_HOSTS = new Set(["instagram.com", "www.instagram.com"]);
const INSTAGRAM_MEDIA_PATH = /^\/(p|reel|tv)\/([A-Za-z0-9_-]+)\/?$/;

export function getInstagramEmbedUrl(value: string): string | null {
  try {
    const url = new URL(value);
    const match = url.pathname.match(INSTAGRAM_MEDIA_PATH);

    if (url.protocol !== "https:" || !INSTAGRAM_HOSTS.has(url.hostname) || !match) {
      return null;
    }

    const [, mediaType, shortcode] = match;
    return `https://www.instagram.com/${mediaType}/${shortcode}/embed/`;
  } catch {
    return null;
  }
}
