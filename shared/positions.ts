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
  source: PositionSource;
};

const campaignPriorities = "https://abdulforsenate.com/priorities/";
const moneyOut = "https://abdulforsenate.com/priority/money-out-of-politics/";
const moneyIn = "https://abdulforsenate.com/priority/money-in-your-pocket/";
const medicare = "https://abdulforsenate.com/priority/medicare-for-all-the-path-to-a-healthier-america/";

function youtubeClip(
  youtubeId: string,
  duration: string,
  title: string,
  quote: string,
  alternates?: ClipOption[]
): PositionClip {
  return {
    youtubeId,
    duration,
    title,
    quote,
    url: `https://www.youtube.com/watch?v=${youtubeId}`,
    platform: "YouTube",
    alternates
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
      "Coverage would include necessary medical care plus vision, dental, and hearing.",
      "A person could keep additional union or employer coverage, but losing a job would not mean losing basic coverage.",
      "He also supports abolishing medical debt."
    ],
    tags: ["healthcare", "health insurance", "universal coverage", "medical debt", "copays", "deductibles"],
    clip: youtubeClip("BjZLGRlwIpc", "1:29", "What Medicare for All would feel like", "A Medicare card ... given to me the day I was born and that wouldn’t expire until the day I expired.", [
      { platform: "Instagram", url: "https://www.instagram.com/reel/DXb9aYYgIIW/" },
      { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7631623625879162125" },
      { platform: "Facebook", url: "https://www.facebook.com/share/r/1KVTqMm8FU/" },
      { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mk3owsem5c2q" },
      { platform: "X", url: "https://x.com/AbdulElSayed/status/2046956319584780297" }
    ]),
    source: videoSource("BjZLGRlwIpc")
  },
  {
    id: "medicare-advantage",
    title: "Medicare & prescription drugs",
    eyebrow: "Strengthen public Medicare",
    category: "Healthcare",
    summary: "El-Sayed opposes Medicare privatization and supports expanding Medicare drug-price negotiation.",
    points: [
      "He wants Medicare to negotiate prices for every prescription drug and earlier in a drug’s life.",
      "He supports public manufacturing of essential medicines such as insulin.",
      "He argues that vision, hearing, and dental should be part of public Medicare itself."
    ],
    tags: ["seniors", "medicare advantage", "prescriptions", "insulin", "drug prices", "big pharma"],
    clip: youtubeClip("lrn2M2kBG9M", "0:55", "Medicare Advantage and public Medicare", "Medicare Advantage is privatized Medicare."),
    source: videoSource("lrn2M2kBG9M")
  },
  {
    id: "rural-healthcare",
    title: "Rural healthcare & Medicaid",
    eyebrow: "Keep care close to home",
    category: "Healthcare",
    summary: "El-Sayed opposes Medicaid cuts and argues that coverage losses threaten rural hospitals and raise costs for everyone.",
    points: [
      "He supports protecting Medicaid and the Affordable Care Act’s insurance subsidies.",
      "He connects reliable coverage to the survival of rural hospitals.",
      "He favors greater support for local and state public-health systems."
    ],
    tags: ["rural", "medicaid", "hospitals", "aca", "public health", "up north"],
    clip: youtubeClip("W9C0q1cFQFQ", "2:08", "What federal healthcare cuts mean up north", "When they gut Medicaid, you’re going to have to pay the costs."),
    source: videoSource("W9C0q1cFQFQ")
  },
  {
    id: "immigration-and-ice",
    title: "Immigration & ICE",
    eyebrow: "Abolish ICE; secure the border",
    category: "Community",
    summary: "El-Sayed supports abolishing ICE, replacing it with a system he says should enforce immigration law while respecting dignity and due process.",
    points: [
      "He supports a safe and secure border and continued immigration enforcement under a different structure.",
      "He wants ICE funding redirected toward immigration courts and a clear pathway to citizenship.",
      "He describes immigration as a source of American growth, not a threat to it."
    ],
    tags: ["immigration", "ice", "border", "deportation", "citizenship", "due process"],
    clip: youtubeClip("U4m9EcFK4pE", "0:17", "Abolish ICE", "Our government spends billions on an agency that operates outside of the law to terrorize our neighbors.", [
      { platform: "Instagram", url: "https://www.instagram.com/reel/DXDWiAojJ_f/" },
      { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7628042770430692621" },
      { platform: "Facebook", url: "https://www.facebook.com/share/r/18U3BT6CPL/" },
      { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mjdnxoacxk2l" },
      { platform: "X", url: "https://x.com/AbdulElSayed/status/2044104880143401401" }
    ]),
    source: videoSource("U4m9EcFK4pE")
  },
  {
    id: "unions-and-worker-power",
    title: "Unions & worker power",
    eyebrow: "Rebuild the middle class",
    category: "Economy",
    summary: "El-Sayed supports the PRO Act and making it easier to form or join a union in every sector.",
    points: [
      "He credits unions with the forty-hour workweek, weekends, safer workplaces, and the growth of the middle class.",
      "He argues that falling union membership and extreme wealth concentration are connected.",
      "He wants unions represented in decisions about the future of work and new technology."
    ],
    tags: ["labor", "union", "pro act", "workers", "wages", "uaw", "middle class"],
    clip: youtubeClip("se_vMjOl_yI", "1:16", "Union remarks in Grand Rapids", "We’ve got to pass the PRO Act.", [
      { platform: "Instagram", url: "https://www.instagram.com/reel/DXuhKbUDwee/" },
      { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7634267373230460173" },
      { platform: "Facebook", url: "https://www.facebook.com/share/r/1E4DLEvQPg/" },
      { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mknsqn3jo22j" },
      { platform: "X", url: "https://x.com/AbdulElSayed/status/2049567998927589583" }
    ]),
    source: videoSource("se_vMjOl_yI")
  },
  {
    id: "money-out-of-politics",
    title: "Money out of politics",
    eyebrow: "No corporate checks",
    category: "Democracy",
    summary: "El-Sayed supports overturning Citizens United, banning major forms of corporate outside spending, and publicly funding elections.",
    points: [
      "He says his campaign does not accept corporate money.",
      "He supports campaign spending caps and restrictions on Super PAC and dark-money spending.",
      "He frames campaign-finance reform as necessary before government can reliably serve ordinary people."
    ],
    tags: ["campaign finance", "citizens united", "super pac", "dark money", "corporate pac", "aipac"],
    clip: youtubeClip("VghjCiLxyLU", "0:16", "A very short message about money", "I’m ... the only candidate for Senate who hasn’t taken a corporate check.", [
      { platform: "Instagram", url: "https://www.instagram.com/reel/DYUnOe_AXIP" },
      { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7639753398316698893" },
      { platform: "Facebook", url: "https://www.facebook.com/share/r/1EAbm65xbm/" },
      { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mlsz5u5zk22l" },
      { platform: "X", url: "https://x.com/AbdulElSayed/status/2054930026752045127" }
    ]),
    source: videoSource("VghjCiLxyLU")
  },
  {
    id: "cost-of-living",
    title: "Cost of living",
    eyebrow: "Put money in your pocket",
    category: "Economy",
    summary: "El-Sayed argues that essentials have become unaffordable because concentrated corporate power lets companies raise prices and limit choices.",
    points: [
      "He supports stronger antitrust enforcement against monopolies and price-gouging.",
      "He favors a federal tax exemption on the first $50,000 of income as part of his tax plan.",
      "His economic platform emphasizes wages, healthcare costs, housing, groceries, and family expenses."
    ],
    tags: ["affordability", "inflation", "groceries", "prices", "family budget", "monopoly", "taxes"],
    clip: youtubeClip("RNXI7_U9ZPQ", "2:04", "Affordability at the Cherry Festival", "It’s just way too expensive to afford anything.", [
      { platform: "Instagram", url: "https://www.instagram.com/reel/DYIN7oruB_m/" },
      { platform: "TikTok", url: "https://www.tiktok.com/@abdulelsayed/video/7637966262533950733" },
      { platform: "Facebook", url: "https://www.facebook.com/share/r/187P4YLwQh/" },
      { platform: "Bluesky", url: "https://bsky.app/profile/abdulelsayed.bsky.social/post/3mlgvugrqak2i" },
      { platform: "X", url: "https://x.com/AbdulElSayed/status/2053184829273845847" }
    ]),
    source: videoSource("RNXI7_U9ZPQ")
  },
  {
    id: "small-business-healthcare",
    title: "Small businesses & healthcare",
    eyebrow: "Separate care from employment",
    category: "Economy",
    summary: "El-Sayed argues that universal healthcare would relieve small businesses of the cost and complexity of providing basic insurance.",
    points: [
      "He treats healthcare costs as both a family issue and a small-business constraint.",
      "His Medicare for All plan would make basic coverage automatic rather than dependent on an employer.",
      "He supports revolving loan funds and other investment in small businesses."
    ],
    tags: ["small business", "entrepreneur", "employer insurance", "restaurant", "health benefits"],
    clip: youtubeClip("TvfEHzT9wnI", "1:25", "Healthcare and a Detroit small business", "It’s so hard for us to even offer the health insurance to people."),
    source: videoSource("TvfEHzT9wnI")
  },
  {
    id: "data-centers-and-ai",
    title: "Data centers & AI",
    eyebrow: "Safety and accountability",
    category: "Economy",
    summary: "El-Sayed supports federal rules that make data-center developers deliver promised jobs without raising local utility rates or draining public resources.",
    points: [
      "His proposed terms require job promises to be enforceable and electricity costs not to be shifted to residents.",
      "He supports AI safety testing, incident reporting, liability rules, and an independent technical regulator.",
      "He opposes blocking states from acting on AI before strong federal protections exist."
    ],
    tags: ["artificial intelligence", "ai", "data center", "dte", "electric bills", "technology", "automation"],
    clip: youtubeClip("oNFAVuNPdsk", "1:47", "Terms of engagement for data centers", "If you promise jobs, deliver those jobs."),
    source: videoSource("oNFAVuNPdsk")
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
    source: videoSource("BT54YJt5ess")
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
    source: videoSource("6I_5VJNLqiw")
  },
  {
    id: "foreign-policy",
    title: "War & foreign policy",
    eyebrow: "Diplomacy before war",
    category: "Foreign policy",
    summary: "El-Sayed favors a foreign policy centered on diplomacy, human rights, and congressional limits on presidential war-making.",
    points: [
      "He opposes the Iran war and argues diplomacy is the better path to preventing a nuclear-armed Iran.",
      "He opposes blank-check military funding to foreign governments and supports enforcing human-rights conditions on aid.",
      "He supports international cooperation on pandemics and climate change."
    ],
    tags: ["iran", "war", "foreign policy", "military", "diplomacy", "gaza", "israel", "palestine", "aid"],
    clip: youtubeClip("ZthabYiMQ-g", "2:26", "Who is the Iran war really for?", "Who’s this war really for?"),
    source: videoSource("ZthabYiMQ-g")
  },
  {
    id: "corporate-consolidation",
    title: "Corporate monopolies",
    eyebrow: "More choices, less price-gouging",
    category: "Economy",
    summary: "El-Sayed supports stronger federal antitrust enforcement and breaking up monopolies that reduce choices, eliminate jobs, or raise prices.",
    points: [
      "He favors a more aggressive Federal Trade Commission.",
      "In healthcare, he supports reviewing past mergers and breaking up monopolies.",
      "He opposes consolidation that rewards executives while cutting workers and consumer choice."
    ],
    tags: ["antitrust", "monopoly", "mergers", "ftc", "corporations", "price gouging", "competition"],
    clip: youtubeClip("v1_0UVF3T68", "1:15", "Why corporate consolidation matters", "They’ve raised the prices on the things we have to buy. They’ve reduced the choices that we have."),
    source: videoSource("v1_0UVF3T68")
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
      "We’ve got to stop the Big Techification of our housing.",
      [
        { platform: "Facebook", url: "https://www.facebook.com/share/r/1BCXr2fuPy/" },
        { platform: "X", url: "https://x.com/AbdulElSayed/status/2055350302610522521" }
      ]
    ),
    source: campaignSource(moneyIn)
  },
  {
    id: "education",
    title: "Public education",
    eyebrow: "Invest from childcare through college",
    category: "Community",
    summary: "El-Sayed supports universal childcare and pre-K, stronger public-school funding, and tuition-free pathways through college, trades, or apprenticeships.",
    points: [
      "He supports a minimum teacher salary of at least $60,000.",
      "He opposes private-school vouchers and supports fully funding special education obligations.",
      "He backs debt-free and tuition-free routes to two- and four-year credentials."
    ],
    tags: ["schools", "teachers", "childcare", "pre-k", "college", "student debt", "trades", "apprenticeship"],
    source: campaignSource(moneyIn)
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
      "He supports holding polluters responsible for PFAS and agricultural runoff."
    ],
    tags: ["water", "great lakes", "line 5", "pfas", "lead pipes", "flint", "water bills"],
    source: campaignSource(moneyOut)
  },
  {
    id: "seniors-aging-affordably",
    title: "Seniors & aging affordably",
    eyebrow: "Lower costs; support independence",
    category: "Healthcare",
    summary: "El-Sayed’s Aging Affordably in America plan would reduce Medicare and prescription costs, strengthen Social Security, and expand support for aging at home.",
    points: [
      "He proposes ending Medicare cost-sharing and adding vision, dental, and hearing coverage.",
      "He supports lifting the Social Security payroll-tax cap for high earners and ending federal taxes on seniors’ Social Security benefits.",
      "He proposes property-tax relief, expanded home- and community-based services, and greater support for family caregivers."
    ],
    tags: ["seniors", "aging", "medicare", "social security", "property tax", "caregivers", "long-term care"],
    source: campaignSource("https://abdulforsenate.com/2026/06/the-aaa-plan-for-seniors-aging-affordably-in-america")
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
    source: campaignSource(medicare)
  },
  {
    id: "black-community-equity",
    title: "Black community & racial equity",
    eyebrow: "Close structural gaps",
    category: "Community",
    summary: "El-Sayed identifies racial inequality in healthcare and public institutions as a structural problem requiring deliberate public action.",
    points: [
      "He has highlighted racial inequality in access to healthcare and health outcomes.",
      "He supports universal healthcare as a tool for reducing inequitable access to care.",
      "His campaign has emphasized representation and accountability to Black communities across Michigan."
    ],
    tags: ["black community", "racial equity", "health disparities", "civil rights", "representation", "healthcare"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DXZzYMPEZJa/",
      "Racial inequality in healthcare",
      "Racial inequality is built into who gets care and who gets left behind."
    ),
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
    source: socialVideoSource("Instagram", "https://www.instagram.com/reel/DXKMIxDAN8l/")
  },
  {
    id: "rule-of-law-and-accountability",
    title: "Rule of law & accountability",
    eyebrow: "Hold power to account",
    category: "Democracy",
    summary: "El-Sayed argues that public officials and institutions must be held accountable when they abuse power or make marginalized communities less safe.",
    points: [
      "He supports holding powerful officials and institutions accountable under the law.",
      "He connects accountability to the safety of women and marginalized communities.",
      "He rejects selective enforcement that protects powerful people while targeting vulnerable communities."
    ],
    tags: ["rule of law", "accountability", "civil rights", "public safety", "abuse of power", "justice"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DXuavVpCUHF/",
      "Hold power to account",
      "We have to hold power to account and make sure marginalized communities feel safe."
    ),
    source: socialVideoSource("Instagram", "https://www.instagram.com/reel/DXuavVpCUHF/")
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
