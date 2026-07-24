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

| Title | YouTube | Length | Likely issue ids | Status |
| --- | --- | --- | --- | --- |
| Sumud Podcast clip — military spending as public health crisis | `73CPge7cgDI` | 0:52 | `foreign-policy`, `public-health` | **Added** as `moreClips` (whole clip @ 0) |
| Lever / Carville response clip | `8HdRuCChSAE` | 4:56 | `democratic-party-strategy` | **Added** @ 56s |
| Eyeing Office Ep. 1 (Drop Site News) | `feFaM3ZHxdA` | 15:27 | `medicare-for-all`, `cost-of-living`, `foreign-policy` | **Added** segments @ 56s, 136s |
| CBS News The Takeout — Major Garrett extended interview | `2FofXOB5T2s` | 30:29 | `artificial-intelligence`, `immigration-and-ice`, `aipac-and-dark-money`, `foreign-policy`, `medicare-for-all` | **Added** segments @ 402, 417, 583, 1011, 1517 |
| May Day 2026 — Fountain Street Church (Grand Rapids) | `eZj8BkBq0Ys` | 26:08 | `immigration-and-ice` | **Added** segment @ 263s |
| Lever Time — Macomb healthcare / AIPAC interview | podcast (Apple/iHeart) | ~51m | `medicare-for-all`, `aipac-and-dark-money` | Audio episode confirmed; YouTube mirror not found |
| C-SPAN — Detroit press conference | [C-SPAN event](https://www.c-span.org/event/campaign-2026/us-senate-candidate-abdul-el-sayed-d-mi-holds-press-conference-in-detroit/445411) | — | TBD | YouTube mirror TBD |
| Michigan Public — It's Just Politics interview | radio/podcast | — | TBD | YouTube mirror TBD |

### Timestamp notes (mined from auto-captions via yt-dlp android client)

- **CBS Takeout** `2FofXOB5T2s`: AIPAC/tax dollars ~402–444; AI under democracy ~583–628; data center in your backyard ~960–971; ICE paramilitary ~1011–1018; passport/authoritarianism ~1046–1054; Medicare for All works ~1517–1522
- **Drop Site** `feFaM3ZHxdA`: “shouldn't be this hard” / M4A ~56–79; Iran/taxpayer bombs ~136–151
- **May Day** `eZj8BkBq0Ys`: corporation buys your voice box ~807–818; ICE government thugs ~263–300; every worker's right to a union ~1378–1384; abolish ICE cheer ~1113
- **Carville response** `8HdRuCChSAE`: party elites vs people ~56–63

### Card structure changes (this pass)

- Split the mega **foreign-policy** card: kept diplomacy / Ukraine / Iran / China / Taiwan / aid there, and moved blank-check funding, Gaza/West Bank/Lebanon, and the arms embargo into a new **`gaza-and-military-aid`** card (slug `gaza`, hero = Sumud clip).
- Added **`crypto-and-blockchain`** (slug `crypto`) and **`science-and-research`** (slug `science`) cards, sourced to the *Money in Your Pocket* priority page.
- Cleaned redundant “He …” openers on every card so bullets read as predicates under the “What he has said” header.

## Gap still open

- `making-voting-easier` — no on-message Bluesky video and no debate/podcast segment yet for automatic registration / SAVE Act / early voting.

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
