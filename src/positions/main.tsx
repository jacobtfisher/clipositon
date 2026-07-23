import React from "react";
import ReactDOM from "react-dom/client";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  ExternalLink,
  Film,
  Link as LinkIcon,
  Play,
  Search,
  Share2,
  SlidersHorizontal,
  X
} from "lucide-react";
import {
  positionCategories,
  positionIssues,
  positionLibrarySource,
  type PositionCategory,
  type PositionIssue
} from "../../shared/positions";
import "./styles.css";

type CategoryFilter = "All" | PositionCategory;
type SourceFilter = "all" | "clips";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: { process: () => void };
    };
  }
}

const isInstagramClip = (platform: string) => platform === "Instagram";
const isEmbeddableClip = (issue: PositionIssue) =>
  Boolean(issue.clip?.youtubeId || (issue.clip && isInstagramClip(issue.clip.platform)));

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const searchableText = (issue: PositionIssue) =>
  normalize([issue.title, issue.eyebrow, issue.summary, issue.points.join(" "), issue.tags.join(" ")].join(" "));

function App() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<CategoryFilter>("All");
  const [sourceFilter, setSourceFilter] = React.useState<SourceFilter>("all");
  const [selectedId, setSelectedId] = React.useState(() => window.location.hash.slice(1));

  const selectedIssue = positionIssues.find((issue) => issue.id === selectedId);

  React.useEffect(() => {
    const onHashChange = () => setSelectedId(window.location.hash.slice(1));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  React.useEffect(() => {
    document.body.classList.toggle("detailOpen", Boolean(selectedIssue));
    return () => document.body.classList.remove("detailOpen");
  }, [selectedIssue]);

  const filtered = React.useMemo(() => {
    const words = normalize(query).split(" ").filter(Boolean);
    return positionIssues.filter((issue) => {
      if (category !== "All" && issue.category !== category) return false;
      if (sourceFilter === "clips" && !issue.clip) return false;
      const haystack = searchableText(issue);
      return words.every((word) => haystack.includes(word));
    });
  }, [category, query, sourceFilter]);

  const openIssue = (issue: PositionIssue) => {
    window.history.pushState(null, "", `#${issue.id}`);
    setSelectedId(issue.id);
  };

  const closeIssue = () => {
    window.history.pushState(null, "", window.location.pathname + window.location.search);
    setSelectedId("");
  };

  return (
    <div className="positionApp">
      <header className="siteHeader">
        <a className="wordmark" href="https://abdulforsenate.com/" target="_blank" rel="noreferrer" aria-label="Abdul for U.S. Senate">
          <LogoMark />
          <span>
            <b>ABDUL</b>
            <small>FOR U.S. SENATE</small>
          </span>
        </a>
        <div className="sourcePromise">
          <Check size={14} strokeWidth={3} />
          Sourced, not generated
        </div>
      </header>

      <main className="libraryShell">
        <section className="hero">
          <div className="heroCopy">
            <p className="kicker">WHERE ABDUL STANDS</p>
            <h1>Hear it from him.</h1>
            <p className="heroIntro">
              Search Abdul El-Sayed’s public positions, watch him explain them, and open the original campaign source.
            </p>
          </div>
          <div className="heroStats" aria-label="Library status">
            <div>
              <strong>{positionIssues.length}</strong>
              <span>issues</span>
            </div>
            <i />
            <div>
              <strong>{positionIssues.filter(isEmbeddableClip).length}</strong>
              <span>embedded clips</span>
            </div>
          </div>
        </section>

        <section className="searchDock" aria-label="Search and filters">
          <label className="searchField">
            <Search size={22} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try ‘rent,’ ‘ICE,’ ‘Medicare,’ or ‘schools’"
              autoComplete="off"
            />
            {query ? (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                <X size={17} />
              </button>
            ) : null}
          </label>
          <div className="filterRow">
            <div className="categoryFilters" aria-label="Filter by category">
              {positionCategories.map((option) => (
                <button
                  type="button"
                  className={category === option ? "active" : ""}
                  onClick={() => setCategory(option)}
                  key={option}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={`clipToggle ${sourceFilter === "clips" ? "active" : ""}`}
              onClick={() => setSourceFilter((value) => (value === "clips" ? "all" : "clips"))}
            >
              <Film size={15} />
              Clips only
            </button>
          </div>
        </section>

        <section className="resultsHeader">
          <div>
            <SlidersHorizontal size={15} />
            <span>{filtered.length} {filtered.length === 1 ? "result" : "results"}</span>
          </div>
          <p>Last reviewed July 23, 2026</p>
        </section>

        {filtered.length ? (
          <section className="issueGrid" aria-label="Position results">
            {filtered.map((issue, index) => (
              <IssueCard issue={issue} index={index} onOpen={() => openIssue(issue)} key={issue.id} />
            ))}
          </section>
        ) : (
          <section className="emptyState">
            <Search size={28} />
            <h2>No exact match yet.</h2>
            <p>Try fewer words or browse all issues. An honest “not found” is better than an invented answer.</p>
            <button type="button" onClick={() => { setQuery(""); setCategory("All"); setSourceFilter("all"); }}>
              Show every issue
            </button>
          </section>
        )}

        <footer className="libraryFooter">
          <div>
            <LogoMark />
            <p>
              This guide organizes statements published by Abdul for U.S. Senate. It is not independent fact-checking and never generates a position.
            </p>
          </div>
          <a href={positionLibrarySource.url} target="_blank" rel="noreferrer">
            Campaign priorities <ArrowUpRight size={15} />
          </a>
        </footer>
      </main>

      {selectedIssue ? <IssueDetail issue={selectedIssue} onClose={closeIssue} /> : null}
    </div>
  );
}

function IssueCard({ issue, index, onOpen }: { issue: PositionIssue; index: number; onOpen: () => void }) {
  return (
    <article className={`issueCard ${index < 3 ? "featured" : ""}`}>
      <button type="button" className="cardButton" onClick={onOpen} aria-label={`Open ${issue.title}`}>
        {issue.clip ? (
          <div className={`cardMedia ${issue.clip.youtubeId ? "" : "socialMedia"}`}>
            {issue.clip.youtubeId ? (
              <img src={`https://i.ytimg.com/vi/${issue.clip.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" />
            ) : (
              <div className="socialMediaLabel">
                <Film size={28} />
                <span>{issue.clip.platform}</span>
                <strong>RECENT CAMPAIGN CLIP</strong>
              </div>
            )}
            <span className="playBadge">
              <Play size={15} fill="currentColor" /> {issue.clip.duration ?? issue.clip.platform}
            </span>
          </div>
        ) : (
          <div className="cardMedia textSource">
            <span>CAMPAIGN<br />POSITION</span>
            <LinkIcon size={24} />
          </div>
        )}
        <div className="cardContent">
          <div className="cardMeta">
            <span>{issue.category}</span>
            <small>{issue.clip ? "VIDEO + SOURCE" : "TEXT SOURCE"}</small>
          </div>
          <h2>{issue.title}</h2>
          <p>{issue.summary}</p>
          <div className="cardAction">
            <span>{issue.clip ? "Watch & read" : "Read position"}</span>
            <ChevronRight size={18} />
          </div>
        </div>
      </button>
    </article>
  );
}

function IssueDetail({ issue, onClose }: { issue: PositionIssue; onClose: () => void }) {
  const [copied, setCopied] = React.useState(false);
  const shareUrl = `${window.location.origin}${window.location.pathname}#${issue.id}`;

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: `${issue.title} — Where Abdul Stands`, text: issue.summary, url: shareUrl });
      return;
    }
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="detailLayer" role="dialog" aria-modal="true" aria-labelledby="detail-title">
      <button type="button" className="detailBackdrop" onClick={onClose} aria-label="Close details" />
      <article className="detailPanel">
        <header className="detailHeader">
          <button type="button" className="backButton" onClick={onClose}>
            <ArrowLeft size={19} /> Back to issues
          </button>
          <button type="button" className="shareButton" onClick={() => void share()}>
            {copied ? <Check size={17} /> : <Share2 size={17} />}
            {copied ? "Copied" : "Share"}
          </button>
        </header>

        <div className="detailBody">
          <div className="detailTitle">
            <span>{issue.category} · {issue.eyebrow}</span>
            <h2 id="detail-title">{issue.title}</h2>
            <p>{issue.summary}</p>
          </div>

          {issue.clip ? (
            <section className="videoSection">
              {issue.clip.youtubeId ? (
                <div className="videoFrame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${issue.clip.youtubeId}?rel=0`}
                    title={issue.clip.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : isInstagramClip(issue.clip.platform) ? (
                <InstagramEmbed url={issue.clip.url} title={issue.clip.title} />
              ) : (
                <a className="externalClip" href={issue.clip.url} target="_blank" rel="noreferrer">
                  <span className="externalClipIcon"><Play size={27} fill="currentColor" /></span>
                  <span>
                    <small>WATCH ON {issue.clip.platform.toUpperCase()}</small>
                    <strong>{issue.clip.title}</strong>
                  </span>
                  <ExternalLink size={20} />
                </a>
              )}
              <div className="clipCaption">
                <div>
                  <Film size={16} />
                  <span>IN HIS OWN WORDS · {issue.clip.duration ?? issue.clip.platform}</span>
                </div>
                <blockquote>“{issue.clip.quote}”</blockquote>
                {issue.clip.alternates?.length ? (
                  <div className="alternateClips" aria-label="Alternate places to watch this clip">
                    <span>Also watch on</span>
                    <div>
                      {issue.clip.alternates.map((option) => (
                        <a href={option.url} target="_blank" rel="noreferrer" key={`${option.platform}-${option.url}`}>
                          {option.platform} <ExternalLink size={12} />
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ) : (
            <section className="noClipNotice">
              <LinkIcon size={20} />
              <div>
                <strong>Campaign position, clip still needed</strong>
                <p>We found a detailed official position, but not a clean public video clip yet.</p>
              </div>
            </section>
          )}

          <section className="positionPoints">
            <p className="sectionLabel">WHAT HE HAS SAID</p>
            <ul>
              {issue.points.map((point) => (
                <li key={point}><Check size={16} strokeWidth={3} /><span>{point}</span></li>
              ))}
            </ul>
          </section>

          <section className="sourceCard">
            <div>
              <span>{issue.source.kind}</span>
              <strong>{issue.source.publisher}</strong>
              <small>Primary campaign source</small>
            </div>
            <a href={issue.source.url} target="_blank" rel="noreferrer">
              {issue.source.label} <ExternalLink size={15} />
            </a>
          </section>

          <p className="detailNote">
            This page summarizes the linked campaign source. Open the original for full context.
          </p>
        </div>
      </article>
    </div>
  );
}

function InstagramEmbed({ url, title }: { url: string; title: string }) {
  const [timedOut, setTimedOut] = React.useState(false);

  React.useEffect(() => {
    setTimedOut(false);

    const processEmbeds = () => window.instgrm?.Embeds?.process();
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]'
    );

    if (existingScript) {
      if (window.instgrm?.Embeds) processEmbeds();
      else existingScript.addEventListener("load", processEmbeds, { once: true });
    } else {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.instagram.com/embed.js";
      script.addEventListener("load", processEmbeds, { once: true });
      document.body.appendChild(script);
    }

    const timeoutId = window.setTimeout(() => setTimedOut(true), 6500);
    return () => window.clearTimeout(timeoutId);
  }, [url]);

  return (
    <div className="instagramEmbedShell">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned="false"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        aria-label={`Instagram video: ${title}`}
      >
        <a href={url} target="_blank" rel="noreferrer">
          Watch {title} on Instagram
        </a>
      </blockquote>
      {timedOut ? (
        <div className="instagramFallback">
          <p>Instagram may be blocked by privacy settings or a content blocker.</p>
          <a href={url} target="_blank" rel="noreferrer">
            Watch on Instagram <ExternalLink size={14} />
          </a>
        </div>
      ) : null}
    </div>
  );
}

function LogoMark() {
  return (
    <svg className="logoMark" viewBox="0 0 46 46" aria-hidden="true">
      <path d="M23 2 43 13v20L23 44 3 33V13L23 2Z" fill="currentColor" opacity=".12" />
      <path d="m12 28 11-15 11 15h-6l-5-7-5 7h-6Z" fill="currentColor" />
      <path d="M17 31h12v4H17z" fill="currentColor" />
    </svg>
  );
}

ReactDOM.createRoot(document.getElementById("positions-root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
