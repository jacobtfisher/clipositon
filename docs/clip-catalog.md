# Debate & podcast clip catalog

Inventory of long-form YouTube sources to mine for `youtubeClip(..., startSeconds)` segments.
Timestamps below are **rough placeholders** — verify while watching before adding to [`shared/positions.ts`](../shared/positions.ts).
Keep campaign pages as `source` for policy points; use these clips for quotes + media only.

## Debates

### WOOD TV8 — Democratic U.S. Senate primary (El-Sayed vs Stevens)

- **Date:** 2026-07-07
- **YouTube:** https://www.youtube.com/watch?v=9_R3JHg26qU (`9_R3JHg26qU`)
- **Length:** ~1h54m (includes pre-show; debate body is roughly the middle hour)
- **Host:** WOOD TV8 / Nexstar (Grand Rapids)
- **Coverage:** [WOOD takeaways](https://www.woodtv.com/news/elections/6-takeaways-from-the-michigan-democratic-u-s-senate-primary-debate-between-stevens-and-el-sayed/), [ClickOnDetroit](https://www.clickondetroit.com/news/local/2026/07/08/michigan-us-senate-candidates-haley-stevens-abdul-el-sayed-clash-in-democratic-debate/)

| Rough topic | Likely issue ids | Notes / startSeconds |
| --- | --- | --- |
| Affordability / Medicare for All | `cost-of-living`, `medicare-for-all` | TBD — El-Sayed on guaranteeing care without premium/copay |
| Corporate / outside money | `money-out-of-politics`, `aipac-and-dark-money`, `democratic-party-strategy` | TBD — “bought off by corporations” exchanges |
| Immigration / ICE | `immigration-and-ice` | TBD |
| Israel / Gaza / AIPAC | `foreign-policy`, `aipac-and-dark-money`, `jewish-community-and-antisemitism` | TBD |
| Manufacturing / China | `corporate-consolidation`, `unions-and-worker-power` | TBD |

### The Hill — Decision Desk coverage of the same debate night

- **YouTube:** https://www.youtube.com/watch?v=axQYRxJoJsg (`axQYRxJoJsg`)
- **Notes:** Live wrap / secondary feed — prefer WOOD full debate (`9_R3JHg26qU`) for clean segment clips.

## Podcasts & long interviews (YouTube)

| Title | YouTube | Length | Likely issue ids | startSeconds |
| --- | --- | --- | --- | --- |
| Eyeing Office Ep. 1 (Drop Site News) | `feFaM3ZHxdA` | ~15m | `medicare-for-all`, `cost-of-living`, `foreign-policy`, `money-out-of-politics` | TBD |
| Sumud Podcast clip — military spending as public health crisis | `73CPge7cgDI` | ~0:52 | `public-health`, `foreign-policy` | `0` (short clip) |
| Lever Time — healthcare / AIPAC (audio may be paywalled; confirm YT mirror) | search “Lever Time Abdul El-Sayed” | ~full ep | `medicare-for-all`, `aipac-and-dark-money` | TBD |
| Playbook Podcast — populist Democrat conversation | search “Playbook Podcast Abdul El-Sayed” | ~44m | `democratic-party-strategy`, `immigration-and-ice`, `artificial-intelligence` | TBD |

## Gap still open (no clean Bluesky primary yet)

- `making-voting-easier` — no on-message Bluesky video found for automatic registration / SAVE Act / early voting. Prefer a debate or podcast segment once timestamped.

## How to add a segment

```ts
youtubeClip(
  "9_R3JHg26qU",
  "1:12",
  "Short descriptive title",
  "Verbatim quote from the segment.",
  undefined,
  1234 // startSeconds
)
```

Verify embed: `https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0&start=SECONDS`
