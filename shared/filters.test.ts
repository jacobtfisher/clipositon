import assert from "node:assert/strict";
import test from "node:test";
import { filterSpendingRecords } from "./filters.js";
import type { SpendingRecord } from "./types.js";

test("position filters keep campaign disbursements in the selected race", () => {
  const records = [
    record("campaign", "campaign_disbursement", "U", 100, "harris"),
    record("support", "independent_expenditure", "S", 25, "opponent"),
    record("oppose", "independent_expenditure", "O", 50, "opponent")
  ];

  const filtered = filterSpendingRecords(records, {
    raceId: "race-1",
    mode: "campaign",
    position: "S",
    stage: "all",
    recordScope: "all",
    newRecordIds: new Set(),
    query: ""
  });

  assert.deepEqual(filtered.map((item) => item.id), ["campaign"]);
});

function record(
  id: string,
  kind: SpendingRecord["kind"],
  supportOppose: SpendingRecord["supportOppose"],
  amount: number,
  campaign: "harris" | "opponent"
): SpendingRecord {
  return {
    id,
    kind,
    candidateId: "C1",
    candidateName: "Candidate One",
    candidate: {
      id: "C1",
      slug: "candidate-one",
      name: "CANDIDATE, ONE",
      displayName: "Candidate One",
      office: "House",
      state: "MI",
      party: "DEM",
      stage: ["primary"],
      campaign,
      raceId: "race-1",
      raceName: "Race One"
    },
    supportOppose,
    amount,
    mediaType: "Other",
    severity: "low",
    alertReasons: ["Routine filing"]
  };
}
