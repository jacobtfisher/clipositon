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
import { getBlueskyIframeUrl, getBlueskyOEmbedUrl } from "../../shared/bluesky";
import { getInstagramEmbedUrl } from "../../shared/instagram";
import "./styles.css";

type CategoryFilter = "All" | PositionCategory;
type SourceFilter = "all" | "clips";

const isInstagramClip = (platform: string) => platform === "Instagram";
const isEmbeddableClip = (issue: PositionIssue) =>
  Boolean(issue.clip?.youtubeId || (issue.clip && isInstagramClip(issue.clip.platform)));
const socialThumbnails = import.meta.glob<string>("./thumbnails/*.webp", {
  eager: true,
  import: "default",
  query: "?url"
});

const instagramShortcode = (url: string) => {
  const match = url.match(/instagram\.com\/(?:reel|p)\/([^/?#]+)/i);
  return match?.[1];
};

const youtubeIdFromUrl = (url: string) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})/);
  return match?.[1];
};

const clipThumbnailUrl = (clip: NonNullable<PositionIssue["clip"]>, issue: PositionIssue) => {
  if (clip.youtubeId) return `https://i.ytimg.com/vi/${clip.youtubeId}/hqdefault.jpg`;

  const youtubeAlternate = clip.alternates?.find((option) => option.platform === "YouTube");
  const alternateYoutubeId = youtubeAlternate ? youtubeIdFromUrl(youtubeAlternate.url) : undefined;
  if (alternateYoutubeId) return `https://i.ytimg.com/vi/${alternateYoutubeId}/hqdefault.jpg`;

  const shortcode = clip.platform !== "YouTube" ? instagramShortcode(clip.url) : undefined;
  if (shortcode) {
    const byShortcode = socialThumbnails[`./thumbnails/${shortcode}.webp`];
    if (byShortcode) return byShortcode;
  }

  // Issue-level thumbs are for the card face / primary clip only — never reuse them for moreClips.
  if (issue.clip?.url === clip.url) {
    return socialThumbnails[`./thumbnails/${issue.id}.webp`];
  }

  return undefined;
};

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
              Created by volunteers, not the official campaign. This guide organizes
              statements published by Abdul for U.S. Senate. It is not independent
              fact-checking and never generates a position.
            </p>
          </div>
          <a href={positionLibrarySource.url} target="_blank" rel="noreferrer">
            Campaign priorities <ArrowUpRight size={15} />
          </a>
        </footer>
      </main>

      {selectedIssue ? (
        <IssueDetail
          issue={selectedIssue}
          onClose={closeIssue}
          onOpenIssue={openIssue}
        />
      ) : null}
    </div>
  );
}

