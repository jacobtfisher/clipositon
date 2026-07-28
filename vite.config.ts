import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import { activeDeploymentKey, candidateConfig } from "./shared/candidate-config";
import { positionIssues, type PositionIssue } from "./shared/positions";
import { allShortSlugs, slugForIssue } from "./shared/slugs";

const repoRoot = import.meta.dirname;
const { deployment, site } = candidateConfig;
const siteBase = deployment.siteBase;
const artifactMountPath = deployment.artifactMountPath;
const siteOrigin = deployment.siteOrigin.replace(/\/$/, "");
const shortUrlOrigin = deployment.shortUrlOrigin.replace(/\/$/, "");
if (!siteBase.startsWith(artifactMountPath)) {
  throw new Error(
    `Deployment siteBase "${siteBase}" must be within artifactMountPath "${artifactMountPath}".`
  );
}
const siteOutputDirectory = siteBase
  .slice(artifactMountPath.length)
  .replace(/^\/|\/$/g, "");

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
  canonicalUrl?: string;
  targetPath: string;
  ogImage?: string;
}): string {
  const absoluteCanonical = opts.canonicalUrl ?? `${siteOrigin}${opts.canonicalPath}`;
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
    <meta property="og:site_name" content="${escapeHtml(site.name)}" />
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
    buildStart() {
      rmSync(resolve(repoRoot, "dist"), { recursive: true, force: true });
    },
    closeBundle() {
      const dist = resolve(repoRoot, "dist");
      mkdirSync(dist, { recursive: true });
      if (deployment.customDomain) {
        writeFileSync(resolve(dist, "CNAME"), `${deployment.customDomain}\n`);
      }
      writeFileSync(resolve(dist, ".nojekyll"), "");
      if (siteBase !== artifactMountPath) {
        writeFileSync(
          resolve(dist, "index.html"),
          redirectPageHtml({
            title: site.name,
            description: site.description,
            canonicalPath: siteBase,
            targetPath: siteBase
          })
        );
      }

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
            title: `${issue.title} — ${site.name}`,
            description: issue.summary,
            canonicalPath: `/${canonicalSlug}`,
            canonicalUrl: `${shortUrlOrigin}/${canonicalSlug}`,
            targetPath: `${siteBase}#${issue.id}`,
            ogImage: ogImageForIssue(issue)
          })
        );
      }
    }
  };
}

function productionHardening(): Plugin {
  const analyticsOrigin = deployment.analytics
    ? new URL(deployment.analytics.endpoint).origin
    : undefined;
  const analyticsScriptOrigin = deployment.analytics
    ? new URL(deployment.analytics.scriptUrl).origin
    : undefined;
  const csp = [
    "default-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    `img-src 'self' data: https://i.ytimg.com${analyticsOrigin ? ` ${analyticsOrigin}` : ""}`,
    "style-src 'self' 'unsafe-inline'",
    `script-src 'self'${analyticsScriptOrigin ? ` ${analyticsScriptOrigin}` : ""}`,
    `connect-src 'self' https://embed.bsky.app${analyticsOrigin ? ` ${analyticsOrigin}` : ""}`,
    "frame-src https://www.youtube-nocookie.com https://www.instagram.com https://embed.bsky.app",
    "upgrade-insecure-requests"
  ].join("; ");

  const entryFsPath = resolve(repoRoot, "src/positions/main.tsx");

  return {
    name: "production-hardening",
    transformIndexHtml: {
      order: "pre",
      handler(html, ctx) {
        const brandedHtml = html
          .replace(
            /<meta name="theme-color" content="[^"]*" \/>/,
            `<meta name="theme-color" content="${escapeHtml(site.themeColor)}" />`
          )
          .replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
            `<meta name="description" content="${escapeHtml(site.description)}" />`
          )
          .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(site.name)}</title>`);

        // Outside-root entry needs /@fs in serve; keep ../src for the production build.
        if (ctx.server) {
          return brandedHtml.replace(
            'src="../src/positions/main.tsx"',
            `src="/@fs/${entryFsPath}"`
          );
        }
        const analyticsScript = deployment.analytics
          ? `    <script
      data-goatcounter="${escapeHtml(deployment.analytics.endpoint)}"
      async
      src="${escapeHtml(deployment.analytics.scriptUrl)}"
    ></script>
`
          : "";
        return brandedHtml.replace(
          "</head>",
          `    <meta http-equiv="Content-Security-Policy" content="${csp}" />
${analyticsScript}
  </head>`
        );
      }
    }
  };
}

export default defineConfig({
  root: resolve(repoRoot, "cliposition"),
  base: siteBase,
  define: {
    __CLIPOSITION_CANDIDATE__: JSON.stringify(candidateConfig.key),
    __CLIPOSITION_DEPLOYMENT__: JSON.stringify(activeDeploymentKey)
  },
  publicDir: resolve(repoRoot, "cliposition/public"),
  server: {
    fs: {
      allow: [repoRoot]
    }
  },
  build: {
    outDir: siteOutputDirectory
      ? resolve(repoRoot, "dist", siteOutputDirectory)
      : resolve(repoRoot, "dist"),
    emptyOutDir: true
  },
  plugins: [productionHardening(), githubPagesRootFiles()]
});
