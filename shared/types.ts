import type { TrackedCandidate } from "./races.js";

export type SupportOppose = "S" | "O" | "U";
export type SpendKind = "independent_expenditure" | "campaign_disbursement" | "communication_cost" | "electioneering";

export type SpendingRecord = {
  id: string;
  kind: SpendKind;
  candidateId: string;
  candidateName: string;
  candidate?: TrackedCandidate & { raceId: string; raceName: string };
  supportOppose: SupportOppose;
  amount: number;
  expenditureDate?: string;
  filingDate?: string;
  disseminationDate?: string;
  committeeId?: string;
  committeeName?: string;
  committeeType?: string;
  payeeName?: string;
  payeeLocation?: string;
  purpose?: string;
  electionType?: string;
  reportType?: string;
  filingForm?: string;
  pdfUrl?: string;
  transactionId?: string;
  fileNumber?: number;
  isNotice?: boolean;
  disbursementCategory?: string;
  mediaType: string;
  severity: "low" | "medium" | "high" | "critical";
  alertReasons: string[];
};

export type DashboardSummary = {
  total: number;
  support: number;
  oppose: number;
  campaign: number;
  notices24h: number;
  lastFilingDate?: string;
  byCandidate: Array<{
    candidateId: string;
    candidateName: string;
    support: number;
    oppose: number;
    campaign: number;
    total: number;
  }>;
  byCommittee: Array<{
    committeeId: string;
    committeeName: string;
    support: number;
    oppose: number;
    campaign: number;
    total: number;
    count: number;
  }>;
};

export type CandidateFetchStatus = {
  candidateId: string;
  candidateName: string;
  ok: boolean;
  fetchedRecords: number;
  expectedRecords?: number;
  pagesFetched: number;
  warning?: string;
};

export type SpendingResponse = {
  generatedAt: string;
  staleAt: string;
  cacheSeconds: number;
  records: SpendingRecord[];
  summary: DashboardSummary;
  races: typeof import("./races.js").trackedRaces;
  sourceWarnings: string[];
  candidateStatuses: CandidateFetchStatus[];
};
