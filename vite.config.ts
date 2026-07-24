import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import { positionIssues, type PositionIssue } from "./shared/positions";
import { allShortSlugs, slugForIssue } from "./shared/slugs";

const repoRoot = import.meta.dirname;
const siteBase = "/cliposition/";
const customDomain = "tools4abdul.com";
const siteOrigin = `https://${customDomain}`;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function youtubeIdFromUrl(url: string): string | undefined {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})/);
  return match?.[1];
}

function ogImageForIssue(issue: PositionIssue): string | undefined {
  if (issue.clip?.youtubeId) {
    return `https://i.ytimg.com/vi/${issue.clip.youtubeId}/hqdefault.jpg`;
  }
  const youtubeAlternate = issue.clip?.alternates?.find((option) => option.platform === "YouTube");
  if (youtubeAlternate) {
    const id = youtubeIdFromUrl(youtubeAlternate.url);
    if (id) return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  }
  const moreYoutube = issue.moreClips?.find((clip) => clip.youtubeId);
  if (moreYoutube?.youtubeId) {
    return `https://i.ytimg.com/vi/${moreYoutube.youtubeId}/hqdefault.jpg`;
  }
  return undefined;
}

function redirectPageHtml(opts: {
  title: string;
  description: string;
  canonicalPath: string;
  targetPath: string;
  ogImage?: string;
}): string {
  const absoluteCanonical = `${siteOrigin}${opts.canonicalPath}`;
  const absoluteTarget = `${siteOrigin}${opts.targetPath}`;
  const ogImage = opts.ogImage
    ? `    <meta property="og:image" content="${escapeHtml(opts.ogImage)}" />
    <meta name="twitter:image" content="${escapeHtml(opts.ogImage)}" />
`
    : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <meta http-equiv="refresh" content="0; url=${escapeHtml(opts.targetPath)}" />
    <link rel="canonical" href="${escapeHtml(absoluteCanonical)}" />
    <title>${escapeHtml(opts.title)}</title>
    <meta name="description" content="${escapeHtml(opts.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Where Abdul Stands" />
    <meta property="og:title" content="${escapeHtml(opts.title)}" />
    <meta property="og:description" content="${escapeHtml(opts.description)}" />
    <meta property="og:url" content="${escapeHtml(absoluteCanonical)}" />
${ogImage}    <meta name="twitter:card" content="${opts.ogImage ? "summary_large_image" : "summary"}" />
    <meta name="twitter:title" content="${escapeHtml(opts.title)}" />
    <meta name="twitter:description" content="${escapeHtml(opts.description)}" />
    <script>
      location.replace(${JSON.stringify(absoluteTarget)});
    </script>
  </head>
  <body>
    <p><a href="${escapeHtml(opts.targetPath)}">${escapeHtml(opts.title)}</a></p>
  </body>
</html>
`;
}

function githubPagesRootFiles(): Plugin {
  return {
    name: "github-pages-root-files",
    closeBundle() {
      const dist = resolve(repoRoot, "dist");
      mkdirSync(dist, { recursive: true });
      writeFileSync(resolve(dist, "CNAME"), `${customDomain}\n`);
      writeFileSync(resolve(dist, ".nojekyll"), "");
      writeFileSync(
        resolve(dist, "index.html"),
        redirectPageHtml({
          title: "Where Abdul Stands",
          description: "A searchable, sourced guide to Abdul El-Sayed's positions in his own words.",
          canonicalPath: siteBase,
          targetPath: siteBase
        })
      );

      const issuesById = new Map(positionIssues.map((issue) => [issue.id, issue]));
      for (const { slug, issueId } of allShortSlugs()) {
        const issue = issuesById.get(issueId);
        if (!issue) continue;
        const canonicalSlug = slugForIssue(issueId) ?? slug;
        const dir = resolve(dist, slug);
        mkdirSync(dir, { recursive: true });
        writeFileSync(
          resolve(dir, "index.html"),
          redirectPageHtml({
            title: `${issue.title} — Where Abdul Stands`,
            description: issue.summary,
            canonicalPath: `/${canonicalSlug}`,
            targetPath: `${siteBase}#${issue.id}`,
            ogImage: ogImageForIssue(issue)
          })
        );
      }
    }
  };
}

function productionHardening(): Plugin {
  const csp = [
    "default-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "img-src 'self' data: https://i.ytimg.com https://tools4abdul.goatcounter.com",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' https://gc.zgo.at",
    "connect-src 'self' https://embed.bsky.app https://tools4abdul.goatcounter.com",
    "frame-src https://www.youtube-nocookie.com https://www.instagram.com https://embed.bsky.app",
    "upgrade-insecure-requests"
  ].join("; ");

  const entryFsPath = resolve(repoRoot, "src/positions/main.tsx");

  return {
    name: "production-hardening",
    transformIndexHtml: {
      order: "pre",
      handler(html, ctx) {
        // Outside-root entry needs /@fs in serve; keep ../src for the production build.
        if (ctx.server) {
          return html.replace(
            'src="../src/positions/main.tsx"',
            `src="/@fs/${entryFsPath}"`
          );
        }
        return html.replace(
          "</head>",
          `    <meta http-equiv="Content-Security-Policy" content="${csp}" />
    <script
      data-goatcounter="https://tools4abdul.goatcounter.com/count"
      async
      src="https://gc.zgo.at/count.js"
    ></script>
  </head>`
        );
      }
    }
  };
}

export default defineConfig({
  root: resolve(repoRoot, "cliposition"),
  base: siteBase,
  publicDir: resolve(repoRoot, "cliposition/public"),
  server: {
    fs: {
      allow: [repoRoot]
    }
  },
  build: {
    outDir: resolve(repoRoot, "dist/cliposition"),
    emptyOutDir: true
  },
  plugins: [productionHardening(), githubPagesRootFiles()]
});
