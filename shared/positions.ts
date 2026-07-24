export type PositionCategory = "Economy" | "Healthcare" | "Democracy" | "Community" | "Foreign policy";

export type PositionSource = {
  label: string;
  url: string;
  publisher: string;
  kind: "Official video" | "Campaign position";
};

export type ClipPlatform = "YouTube" | "Instagram" | "TikTok" | "Facebook" | "Bluesky" | "X";

export type ClipOption = {
  platform: ClipPlatform;
  url: string;
};

export type PositionClip = {
  title: string;
  quote: string;
  url: string;
  platform: ClipPlatform;
  alternates?: ClipOption[];
  duration?: string;
  youtubeId?: string;
  /** Optional start offset for YouTube embeds (seconds from the beginning). */
  startSeconds?: number;
};

export type PositionIssue = {
  id: string;
  title: string;
  eyebrow: string;
  category: PositionCategory;
  summary: string;
  points: string[];
  tags: string[];
  clip?: PositionClip;
  /** Extra illustrative clips shown under the hero; do not invent policy bullets from these. */
  moreClips?: PositionClip[];
  /** Peer issue ids for the related-positions rail. */
  relatedIssueIds?: string[];
  source: PositionSource;
};

const campaignPriorities = "https://abdulforsenate.com/priorities/";
const moneyOut = "https://abdulforsenate.com/priority/money-out-of-politics/";
const moneyIn = "https://abdulforsenate.com/priority/money-in-your-pocket/";
const medicare = "https://abdulforsenate.com/priority/medicare-for-all-the-path-to-a-healthier-america/";
/** WOOD TV8 Democratic primary debate (El-Sayed vs Stevens), 2026-07-07. */
const woodDebateId = "9_R3JHg26qU";
/** Mackinac Policy Conference three-way debate (El-Sayed, Stevens, McMorrow), 2026-05-28 — WDIV Local 4. */
const mackinacDebateId = "d5L9FFdEQe8";
/** CBS News The Takeout — Major Garrett extended interview. */
const cbsTakeoutId = "2FofXOB5T2s";
/** Drop Site News — Eyeing Office Ep. 1. */
const dropSiteId = "feFaM3ZHxdA";
/** May Day 2026 speech — Fountain Street Church, Grand Rapids. */
const mayDayId = "eZj8BkBq0Ys";

function woodDebateClip(
  startSeconds: number,
  duration: string,
  title: string,
  quote: string
): PositionClip {
  return youtubeClip(woodDebateId, duration, title, quote, undefined, startSeconds);
}

function mackinacDebateClip(
  startSeconds: number,
  duration: string,
  title: string,
  quote: string
): PositionClip {
  return youtubeClip(mackinacDebateId, duration, title, quote, undefined, startSeconds);
}

function cbsTakeoutClip(
  startSeconds: number,
  duration: string,
  title: string,
  quote: string
): PositionClip {
  return youtubeClip(cbsTakeoutId, duration, title, quote, undefined, startSeconds);
}

function dropSiteClip(
  startSeconds: number,
  duration: string,
  title: string,
  quote: string
): PositionClip {
  return youtubeClip(dropSiteId, duration, title, quote, undefined, startSeconds);
}

function mayDayClip(
  startSeconds: number,
  duration: string,
  title: string,
  quote: string
): PositionClip {
  return youtubeClip(mayDayId, duration, title, quote, undefined, startSeconds);
}

function youtubeClip(
  youtubeId: string,
  duration: string,
  title: string,
  quote: string,
  alternates?: ClipOption[],
  startSeconds?: number
): PositionClip {
  const start =
    typeof startSeconds === "number" && Number.isFinite(startSeconds) && startSeconds > 0
      ? Math.floor(startSeconds)
      : undefined;
  const url = new URL(`https://www.youtube.com/watch?v=${youtubeId}`);
  if (start) url.searchParams.set("t", `${start}s`);

  return {
    youtubeId,
    duration,
    title,
    quote,
    url: url.toString(),
    platform: "YouTube",
    alternates,
    startSeconds: start
  };
}

function socialClip(
  platform: Exclude<PositionClip["platform"], "YouTube">,
  url: string,
  title: string,
  quote: string,
  alternates?: ClipOption[]
): PositionClip {
  return { platform, url, title, quote, alternates };
}

function videoSource(youtubeId: string): PositionSource {
  return {
    label: "Watch the original video",
    url: `https://www.youtube.com/watch?v=${youtubeId}`,
    publisher: "Abdul El-Sayed on YouTube",
    kind: "Official video"
  };
}

function campaignSource(url: string): PositionSource {
  return {
    label: "Read the campaign position",
    url,
    publisher: "Abdul for U.S. Senate",
    kind: "Campaign position"
  };
}

function socialVideoSource(platform: Exclude<PositionClip["platform"], "YouTube">, url: string): PositionSource {
  return {
    label: "Watch the original video",
    url,
    publisher: `Abdul El-Sayed on ${platform}`,
    kind: "Official video"
  };
}

