import assert from "node:assert/strict";
import test from "node:test";
import { summarizeSpending } from "./summary.js";
import type { SpendingRecord } from "./types.js";

test("summarizeSpending aggregates candidates and committees from records", () => {
  const records: SpendingRecord[] = [
    record("1", "A", "Candidate A", "C1", "Committee 1", "O", 100, "2026-07-20", "F24"),
    record("2", "A", "Candidate A", "C1", "Committee 1", "S", 50, "2026-07-19"),
    record("3", "B", "Candidate B", "C2", "Committee 2", "S", 25, "2026-07-18"),
    record("4", "B", "Candidate B", "C3", "Candidate B Committee", "U", 200, "2026-07-17", undefined, "campaign_disbursement")
  ];

  const summary = summarizeSpending(records, 1);

  assert.equal(summary.total, 375);
  assert.equal(summary.oppose, 100);
  assert.equal(summary.support, 75);
  assert.equal(summary.campaign, 200);
  assert.equal(summary.notices24h, 1);
  assert.equal(summary.lastFilingDate, "2026-07-20");
  assert.equal(summary.byCandidate.length, 2);
  assert.deepEqual(summary.byCandidate[0], {
    candidateId: "A",
    candidateName: "Candidate A",
    support: 50,
    oppose: 100,
    campaign: 0,
    total: 150
  });
  assert.equal(summary.byCommittee.length, 1);
  assert.equal(summary.byCommittee[0].campaign, 200);
  assert.equal(summary.byCommittee[0].committeeName, "Candidate B Committee");
});

function record(
  id: string,
  candidateId: string,
  candidateName: string,
  committeeId: string,
  committeeName: string,
  supportOppose: SpendingRecord["supportOppose"],
  amount: number,
  filingDate: string,
  filingForm?: string,
  kind: SpendingRecord["kind"] = "independent_expenditure"
): SpendingRecord {
  return {
    id,
    kind,
    candidateId,
    candidateName,
    supportOppose,
    amount,
    filingDate,
    committeeId,
    committeeName,
    filingForm,
    mediaType: "Other",
    severity: "low",
    alertReasons: ["Routine filing"]
  };
}
