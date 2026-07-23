# Debate & podcast clip catalog

Inventory of long-form YouTube sources mined for `youtubeClip(..., startSeconds)` segments.
Keep campaign pages as `source` for policy points; use these clips for quotes + media only.

## Debates

### WOOD TV8 — Democratic U.S. Senate primary (El-Sayed vs Stevens)

- **Date:** 2026-07-07
- **YouTube:** https://www.youtube.com/watch?v=9_R3JHg26qU (`9_R3JHg26qU`)
- **Length:** ~1h54m (pre-show + debate + spin room)
- **Host:** WOOD TV8 / Nexstar (Grand Rapids)
- **Helper in code:** `woodDebateClip(startSeconds, duration, title, quote)` in [`shared/positions.ts`](../shared/positions.ts)

| Issue id | startSeconds | Timestamp | Quote (short) | Status |
| --- | ---: | --- | --- | --- |
| `medicare-for-all` | 1980 | 33:00 | Guarantee care without deductible/premium/co-pay | Added as `moreClips` |
| `cost-of-living` | 1967 | 32:47 | “I just can't afford to live here anymore.” | Added as `moreClips` |
| `money-out-of-politics` | 2089 | 34:49 | “We also don't need politicians bought off by corporations…” | Added as `moreClips` |
| `aipac-and-dark-money` | 2278 | 37:58 | Bought off by AIPAC / wars | Added as `moreClips` |
| `foreign-policy` | 2278 | 37:58 | Same AIPAC / wars exchange | Added as `moreClips` |
| `immigration-and-ice` | 3464 | 57:44 | Can't reform/retrain ICE — abolish ICE | Added as `moreClips` |
| `unions-and-worker-power` | 2655 | 44:15 | Proud of UAW endorsement | Added as `moreClips` |
| `corporate-consolidation` | 1988 | 33:08 | Stand up to monopolies and oligopolies | Added as `moreClips` |
| `housing` | 219 | 3:39 | Banking/housing crisis + corporate accountability | Added as `moreClips` |
| `democratic-party-strategy` | 100 | 1:40 | Trump as symptom, not the disease (pre-debate interview) | Added as `moreClips` |
| `making-voting-easier` | — | — | No clean debate hit for auto-registration / SAVE Act | Still open |

### The Hill — Decision Desk coverage of the same debate night

- **YouTube:** https://www.youtube.com/watch?v=axQYRxJoJsg (`axQYRxJoJsg`)
- **Notes:** Live wrap / secondary feed — prefer WOOD full debate (`9_R3JHg26qU`) for clean segment clips.

## Podcasts & long interviews (YouTube)

| Title | YouTube | Length | Likely issue ids | startSeconds |
| --- | --- | --- | --- | --- |
| Eyeing Office Ep. 1 (Drop Site News) | `feFaM3ZHxdA` | ~15m | `medicare-for-all`, `cost-of-living`, `foreign-policy`, `money-out-of-politics` | TBD |
| Sumud Podcast clip — military spending as public health crisis | `73CPge7cgDI` | ~0:52 | `public-health`, `foreign-policy` | `0` (short clip) |
| Lever Time — healthcare / AIPAC (confirm YT mirror) | search “Lever Time Abdul El-Sayed” | ~full ep | `medicare-for-all`, `aipac-and-dark-money` | TBD |
| Playbook Podcast — populist Democrat conversation | search “Playbook Podcast Abdul El-Sayed” | ~44m | `democratic-party-strategy`, `immigration-and-ice`, `artificial-intelligence` | TBD |

## Gap still open

- `making-voting-easier` — no on-message Bluesky video and no debate segment for automatic registration / SAVE Act / early voting.

## How to add a segment

```ts
woodDebateClip(
  1980,
  "1:05",
  "Short descriptive title",
  "Verbatim quote from the segment."
)
```

Verify embed: `https://www.youtube-nocookie.com/embed/9_R3JHg26qU?rel=0&start=SECONDS`
