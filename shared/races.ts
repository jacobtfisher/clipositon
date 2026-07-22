export type ElectionStage = "primary" | "general";
export type Office = "Senate" | "House";

export type TrackedCandidate = {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  office: Office;
  state: string;
  district?: string;
  party: string;
  stage: ElectionStage[];
  committeeId?: string;
  committeeName?: string;
  campaign: "abdul" | "harris" | "opponent";
};

export type TrackedRace = {
  id: string;
  name: string;
  office: Office;
  state: string;
  district?: string;
  stages: ElectionStage[];
  candidates: TrackedCandidate[];
};

export const trackedRaces: TrackedRace[] = [
  {
    id: "mi-senate-2026",
    name: "Michigan U.S. Senate",
    office: "Senate",
    state: "MI",
    stages: ["primary", "general"],
    candidates: [
      {
        id: "S6MI00418",
        slug: "abdul-el-sayed",
        name: "EL-SAYED, ABDUL",
        displayName: "Abdul El-Sayed",
        office: "Senate",
        state: "MI",
        party: "DEM",
        stage: ["primary", "general"],
        committeeId: "C00902668",
        committeeName: "ABDUL FOR U.S. SENATE",
        campaign: "abdul"
      },
      {
        id: "S6MI00426",
        slug: "haley-stevens",
        name: "STEVENS, HALEY",
        displayName: "Haley Stevens",
        office: "Senate",
        state: "MI",
        party: "DEM",
        stage: ["primary"],
        campaign: "opponent"
      },
      {
        id: "S6MI00392",
        slug: "mallory-mcmorrow",
        name: "MCMORROW, MALLORY",
        displayName: "Mallory McMorrow",
        office: "Senate",
        state: "MI",
        party: "DEM",
        stage: ["primary"],
        campaign: "opponent"
      },
      {
        id: "S6MI00467",
        slug: "rachel-howard",
        name: "HOWARD, RACHEL ELIZABETH",
        displayName: "Rachel Howard",
        office: "Senate",
        state: "MI",
        party: "DEM",
        stage: ["primary"],
        campaign: "opponent"
      },
      {
        id: "S6MI00459",
        slug: "joe-tate",
        name: "TATE, JOSEPH ALLEN",
        displayName: "Joe Tate",
        office: "Senate",
        state: "MI",
        party: "DEM",
        stage: ["primary"],
        campaign: "opponent"
      },
      {
        id: "S4MI00595",
        slug: "mike-rogers",
        name: "ROGERS, MICHAEL J",
        displayName: "Mike Rogers",
        office: "Senate",
        state: "MI",
        party: "REP",
        stage: ["general"],
        campaign: "opponent"
      }
    ]
  },
  {
    id: "mi-04-house-2026",
    name: "Michigan U.S. House District 4",
    office: "House",
    state: "MI",
    district: "04",
    stages: ["primary", "general"],
    candidates: [
      {
        id: "H6MI04196",
        slug: "harris-diop",
        name: "HARRIS, DIOP JERMAINE MR II",
        displayName: "Diop Harris",
        office: "House",
        state: "MI",
        district: "04",
        party: "DEM",
        stage: ["primary", "general"],
        committeeId: "C00902734",
        committeeName: "DIOP HARRIS FOR CONGRESS",
        campaign: "harris"
      },
      {
        id: "H6MI04188",
        slug: "richard-aaron",
        name: "AARON, RICHARD",
        displayName: "Richard Aaron",
        office: "House",
        state: "MI",
        district: "04",
        party: "DEM",
        stage: ["primary"],
        campaign: "opponent"
      },
      {
        id: "H6MI04204",
        slug: "sean-mccann",
        name: "MCCANN, SEAN",
        displayName: "Sean McCann",
        office: "House",
        state: "MI",
        district: "04",
        party: "DEM",
        stage: ["primary"],
        campaign: "opponent"
      },
      {
        id: "H4MI04159",
        slug: "jessica-swartz",
        name: "SWARTZ, JESSICA",
        displayName: "Jessica Swartz",
        office: "House",
        state: "MI",
        district: "04",
        party: "DEM",
        stage: ["primary"],
        campaign: "opponent"
      },
      {
        id: "H0MI02094",
        slug: "bill-huizenga",
        name: "HUIZENGA, WILLIAM P",
        displayName: "Bill Huizenga",
        office: "House",
        state: "MI",
        district: "04",
        party: "REP",
        stage: ["general"],
        campaign: "opponent"
      }
    ]
  }
];

export const trackedCandidates = trackedRaces.flatMap((race) =>
  race.candidates.map((candidate) => ({
    ...candidate,
    raceId: race.id,
    raceName: race.name
  }))
);

export const candidateById = new Map(trackedCandidates.map((candidate) => [candidate.id, candidate]));
