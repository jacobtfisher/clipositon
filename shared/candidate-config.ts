export type DeploymentConfig = {
  /** Public URL path corresponding to the root of the uploaded build artifact. */
  artifactMountPath: string;
  siteBase: string;
  siteOrigin: string;
  shortUrlOrigin: string;
  customDomain?: string;
  analytics?: {
    endpoint: string;
    scriptUrl: string;
  };
};

export type CandidateDefinition = {
  key: string;
  candidate: {
    displayName: string;
    familiarName: string;
    campaignName: string;
    officeLabel: string;
    campaignUrl: string;
    wordmarkPrimary: string;
    wordmarkSecondary: string;
  };
  site: {
    name: string;
    description: string;
    socialImage: {
      path: string;
      type: "image/jpeg" | "image/png" | "image/webp";
      width: number;
      height: number;
      alt: string;
    };
    kicker: string;
    headline: string;
    intro: string;
    sourcePromise: string;
    ownWordsLabel: string;
    moreWordsLabel: string;
    positionSectionLabel: string;
    reviewedOn: string;
    themeColor: string;
    disclosure: string;
    librarySourceLabel: string;
  };
  actions: {
    vote: {
      label: string;
      url: string;
    };
    volunteer: {
      label: string;
      url: string;
    };
  };
  content: {
    pinnedIssueIds: string[];
  };
};

export type CandidateConfig = CandidateDefinition & {
  deployment: DeploymentConfig;
};

export const DEFAULT_CANDIDATE_KEY = "abdul";
export const DEFAULT_DEPLOYMENT_KEY = "tools4abdul";

export const candidateConfigs = {
  abdul: {
    key: "abdul",
    candidate: {
      displayName: "Abdul El-Sayed",
      familiarName: "Abdul",
      campaignName: "Abdul for U.S. Senate",
      officeLabel: "U.S. Senate",
      campaignUrl: "https://abdulforsenate.com/",
      wordmarkPrimary: "ABDUL",
      wordmarkSecondary: "FOR U.S. SENATE"
    },
    site: {
      name: "Where Abdul Stands",
      description: "A searchable, sourced guide to Abdul El-Sayed's positions in his own words.",
      socialImage: {
        path: "social/where-abdul-stands.jpg",
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: "Where Abdul Stands — Hear it from him."
      },
      kicker: "WHERE ABDUL STANDS",
      headline: "Hear it from him.",
      intro:
        "Pick an issue and see where Abdul stands. His own words, linked to the original source. Made by volunteers.",
      sourcePromise: "In his own words",
      ownWordsLabel: "IN HIS OWN WORDS",
      moreWordsLabel: "MORE IN HIS WORDS",
      positionSectionLabel: "WHAT HE HAS SAID",
      reviewedOn: "2026-07-24",
      themeColor: "#f8f3e9",
      disclosure:
        "Created by volunteers. Not officially affiliated with or endorsed by the Abdul for U.S. Senate campaign. It is not independent fact-checking. Minor errors may slip in. For his official positions, refer directly to the campaign’s own materials.",
      librarySourceLabel: "Campaign priorities"
    },
    actions: {
      vote: {
        label: "How to vote",
        url: "https://abdulforsenate.com/vote/"
      },
      volunteer: {
        label: "Volunteer",
        url: "https://abdulforsenate.com/volunteer-for-abdul/"
      }
    },
    content: {
      pinnedIssueIds: ["money-out-of-politics", "money-in-your-pocket", "medicare-for-all"]
    }
  }
} satisfies Record<string, CandidateDefinition>;

export const deploymentConfigs = {
  tools4abdul: {
    artifactMountPath: "/",
    siteBase: "/cliposition/",
    siteOrigin: "https://tools4abdul.com",
    shortUrlOrigin: "https://tools4abdul.com",
    customDomain: "tools4abdul.com",
    analytics: {
      endpoint: "https://tools4abdul.goatcounter.com/count",
      scriptUrl: "https://gc.zgo.at/count.js"
    }
  },
  "ringleader-pages": {
    artifactMountPath: "/clipositon/",
    siteBase: "/clipositon/",
    siteOrigin: "https://ringleader.github.io",
    shortUrlOrigin: "https://ringleader.github.io/clipositon"
  },
  "heartvalley-abdul": {
    artifactMountPath: "/abdul/positions/",
    siteBase: "/abdul/positions/",
    siteOrigin: "https://heartvalleysprings.com",
    shortUrlOrigin: "https://heartvalleysprings.com/abdul/positions"
  }
} satisfies Record<string, DeploymentConfig>;

export type CandidateKey = keyof typeof candidateConfigs;
export type DeploymentKey = keyof typeof deploymentConfigs;

export function getCandidateConfig(
  key: string | undefined,
  deploymentKey: string | undefined = DEFAULT_DEPLOYMENT_KEY
): CandidateConfig {
  const normalized = key?.trim() || DEFAULT_CANDIDATE_KEY;
  const candidate = candidateConfigs[normalized as CandidateKey];
  if (!candidate) {
    throw new Error(
      `Unknown CLIPOSITION_CANDIDATE "${normalized}". Expected one of: ${Object.keys(candidateConfigs).join(", ")}.`
    );
  }
  const normalizedDeployment = deploymentKey?.trim() || DEFAULT_DEPLOYMENT_KEY;
  const deployment = deploymentConfigs[normalizedDeployment as DeploymentKey];
  if (!deployment) {
    throw new Error(
      `Unknown CLIPOSITION_DEPLOYMENT "${normalizedDeployment}". Expected one of: ${Object.keys(deploymentConfigs).join(", ")}.`
    );
  }
  return { ...candidate, deployment };
}

function deploymentCandidateKey(): string | undefined {
  if (typeof __CLIPOSITION_CANDIDATE__ !== "undefined") {
    return __CLIPOSITION_CANDIDATE__;
  }
  if (typeof process !== "undefined") {
    return process.env.CLIPOSITION_CANDIDATE;
  }
  return undefined;
}

function deploymentTargetKey(): string | undefined {
  if (typeof __CLIPOSITION_DEPLOYMENT__ !== "undefined") {
    return __CLIPOSITION_DEPLOYMENT__;
  }
  if (typeof process !== "undefined") {
    return process.env.CLIPOSITION_DEPLOYMENT;
  }
  return undefined;
}

export const activeDeploymentKey = deploymentTargetKey() || DEFAULT_DEPLOYMENT_KEY;
export const candidateConfig = getCandidateConfig(deploymentCandidateKey(), activeDeploymentKey);
