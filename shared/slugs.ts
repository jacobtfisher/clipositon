import { positionIssues } from "./positions.js";

/** Paths reserved by the build / site that must never be issue slugs. */
export const reservedSlugs = new Set([
  "cliposition",
  "assets",
  "positions",
  "og",
  "api",
  "index",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "cname"
]);

/**
 * Canonical short slug for each issue. Shared by the build-time redirect
 * pages and the in-app Share button.
 */
export const issueSlugById: Record<string, string> = {
  "medicare-for-all": "medicare",
  "medicare-advantage": "drug-prices",
  "rural-healthcare": "rural-health",
  "veterans-affairs": "veterans",
  "break-up-big-healthcare": "big-healthcare",
  "public-health": "public-health",
  "immigration-and-ice": "ice",
  "unions-and-worker-power": "unions",
  "money-out-of-politics": "money-out",
  "ending-gerrymandering": "gerrymandering",
  "supreme-court-reform": "scotus",
  "abolishing-the-filibuster": "filibuster",
  "cost-of-living": "cost-of-living",
  "small-business-healthcare": "small-business",
  "data-centers-and-ai": "data-centers",
  "artificial-intelligence": "ai",
  "family-farms": "farms",
  "climate-and-agriculture": "climate",
  "foreign-policy": "foreign-policy",
  "corporate-consolidation": "monopolies",
  housing: "housing",
  education: "education",
  "water-and-great-lakes": "water",
  "seniors-aging-affordably": "seniors",
  "making-voting-easier": "voting",
  "voting-rights": "voting-rights",
  "aipac-and-dark-money": "aipac",
  "jewish-community-and-antisemitism": "antisemitism",
  "reproductive-rights": "reproductive-rights",
  "lgbtq-rights-and-care": "lgbtq",
  "black-community-equity": "racial-equity",
  "democratic-party-strategy": "democrats",
  "rule-of-law-and-accountability": "rule-of-law"
};

/** Optional aliases that also redirect to the same issue. */
export const slugAliases: Record<string, string> = {
  "medicare-for-all": "medicare",
  m4a: "medicare"
};

const issueIdBySlug = new Map<string, string>();

for (const [issueId, slug] of Object.entries(issueSlugById)) {
  issueIdBySlug.set(slug, issueId);
}

for (const [alias, canonicalSlug] of Object.entries(slugAliases)) {
  const issueId = issueIdBySlug.get(canonicalSlug);
  if (issueId) issueIdBySlug.set(alias, issueId);
}

export function slugForIssue(issueId: string): string | undefined {
  return issueSlugById[issueId];
}

export function issueIdForSlug(slug: string): string | undefined {
  return issueIdBySlug.get(slug);
}

/** All short-path slugs that should emit redirect pages (canonical + aliases). */
export function allShortSlugs(): Array<{ slug: string; issueId: string }> {
  return [...issueIdBySlug.entries()].map(([slug, issueId]) => ({ slug, issueId }));
}

export function shortUrlForIssue(issueId: string, origin = "https://tools4abdul.com"): string | undefined {
  const slug = slugForIssue(issueId);
  return slug ? `${origin.replace(/\/$/, "")}/${slug}` : undefined;
}

/** Every position issue must have a slug; used by tests. */
export function issuesMissingSlugs(): string[] {
  return positionIssues.map((issue) => issue.id).filter((id) => !issueSlugById[id]);
}
