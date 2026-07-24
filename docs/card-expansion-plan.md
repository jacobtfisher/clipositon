# Card expansion plan

Working spec for the `explore-new-cards` branch. Adds 3 new cards and expands or
refocuses 4 existing ones. Every task lists the exact primary source to verify against.

Follow `.cursor/rules/position-sourcing.mdc` throughout. Verify each bullet against the
cited URL before writing it. Do not extrapolate from clip themes. Do not introduce
em dashes.

## Baseline (already done, no setup needed)

[PR #5](https://github.com/jacobtfisher/clipositon/pull/5) is merged and
`explore-new-cards` has been rebased onto it. The branch currently has **no commits of its
own** beyond this plan file, so it is a clean starting point. Verified as present:

- `PositionIssue.additionalSources?: PositionSource[]` exists, and the detail view renders
  one source card per source, labeled "Primary campaign source" and "Additional campaign source".
- `campaignSource(url, pageName?)` takes an optional page name that changes the button copy
  to "Read the {pageName} position". Use it whenever a card cites two pages from the same
  publisher, or both buttons render identically.
- `small-business-healthcare` is a **worked example** of a dual-source card. Copy its shape.
- Editorial em dashes are gone from `positions.ts`. Do not reintroduce any.
- `.cursor/rules/position-sourcing.mdc` already documents when `additionalSources` is
  appropriate. Re-read it before starting; it constrains Task 1 and Task 2.

Git is now configured so `gh pr create` targets `jacobtfisher/clipositon` rather than the
upstream fork parent. Open PRs normally; no `--repo` flag needed.

## Test ceiling

`shared/positions.test.ts` asserts `positionIssues.length <= 40`. There are currently
**36** issues. This plan adds **3**, landing at 39. Stay under 40 or raise the ceiling
deliberately in the same commit. Other constraints per issue: summary longer than 40
chars, at least 2 points, at least 3 tags, `relatedIssueIds` must reference real ids and
never self-reference.

## Anchor convention

Campaign pages use WordPress heading anchors: `#h-` plus the slugified heading, with `&`
becoming `amp`. Existing examples in the codebase:

- `${moneyIn}#h-jobs-and-trade`
- `${moneyIn}#h-education`
- `${moneyIn}#h-housing-and-homelessness`
- `${moneyOut}#h-water`
- `${moneyOut}#h-civil-rights-amp-liberties`
- `${moneyOut}#h-environment-and-natural-resources`

New anchors this plan uses: `${moneyIn}#h-taxing-billionaire-wealth`, `${moneyIn}#h-data-centers`.
Open each anchor and confirm it actually lands on the section before shipping it.

---

## Task 1: New card, Privacy & surveillance

**Why:** Distinct voter search term. His positions exist but are split across three pages
and currently surface only as side bullets on other cards.

- `id: "privacy-and-surveillance"`
- `category: "Democracy"`
- Suggested `eyebrow`: "Your data is yours"
- Slug: add `"privacy-and-surveillance": "privacy"` to `issueSlugById` in `shared/slugs.ts`

**Sources (dual-source card; mirror how `small-business-healthcare` does it):**

- Primary: `https://abdulforsenate.com/2026/06/first-do-no-harm-ai-under-democracy/`
  - "Domestic authoritarianism prohibition: No mass political surveillance,
    protected-characteristic predictive policing, or AI targeting of dissent."
  - "AI No-Gos: AI may not deny medical care, autonomously fire weapons, conduct
    warrantless surveillance, replace human oversight in life-or-death decisions, or
    make hiring or firing decisions."
- Additional: `${moneyOut}#h-civil-rights-amp-liberties`
  - "Healthcare data must remain private, and state and federal government should have no
    right to access your data unless it's for the purposes of providing you healthcare."
  - "healthcare providers should be protected from undue coercion by the government to
    provide data"

Use the page-name argument so the two buttons are distinct, for example
`campaignSource(aiUnderDemocracy, "AI Under Democracy")` and
`campaignSource(\`${moneyOut}#h-civil-rights-amp-liberties\`, "Civil Rights & Liberties")`.
Add an `aiUnderDemocracy` const near the other URL consts; `artificial-intelligence`
currently hardcodes that URL inline, so switch it to the const in the same pass.

**Target 4 to 5 predicate-style bullets** covering: no mass political surveillance, no
protected-characteristic predictive policing, no AI targeting of dissent, no warrantless
surveillance by AI, healthcare data private unless used to provide care, providers shielded
from coerced data handover.

**Clip:** Only attach one you verify. Do not build bullets from a clip. The Stevens/ICE
private-data press release and the Palantir story are campaign attack material in a
spokesperson's words, not his, so they are **not** valid sources or clips under the rule.

**Required de-duplication:** see Task 4.

---

## Task 2: Expand Data centers

**Why:** The Terms of Engagement page has 8 planks; the card compresses them into 5.

- Existing card: `id: "data-centers-and-ai"`, currently 5 points
- Source stays `campaignSource("https://abdulforsenate.com/2026/01/datacenters/")`

**Verified against that page, the 8 planks are:** no rate hikes; community transparency;
energy reliability guarantees; jobs guarantee; water protection; community benefits
agreements; no clean-energy loopholes; enforceability.

**Gaps to close.** The current card folds transparency into the water/CBA bullet and
tacks enforceability onto the end of another bullet. Give **community transparency**
("Communities must have a meaningful say in project approvals and community benefits
packages") and **enforceability** ("All agreements must be enforceable through actionable
penalties") their own bullets.

**One addition from a second page** worth including, from `${moneyIn}#h-data-centers`:
he supports "comprehensive federal zoning guidelines and legislation" and intends to pass
the Terms of Engagement "as federal law in the U.S. Senate." That is the federal hook and
it is currently missing. If you use it, add `${moneyIn}#h-data-centers` as an
`additionalSource` rather than silently sourcing it to the January page.

Target 7 to 8 bullets. Keep the existing Mackinac and CBS Takeout clips.

---

## Task 3: New card, Jobs, trade & manufacturing

**Why:** Biggest Michigan-specific gap relative to how much he talks about it. Currently
scattered across `unions-and-worker-power`, `corporate-consolidation`, and
`science-and-research` with no card a voter searching "tariffs" or "manufacturing" would land on.

- `id: "jobs-trade-and-manufacturing"`
- `category: "Economy"`
- Suggested `eyebrow`: "Build it here, with unions at the table"
- Slug: add `"jobs-trade-and-manufacturing": "jobs"`
- Source: `campaignSource(\`${moneyIn}#h-jobs-and-trade\`)`

**Verified content from the Jobs and Trade section:**

- Trade deals like NAFTA "have been a disaster for American manufacturing and have rotted
  out our towns and destroyed communities."
- Supports targeted, smart tariffs to protect Michigan manufacturing and incubate future
  industries, focused on growth industries, with clearly communicated benchmarks with
  trading partners, sunsetting as American manufacturers establish themselves.
- Says Trump's "incoherent, self-serving version of tariffs have only made the problem worse."
- Believes unions must have a significant voice at the tables where decisions about the
  economy are made, and that dumb trade agreements were negotiated without unions at the table.
- Supports a muscular Federal Trade Commission enforcing anti-monopoly laws so corporations
  cannot price-gouge.
- Wants laws to stop Wall Street speculators from wrecking good companies and killing good
  jobs, force publicly traded corporations to be accountable to their workers, and protect
  workers on the job.

Target 5 to 6 bullets. Watch overlap with `corporate-consolidation` (FTC / anti-monopoly)
and keep this card's center of gravity on trade, tariffs, and manufacturing jobs.

`relatedIssueIds`: `["unions-and-worker-power", "corporate-consolidation", "money-in-your-pocket"]`.

**Clip candidate to verify:** WOOD debate and Mackinac already have union and monopoly
segments in `docs/clip-catalog.md`. Reusing a clip across cards is acceptable and already
done elsewhere. Only attach if the segment is genuinely about trade or manufacturing.

---

## Task 4: Refocus Rule of law, and thin overlaps

Adding the privacy card creates duplication. Fix it in the same commit.

- `rule-of-law-and-accountability` currently ends with two healthcare-data bullets
  (lines about data staying private and providers shielded from coercion). **Move these to
  the privacy card** and let rule of law keep the constitution, speech and assembly, and
  protest and boycott bullets. That also answers the "protest as its own card" question:
  refocusing is better than a fifth card, because the protest material is one paragraph.
- `artificial-intelligence` has a combined bullet ending "conducting warrantless
  surveillance". Keep it there (it is a real AI No-Go), but make the privacy card's version
  lead on surveillance rather than restating the whole AI No-Go list.
- Cross-link: add `privacy-and-surveillance` to `relatedIssueIds` on
  `artificial-intelligence`, `rule-of-law-and-accountability`, and `immigration-and-ice`.

---

## Task 5: New card, College & training affordability

**Why:** "Debt-free and tuition-free" is buried as bullet 5 of 6 on the education card, and
it is one of the highest-salience items on the page.

- `id: "college-and-training"`
- `category: "Community"`
- Suggested `eyebrow`: "Debt-free paths after high school"
- Slug: add `"college-and-training": "college"`
- Source: `campaignSource(\`${moneyIn}#h-education\`)`

**Verified content:**

- Every student deserves a debt-free and tuition-free pathway toward the skills they need,
  whether a two-year apprenticeship or a four-year college education and beyond.
- Would cap administrative overhead costs for institutions receiving federal funding,
  arguing for "more research and teaching rather than rec centers and flavors of frozen yogurt."
- Supports expanding funding for HBCUs, community colleges, and trade schools as engines of
  social mobility.
- Would work alongside unions to fund and expand vocational and apprenticeship training.
- Champions non-traditional tenure pathways for educators advancing the teaching mission.
- Colleges and universities deserve more research funding, not less, focused on high-risk,
  high-impact science.

**Then trim the `education` card** so it is K-12 and early childhood: universal childcare
and pre-K, school infrastructure, $60k teacher minimum, wraparound staff, vouchers, IDEA,
the defense-budget funding tie, and moving past property-tax-based funding models (that last
one is on the page and is currently missing). Remove the now-duplicated college bullets and
the administrative overhead bullet. Update its `eyebrow`, `summary`, and `tags` accordingly,
and cross-link the two cards.

**Note on childcare:** I considered a separate childcare card. The page only supports
roughly two bullets (universal childcare, universal pre-K, right to literacy), which is thin
and would mean padding. Recommend keeping childcare inside the education card. Raise it in
the summary and eyebrow so it is still findable. Flag to the user if you disagree.

---

## Task 6: Small expansion, Climate & agriculture

**Why:** The user asked about an environment card. `climate-and-agriculture` already covers
the Endangerment Finding, cumulative air-quality standards, NEPA, environmental justice,
100% renewables, and Line 5. It does not need a new card.

Two verified additions from `${moneyOut}#h-environment-and-natural-resources`:

- Would hold corporate polluters fully accountable for contaminating Michigan's land, air,
  and water, and empower federal agencies to stop them before they cause harm in the first place.
- Frames the record: as a public health official in Detroit and Wayne County he confronted
  childhood lead poisoning and stood between polluters and the communities they poison.
  Check first, this framing may already exist on `black-community-equity`; do not duplicate it.

Low priority. Do it only if the earlier tasks land cleanly.

---

## Explicitly out of scope

- **Guns and cannabis.** No clear primary campaign position page was found. Do not add
  cards from news coverage or inference.
- **A combined "Civil Rights" mega-card.** Too much overlap with reproductive, LGBTQ+,
  Black equity, rule of law, and immigration cards.
- **A standalone billionaire-tax card.** That content anchors `money-in-your-pocket`, which
  is a pinned pillar card. Splitting it would weaken the pillar.

---

## Definition of done

1. Three new cards added, slugs registered in `shared/slugs.ts` for all three.
2. Data centers, education, rule of law, and (optionally) climate updated.
3. Overlaps thinned per Task 4; no claim stated identically on two cards.
4. `docs/clip-catalog.md` updated with any new clip segments and the new issue ids.
5. `npm run check` clean, `npm test` passing, `npm run build` succeeding. If a test run
   hits an EPERM or listen sandbox error, re-run with full permissions.
6. No em dashes introduced. No commit or push without the user asking.
7. Visually spot-check the three new cards and the dual-source rendering on the privacy card.
   A Vite dev server is typically already running on port 5173; do not start a second one.
