export type PositionCategory = "Economy" | "Healthcare" | "Democracy" | "Community" | "Foreign policy";

export type PositionSource = {
  label: string;
  url: string;
  publisher: string;
  kind: "Official video" | "Campaign position";
};

export type PositionClip = {
  youtubeId: string;
  duration: string;
  title: string;
  quote: string;
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
    clip: {
      youtubeId: "BjZLGRlwIpc",
      duration: "1:29",
      title: "What Medicare for All would feel like",
      quote: "A Medicare card ... given to me the day I was born and that wouldn’t expire until the day I expired."
    },
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
    clip: {
      youtubeId: "lrn2M2kBG9M",
      duration: "0:55",
      title: "Medicare Advantage and public Medicare",
      quote: "Medicare Advantage is privatized Medicare."
    },
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
    clip: {
      youtubeId: "W9C0q1cFQFQ",
      duration: "2:08",
      title: "What federal healthcare cuts mean up north",
      quote: "When they gut Medicaid, you’re going to have to pay the costs."
    },
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
    clip: {
      youtubeId: "U4m9EcFK4pE",
      duration: "0:17",
      title: "Abolish ICE",
      quote: "Our government spends billions on an agency that operates outside of the law to terrorize our neighbors."
    },
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
    clip: {
      youtubeId: "se_vMjOl_yI",
      duration: "1:16",
      title: "Union remarks in Grand Rapids",
      quote: "We’ve got to pass the PRO Act."
    },
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
    clip: {
      youtubeId: "VghjCiLxyLU",
      duration: "0:16",
      title: "A very short message about money",
      quote: "I’m ... the only candidate for Senate who hasn’t taken a corporate check."
    },
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
    clip: {
      youtubeId: "RNXI7_U9ZPQ",
      duration: "2:04",
      title: "Affordability at the Cherry Festival",
      quote: "It’s just way too expensive to afford anything."
    },
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
    clip: {
      youtubeId: "TvfEHzT9wnI",
      duration: "1:25",
      title: "Healthcare and a Detroit small business",
      quote: "It’s so hard for us to even offer the health insurance to people."
    },
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
    clip: {
      youtubeId: "oNFAVuNPdsk",
      duration: "1:47",
      title: "Terms of engagement for data centers",
      quote: "If you promise jobs, deliver those jobs."
    },
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
    clip: {
      youtubeId: "BT54YJt5ess",
      duration: "2:56",
      title: "How to help Michigan family farms",
      quote: "We don’t want to see agriculture be corporatized."
    },
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
    clip: {
      youtubeId: "6I_5VJNLqiw",
      duration: "2:26",
      title: "Agriculture, climate, immigration, and trade",
      quote: "When you talk about agriculture, you’re also talking about climate change and immigration and tariffs."
    },
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
    clip: {
      youtubeId: "ZthabYiMQ-g",
      duration: "2:26",
      title: "Who is the Iran war really for?",
      quote: "Who’s this war really for?"
    },
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
    clip: {
      youtubeId: "v1_0UVF3T68",
      duration: "1:15",
      title: "Why corporate consolidation matters",
      quote: "They’ve raised the prices on the things we have to buy. They’ve reduced the choices that we have."
    },
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
    tags: ["housing", "rent", "renters", "homelessness", "landlords", "airbnb", "homes"],
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
    id: "reproductive-and-lgbtq-care",
    title: "Reproductive & LGBTQ+ healthcare",
    eyebrow: "Decisions belong with patients",
    category: "Healthcare",
    summary: "El-Sayed supports federal protection for reproductive and gender-affirming care and says healthcare decisions belong with patients, families, and doctors.",
    points: [
      "He supports codifying the rights formerly protected by Roe v. Wade.",
      "He opposes criminalizing medications used in reproductive care.",
      "He supports privacy protections for healthcare data."
    ],
    tags: ["abortion", "roe", "reproductive rights", "lgbtq", "transgender", "gender affirming care", "privacy"],
    source: campaignSource(medicare)
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
