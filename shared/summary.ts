import type { DashboardSummary, SpendingRecord } from "./types.js";

export function summarizeSpending(records: SpendingRecord[], committeeLimit = 12): DashboardSummary {
  const total = sum(records);
  const support = sum(records.filter((record) => record.supportOppose === "S"));
  const oppose = sum(records.filter((record) => record.supportOppose === "O"));
  const campaign = sum(records.filter((record) => record.kind === "campaign_disbursement"));
  const notices24h = records.filter((record) => record.reportType === "24" || record.filingForm === "F24").length;

  const byCandidate = Array.from(groupBy(records, (record) => record.candidateId).entries()).map(([candidateId, items]) => ({
    candidateId,
    candidateName: items[0]?.candidate?.displayName || items[0]?.candidateName || candidateId,
    support: sum(items.filter((record) => record.supportOppose === "S")),
    oppose: sum(items.filter((record) => record.supportOppose === "O")),
    campaign: sum(items.filter((record) => record.kind === "campaign_disbursement")),
    total: sum(items)
  }));

  const byCommittee = Array.from(groupBy(records, (record) => record.committeeId || record.committeeName || "unknown").entries())
    .map(([committeeId, items]) => ({
      committeeId,
      committeeName: items[0]?.committeeName || committeeId,
      support: sum(items.filter((record) => record.supportOppose === "S")),
      oppose: sum(items.filter((record) => record.supportOppose === "O")),
      campaign: sum(items.filter((record) => record.kind === "campaign_disbursement")),
      total: sum(items),
      count: items.length
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, committeeLimit);

  return {
    total,
    support,
    oppose,
    campaign,
    notices24h,
    lastFilingDate: records[0]?.filingDate,
    byCandidate,
    byCommittee
  };
}

function sum(records: SpendingRecord[]) {
  return records.reduce((total, record) => total + record.amount, 0);
}

function groupBy<T>(items: T[], getKey: (item: T) => string) {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = getKey(item);
    map.set(key, [...(map.get(key) || []), item]);
  }
  return map;
}
