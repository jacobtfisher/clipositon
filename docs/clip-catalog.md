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

### Mackinac Policy Conference — three-way (El-Sayed, Stevens, McMorrow)

- **Date:** 2026-05-28
- **YouTube (WDIV Local 4):** https://www.youtube.com/watch?v=d5L9FFdEQe8 (`d5L9FFdEQe8`)
- **Length:** ~57:36
- **Also available:** One Detroit `zeD5gpUG-p0` (~61m), [C-SPAN](https://www.c-span.org/program/campaign-2026/michigan-democratic-us-senate-candidates-debate/680080)
- **Helper in code:** `mackinacDebateClip(startSeconds, duration, title, quote)` — timestamps verified against WDIV ASR transcript

| Issue id | startSeconds | Timestamp | Quote (short) | Status |
| --- | ---: | --- | --- | --- |
| `money-out-of-politics` | 559 | 9:19 | Never taken a dime from a corporation | Added as `moreClips` |
| `cost-of-living` | 741 | 12:21 | Tax billionaires at seven percent of wealth | Added as `moreClips` |
| `aipac-and-dark-money` | 932 | 15:32 | Didn't ask AIPAC for support | Added as `moreClips` |
| `foreign-policy` | 932 | 15:32 | International law, not AIPAC money | Added as `moreClips` |
| `jewish-community-and-antisemitism` | 1382 | 23:02 | Antisemitism and Islamophobia / white supremacy | Added as `moreClips` |
| `abolishing-the-filibuster` | 1508 | 25:08 | Abolish the filibuster | Added as `moreClips` |
| `voting-rights` | 1549 | 25:49 | Biggest SCOTUS assault on Voting Rights Act | Added as `moreClips` |
| `supreme-court-reform` | 1549 | 25:49 | Same Voting Rights Act exchange | Added as `moreClips` |
| `ending-gerrymandering` | 1549 | 25:49 | Court / filibuster / how we cut districts | Added as `moreClips` |
| `democratic-party-strategy` | 1779 | 29:39 | Sand in the gears of Trump admin | Added as `moreClips` |
| `artificial-intelligence` | 2198 | 36:38 | AI is the oncoming tsunami | Added as `moreClips` |
| `data-centers-and-ai` | 2333 | 38:53 | Don't give data centers tax breaks / public utilities | Added as `moreClips` |
| `medicare-for-all` | 2521 | 42:01 | Fight for guaranteed healthcare | Added as `moreClips` |
| `public-health` | 2699 | 44:59 | First public health official in the Senate | Added as `moreClips` |
| `corporate-consolidation` | 2941 | 49:01 | Ban stock buybacks; labor on boards | Added as `moreClips` |
| `unions-and-worker-power` | 2986 | 49:46 | Labor on corporate boards | Added as `moreClips` |

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

mackinacDebateClip(
  1508,
  "0:55",
  "Mackinac debate: Short title",
  "Verbatim quote from the segment."
)
```

Verify embeds:
- WOOD: `https://www.youtube-nocookie.com/embed/9_R3JHg26qU?rel=0&start=SECONDS`
- Mackinac: `https://www.youtube-nocookie.com/embed/d5L9FFdEQe8?rel=0&start=SECONDS`