export const positionIssues: PositionIssue[] = [
  {
    id: "medicare-for-all",
    title: "Medicare for All",
    eyebrow: "Guaranteed care",
    category: "Healthcare",
    summary: "El-Sayed supports automatic health coverage for every American, without premiums, copays, or deductibles.",
    points: [
      "Would expand Medicare to cover necessary care plus vision, dental, and hearing for every American from cradle to grave, without premiums, copays, or deductibles.",
      "Coverage would be automatic and accepted everywhere; additional union or employer insurance could still exist, though Medicare for All should make those choices redundant.",
      "Would abolish medical debt for every American, as he did for more than 300,000 Michiganders in Wayne County.",
      "Categorically opposes privatizing Medicare, cutting Medicaid, or destroying the ACA market by cutting subsidies, and would repeal those cuts from the “One Big Beautiful Bill” Act.",
      "Categorically opposes using AI to let any health insurer second-guess decisions made by a patient’s doctor."
    ],
    tags: ["healthcare", "health insurance", "universal coverage", "medical debt", "copays", "deductibles"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DXmZgyugIeS/",
      "Why Medicare for All is viable",
      "Do I truly believe Medicare for All is viable? I KNOW it is.",
      [
        { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mkfuyjbedc2d" },
        { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7633093574082514189" },
        { platform: "Facebook", url: "https://www.facebook.com/share/r/1EyFKPQbn2/" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2048425170239455678" },
        { platform: "YouTube", url: "https://www.youtube.com/watch?v=BjZLGRlwIpc" }
      ]
    ),
    moreClips: [
      socialClip(
        "Instagram",
        "https://www.instagram.com/reel/DXb9aYYgIIW/",
        "A guarantee, not another option",
        "People want to sell you on an “option.” We don’t need another insurance option. We need a GUARANTEE. That’s what Medicare for All is.",
        [
          { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mk3owsem5c2q" },
          { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7631623625879162125" },
          { platform: "Facebook", url: "https://www.facebook.com/share/r/1KVTqMm8FU/" },
          { platform: "X", url: "https://x.com/AbdulElSayed/status/2046956319584780297" }
        ]
      ),
      socialClip(
        "Instagram",
        "https://www.instagram.com/reel/DYM2So4t9-L/",
        "Protect nurses; pass Medicare for All",
        "Protect nurses. Stand with nurses. Pass Medicare for All.",
        [
          { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7638634085694311711" },
          { platform: "Facebook", url: "https://www.facebook.com/share/r/1Fdr5S963K/" },
          { platform: "X", url: "https://x.com/AbdulElSayed/status/2053836498529653188" }
        ]
      ),
      socialClip(
        "Instagram",
        "https://www.instagram.com/reel/DXC-ZmsjnvL/",
        "Public trust and Medicare for All",
        "Public trust is hard to earn and easy to lose. It’s not enough to push back on RFK Jr. if we’re not fixing the reason people lost trust in the system in the first place: that it’s motivated by greed. That’s why I fight for Medicare for All.",
        [
          { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mjdc4layvc25" },
          { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7627988677448174862" },
          { platform: "Facebook", url: "https://www.facebook.com/share/r/1DwNkmYE59/" },
          { platform: "X", url: "https://x.com/AbdulElSayed/status/2043440274823577947" }
        ]
      ),
      woodDebateClip(
        1980,
        "1:05",
        "Debate: Medicare for All without deductibles",
        "We need to tackle healthcare by guaranteeing everybody healthcare without a deductible, a premium, or a co-pay through Medicare for All."
      ),
      mackinacDebateClip(
        2521,
        "1:15",
        "Mackinac debate: Fight for guaranteed healthcare",
        "Revolution is definitely not coming if we're not fighting for it… I think we really can fight for a world where everybody can be guaranteed healthcare."
      ),
      dropSiteClip(
        56,
        "0:30",
        "Drop Site: Guarantee healthcare through Medicare for All",
        "It shouldn't be this hard to go and see a doctor when you get sick… guarantee healthcare to everybody through Medicare for all."
      ),
      cbsTakeoutClip(
        1517,
        "0:25",
        "CBS Takeout: Medicare for All can work",
        "I believe in Medicare for all cuz I did the research, wrote a whole book on it. And it can work."
      )
    ],
    relatedIssueIds: [
      "medicare-advantage",
      "break-up-big-healthcare",
      "public-health",
      "rural-healthcare",
      "veterans-affairs"
    ],
    source: campaignSource(medicare)
  },
  {
    id: "medicare-advantage",
    title: "Medicare & prescription drugs",
    eyebrow: "Lower drug costs",
    category: "Healthcare",
    summary: "El-Sayed supports expanding Medicare drug-price negotiation and ending pharmacy benefit managers that raise costs without providing essential care.",
    points: [
      "Supports empowering Medicare to negotiate prices for every prescription drug, and earlier after drugs hit the market.",
      "Wants those negotiated prices extended to all patients, not only people on Medicare.",
      "Supports public manufacturing of essential medicines such as insulin.",
      "Supports ending excessive drug-patent tactics that let Big Pharma prolong monopolies.",
      "Supports banning pharmacy benefit managers that price-gouge patients without providing an essential benefit."
    ],
    tags: ["seniors", "medicare advantage", "prescriptions", "insulin", "drug prices", "big pharma", "pbm"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DYAAVD4ApZf/",
      "Eliminate pharmacy benefit managers",
      "It’s time to eliminate the Pharmacy Benefit Manager industry.",
      [
        { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3ml6vivlemk2j" },
        { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7636784285470428430" },
        { platform: "Facebook", url: "https://www.facebook.com/share/v/1JcWnFtJo9/" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2052029842904830357" },
        { platform: "YouTube", url: "https://www.youtube.com/watch?v=lrn2M2kBG9M" }
      ]
    ),
    relatedIssueIds: ["medicare-for-all", "seniors-aging-affordably"],
    source: campaignSource(`${medicare}#h-prescription-drugs`)
  },
  {
    id: "rural-healthcare",
    title: "Rural healthcare & Medicaid",
    eyebrow: "Keep care close to home",
    category: "Healthcare",
    summary: "El-Sayed opposes Medicaid and ACA subsidy cuts, supports expanding public clinics and hospitals, and wants science-led public-health leadership.",
    points: [
      "Categorically opposes cutting Medicaid or destroying the ACA market by cutting subsidies, and would immediately repeal those cuts from the “One Big Beautiful Bill” Act.",
      "Would expand public healthcare by investing more in federally qualified health centers and public clinics and hospitals.",
      "Categorically opposes privatizing Medicare or selling guaranteed coverage off to corporations.",
      "Wants public-health leadership grounded in science and protected from political meddling."
    ],
    tags: ["rural", "medicaid", "hospitals", "aca", "public health", "up north"],
    clip: youtubeClip("W9C0q1cFQFQ", "2:08", "What federal healthcare cuts mean up north", "When they gut Medicaid, you’re going to have to pay the costs."),
    relatedIssueIds: ["medicare-for-all", "public-health"],
    source: campaignSource(medicare)
  },
  {
    id: "veterans-affairs",
    title: "Veterans Affairs",
    eyebrow: "Expand the VA, don’t cut it",
    category: "Healthcare",
    summary: "As a former Wayne County veterans services director, El-Sayed supports expanding and improving the VA so veterans have housing, jobs, and education support.",
    points: [
      "Supports expanding and improving the VA rather than cutting it.",
      "Says no veteran should go without housing, a good job, or an education.",
      "Would vastly expand VA services to meet those housing, employment, and education needs."
    ],
    tags: ["veterans", "va", "housing", "jobs", "education", "military families"],
    clip: socialClip(
      "Bluesky",
      "https://bsky.app/profile/abdulelsayed.bsky.social/post/3moqj67ra2c2y",
      "Keep the VA open for veterans",
      "There should be no such thing as an indigent veteran in America."
    ),
    relatedIssueIds: ["medicare-for-all", "housing"],
    source: campaignSource(`${medicare}#h-veterans-affairs`)
  },
  {
    id: "break-up-big-healthcare",
    title: "Break up Big Healthcare",
    eyebrow: "More choices, more worker power",
    category: "Healthcare",
    summary: "El-Sayed opposes hospital consolidation that shrinks patient choice and worker power, and supports giving the FTC authority to break up healthcare monopolies.",
    points: [
      "Opposes hospital mergers and acquisitions that leave patients with fewer choices and nurses, hospital workers, and doctors with less workplace power.",
      "Wants the FTC empowered to retrospectively review healthcare mergers and break up monopolies, and backs the Break Up Big Medicine Act.",
      "Would expand public healthcare by investing more in federally qualified health centers and public clinics and hospitals."
    ],
    tags: ["hospitals", "mergers", "antitrust", "ftc", "nurses", "fqhc", "monopoly"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DYSLDs9Avva/",
      "Hospital consolidation and monopoly",
      "Do you ever wonder why your hospital keeps changing its name?",
      [
        { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mlqn52f3pk2h" },
        { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7639407438898187534" },
        { platform: "Facebook", url: "https://www.facebook.com/share/v/1aQSuE8fve/" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2054592873878663366" }
      ]
    ),
    relatedIssueIds: ["medicare-for-all", "unions-and-worker-power"],
    source: campaignSource(`${medicare}#h-break-up-big-healthcare`)
  },
  {
    id: "public-health",
    title: "Public health",
    eyebrow: "Science-led, protected institutions",
    category: "Healthcare",
    summary: "El-Sayed supports insulating public-health leadership from political removal, confirming key advisors with Senate consent, and reinvesting in federal and local health agencies.",
    points: [
      "Supports fixed-term appointments for CDC Director, FDA Commissioner, and NIH Director that cannot be removed except under specific circumstances.",
      "Supports requiring Senate consent for appointments to critical public-health bodies such as the Advisory Committee on Immunization Practices.",
      "Supports reinvesting in and reforming CDC, FDA, and HRSA, and vastly increasing funding for local and state health departments."
    ],
    tags: ["public health", "cdc", "fda", "nih", "vaccines", "science", "local health departments"],
    clip: socialClip(
      "Bluesky",
      "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mja7fkizyc2k",
      "Holding RFK Jr. accountable",
      "As the first Democratic doctor in the U.S. Senate since 1969, you bet I’m going to hold him accountable for his dangerous lies."
    ),
    moreClips: [
      mackinacDebateClip(
        2699,
        "1:10",
        "Mackinac debate: First public health official in the Senate",
        "If I was elected, I'd be the first Democratic doctor elected to the U.S. Senate since 1969. First ever public health official elected to the U.S. Senate."
      ),
      youtubeClip(
        "73CPge7cgDI",
        "0:52",
        "Military spending as a public health crisis",
        "That money should not be spent in a billion dollars a day killing other people's children. It should be spent providing for our own."
      )
    ],
    relatedIssueIds: ["medicare-for-all", "rural-healthcare"],
    source: campaignSource(`${medicare}#h-public-health`)
  },
  {
    id: "immigration-and-ice",
    title: "Immigration & ICE",
    eyebrow: "Abolish ICE; secure the border",
    category: "Community",
    summary: "El-Sayed supports abolishing ICE and replacing it with an immigration system that enforces the law while respecting dignity and due process.",
    points: [
      "Says ICE has become a tool for autocracy whose culture of aggression, impunity, and disregard for the rule of law cannot be reformed or retrained, and must be abolished.",
      "Supports a safe, secure border and immigration enforcement under a new organizational structure grounded in human dignity and deference to the rule of law.",
      "Would repurpose ICE funds to build out immigration courts and a clear pathway to citizenship for people stuck in limbo.",
      "Frames immigration as people coming to build in America, and calls for replacing today’s broken, unpredictable system with a clear, comprehensive, and fair one."
    ],
    tags: ["immigration", "ice", "border", "deportation", "citizenship", "due process"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DYVHPE5Pi2S/",
      "ICE is not about immigration",
      "ICE is not about immigration. ICE is about normalizing the use of government thugs on your streets.",
      [
        { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mltitneti22s" },
        { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7639825485400231181" },
        { platform: "Facebook", url: "https://www.facebook.com/share/v/1HMmYGi5kM/" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2054999619755450600" },
        { platform: "YouTube", url: "https://www.youtube.com/watch?v=U4m9EcFK4pE" }
      ]
    ),
    moreClips: [
      socialClip(
        "Instagram",
        "https://www.instagram.com/reel/DXDWiAojJ_f/",
        "ICE cannot be reformed",
        "ICE cannot be reformed or retrained. ICE must be abolished.",
        [
          { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mjdnxoacxk2l" },
          { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7628042770430692621" },
          { platform: "Facebook", url: "https://www.facebook.com/share/r/18U3BT6CPL/" },
          { platform: "X", url: "https://x.com/AbdulElSayed/status/2044104880143401401" }
        ]
      ),
      socialClip(
        "Instagram",
        "https://www.instagram.com/reel/DXiJPJVjDfF/",
        "Better uses for ICE’s budget",
        "I can think of a few better things we could do with ICE’s 185 billion dollar budget to keep us safe in our communities.",
        [
          { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mkbpy5zr3s2l" },
          { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7632478020183362830" },
          { platform: "Facebook", url: "https://www.facebook.com/share/r/1DM5GgxfVY/" },
          { platform: "X", url: "https://x.com/AbdulElSayed/status/2047828804819624401" }
        ]
      ),
      woodDebateClip(
        3464,
        "1:05",
        "Debate: Abolish ICE",
        "I've been clear that you can't reform ICE. You can't retrain ICE. You have to abolish ICE."
      ),
      cbsTakeoutClip(
        1011,
        "0:20",
        "CBS Takeout: ICE is not about immigration",
        "ICE is not about immigration. ICE is not about the southern border. ICE is about normalizing paramilitary force on our streets."
      ),
      mayDayClip(
        263,
        "0:40",
        "May Day: ICE is about government thugs on your streets",
        "ICE is not about immigration. ICE is not about the southern border. ICE is about normalizing the use of government thugs on your streets."
      )
    ],
    relatedIssueIds: ["rule-of-law-and-accountability", "foreign-policy"],
    source: campaignSource(`${moneyOut}#h-immigration`)
  },
  {
    id: "unions-and-worker-power",
    title: "Unions & worker power",
    eyebrow: "Rebuild the middle class",
    category: "Economy",
    summary: "El-Sayed supports every worker’s right to join a union, earn a fair wage, and have unions at the table where the future of the economy is decided.",
    points: [
      "Believes every worker deserves the right to join a union and to earn a fair wage.",
      "Believes that one good job should pay enough to raise a family.",
      "Believes unions must have a significant voice at the tables where decisions about the future of the economy are made.",
      "Supports targeted, smart tariffs to protect Michigan manufacturing and incubate future industries with unions at the forefront, rather than reckless blanket tariffs.",
      "Supports protecting workers on the job and making publicly traded corporations accountable to their workers."
    ],
    tags: ["labor", "union", "workers", "wages", "uaw", "middle class"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DXuhKbUDwee/",
      "Wealth inequality and union power",
      "It’s no coincidence that wealth inequality in this country is surging at a time when we have more billionaires and less union representation than we’ve ever had.",
      [
        { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mknsqn3jo22j" },
        { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7634267373230460173" },
        { platform: "Facebook", url: "https://www.facebook.com/share/r/1E4DLEvQPg/" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2049567998927589583" },
        { platform: "YouTube", url: "https://www.youtube.com/watch?v=se_vMjOl_yI" }
      ]
    ),
    moreClips: [
      socialClip(
        "Instagram",
        "https://www.instagram.com/reel/DYSLDs9Avva/",
        "Hospital consolidation and monopoly",
        "Do you ever wonder why your hospital keeps changing its name?",
        [
          { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mlqn52f3pk2h" },
          { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7639407438898187534" },
          { platform: "Facebook", url: "https://www.facebook.com/share/v/1aQSuE8fve/" },
          { platform: "X", url: "https://x.com/AbdulElSayed/status/2054592873878663366" }
        ]
      ),
      socialClip(
        "Instagram",
        "https://www.instagram.com/reel/DYM2So4t9-L/",
        "Protect nurses",
        "Protect nurses. Stand with nurses. Pass Medicare for All.",
        [
          { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7638634085694311711" },
          { platform: "Facebook", url: "https://www.facebook.com/share/r/1Fdr5S963K/" },
          { platform: "X", url: "https://x.com/AbdulElSayed/status/2053836498529653188" }
        ]
      ),
      woodDebateClip(
        2655,
        "1:00",
        "Debate: UAW endorsement and working people",
        "I'm proud to have been endorsed by the UAW. And the reason that they've endorsed me is because they understand that I am a fighter for working people."
      ),
      mackinacDebateClip(
        2986,
        "0:45",
        "Mackinac debate: Labor on corporate boards",
        "Number one, we need to ban stock buybacks entirely. Number two, we need to put labor on corporate boards."
      ),
      mayDayClip(
        1378,
        "0:12",
        "May Day: Every worker's right to a union",
        "It is about building an economy where every single worker has the right to a union, where we finally tax billionaires their wealth."
      )
    ],
    relatedIssueIds: ["education", "break-up-big-healthcare", "cost-of-living"],
    source: campaignSource(`${moneyIn}#h-jobs-and-trade`)
  },
  {
    id: "money-out-of-politics",
    title: "Money out of politics",
    eyebrow: "No corporate checks",
    category: "Democracy",
    summary: "El-Sayed supports overturning Citizens United, banning major forms of corporate outside spending, and publicly funding elections.",
    points: [
      "Has never taken corporate money to run this campaign — and never will.",
      "Supports overturning Citizens United and banning outside spending through corporate 501(c)4s, Super PACs, and 527 groups.",
      "Supports public election funding and campaign spending caps."
    ],
    tags: ["campaign finance", "citizens united", "super pac", "dark money", "corporate pac", "aipac"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DYUnOe_AXIP/",
      "Money out of politics",
      "Money out of politics.",
      [
        { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mlsz5u5zk22l" },
        { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7639753398316698893" },
        { platform: "Facebook", url: "https://www.facebook.com/share/r/1EAbm65xbm/" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2054930026752045127" },
        { platform: "YouTube", url: "https://www.youtube.com/watch?v=VghjCiLxyLU" }
      ]
    ),
    moreClips: [
      socialClip(
        "Instagram",
        "https://www.instagram.com/reel/DYQjYHasKfD/",
        "Spirit Airlines and monopoly power",
        "Spirit just shut down. That’s just a small part of a much bigger problem. Here’s how it works…",
        [
          { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mlp2eftchk2r" },
          { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7639168332951784718" },
          { platform: "Facebook", url: "https://www.facebook.com/share/r/183RX5zvbz/" },
          { platform: "X", url: "https://x.com/AbdulElSayed/status/2054358077428613280" }
        ]
      ),
      woodDebateClip(
        2089,
        "1:05",
        "Debate: Politicians bought off by corporations",
        "We also don't need politicians bought off by corporations in this race."
      ),
      mackinacDebateClip(
        559,
        "0:50",
        "Mackinac debate: Never taken corporate money",
        "I'm the only candidate on the stage who has never taken a dime from a corporation to run a campaign and never will."
      ),
      mayDayClip(
        807,
        "0:15",
        "May Day: When a corporation buys your voice box",
        "Where are the politicians with the bold ideas? It turns out there are no bold ideas when a corporation buys your voice box and tells you you can't have bold ideas."
      )
    ],
    relatedIssueIds: ["aipac-and-dark-money", "cost-of-living", "corporate-consolidation"],
    source: campaignSource(`${moneyOut}#h-banning-corporate-money-in-politics`)
  },
  {
    id: "ending-gerrymandering",
    title: "Ending gerrymandering",
    eyebrow: "Nonpartisan maps",
    category: "Democracy",
    summary: "El-Sayed supports drawing congressional districts through a federal nonpartisan expert committee rather than partisan state governments.",
    points: [
      "Supports a federal nonpartisan committee of experts to draw congressional districts.",
      "Committee members would be appointed for defined terms on a rolling basis and work alongside the U.S. Census Bureau, similar to the Federal Reserve Board.",
      "Frames that structure as the closest practical way to eliminate partisan gerrymandering tied to state apportionment."
    ],
    tags: ["gerrymandering", "redistricting", "voting maps", "census", "democracy", "elections"],
    clip: socialClip(
      "Bluesky",
      "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mknsvnjhsc2p",
      "Racial gerrymandering and equal representation",
      "The SCOTUS decision today guts the prohibition on racial gerrymandering, effectively using the redlining of the past to rob Black folks of equal representation in the future."
    ),
    moreClips: [
      mackinacDebateClip(
        1549,
        "0:40",
        "Mackinac debate: Districts, Court, and democracy reform",
        "Whether it's the Supreme Court or it's the filibuster or it's the way we cut our districts apart, we've got to really rethink democracy to make it work for the people again."
      )
    ],
    relatedIssueIds: [
      "making-voting-easier",
      "voting-rights",
      "supreme-court-reform",
      "abolishing-the-filibuster"
    ],
    source: campaignSource(`${moneyOut}#h-ending-gerrymandering`)
  },
  {
    id: "supreme-court-reform",
    title: "Supreme Court reform",
    eyebrow: "Term limits for justices",
    category: "Democracy",
    summary: "El-Sayed supports reforming the Supreme Court by ending lifetime appointments, imposing limited terms, and equalizing appointments across presidential terms.",
    points: [
      "Says the Roberts Court has moved to limit voting rights, civil rights, and reproductive rights while expanding Trump’s power, making the Court itself a major impediment to democracy.",
      "Supports ending lifetime appointments to the Supreme Court.",
      "Supports imposing limited terms for justices.",
      "Supports allowing the same number of appointments for each presidential term."
    ],
    tags: ["supreme court", "term limits", "judiciary", "democracy", "voting rights", "civil rights"],
    clip: socialClip(
      "Bluesky",
      "https://bsky.app/profile/abdulelsayed.bsky.social/post/3m6uhi37m5s25",
      "Supreme Court reform",
      "Supreme Court reform? I'm down."
    ),
    moreClips: [
      mackinacDebateClip(
        1549,
        "0:35",
        "Mackinac debate: Biggest assault on the Voting Rights Act",
        "We've just seen the biggest assault from the Supreme Court on the Voting Rights Act in our history."
      )
    ],
    relatedIssueIds: [
      "making-voting-easier",
      "voting-rights",
      "ending-gerrymandering",
      "abolishing-the-filibuster"
    ],
    source: campaignSource(`${moneyOut}#h-supreme-court-reform`)
  },
  {
    id: "abolishing-the-filibuster",
    title: "Abolishing the filibuster",
    eyebrow: "Majority rule in the Senate",
    category: "Democracy",
    summary: "El-Sayed calls the Senate filibuster antidemocratic and supports abolishing it.",
    points: [
      "Says the filibuster has been used by senators to shield one another from hard votes.",
      "Believes the filibuster is antidemocratic and should be abolished."
    ],
    tags: ["filibuster", "senate", "majority rule", "democracy", "legislative process"],
    clip: socialClip(
      "Bluesky",
      "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mmwrnljp6s2q",
      "Abolish the filibuster",
      "Abolish the filibuster."
    ),
    moreClips: [
      mackinacDebateClip(
        1508,
        "0:55",
        "Mackinac debate: Abolish the filibuster",
        "I believe we have to abolish the filibuster. We have to expose senators to democracy again so that they have to answer to their voting public."
      )
    ],
    relatedIssueIds: [
      "making-voting-easier",
      "voting-rights",
      "ending-gerrymandering",
      "supreme-court-reform"
    ],
    source: campaignSource(`${moneyOut}#h-abolishing-the-filibuster`)
  },
  {
    id: "cost-of-living",
    title: "Cost of living",
    eyebrow: "Put money in your pocket",
    category: "Economy",
    summary: "El-Sayed argues that working people are being priced out, and that taxing billionaire wealth can fund schools, healthcare, and infrastructure.",
    points: [
      "Supports a cost-of-living exemption on federal taxes for the first $50,000 of income.",
      "Supports a billionaire tax on wealth over $1 billion and raising the marginal tax rate on earnings over $1 million.",
      "Supports taxing capital gains over $1 million at the same rate as ordinary income and closing the stepped-up basis loophole.",
      "Supports taxing inheritances greater than $1 million like ordinary income and imposing a progressive tax on wealth held by trusts.",
      "Supports closing the Social Security payroll-tax cap so high earners pay their fair share and Social Security stays solvent."
    ],
    tags: ["affordability", "inflation", "groceries", "prices", "family budget", "monopoly", "taxes", "billionaire tax"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DXKbpGqjuvs/",
      "Our Fair Share Tax Agenda",
      "We tax billionaire wealth so we can pay for good schools, universal guaranteed health care, and solid infrastructure.",
      [
        { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mjklocuna22m" },
        { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7629068182673755405" },
        { platform: "Facebook", url: "https://www.facebook.com/share/v/1L9kXAqq3D/" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2044490834075099602" },
        { platform: "YouTube", url: "https://www.youtube.com/watch?v=RNXI7_U9ZPQ" }
      ]
    ),
    moreClips: [
      socialClip(
        "Instagram",
        "https://www.instagram.com/reel/DYIN7oruB_m/",
        "Food prices and corporate greed",
        "They want way more money for the same exact thing. And it’s not just groceries.",
        [
          { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mlgvugrqak2i" },
          { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7637966262533950733" },
          { platform: "Facebook", url: "https://www.facebook.com/share/r/187P4YLwQh/" },
          { platform: "X", url: "https://x.com/AbdulElSayed/status/2053184829273845847" }
        ]
      ),
      woodDebateClip(
        1967,
        "1:10",
        "Debate: Michiganders can't afford to live here",
        "No matter where I go, people say the same thing. I just can't afford to live here anymore."
      ),
      mackinacDebateClip(
        741,
        "0:40",
        "Mackinac debate: Seven percent billionaire wealth tax",
        "I would like to see us tax billionaires at seven percent of their wealth… you know what they still are? Still a billionaire."
      ),
      dropSiteClip(
        56,
        "0:25",
        "Drop Site: It shouldn't be this hard",
        "It shouldn't be this hard to afford a second bag of groceries. It shouldn't be this hard to know that your kid goes to a dignified school."
      )
    ],
    relatedIssueIds: ["housing", "corporate-consolidation", "money-out-of-politics"],
    source: campaignSource(`${moneyIn}#h-taxing-billionaire-wealth`)
  },
  {
    id: "small-business-healthcare",
    title: "Small businesses & healthcare",
    eyebrow: "Separate care from employment",
    category: "Economy",
    summary: "El-Sayed argues that every American deserves guaranteed healthcare regardless of what they do for work, so coverage is not tied to an employer.",
    points: [
      "Believes every American deserves guaranteed healthcare regardless of what they do for work.",
      "His Medicare for All plan would make coverage automatic from cradle to grave, without premiums, copays, or deductibles.",
      "Would abolish medical debt for every American, as he did for more than 300,000 Michiganders in Wayne County."
    ],
    tags: ["small business", "entrepreneur", "employer insurance", "restaurant", "health benefits"],
    clip: youtubeClip("TvfEHzT9wnI", "1:25", "Healthcare and a Detroit small business", "It’s so hard for us to even offer the health insurance to people."),
    relatedIssueIds: ["medicare-for-all", "cost-of-living"],
    source: campaignSource(medicare)
  },
  {
    id: "data-centers-and-ai",
    title: "Data centers",
    eyebrow: "Our communities, our terms",
    category: "Economy",
    summary: "El-Sayed’s Terms of Engagement would require data centers to cover their own energy costs, deliver promised local jobs, and protect community water resources.",
    points: [
      "Data centers must pay for their own energy demand so costs are not passed onto ratepayers.",
      "Energy reliability cannot worsen because of data-center projects; utilities must make enforceable reliability improvements funded by data-center revenues.",
      "Data centers must create the local jobs they promise or face penalties, and be built by Michigan contractors with DOL-registered apprenticeship programs.",
      "Projects must use closed-loop cooling, give communities a meaningful say in approvals, and include binding community-benefits agreements for local infrastructure.",
      "Utilities cannot use data-center projects to weaken or sidestep clean-energy laws, and all agreements must be enforceable through actionable penalties."
    ],
    tags: ["data center", "dte", "electric bills", "technology", "jobs", "water", "energy"],
    clip: youtubeClip("oNFAVuNPdsk", "1:47", "Terms of engagement for data centers", "If you promise jobs, deliver those jobs."),
    moreClips: [
      mackinacDebateClip(
        2333,
        "0:50",
        "Mackinac debate: Don't give data centers tax breaks",
        "You voted to give data centers tax breaks, our tax dollars, to build data centers… I think we need to regulate AI and AI corporations as public utilities."
      ),
      cbsTakeoutClip(
        960,
        "0:15",
        "CBS Takeout: A data center in your backyard",
        "If you want someone who's serious about taking on big AI and the folks who want to put a data center in your backyard… I might just be your guy."
      )
    ],
    relatedIssueIds: ["artificial-intelligence", "crypto-and-blockchain"],
    source: campaignSource("https://abdulforsenate.com/2026/01/datacenters/")
  },
  {
    id: "artificial-intelligence",
    title: "Artificial intelligence",
    eyebrow: "AI under democracy",
    category: "Economy",
    summary: "El-Sayed’s AI Under Democracy plan would put frontier AI under public-benefit governance, public ownership stakes, and hard safety guardrails.",
    points: [
      "Supports mandatory public-benefit charters for frontier AI labs, with majority public or democratically elected board control.",
      "Would require major platform companies like Google, Microsoft, Amazon, and Meta to divest their controlling interests in frontier AI labs.",
      "Supports public ownership stakes in the largest AI companies, an annual AI dividend funded by returns, and an automation levy reinvested in workers through education, wage insurance, and small-business loans.",
      "Supports an FDA-style independent safety-testing agency with interpretability standards, red-teaming, incident reporting, and compute “know your customer” controls.",
      "Would ban AI from denying medical care, making hiring or firing decisions, conducting warrantless surveillance, or replacing human oversight in life-or-death decisions.",
      "Supports banning deceptive AI-generated political media, requiring disclosure of AI-generated political ads, and a federal task force on algorithmic disinformation."
    ],
    tags: ["artificial intelligence", "ai", "automation", "big tech", "jobs", "safety", "democracy"],
    clip: socialClip(
      "Bluesky",
      "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mnbcugonkk2w",
      "Real AI regulation and guardrails",
      "We need real AI regulation to create guardrails and protect the ability for young people to have a job."
    ),
    moreClips: [
      mackinacDebateClip(
        2198,
        "1:10",
        "Mackinac debate: AI is the oncoming tsunami",
        "AI is the oncoming tsunami. We need legislation… We need leaders who understand the technology and are willing to stand up on it and protect humanity."
      ),
      cbsTakeoutClip(
        583,
        "0:35",
        "CBS Takeout: AI under democracy",
        "AI is new technology, but democracy is old technology, one we love in America. And I'm saying that AI needs to sit under democracy."
      )
    ],
    relatedIssueIds: ["data-centers-and-ai", "crypto-and-blockchain", "cost-of-living", "corporate-consolidation"],
    source: campaignSource("https://abdulforsenate.com/2026/06/first-do-no-harm-ai-under-democracy/")
  },
  {
    id: "crypto-and-blockchain",
    title: "Crypto & financial technology",
    eyebrow: "Consumer protection first",
    category: "Economy",
    summary:
      "El-Sayed supports clear rules for blockchain and financial technology that protect consumers from fraud, laundering, and pay-to-play corruption while preserving legitimate uses.",
    points: [
      "Says blockchain has the potential to disrupt the overwhelming power of big banks in Americans’ financial lives.",
      "Supports legislation that clarifies the governance and legitimate use-cases of blockchain for financial services.",
      "Supports protecting consumers and the public from those who would use financial technology to launder funds, defraud the public, or engage in corruption — including pump-and-dump schemes, speculative crypto tokens and scams, and pay-to-play schemes."
    ],
    tags: ["crypto", "cryptocurrency", "blockchain", "fintech", "consumer protection", "fraud", "big banks"],
    relatedIssueIds: ["corporate-consolidation", "artificial-intelligence", "cost-of-living"],
    source: campaignSource(moneyIn)
  },
  {
    id: "science-and-research",
    title: "Science & research",
    eyebrow: "Invest more, not less",
    category: "Economy",
    summary:
      "El-Sayed wants to invest more in federal science and university research rather than gut it, and ensure the taxpayers who fund it share in the returns.",
    points: [
      "Calls research and development among America’s most important assets and wants to invest in the research, development, and growth of the technologies of the future.",
      "Opposes gutting critical research agencies like the National Science Foundation and the National Institutes of Health, and would instead invest more and faster.",
      "Believes the taxpayers who fund federal research should earn back the returns on their investment."
    ],
    tags: ["science", "research", "nsf", "nih", "innovation", "universities", "r&d"],
    relatedIssueIds: ["public-health", "artificial-intelligence", "education"],
    source: campaignSource(`${moneyIn}#h-jobs-and-trade`)
  },
  {
    id: "family-farms",
    title: "Family farms",
    eyebrow: "Keep Michigan agriculture local",
    category: "Economy",
    summary: "El-Sayed supports redirecting farm subsidies toward family farms, specialty crops, and diversified agriculture.",
    points: [
      "Proposes capping individual subsidy payments at $250,000 per year and redirecting dollars toward specialty crops, diversified agriculture, and regenerative farming.",
      "Supports targeted, negotiated trade protections for Michigan specialty crops rather than blanket tariffs that raise farmers’ costs and invite retaliation.",
      "Backs reforming the H-2A guest-worker program through the Farm Workforce Modernization Act, with pathways to legal status for immigrant farmworkers.",
      "Champions a federal right-to-repair law for farm equipment."
    ],
    tags: ["agriculture", "farm", "cherries", "subsidies", "right to repair", "rural", "tariffs"],
    clip: youtubeClip("BT54YJt5ess", "2:56", "How to help Michigan family farms", "We don’t want to see agriculture be corporatized."),
    relatedIssueIds: ["climate-and-agriculture", "cost-of-living"],
    source: campaignSource(`${moneyIn}#h-farming`)
  },
  {
    id: "climate-and-agriculture",
    title: "Climate & agriculture",
    eyebrow: "Protect livelihoods and land",
    category: "Community",
    summary: "El-Sayed supports a transition to renewable energy built around union jobs and stronger protection for communities facing pollution and extreme weather.",
    points: [
      "Supports a pathway to 100% renewable energy with massive investment in solar, wind, battery storage, a modernized smart grid, and energy-efficiency upgrades built on good union jobs.",
      "Wants to codify the Endangerment Finding into law so no administration can strip EPA authority to regulate greenhouse gases by executive order.",
      "Supports strengthening air-quality standards for cumulative pollution burdens and strengthening NEPA so communities have a meaningful voice before fossil-fuel projects are permitted.",
      "Supports making environmental justice an explicit mandate of every federal agency with authority over air and water.",
      "Supports shutting down Line 5 to protect the Great Lakes while making the line safer in the meantime without destroying sensitive environmental or tribal sites."
    ],
    tags: ["climate", "renewable energy", "pollution", "environment", "farm", "solar", "wind"],
    clip: youtubeClip("6I_5VJNLqiw", "2:26", "Agriculture, climate, immigration, and trade", "When you talk about agriculture, you’re also talking about climate change and immigration and tariffs."),
    relatedIssueIds: ["family-farms", "water-and-great-lakes"],
    source: campaignSource(`${moneyOut}#h-environment-and-natural-resources`)
  },
  {
    id: "foreign-policy",
    title: "War & foreign policy",
    eyebrow: "Diplomacy before war",
    category: "Foreign policy",
    summary:
      "El-Sayed favors a foreign policy centered on diplomacy, human rights, and standing with democratic allies — from Ukraine to Iran, China, and Taiwan.",
    points: [
      "Supports a foreign policy that centers diplomacy, cooperation, and human rights, and that stands with democratic allies.",
      "Supports Ukraine against Russia’s invasion as acting in the interest of human rights and democracy, and criticizes past rule-breaking interventions such as Vietnam, Iraq, and Palestine.",
      "Opposes the Iran war, demands an immediate end to hostilities, and argues diplomacy (as under the JCPOA) is more effective than war at preventing a nuclear-armed Iran.",
      "Opposes a warlike pathway with China, favoring economic and research competition over a zero-sum arms race while insisting China play by trade and intellectual-property rules.",
      "Says Taiwan’s future should be chosen by the Taiwanese through democratic means, and supports onshoring critical national-security assets such as chip manufacturing.",
      "Supports reinvestment in foreign aid, including to UNRWA, and meaningful U.S. engagement in the WHO, the Conference of the Parties, and the Paris Agreement on global health and climate threats."
    ],
    tags: [
      "iran",
      "war",
      "foreign policy",
      "military",
      "diplomacy",
      "ukraine",
      "china",
      "taiwan",
      "gaza",
      "israel",
      "palestine",
      "arms embargo",
      "unrwa",
      "aid"
    ],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DXURjD5ADfV/",
      "Equal rights to peace and self-determination",
      "All people deserve equal rights to peace, dignity, and self-determination.",
      [
        { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mju76hedy22f" },
        { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7630484120560323854" },
        { platform: "Facebook", url: "https://www.facebook.com/share/r/1CNdd4cZqp/" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2045876168469995621" },
        { platform: "YouTube", url: "https://www.youtube.com/watch?v=ZthabYiMQ-g" }
      ]
    ),
    moreClips: [
      mackinacDebateClip(
        932,
        "1:05",
        "Mackinac debate: International law, not AIPAC money",
        "It's AIPAC money which is being spent already in this race… I believe international law ought to guide how we engage with our allies and our opponents."
      ),
      dropSiteClip(
        136,
        "0:30",
        "Drop Site: Taxpayer dollars bombing without justification",
        "This is our taxpayer dollars being spent to bomb another country without justification of any real imminent threat to the United States or its interests."
      )
    ],
    relatedIssueIds: ["gaza-and-military-aid", "jewish-community-and-antisemitism", "aipac-and-dark-money", "public-health"],
    source: campaignSource(`${moneyOut}#h-sensible-foreign-policy`)
  },
  {
    id: "gaza-and-military-aid",
    title: "Gaza, Israel & military aid",
    eyebrow: "End the blank check",
    category: "Foreign policy",
    summary:
      "El-Sayed opposes blank-check U.S. military funding abroad, supports an arms embargo on Israel, and says American tax dollars must not fund what he calls a genocide in Gaza.",
    points: [
      "Opposes blank-check funding to foreign militaries — including Egypt, Israel, Saudi Arabia, and the UAE — arguing taxpayer dollars should be spent at home on schools and healthcare.",
      "Says U.S. tax dollars and American-made weapons are being used in a genocide in Gaza, illegal settlements in the West Bank and Jerusalem, and the attempted annexation of southern Lebanon, and that it must end.",
      "Supports immediate, comprehensive enforcement of U.S. laws that condition military aid and sales, an immediate arms embargo on Israel, and rejects the false distinction between “offensive” and “defensive” weapons."
    ],
    tags: ["gaza", "israel", "palestine", "military aid", "arms embargo", "west bank", "lebanon", "genocide", "unrwa"],
    clip: youtubeClip(
      "73CPge7cgDI",
      "0:52",
      "Military spending, Gaza, and our tax dollars",
      "That money should not be spent in a billion dollars a day killing other people's children. It should be spent providing for our own."
    ),
    moreClips: [
      cbsTakeoutClip(
        417,
        "0:35",
        "CBS Takeout: Tax dollars for Michigan, not bombs abroad",
        "The biggest spender in a race for Senate in Michigan wants to take your tax dollars and not spend them on your kids or your schools… It wants to spend them to buy bombs and tanks for foreign governments."
      ),
      woodDebateClip(
        2278,
        "1:10",
        "Debate: AIPAC and wars Michiganders shouldn't fight",
        "And so long as our politicians continue to be bought off by AIPAC, do not be surprised when we fight wars that are in their best interest."
      )
    ],
    relatedIssueIds: ["foreign-policy", "aipac-and-dark-money", "jewish-community-and-antisemitism"],
    source: campaignSource(`${moneyOut}#h-sensible-foreign-policy`)
  },
  {
    id: "corporate-consolidation",
    title: "Corporate monopolies",
    eyebrow: "More choices, less price-gouging",
    category: "Economy",
    summary: "El-Sayed supports stronger federal antitrust enforcement so corporations cannot price-gouge families or hollow out good jobs.",
    points: [
      "Supports a muscular Federal Trade Commission that enforces anti-monopoly laws against corporate price-gouging.",
      "Wants laws that stop Wall Street speculators from wrecking good companies and killing good jobs.",
      "Supports forcing publicly traded corporations to be accountable to their workers and keeping unions at the table as economic policy is set."
    ],
    tags: ["antitrust", "monopoly", "mergers", "ftc", "corporations", "price gouging", "competition"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DXcKc1fjbcE/",
      "Monopoly is the biggest risk to capitalism",
      "Monopoly is the biggest risk to capitalism. Government needs to protect us from it.",
      [
        { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mk3vaq5bns2q" },
        { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7631619224347200782" },
        { platform: "Facebook", url: "https://www.facebook.com/share/r/1KzgGtdu9x/" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2046985038915338498" },
        { platform: "YouTube", url: "https://www.youtube.com/watch?v=v1_0UVF3T68" }
      ]
    ),
    moreClips: [
      woodDebateClip(
        1988,
        "0:55",
        "Debate: Stand up to monopolies",
        "We need to stand up to the monopolies and oligopolies that are picking our pockets."
      ),
      mackinacDebateClip(
        2941,
        "1:20",
        "Mackinac debate: Ban stock buybacks, put labor on boards",
        "Number one, we need to ban stock buybacks entirely. Number two, we need to put labor on corporate boards."
      )
    ],
    relatedIssueIds: ["cost-of-living", "unions-and-worker-power", "money-out-of-politics"],
    source: campaignSource(`${moneyIn}#h-jobs-and-trade`)
  },
  {
    id: "housing",
    title: "Housing & renters",
    eyebrow: "Build more; protect renters",
    category: "Economy",
    summary: "El-Sayed supports a large increase in housing construction, a federal renters’ bill of rights, and restrictions on corporate speculation in homes.",
    points: [
      "Calls for a building boom through massive investment in new housing and streamlining local regulations that make it too hard to build.",
      "Wants to ban large corporations that speculate on housing stock from owning homes at all.",
      "Supports federal legislation banning algorithmic rental price-fixing software that lets corporate landlords collude to raise rent.",
      "Wants Big Tech short-term rental platforms like Airbnb and VRBO to pay special housing-dislocation fees for the stock they occupy.",
      "Supports a federal renter bill of rights that protects renters from exploitation and unfair evictions and clarifies landlord obligations nationwide."
    ],
    tags: ["housing", "rent", "renters", "homelessness", "landlords", "airbnb", "homes", "big tech", "algorithmic rent"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DYXmsEbuVG-/",
      "Abdul’s plan for housing",
      "Building affordable housing all over the country.",
      [
        { platform: "Facebook", url: "https://www.facebook.com/share/r/1BCXr2fuPy/" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2055350302610522521" }
      ]
    ),
    moreClips: [
      youtubeClip(
        "06_-88XQ_F8",
        "1:04",
        "Stop the Big Techification of housing",
        "We've got to stop the Big Techification of our housing.",
        [
          { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7641703085047401742" },
          { platform: "Facebook", url: "https://www.facebook.com/reel/1492587468975908/" }
        ]
      ),
      woodDebateClip(
        219,
        "1:00",
        "Debate: Housing crisis and corporate accountability",
        "Corporations should not be able to buy politicians to do their bidding to allow them to go to wars to allow them to get away when they cause a banking and now a housing crisis."
      )
    ],
    relatedIssueIds: ["cost-of-living", "corporate-consolidation"],
    source: campaignSource(`${moneyIn}#h-housing-and-homelessness`)
  },
  {
    id: "education",
    title: "Public education",
    eyebrow: "Invest from childcare through college",
    category: "Community",
    summary: "El-Sayed supports universal childcare and pre-K, stronger public-school funding, and tuition-free pathways through college, trades, or apprenticeships.",
    points: [
      "Supports universal childcare, universal pre-K, and comprehensive public K–12 education, plus massive investment in school infrastructure.",
      "Supports raising the minimum teacher salary to at least $60,000 a year and investing more in nurses, psychologists, social workers, and other wraparound staff.",
      "Opposes privatizing public education through vouchers and supports fully funding the Individuals with Disabilities Education Act.",
      "Proposes tying any percentage increase in national education funding to any equivalent increase in the national defense budget.",
      "Backs debt-free, tuition-free pathways through apprenticeships or college, with more funding for HBCUs, community colleges, and trade schools.",
      "Would cap administrative overhead at institutions receiving federal funding to rein in higher-education costs."
    ],
    tags: ["schools", "teachers", "childcare", "pre-k", "college", "student debt", "trades", "apprenticeship"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/p/DYFW3VeAL5g/",
      "Michigan teachers on public education",
      "Teachers make our world go round.",
      [
        { platform: "Facebook", url: "https://www.facebook.com/share/r/19V3iMGxgj/" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2052782767964901584" }
      ]
    ),
    relatedIssueIds: ["unions-and-worker-power", "cost-of-living"],
    source: campaignSource(`${moneyIn}#h-education`)
  },
  {
    id: "water-and-great-lakes",
    title: "Water & the Great Lakes",
    eyebrow: "Clean water is a guarantee",
    category: "Community",
    summary: "El-Sayed supports a federal clean-water guarantee, faster lead-pipe replacement, stronger PFAS enforcement, and shutting down Line 5.",
    points: [
      "Supports a federal water guarantee — at least 50 gallons per person per day, bills capped at 2% of household income, and protection from shutoffs for families who can't pay.",
      "Wants every lead pipe in Michigan’s water systems removed by 2030 — seven years ahead of the current federal deadline.",
      "Supports holding polluters accountable for PFAS contamination and ensuring corporate farms taking federal dollars are accountable for agricultural runoff.",
      "Supports federal funding to modernize aging drainage and purification systems.",
      "Supports shutting down Line 5 to protect the Great Lakes, while making the line safer in the meantime without destroying sensitive environmental or tribal sites."
    ],
    tags: ["water", "great lakes", "line 5", "pfas", "lead pipes", "flint", "water bills"],
    clip: socialClip(
      "Bluesky",
      "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mom54aph2s2v",
      "Clean water to drink, cook, and bathe",
      "Shouldn't be this hard to have clean water to drink, clean, cook, and bathe."
    ),
    relatedIssueIds: ["climate-and-agriculture"],
    source: campaignSource(`${moneyOut}#h-water`)
  },
  {
    id: "seniors-aging-affordably",
    title: "Seniors & aging affordably",
    eyebrow: "Lower costs; support independence",
    category: "Healthcare",
    summary: "El-Sayed’s Aging Affordably in America plan would end Medicare cost-sharing, strengthen Social Security, and expand support for aging at home.",
    points: [
      "Proposes ending Medicare premiums, deductibles, and co-pays so seniors get first-dollar coverage, and expanding coverage for vision, dental, and hearing.",
      "Supports expanding Medicare drug-price negotiation to all drugs paid by Medicare and banning AI-based prior authorization that overrides physician judgment.",
      "Supports repealing the Windfall Elimination Provision and Government Pension Offset that cut Social Security for many public employees.",
      "Supports lifting the Social Security payroll-tax cap and ending federal taxes on Social Security benefits.",
      "Proposes a federal framework for state property-tax freezes for homeowners 65 and older so they can afford to age in place.",
      "Would expand Medicaid home- and community-based services, end the financing bias toward nursing homes over home care, and create a federal caregiver tax credit with respite care."
    ],
    tags: ["seniors", "aging", "medicare", "social security", "property tax", "caregivers", "long-term care"],
    clip: socialClip(
      "Bluesky",
      "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mnfc4c3cmc2r",
      "Aging Affordably in America",
      "They deserve Medicare that covers all their health needs, Social Security they can live on, and a home they can afford to stay in."
    ),
    relatedIssueIds: ["medicare-for-all", "medicare-advantage"],
    source: campaignSource("https://abdulforsenate.com/2026/06/the-aaa-plan-for-seniors-aging-affordably-in-america")
  },
  {
    id: "making-voting-easier",
    title: "Making voting easier",
    eyebrow: "Automatic registration & early voting",
    category: "Democracy",
    summary: "El-Sayed opposes mandatory voter-ID barriers and supports automatic registration, Election Day holidays, and no-reason absentee and early voting.",
    points: [
      "Opposes mandatory voter ID laws like the SAVE Act that impose unnecessary barriers to voting.",
      "Supports automatic voter registration at age 18 and automatic re-registration when people move.",
      "Supports making election days holidays and requiring no-reason absentee and early in-person voting."
    ],
    tags: ["voting", "voter id", "save act", "absentee", "early voting", "election day", "registration"],
    relatedIssueIds: [
      "voting-rights",
      "ending-gerrymandering",
      "supreme-court-reform",
      "abolishing-the-filibuster"
    ],
    source: campaignSource(`${moneyOut}#h-making-voting-easier`)
  },
  {
    id: "voting-rights",
    title: "Voting rights",
    eyebrow: "Protect equal access to the ballot",
    category: "Democracy",
    summary: "El-Sayed supports federal voting-rights protections, including passage of the John Lewis Voting Rights Advancement Act.",
    points: [
      "Supports passage of the John Lewis Voting Rights Advancement Act.",
      "Has tied that legislation to the need to respond to a recent Supreme Court voting-rights decision.",
      "Contrasts segregation with real equity in discussing voting rights."
    ],
    tags: ["voting rights", "john lewis", "elections", "ballot access", "supreme court", "democracy"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/p/DYH3ATfgMEF/",
      "Pass the John Lewis Voting Rights Act",
      "Congress needs to pass the John Lewis Voting Rights Act.",
      [
        { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7637915655546752269" },
        { platform: "Facebook", url: "https://www.facebook.com/share/r/18pJaK17EY/" },
        { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mlgkramruc2i" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2053135720387055734" }
      ]
    ),
    moreClips: [
      mackinacDebateClip(
        1549,
        "0:35",
        "Mackinac debate: Assault on the Voting Rights Act",
        "We've just seen the biggest assault from the Supreme Court on the Voting Rights Act in our history."
      )
    ],
    relatedIssueIds: [
      "making-voting-easier",
      "ending-gerrymandering",
      "supreme-court-reform"
    ],
    source: socialVideoSource("Instagram", "https://www.instagram.com/p/DYH3ATfgMEF/")
  },
  {
    id: "aipac-and-dark-money",
    title: "AIPAC & dark money",
    eyebrow: "Voters, not outside spenders",
    category: "Democracy",
    summary: "El-Sayed opposes AIPAC-backed outside spending and argues that large political expenditures should not determine who represents Michigan.",
    points: [
      "Believes Michigan's Senate seat should be decided by Michigan voters, not by outside spending.",
      "Supports removing dark money and corporate influence from elections.",
      "Distinguishes criticism of AIPAC and the Israeli government from hostility toward Jewish people."
    ],
    tags: ["aipac", "dark money", "campaign finance", "outside spending", "super pac", "elections"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DYGZfXAsUwb",
      "AIPAC spending in Michigan’s Senate race",
      "Outside groups should not be able to buy an election.",
      [
        { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7637962134743256334" },
        { platform: "Facebook", url: "https://www.facebook.com/share/v/16iGcwaqKX/" },
        { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mlgvbf2vks2g" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2052888884342575323" }
      ]
    ),
    moreClips: [
      woodDebateClip(
        2278,
        "1:10",
        "Debate: Bought off by AIPAC",
        "And so long as our politicians continue to be bought off by AIPAC, do not be surprised when we fight wars that are in their best interest."
      ),
      mackinacDebateClip(
        932,
        "0:55",
        "Mackinac debate: Didn't ask AIPAC for support",
        "It's AIPAC money which is being spent already in this race to pump up one of my colleagues on this stage. I'm the only candidate who didn't ask AIPAC for their support."
      ),
      cbsTakeoutClip(
        402,
        "0:40",
        "CBS Takeout: AIPAC spending to buy bombs abroad",
        "AIPAC… The biggest spender in a race for Senate in Michigan wants to take your tax dollars… to buy bombs and tanks for foreign governments."
      )
    ],
    relatedIssueIds: [
      "money-out-of-politics",
      "jewish-community-and-antisemitism",
      "foreign-policy"
    ],
    source: campaignSource(moneyOut)
  },
  {
    id: "jewish-community-and-antisemitism",
    title: "Jewish community & antisemitism",
    eyebrow: "Condemn hate; protect open debate",
    category: "Community",
    summary: "El-Sayed condemns antisemitism while arguing that criticism of a government or political organization should not be conflated with hatred of Jewish people.",
    points: [
      "Says Judaism and Jewish people are distinct from AIPAC, the Israeli government, and its leaders.",
      "Opposes definitions of antisemitism that automatically encompass criticism of a foreign government.",
      "Says Israelis and Palestinians have equal rights to peace, dignity, and self-determination."
    ],
    tags: ["antisemitism", "jewish community", "judaism", "israel", "palestine", "civil rights"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DYAvEZPv3eR/",
      "Standing up against antisemitism",
      "Antisemitism has no place in our politics or our communities.",
      [
        { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7636888624251817230" },
        { platform: "Facebook", url: "https://www.facebook.com/share/v/1BUKo4BV8o/" },
        { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3ml7m2e5nzs2b" }
      ]
    ),
    moreClips: [
      socialClip(
        "Instagram",
        "https://www.instagram.com/reel/DXURjD5ADfV/",
        "Equal rights to peace and self-determination",
        "All people deserve equal rights to peace, dignity, and self-determination.",
        [
          { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mju76hedy22f" },
          { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7630484120560323854" },
          { platform: "Facebook", url: "https://www.facebook.com/share/r/1CNdd4cZqp/" },
          { platform: "X", url: "https://x.com/AbdulElSayed/status/2045876168469995621" },
          { platform: "YouTube", url: "https://www.youtube.com/watch?v=ZthabYiMQ-g" }
        ]
      ),
      mackinacDebateClip(
        1382,
        "1:05",
        "Mackinac debate: Antisemitism and Islamophobia",
        "I know that antisemitism and Islamophobia tend to go hand in hand. And the real issue when it comes to either of them is the scourge of white supremacy."
      )
    ],
    relatedIssueIds: ["foreign-policy", "aipac-and-dark-money"],
    source: socialVideoSource("Instagram", "https://www.instagram.com/reel/DYAvEZPv3eR/")
  },
  {
    id: "reproductive-rights",
    title: "Reproductive rights",
    eyebrow: "Restore federal protections",
    category: "Healthcare",
    summary: "El-Sayed supports codifying federal reproductive rights and restoring the protections formerly provided under Roe v. Wade.",
    points: [
      "Supports codifying the rights formerly protected by Roe v. Wade into federal law.",
      "Says reproductive-care decisions should be made by a patient (and their parents if a minor) and their doctor—no one else.",
      "Opposes criminalizing medications used in reproductive care.",
      "Opposes lawfare or funding cuts used to stop providers from offering full-spectrum healthcare that meets the needs of diverse communities."
    ],
    tags: ["abortion", "roe", "reproductive rights", "contraception", "privacy", "gender equity"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DXiPeFhjH0U/",
      "Roe and gender equity",
      "The standard set by Roe v. Wade is the foundation for gender equity.",
      [
        { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7632492473461329165" },
        { platform: "Facebook", url: "https://www.facebook.com/share/r/18FE8RxXby/" },
        { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mkbszohr7s2l" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2047839160933740888" }
      ]
    ),
    relatedIssueIds: ["lgbtq-rights-and-care"],
    source: campaignSource(`${medicare}#h-healthcare-freedom-for-women-and-lgbtq-americans`)
  },
  {
    id: "lgbtq-rights-and-care",
    title: "LGBTQ+ rights & healthcare",
    eyebrow: "Rights are not negotiable",
    category: "Community",
    summary: "El-Sayed supports protecting LGBTQ+ people from discrimination and preserving access to gender-affirming care as a patient–doctor decision.",
    points: [
      "Says everyone has the right to make personal healthcare decisions, including gender-affirming care, with a patient (and parents if a minor) and their doctor—no one else.",
      "Opposes criminalizing medications and the use of lawfare or funding cuts to stop providers from offering full-spectrum care for diverse communities.",
      "Affirms constitutional protections regardless of sexual orientation or gender identity, and freedom of self-expression."
    ],
    tags: ["lgbtq", "transgender", "gender affirming care", "civil rights", "discrimination", "healthcare freedom"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DXhfg2IgOU1/",
      "I will never back down when rights are at risk",
      "I will never back down when somebody’s rights are at risk.",
      [
        { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7632387310570491150" },
        { platform: "Facebook", url: "https://www.facebook.com/share/r/1GtVePQdXC/" },
        { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mkb43a6bns2v" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2047735621628698779" }
      ]
    ),
    relatedIssueIds: ["reproductive-rights", "rule-of-law-and-accountability"],
    source: campaignSource(`${medicare}#h-healthcare-freedom-for-women-and-lgbtq-americans`)
  },
  {
    id: "black-community-equity",
    title: "Black community & racial equity",
    eyebrow: "Close structural gaps",
    category: "Community",
    summary: "El-Sayed calls out racial inequity in healthcare and partners with Detroit Black civic leadership working for prosperity and change.",
    points: [
      "Criticizes a healthcare system that values a Black child’s body at a lower rate than a white child’s body for the same care.",
      "Says that racial disparity in how care is valued “makes no sense.”",
      "Has celebrated earning the endorsement of Detroit’s Black Slate, describing the organization as a leader in change, activism, and Black prosperity."
    ],
    tags: ["black community", "racial equity", "health disparities", "civil rights", "detroit", "representation"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DXZzYMPEZJa/",
      "Racial inequality in healthcare",
      "We are valuing a Black child’s body at a lower rate than a white child’s body for the same healthcare. That to me makes no sense."
    ),
    moreClips: [
      socialClip(
        "Instagram",
        "https://www.instagram.com/reel/DYFkAbPuqIV/",
        "Black Slate endorsement",
        "I am so proud and overflowing with gratitude to earn the endorsement of the Black Slate, a powerful organization that has been at the forefront of change, activism, and Black prosperity in Detroit.",
        [
          { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mledjb4omc2h" },
          { platform: "Facebook", url: "https://www.facebook.com/share/v/18b3g2TFF4/" },
          { platform: "X", url: "https://x.com/AbdulElSayed/status/2052811446011006978" }
        ]
      )
    ],
    relatedIssueIds: ["medicare-for-all", "rule-of-law-and-accountability"],
    source: socialVideoSource("Instagram", "https://www.instagram.com/reel/DXZzYMPEZJa/")
  },
  {
    id: "democratic-party-strategy",
    title: "Democratic Party strategy",
    eyebrow: "No business as usual",
    category: "Democracy",
    summary: "El-Sayed argues that Democrats should confront concentrated power directly and use every available institutional tool rather than return to business as usual.",
    points: [
      "Has called for Democrats to obstruct harmful actions rather than normalize them.",
      "Argues the party must focus on material improvements in people’s lives.",
      "Criticizes political strategies centered on donors, consultants, and incrementalism."
    ],
    tags: ["democratic party", "senate", "opposition", "political strategy", "working class", "accountability"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DXKMIxDAN8l/",
      "No business as usual in the Senate",
      "The only reasonable response is to throw sand in the gears at every turn.",
      [
        { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7629026610347265310" },
        { platform: "Facebook", url: "https://www.facebook.com/share/r/1CRK8b2y1X/" },
        { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mjkdgt3onk2g" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2044456330727997946" }
      ]
    ),
    moreClips: [
      woodDebateClip(
        100,
        "1:05",
        "Debate week: Trump as symptom, not the disease",
        "Donald Trump is not himself the disease of our politics. He's just the worst symptom of the disease."
      ),
      mackinacDebateClip(
        1779,
        "1:00",
        "Mackinac debate: Sand in the gears",
        "For the next two years, we are going to have to put as much sand in the gears of the Trump administration as possible."
      ),
      youtubeClip(
        "8HdRuCChSAE",
        "0:40",
        "Response to Carville and Democratic elites",
        "The mistake that our party too often makes is that we center party elites and not people.",
        undefined,
        56
      )
    ],
    relatedIssueIds: ["money-out-of-politics", "rule-of-law-and-accountability"],
    source: socialVideoSource("Instagram", "https://www.instagram.com/reel/DXKMIxDAN8l/")
  },
  {
    id: "rule-of-law-and-accountability",
    title: "Rule of law & accountability",
    eyebrow: "Hold power to account",
    category: "Democracy",
    summary: "El-Sayed argues that constitutional rights apply to everyone, that peaceful protest is sacrosanct, and that the state must not be weaponized to intimidate dissent.",
    points: [
      "Will protect the rights of all Americans under the Constitution, regardless of where they live, where their parents came from, how or if they pray, sexual orientation, gender identity, age, or wealth.",
      "Affirms freedom of speech, assembly, religion and from religion, and self-expression.",
      "Calls the rights to criticize the government and to protest peacefully sacrosanct, and opposes weaponizing the state to intimidate protest or boycotts.",
      "Says healthcare decisions should stay between an individual and their doctor, and that healthcare data must remain private unless used to provide care.",
      "Says healthcare providers should be protected from undue government coercion to provide data or to provide—or withhold—care they deem necessary."
    ],
    tags: ["rule of law", "accountability", "civil rights", "public safety", "abuse of power", "justice"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DXuavVpCUHF/",
      "Hold power to account",
      "We have to hold power to account and make sure marginalized communities feel safe."
    ),
    moreClips: [
      cbsTakeoutClip(
        1046,
        "0:20",
        "CBS Takeout: Will your passport protect you?",
        "You know what protected me? My American passport, in 1998 in Egypt. Ask yourself whether or not you think our American passports will protect us in 2026 in America."
      )
    ],
    relatedIssueIds: ["immigration-and-ice", "lgbtq-rights-and-care"],
    source: campaignSource(`${moneyOut}#h-civil-rights-amp-liberties`)
  }

];

export const positionCategories: Array<"All" | PositionCategory> = [
  "All",
  "Economy",
  "Healthcare",
  "Democracy",
  "Community",
  "Foreign policy"
];

export const positionLibrarySource = campaignSource(campaignPriorities);
