import React from "react";
import ReactDOM from "react-dom/client";
import { format, formatDistanceToNowStrict, parseISO } from "date-fns";
import { AlertTriangle, ArrowDownUp, Bell, Download, ExternalLink, RefreshCw, Search, ShieldAlert } from "lucide-react";
import { filterSpendingRecords } from "../shared/filters";
import { trackedRaces } from "../shared/races";
import { summarizeSpending } from "../shared/summary";
import type { SpendingRecord, SpendingResponse } from "../shared/types";
import "./styles.css";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

type Mode = "campaign" | "opponents" | "all";
type Position = "all" | "S" | "O";
type Stage = "all" | "primary" | "general";
type RecordScope = "all" | "new";

const seenRecordsKey = "fec-spending-tracker.seen-record-ids";
const selectedRaceKey = "fec-spending-tracker.selected-race-id";
const defaultRaceId = trackedRaces[0]?.id || "";
const appBasePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
  const [data, setData] = React.useState<SpendingResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [mode, setMode] = React.useState<Mode>("campaign");
  const [position, setPosition] = React.useState<Position>("all");
  const [stage, setStage] = React.useState<Stage>("all");
  const [recordScope, setRecordScope] = React.useState<RecordScope>("all");
  const [raceId, setRaceId] = React.useState(() => window.localStorage.getItem(selectedRaceKey) || defaultRaceId);
  const [query, setQuery] = React.useState("");
  const [newRecordIds, setNewRecordIds] = React.useState<Set<string>>(() => new Set());

  const load = React.useCallback(async (refresh = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${appBasePath}/api/spending${refresh ? "?refresh=true" : ""}`);
      if (!response.ok) throw new Error(await response.text());
      const nextData = (await response.json()) as SpendingResponse;
      setNewRecordIds(readNewRecordIds(nextData.records));
      setData(nextData);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Could not load spending data");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), 60 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, [load]);

  const races = data?.races.length ? data.races : trackedRaces;
  const selectedRace = races.find((race) => race.id === raceId) || races[0];

  React.useEffect(() => {
    if (!selectedRace) return;
    if (selectedRace.id !== raceId) {
      setRaceId(selectedRace.id);
      return;
    }
    window.localStorage.setItem(selectedRaceKey, selectedRace.id);
  }, [raceId, selectedRace]);

  const records = React.useMemo(() => {
    if (!data || !selectedRace) return [];
    return filterSpendingRecords(data.records, {
      raceId: selectedRace.id,
      mode,
      position,
      stage,
      recordScope,
      newRecordIds,
      query
    });
  }, [data, mode, newRecordIds, position, query, recordScope, selectedRace, stage]);

  const filteredSummary = React.useMemo(() => summarizeSpending(records, 8), [records]);

  return (
    <main>
      <header className="topbar">
        <div>
          <p className="eyebrow">{selectedRace ? selectedRace.name : "Michigan 2026"}</p>
          <h1>Race Spending Tracker</h1>
        </div>
        <button className="iconButton" onClick={() => void load(true)} disabled={loading} title="Refresh FEC data">
          <RefreshCw size={18} />
          <span>{loading ? "Refreshing" : "Refresh"}</span>
        </button>
      </header>

      <section className="statusBand">
        <div>
          <strong>Hourly FEC monitor</strong>
          <span>
            {data
              ? `Last checked ${formatTime(data.generatedAt)}. Data refreshes by ${format(parseISO(data.staleAt), "h:mm a")}.`
              : "Loading live filings."}
          </span>
        </div>
        <div className="phase">
          <Bell size={16} />
          Email alerts: By Request
        </div>
      </section>

      {error ? <div className="error">{error}</div> : null}
      {data?.sourceWarnings.length ? (
        <section className="warningBand">
          <strong>Data source warnings</strong>
          <span>{data.sourceWarnings.join(" ")}</span>
        </section>
      ) : null}

      <section className="filters">
        <label className="selectLabel raceSelect">
          Race
          <select value={selectedRace?.id || ""} onChange={(event) => setRaceId(event.target.value)}>
            {races.map((race) => (
              <option value={race.id} key={race.id}>
                {race.name}
              </option>
            ))}
          </select>
        </label>
        <Segmented
          label="Scope"
          value={mode}
          options={[
            ["campaign", "Campaign"],
            ["opponents", "Opponents"],
            ["all", "Full race"]
          ]}
          onChange={(value) => setMode(value as Mode)}
        />
        <Segmented
          label="Position"
          value={position}
          options={[
            ["all", "All"],
            ["O", "Oppose"],
            ["S", "Support"]
          ]}
          onChange={(value) => setPosition(value as Position)}
        />
        <Segmented
          label="Stage"
          value={stage}
          options={[
            ["all", "All"],
            ["primary", "Primary"],
            ["general", "General"]
          ]}
          onChange={(value) => setStage(value as Stage)}
        />
        <Segmented
          label="Records"
          value={recordScope}
          options={[
            ["all", "All"],
            ["new", `New (${newRecordIds.size})`]
          ]}
          onChange={(value) => setRecordScope(value as RecordScope)}
        />
        <label className="searchBox">
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search spender, payee, purpose" />
        </label>
      </section>

      <section className="metrics">
        <Metric label="Tracked spend" value={currency.format(filteredSummary.total)} detail={`${records.length} race filings`} />
        <Metric label="Campaign spend" value={currency.format(filteredSummary.campaign)} detail="By campaign committees" />
        <Metric label="Opposition" value={currency.format(filteredSummary.oppose)} detail="Against this race scope" tone="danger" />
        <Metric label="Support" value={currency.format(filteredSummary.support)} detail="For this race scope" tone="good" />
        <Metric label="24h notices" value={String(filteredSummary.notices24h)} detail="Fast-response filings" />
      </section>

      <section className="split">
        <Panel title="Race Totals">
          <div className="candidateRows">
            {filteredSummary.byCandidate.map((candidate) => (
              <div className="candidateRow" key={candidate.candidateId}>
                <div>
                  <strong>{candidate.candidateName}</strong>
                  <span>{candidate.candidateId}</span>
                </div>
                <div className="bars">
                  <Bar label="Campaign" value={candidate.campaign} max={filteredSummary.total} className="campaign" />
                  <Bar label="Oppose" value={candidate.oppose} max={filteredSummary.total} className="oppose" />
                  <Bar label="Support" value={candidate.support} max={filteredSummary.total} className="support" />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Spending Committees">
          <div className="spenderRows">
            {filteredSummary.byCommittee.map((committee) => (
              <div className="spenderRow" key={committee.committeeId}>
                <div>
                  <strong>{committee.committeeName}</strong>
                  <span>{committee.count} filings · {committee.committeeId}</span>
                </div>
                <b>{currency.format(committee.total)}</b>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="tablePanel">
        <div className="tableHeader">
          <div>
            <h2>Latest Filings</h2>
            <p>Campaign committee disbursements and independent expenditures from FEC filings.</p>
          </div>
          <ArrowDownUp size={18} />
          <button
            className="iconButton small"
            onClick={() => exportCsv(records, selectedRace?.id)}
            disabled={!records.length}
            title="Export current filtered filings"
          >
            <Download size={16} />
            <span>CSV</span>
          </button>
        </div>
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Filing</th>
                <th>Candidate</th>
                <th>Type</th>
                <th>Spender</th>
                <th>Purpose</th>
                <th>Payee</th>
                <th className="amount">Amount</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <RecordRow record={record} key={record.id} />
              ))}
              {!loading && records.length === 0 ? (
                <tr>
                  <td colSpan={7} className="empty">No matching FEC independent expenditure filings yet.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function readNewRecordIds(records: SpendingRecord[]) {
  const currentIds = records.map((record) => record.id);
  const previousIds = new Set(readSeenRecordIds());
  const newIds = previousIds.size ? currentIds.filter((id) => !previousIds.has(id)) : [];
  window.localStorage.setItem(seenRecordsKey, JSON.stringify(currentIds));
  return new Set(newIds);
}

function readSeenRecordIds() {
  try {
    const value = window.localStorage.getItem(seenRecordsKey);
    return value ? (JSON.parse(value) as string[]) : [];
  } catch {
    return [];
  }
}

function RecordRow({ record }: { record: SpendingRecord }) {
  return (
    <tr>
      <td>
        <div className="dateCell">
          <strong>{record.filingDate ? format(parseISO(record.filingDate), "MMM d") : "Unknown"}</strong>
          <span>{record.filingForm || record.reportType || "FEC"}</span>
        </div>
      </td>
      <td>
        <strong>{record.candidate?.displayName || record.candidateName}</strong>
        <span className="muted">{record.candidate?.raceName}</span>
      </td>
      <td>
        <RecordTypePill record={record} />
      </td>
      <td>
        <strong>{record.committeeName || "Unknown committee"}</strong>
        <span className="muted">{record.committeeType || record.committeeId}</span>
      </td>
      <td>
        <div className="purpose">
          {record.severity === "critical" || record.severity === "high" ? <ShieldAlert size={16} /> : <AlertTriangle size={16} />}
          <div>
            <strong>{record.mediaType}</strong>
            <span>{record.purpose || "No purpose listed"}</span>
            <em>{record.alertReasons.join(", ")}</em>
          </div>
        </div>
      </td>
      <td>
        <strong>{record.payeeName || "Unknown payee"}</strong>
        <span className="muted">{record.payeeLocation}</span>
      </td>
      <td className="amount">
        <strong>{currency.format(record.amount)}</strong>
        {record.pdfUrl ? (
          <a href={record.pdfUrl} target="_blank" rel="noreferrer" title="Open FEC filing">
            <ExternalLink size={15} />
          </a>
        ) : null}
      </td>
    </tr>
  );
}

function Segmented({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: Array<[string, string]>;
  onChange: (value: string) => void;
}) {
  return (
    <div className="segmented">
      <span>{label}</span>
      <div>
        {options.map(([optionValue, optionLabel]) => (
          <button className={value === optionValue ? "active" : ""} onClick={() => onChange(optionValue)} key={optionValue}>
            {optionLabel}
          </button>
        ))}
      </div>
    </div>
  );
}

function RecordTypePill({ record }: { record: SpendingRecord }) {
  if (record.kind === "campaign_disbursement") {
    return <span className="pill campaign">Campaign</span>;
  }

  return (
    <span className={`pill ${record.supportOppose === "O" ? "oppose" : record.supportOppose === "S" ? "support" : ""}`}>
      {record.supportOppose === "O" ? "Oppose" : record.supportOppose === "S" ? "Support" : "Unknown"}
    </span>
  );
}

function Metric({ label, value, detail, tone }: { label: string; value: string; detail: string; tone?: "danger" | "good" }) {
  return (
    <div className={`metric ${tone || ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Bar({ label, value, max, className }: { label: string; value: number; max: number; className: string }) {
  const width = max > 0 ? Math.max(2, (value / max) * 100) : 0;
  return (
    <div className="barRow">
      <span>{label}</span>
      <div className="track">
        <i className={className} style={{ width: `${width}%` }} />
      </div>
      <b>{currency.format(value)}</b>
    </div>
  );
}

function formatTime(value: string) {
  return `${formatDistanceToNowStrict(parseISO(value), { addSuffix: true })}`;
}

function exportCsv(records: SpendingRecord[], raceId?: string) {
  const headers = ["filing_date", "race", "candidate", "kind", "position", "spender", "purpose", "payee", "amount", "pdf_url"];
  const rows = records.map((record) => [
    record.filingDate || "",
    record.candidate?.raceName || "",
    record.candidate?.displayName || record.candidateName,
    record.kind,
    record.supportOppose,
    record.committeeName || "",
    record.purpose || "",
    record.payeeName || "",
    String(record.amount),
    record.pdfUrl || ""
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `fec-spending-${raceId || "race"}-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
}

function csvCell(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
