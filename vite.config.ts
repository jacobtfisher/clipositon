import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";

const repoRoot = import.meta.dirname;
const siteBase = "/cliposition/";
const customDomain = "tools4abdul.com";

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
        `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=${siteBase}" />
    <link rel="canonical" href="${siteBase}" />
    <title>Tools for Abdul</title>
  </head>
  <body>
    <p><a href="${siteBase}">Continue to Where Abdul Stands</a></p>
  </body>
</html>
`
      );
    }
  };
}

export default defineConfig({
  root: resolve(repoRoot, "cliposition"),
  base: siteBase,
  publicDir: false,
  server: {
    fs: {
      allow: [repoRoot]
    }
  },
  build: {
    outDir: resolve(repoRoot, "dist/cliposition"),
    emptyOutDir: true
  },
  plugins: [githubPagesRootFiles()]
});
