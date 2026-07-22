import type { SpendingRecord } from "./types.js";

export type SpendingMode = "campaign" | "opponents" | "all";
export type SpendingPosition = "all" | "S" | "O";
export type SpendingStage = "all" | "primary" | "general";

export type SpendingFilterOptions = {
  raceId: string;
  mode: SpendingMode;
  position: SpendingPosition;
  stage: SpendingStage;
  recordScope: "all" | "new";
  newRecordIds: Set<string>;
  query: string;
};

export function filterSpendingRecords(records: SpendingRecord[], options: SpendingFilterOptions) {
  const text = options.query.trim().toLowerCase();

  return records.filter((record) => {
    if (record.candidate?.raceId !== options.raceId) return false;
    if (options.mode === "campaign" && record.candidate?.campaign === "opponent") return false;
    if (options.mode === "opponents" && record.candidate?.campaign !== "opponent") return false;
    if (options.recordScope === "new" && !options.newRecordIds.has(record.id)) return false;
    if (
      options.position !== "all" &&
      record.kind !== "campaign_disbursement" &&
      record.supportOppose !== options.position
    ) {
      return false;
    }
    if (options.stage !== "all" && !record.candidate?.stage.includes(options.stage)) return false;
    if (!text) return true;
    return [
      record.candidate?.displayName,
      record.candidateName,
      record.committeeName,
      record.payeeName,
      record.purpose,
      record.mediaType
    ]
      .filter(Boolean)
      .some((value) => value?.toLowerCase().includes(text));
  });
}