function IssueCard({ issue, index, onOpen }: { issue: PositionIssue; index: number; onOpen: () => void }) {
  const displayPlatform =
    issue.clip?.platform === "Instagram" &&
    issue.clip.alternates?.some((option) => option.platform === "Bluesky")
      ? "Bluesky"
      : issue.clip?.platform;
  const socialThumbnail = socialThumbnails[`./thumbnails/${issue.id}.webp`];

  return (
    <article className={`issueCard ${index < 3 ? "featured" : ""}`}>
      <button type="button" className="cardButton" onClick={onOpen} aria-label={`Open ${issue.title}`}>
        {issue.clip ? (
          <div className={`cardMedia ${issue.clip.youtubeId || socialThumbnail ? "" : "socialMedia"}`}>
            {issue.clip.youtubeId ? (
              <img src={`https://i.ytimg.com/vi/${issue.clip.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" />
            ) : socialThumbnail ? (
              <img src={socialThumbnail} alt="" loading="lazy" />
            ) : (
              <div className="socialMediaLabel">
                <Film size={28} />
                <span>{displayPlatform}</span>
                <strong>RECENT CAMPAIGN CLIP</strong>
              </div>
            )}
            <span className="playBadge">
              <Play size={15} fill="currentColor" /> {issue.clip.duration ?? displayPlatform}
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

function IssueDetail({
  issue,
  onClose,
  onOpenIssue
}: {
  issue: PositionIssue;
  onClose: () => void;
  onOpenIssue: (issue: PositionIssue) => void;
}) {
  const [copied, setCopied] = React.useState(false);
  const [activeClipUrl, setActiveClipUrl] = React.useState(issue.clip?.url ?? "");
  const shareUrl = `${window.location.origin}${window.location.pathname}#${issue.id}`;
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const clipOptions = React.useMemo(
    () => [issue.clip, ...(issue.moreClips ?? [])].filter((clip): clip is NonNullable<typeof clip> => Boolean(clip)),
    [issue.clip, issue.moreClips]
  );
  const activeClip = clipOptions.find((clip) => clip.url === activeClipUrl) ?? issue.clip;
  const blueskyOption =
    activeClip?.platform === "Instagram"
      ? activeClip.alternates?.find((option) => option.platform === "Bluesky")
      : undefined;
  const relatedIssues = (issue.relatedIssueIds ?? [])
    .map((id) => positionIssues.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is PositionIssue => Boolean(candidate));

  React.useEffect(() => {
    setActiveClipUrl(issue.clip?.url ?? "");
    bodyRef.current?.scrollTo({ top: 0 });
  }, [issue.id, issue.clip?.url]);

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

        <div className="detailBody" ref={bodyRef}>
          <div className="detailTitle">
            <span>{issue.category} · {issue.eyebrow}</span>
            <h2 id="detail-title">{issue.title}</h2>
            <p>{issue.summary}</p>
          </div>

          {activeClip ? (
            <section className="videoSection">
              {activeClip.youtubeId ? (
                <div className="videoFrame">
                  <iframe
                    key={activeClip.youtubeId}
                    src={`https://www.youtube-nocookie.com/embed/${activeClip.youtubeId}?rel=0`}
                    title={activeClip.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : isInstagramClip(activeClip.platform) && blueskyOption ? (
                <BlueskyEmbed
                  key={blueskyOption.url}
                  url={blueskyOption.url}
                  instagramUrl={activeClip.url}
                  title={activeClip.title}
                />
              ) : isInstagramClip(activeClip.platform) ? (
                <InstagramEmbed key={activeClip.url} url={activeClip.url} title={activeClip.title} />
              ) : (
                <a className="externalClip" href={activeClip.url} target="_blank" rel="noreferrer">
                  <span className="externalClipIcon"><Play size={27} fill="currentColor" /></span>
                  <span>
                    <small>WATCH ON {activeClip.platform.toUpperCase()}</small>
                    <strong>{activeClip.title}</strong>
                  </span>
                  <ExternalLink size={20} />
                </a>
              )}
              <div className="clipCaption">
                <div>
                  <Film size={16} />
                  <span>
                    IN HIS OWN WORDS · {activeClip.duration ?? (blueskyOption ? "Bluesky" : activeClip.platform)}
                  </span>
                </div>
                <blockquote>“{activeClip.quote}”</blockquote>
                {activeClip.alternates?.length ? (
                  <div className="alternateClips" aria-label="Alternate places to watch this clip">
                    <span>Also watch on</span>
                    <div>
                      {activeClip.alternates.map((option) => (
                        <a href={option.url} target="_blank" rel="noreferrer" key={`${option.platform}-${option.url}`}>
                          {option.platform} <ExternalLink size={12} />
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {clipOptions.length > 1 ? (
            <section className="moreClips" aria-label="More clips in his own words">
              <p className="sectionLabel">MORE IN HIS WORDS</p>
              <div className="moreClipsStrip">
                {clipOptions.map((clip) => {
                  const selected = clip.url === activeClip?.url;
                  const thumb = clipThumbnailUrl(clip, issue);
                  const label =
                    clip.platform === "Instagram" &&
                    clip.alternates?.some((option) => option.platform === "Bluesky")
                      ? "Bluesky"
                      : clip.platform;
                  return (
                    <button
                      type="button"
                      key={clip.url}
                      className={`moreClipCard ${selected ? "selected" : ""}`}
                      aria-pressed={selected}
                      onClick={() => setActiveClipUrl(clip.url)}
                    >
                      <span className="moreClipThumb">
                        {thumb ? (
                          <img src={thumb} alt="" loading="lazy" />
                        ) : (
                          <span className="moreClipFallback">
                            <Film size={18} />
                            {label}
                          </span>
                        )}
                        <span className="moreClipPlay">
                          <Play size={12} fill="currentColor" />
                        </span>
                      </span>
                      <span className="moreClipMeta">
                        <small>{clip.duration ?? label}</small>
                        <strong>{clip.title}</strong>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ) : null}

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

          {relatedIssues.length ? (
            <section className="relatedIssues" aria-label="Related positions">
              <p className="sectionLabel">RELATED POSITIONS</p>
              <div className="relatedIssueStrip">
                {relatedIssues.map((related) => (
                  <button
                    type="button"
                    key={related.id}
                    className="relatedIssueChip"
                    onClick={() => onOpenIssue(related)}
                  >
                    <span>
                      <small>{related.category}</small>
                      <strong>{related.title}</strong>
                    </span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <p className="detailNote">
            This page summarizes the linked campaign source. Open the original for full context.
          </p>
        </div>
      </article>
    </div>
  );
}

function BlueskyEmbed({
  url,
  instagramUrl,
  title
}: {
  url: string;
  instagramUrl: string;
  title: string;
}) {
  const frameId = React.useId().replaceAll(":", "");
  const frameRef = React.useRef<HTMLIFrameElement>(null);
  const oEmbedUrl = getBlueskyOEmbedUrl(url);
  const [iframeUrl, setIframeUrl] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<"loading" | "ready" | "unavailable">("loading");
  const [height, setHeight] = React.useState(620);

  React.useEffect(() => {
    const controller = new AbortController();
    setIframeUrl(null);
    setHeight(620);
    setStatus(oEmbedUrl ? "loading" : "unavailable");

    if (!oEmbedUrl) return () => controller.abort();

    const timeoutId = window.setTimeout(
      () => setStatus((current) => current === "loading" ? "unavailable" : current),
      10000
    );

    void fetch(oEmbedUrl, {
      headers: { Accept: "application/json" },
      signal: controller.signal
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Bluesky oEmbed returned ${response.status}`);
        return response.json() as Promise<{ html?: unknown }>;
      })
      .then((data) => {
        if (typeof data.html !== "string") throw new Error("Bluesky oEmbed HTML is missing");
        const embedUrl = getBlueskyIframeUrl(
          data.html,
          frameId,
          `${window.location.origin}${window.location.pathname}`
        );
        if (!embedUrl) throw new Error("Bluesky oEmbed URI is invalid");
        setIframeUrl(embedUrl);
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setStatus("unavailable");
        }
      });

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [frameId, oEmbedUrl]);

  React.useEffect(() => {
    const resize = (event: MessageEvent<unknown>) => {
      if (
        event.origin !== "https://embed.bsky.app" ||
        event.source !== frameRef.current?.contentWindow ||
        typeof event.data !== "object" ||
        event.data === null
      ) {
        return;
      }

      const message = event.data as { id?: unknown; height?: unknown };
      if (message.id !== frameId || typeof message.height !== "number") return;
      setHeight(Math.min(1200, Math.max(240, message.height)));
    };

    window.addEventListener("message", resize);
    return () => window.removeEventListener("message", resize);
  }, [frameId]);

  if (status === "unavailable") {
    return <InstagramEmbed url={instagramUrl} title={title} />;
  }

  return (
    <div className="blueskyEmbedShell" aria-busy={status === "loading"}>
      {status === "loading" ? (
        <div className="socialEmbedLoading" role="status">
          <span />
          Loading Bluesky video…
        </div>
      ) : null}
      {iframeUrl ? (
        <iframe
          ref={frameRef}
          className="blueskyEmbedFrame"
          src={iframeUrl}
          style={{ height }}
          title={`Bluesky video: ${title}`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          scrolling="no"
          onLoad={() => setStatus("ready")}
          onError={() => setStatus("unavailable")}
        />
      ) : null}
    </div>
  );
}

function InstagramEmbed({ url, title }: { url: string; title: string }) {
  const embedUrl = getInstagramEmbedUrl(url);
  const [status, setStatus] = React.useState<"loading" | "ready" | "unavailable">(
    embedUrl ? "loading" : "unavailable"
  );

  React.useEffect(() => {
    setStatus(embedUrl ? "loading" : "unavailable");
    if (!embedUrl) return;

    const timeoutId = window.setTimeout(
      () => setStatus((current) => current === "loading" ? "unavailable" : current),
      10000
    );
    return () => window.clearTimeout(timeoutId);
  }, [embedUrl]);

  return (
    <div className="instagramEmbedShell" aria-busy={status === "loading"}>
      {embedUrl ? (
        <div className="instagramFrameWrap">
          {status === "loading" ? (
            <div className="socialEmbedLoading" role="status">
              <span />
              Loading Instagram video…
            </div>
          ) : null}
          <iframe
            className="instagramEmbedFrame"
            src={embedUrl}
            title={`Instagram video: ${title}`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setStatus("ready")}
            onError={() => setStatus("unavailable")}
          />
        </div>
      ) : null}
      {status === "unavailable" ? (
        <div className="instagramFallback">
          <p>Instagram could not load here. Privacy settings or a content blocker may be preventing it.</p>
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
