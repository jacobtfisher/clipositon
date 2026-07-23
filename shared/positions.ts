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

function woodDebateClip(
  startSeconds: number,
  duration: string,
  title: string,
  quote: string
): PositionClip {
  return youtubeClip(woodDebateId, duration, title, quote, undefined, startSeconds);
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
      "He would expand Medicare to cover necessary care plus vision, dental, and hearing for every American.",
      "Coverage would be automatic from cradle to grave, while additional union or employer insurance could still exist.",
      "He supports abolishing medical debt for every American."
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
      "He supports empowering Medicare to negotiate prices for every prescription drug, and earlier after drugs hit the market.",
      "He supports public manufacturing of essential medicines such as insulin.",
      "He supports banning pharmacy benefit managers that price-gouge patients without providing an essential benefit."
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
      "He categorically opposes cutting Medicaid or destroying the ACA market by cutting subsidies, and would repeal those cuts.",
      "He supports expanding public healthcare by investing more in federally qualified health centers and public clinics and hospitals.",
      "He wants public-health leadership grounded in science and protected from political meddling."
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
      "He supports expanding and improving the VA, not cutting it.",
      "He says no veteran should go without housing, a good job, and an education.",
      "He supports vastly expanding VA services to include those housing, job, and education supports."
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
      "He opposes hospital mergers and acquisitions that leave patients with fewer choices and nurses, hospital workers, and doctors with less workplace power.",
      "He wants the FTC empowered to retrospectively review healthcare mergers and break up monopolies, and he supports the Break Up Big Medicine Act.",
      "He supports expanding public healthcare by investing more in federally qualified health centers and public clinics and hospitals."
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
      "He supports fixed-term appointments for CDC Director, FDA Commissioner, and NIH Director that cannot be removed except under specific circumstances.",
      "He supports requiring Senate consent for appointments to critical public-health bodies such as the Advisory Committee on Immunization Practices.",
      "He supports reinvesting in and reforming CDC, FDA, and HRSA, and vastly increasing funding for local and state health departments."
    ],
    tags: ["public health", "cdc", "fda", "nih", "vaccines", "science", "local health departments"],
    clip: socialClip(
      "Bluesky",
      "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mja7fkizyc2k",
      "Holding RFK Jr. accountable",
      "As the first Democratic doctor in the U.S. Senate since 1969, you bet I’m going to hold him accountable for his dangerous lies."
    ),
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
      "He supports a safe, secure border and immigration enforcement under a new structure grounded in human dignity and the rule of law.",
      "He wants ICE funding redirected to immigration courts and a clear pathway to citizenship.",
      "He supports ending ICE as currently structured and building a clearer, fairer immigration system in its place."
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
      "He believes every worker deserves the right to join a union and to earn a fair wage.",
      "He believes that one good job should pay enough to raise a family.",
      "He believes unions must have a significant voice at the tables where decisions about the future of the economy are made."
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
      "He says his campaign has never taken corporate money and never will.",
      "He supports overturning Citizens United and banning outside spending through corporate 501(c)4s, Super PACs, and 527 groups.",
      "He supports public election funding and campaign spending caps."
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
      "He supports a federal nonpartisan committee of experts to draw congressional districts.",
      "Committee members would be appointed for defined terms on a rolling basis and work alongside the U.S. Census Bureau, similar to the Federal Reserve Board.",
      "He frames that structure as the closest practical way to eliminate partisan gerrymandering tied to state apportionment."
    ],
    tags: ["gerrymandering", "redistricting", "voting maps", "census", "democracy", "elections"],
    clip: socialClip(
      "Bluesky",
      "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mknsvnjhsc2p",
      "Racial gerrymandering and equal representation",
      "The SCOTUS decision today guts the prohibition on racial gerrymandering, effectively using the redlining of the past to rob Black folks of equal representation in the future."
    ),
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
      "He supports ending lifetime appointments to the Supreme Court.",
      "He supports imposing limited terms for justices.",
      "He supports allowing the same number of appointments for each presidential term."
    ],
    tags: ["supreme court", "term limits", "judiciary", "democracy", "voting rights", "civil rights"],
    clip: socialClip(
      "Bluesky",
      "https://bsky.app/profile/abdulelsayed.bsky.social/post/3m6uhi37m5s25",
      "Supreme Court reform",
      "Supreme Court reform? I'm down."
    ),
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
      "He says the filibuster has been used by senators to shield one another from hard votes.",
      "He believes the filibuster is antidemocratic and should be abolished."
    ],
    tags: ["filibuster", "senate", "majority rule", "democracy", "legislative process"],
    clip: socialClip(
      "Bluesky",
      "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mmwrnljp6s2q",
      "Abolish the filibuster",
      "Abolish the filibuster."
    ),
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
      "He supports a cost-of-living exemption on federal taxes for the first $50,000 of income.",
      "He supports a billionaire tax on wealth over $1 billion and higher rates on top-end earnings.",
      "He supports taxing capital gains over $1 million at the same rate as ordinary income."
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
      "He believes every American deserves guaranteed healthcare regardless of what they do for work.",
      "His Medicare for All plan would make coverage automatic from cradle to grave, without premiums, copays, or deductibles.",
      "He favors abolishing medical debt for every American, as he did for more than 300,000 Michiganders in Wayne County."
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
      "His Terms of Engagement require data centers to pay for their own energy demand so costs are not passed onto ratepayers.",
      "Data centers must create the local jobs they promise or face penalties, and be built by Michigan contractors with registered apprenticeship programs.",
      "Projects must commit to closed-loop cooling and binding community benefits for local infrastructure."
    ],
    tags: ["data center", "dte", "electric bills", "technology", "jobs", "water", "energy"],
    clip: youtubeClip("oNFAVuNPdsk", "1:47", "Terms of engagement for data centers", "If you promise jobs, deliver those jobs."),
    relatedIssueIds: ["artificial-intelligence"],
    source: campaignSource("https://abdulforsenate.com/2026/01/datacenters/")
  },
  {
    id: "artificial-intelligence",
    title: "Artificial intelligence",
    eyebrow: "AI under democracy",
    category: "Economy",
    summary: "El-Sayed’s AI Under Democracy plan would put frontier AI under public-benefit governance, public ownership stakes, and hard safety guardrails.",
    points: [
      "He supports mandatory public-benefit charters for frontier AI labs and majority public or democratically elected board control.",
      "He supports public ownership stakes in the largest AI companies, including an annual AI dividend funded by returns and an automation levy reinvested in workers.",
      "He supports an FDA-style independent safety-testing agency and bans AI from denying medical care, making hiring or firing decisions, or replacing human oversight in life-or-death decisions."
    ],
    tags: ["artificial intelligence", "ai", "automation", "big tech", "jobs", "safety", "democracy"],
    clip: socialClip(
      "Bluesky",
      "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mnbcugonkk2w",
      "Real AI regulation and guardrails",
      "We need real AI regulation to create guardrails and protect the ability for young people to have a job."
    ),
    relatedIssueIds: ["data-centers-and-ai", "cost-of-living", "corporate-consolidation"],
    source: campaignSource("https://abdulforsenate.com/2026/06/first-do-no-harm-ai-under-democracy/")
  },
  {
    id: "family-farms",
    title: "Family farms",
    eyebrow: "Keep Michigan agriculture local",
    category: "Economy",
    summary: "El-Sayed supports redirecting farm subsidies toward family farms, specialty crops, and diversified agriculture.",
    points: [
      "He proposes capping individual subsidy payments at $250,000 per year.",
      "He supports targeted trade protections rather than blanket tariffs that raise farmers’ costs.",
      "He backs a federal right-to-repair law for farm equipment."
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
      "He supports a pathway to 100% renewable energy with investment in solar, wind, storage, and the electrical grid.",
      "He wants environmental standards to account for the combined burden of multiple pollutants.",
      "He connects climate instability directly to the future of Michigan agriculture."
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
    summary: "El-Sayed favors a foreign policy centered on diplomacy, human rights, and limits on blank-check military funding abroad.",
    points: [
      "He opposes the Iran war and argues diplomacy is more effective than hostilities at preventing a nuclear-armed Iran.",
      "He opposes blank-check funding to foreign militaries and supports an arms embargo on Israel.",
      "He argues that Michigan taxpayer dollars should be spent here in Michigan rather than being used to fund violence abroad."
    ],
    tags: ["iran", "war", "foreign policy", "military", "diplomacy", "gaza", "israel", "palestine", "aid"],
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
      woodDebateClip(
        2278,
        "1:10",
        "Debate: AIPAC and wars Michiganders shouldn't fight",
        "And so long as our politicians continue to be bought off by AIPAC, do not be surprised when we fight wars that are in their best interest."
      )
    ],
    relatedIssueIds: ["jewish-community-and-antisemitism", "aipac-and-dark-money"],
    source: campaignSource(`${moneyOut}#h-sensible-foreign-policy`)
  },
  {
    id: "corporate-consolidation",
    title: "Corporate monopolies",
    eyebrow: "More choices, less price-gouging",
    category: "Economy",
    summary: "El-Sayed supports stronger federal antitrust enforcement so corporations cannot price-gouge families or hollow out good jobs.",
    points: [
      "He supports a muscular Federal Trade Commission that enforces anti-monopoly laws against corporate price-gouging.",
      "He wants laws that stop Wall Street speculators from wrecking good companies and killing good jobs.",
      "He supports rules that make publicly traded corporations more accountable to their workers."
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
      "He wants local barriers to new housing streamlined.",
      "He supports banning algorithmic rental price-fixing and limiting large corporate ownership of homes.",
      "He favors housing-dislocation fees for large short-term-rental platforms."
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
      "He supports raising the minimum teacher salary to at least $60,000 a year.",
      "He opposes privatizing public education through vouchers and supports fully funding the Individuals with Disabilities Education Act.",
      "He backs a debt-free and tuition-free pathway through a two-year apprenticeship, a four-year college education, or beyond."
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
      "His proposal guarantees a basic daily amount of clean water and caps household water bills at 2% of income.",
      "He wants every lead pipe in Michigan removed by 2030.",
      "He supports holding polluters responsible for PFAS and agricultural runoff, and shutting down Line 5 to protect the Great Lakes."
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
      "He proposes ending Medicare premiums, deductibles, and co-pays so seniors get first-dollar coverage.",
      "He supports lifting the Social Security payroll-tax cap for high earners and ending federal taxes on Social Security benefits.",
      "He proposes property-tax relief for seniors, expanded home- and community-based services, and greater support for family caregivers."
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
      "He opposes mandatory voter ID laws like the SAVE Act that impose unnecessary barriers to voting.",
      "He supports automatic voter registration at age 18 and automatic re-registration when people move.",
      "He supports making election days holidays and requiring no-reason absentee and early in-person voting."
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
      "He supports passage of the John Lewis Voting Rights Advancement Act.",
      "He has tied that legislation to the need to respond to a recent Supreme Court voting-rights decision.",
      "He contrasts segregation with real equity in discussing voting rights."
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
      "He has criticized millions of dollars in AIPAC-linked spending supporting an opponent.",
      "He supports removing dark money and corporate influence from elections.",
      "He distinguishes criticism of AIPAC and the Israeli government from hostility toward Jewish people."
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
      "He says Judaism and Jewish people are distinct from AIPAC, the Israeli government, and its leaders.",
      "He opposes definitions of antisemitism that automatically encompass criticism of a foreign government.",
      "He says Israelis and Palestinians have equal rights to peace, dignity, and self-determination."
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
      "He supports codifying the rights formerly protected by Roe v. Wade.",
      "He opposes criminalizing medications used in reproductive care.",
      "He supports privacy protections for reproductive-health data."
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
    source: campaignSource(medicare)
  },
  {
    id: "lgbtq-rights-and-care",
    title: "LGBTQ+ rights & healthcare",
    eyebrow: "Rights are not negotiable",
    category: "Community",
    summary: "El-Sayed supports protecting LGBTQ+ people from discrimination and preserving access to gender-affirming care and HIV prevention.",
    points: [
      "He says he will not back down when LGBTQ+ rights are at risk.",
      "He opposes federal attacks on access to PrEP.",
      "He supports healthcare decisions remaining with patients, families, and clinicians."
    ],
    tags: ["lgbtq", "transgender", "gender affirming care", "prep", "civil rights", "discrimination"],
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
    source: campaignSource(medicare)
  },
  {
    id: "black-community-equity",
    title: "Black community & racial equity",
    eyebrow: "Close structural gaps",
    category: "Community",
    summary: "El-Sayed calls out racial inequity in healthcare and partners with Detroit Black civic leadership working for prosperity and change.",
    points: [
      "He criticizes a healthcare system that values a Black child’s body at a lower rate than a white child’s body for the same care.",
      "He says that racial disparity in how care is valued “makes no sense.”",
      "He has celebrated earning the endorsement of Detroit’s Black Slate, describing the organization as a leader in change, activism, and Black prosperity."
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
      "He has called for Democrats to obstruct harmful actions rather than normalize them.",
      "He argues the party must focus on material improvements in people’s lives.",
      "He criticizes political strategies centered on donors, consultants, and incrementalism."
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
      "He says he will protect the rights of all Americans under the Constitution, regardless of background, belief, identity, age, or wealth.",
      "He treats the right to speak against government actions and to protest peacefully as sacrosanct.",
      "He stands against the weaponization of the state to stamp out or intimidate peaceful protest, including the freedom to boycott."
    ],
    tags: ["rule of law", "accountability", "civil rights", "public safety", "abuse of power", "justice"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DXuavVpCUHF/",
      "Hold power to account",
      "We have to hold power to account and make sure marginalized communities feel safe."
    ),
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
