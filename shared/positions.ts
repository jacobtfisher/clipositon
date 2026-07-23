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
    source: campaignSource(medicare)
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
    source: campaignSource(`${moneyOut}#h-banning-corporate-money-in-politics`)
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
    tags: ["artificial intelligence", "ai", "data center", "dte", "electric bills", "technology", "automation"],
    clip: youtubeClip("oNFAVuNPdsk", "1:47", "Terms of engagement for data centers", "If you promise jobs, deliver those jobs."),
    source: campaignSource("https://abdulforsenate.com/2026/01/datacenters/")
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
    summary: "El-Sayed identifies racial inequality in healthcare as a structural problem and supports Medicare for All as guaranteed care for every American.",
    points: [
      "He would expand Medicare to cover every American from cradle to grave without premiums, copays, or deductibles.",
      "He supports abolishing medical debt for every American.",
      "He categorically opposes cutting Medicaid or destroying the ACA market by cutting subsidies."
    ],
    tags: ["black community", "racial equity", "health disparities", "civil rights", "representation", "healthcare"],
    clip: socialClip(
      "Instagram",
      "https://www.instagram.com/reel/DXZzYMPEZJa/",
      "Racial inequality in healthcare",
      "We are valuing a Black child’s body at a lower rate than a white child’s body for the same healthcare. That to me makes no sense."
    ),
    source: campaignSource(medicare)
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
