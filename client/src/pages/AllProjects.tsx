// Split-Screen Studio: The archive is a clear Studio index and a discoverable Maker desk, with every project opening an evidence-aware project note.
/** Design reminder — The archive is a disciplined near-black Studio index or a cream-paper Maker research board; legacy college records sit clearly after active work without becoming hidden. */
import { Fragment, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, FileText, Github, Search, Sparkles } from "lucide-react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import ProjectVisual from "@/components/ProjectVisual";
import { archiveProjects, featuredProjects, type Project } from "@/data/portfolio";
import LegacyProjectDialog from "@/components/LegacyProjectDialog";
import "./ArchiveEggs.css";

type Filter = "All" | "Full stack" | "Frontend";
type AllProjectsProps = { curated?: boolean; params?: { [param: number]: string | undefined } };

export default function AllProjects({ curated = false }: AllProjectsProps) {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [focusedCard, setFocusedCard] = useState<number | null>(null);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [legacyProject, setLegacyProject] = useState<Project | null>(null);
  const projectShelf = curated ? featuredProjects : archiveProjects;
  const visibleProjects = useMemo(() => projectShelf.filter((project) => (filter === "All" || project.type === filter) && `${project.title} ${project.category}`.toLowerCase().includes(query.toLowerCase())), [filter, projectShelf, query]);
  const firstLegacyIndex = useMemo(() => visibleProjects.findIndex((project) => project.legacyArchive), [visibleProjects]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || focusedCard === null) return;
      const number = Number(event.key);
      if (number < 1 || number > Math.min(9, visibleProjects.length)) return;
      event.preventDefault(); setFlippedCard(number - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusedCard, visibleProjects.length]);

  return <div className={`site-shell archive-page ${curated ? "work-shelf-page" : ""}`}>
    <SiteHeader />
    <main className="archive-main section-shell">
      <a className="back-link" href="/"><ArrowLeft size={16} /> Back to home signal</a>
      <div className="archive-heading"><p className="eyebrow"><span className="signal-dot" /> {curated ? "Current work / selected shelf" : "Project archive"}</p><h1>{curated ? <>Six builds<br /><em>with receipts.</em></> : <>Every build<br /><em>has a note.</em></>}</h1><p>{curated ? "A concise shelf of current work: six researched project notes, original visual systems, source context, and the live builds that sit behind them." : "Each project now opens into a documented project note, grounded in a live build, public source where available, and the original portfolio record."}</p></div>
      {!curated && <div className="archive-tools">
        <div className="filter-row" aria-label="Project filters">{(["All", "Full stack", "Frontend"] as Filter[]).map((item) => <button type="button" className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
        <label className="archive-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" aria-label="Search projects" /></label>
      </div>}
      <div className="archive-grid">
        {visibleProjects.map((project, index) => <Fragment key={project.title}>
          {index === firstLegacyIndex && <div className="archive-legacy-divider"><span>ARCHIVE SHELF / EARLY WORK</span><div><b>College-era builds, kept for the work behind them.</b><p>These project notes preserve the idea, process, and available source context. Their historic deployments may no longer run reliably.</p></div><i aria-hidden="true" /></div>}
          <article className={`${flippedCard === index ? "archive-card is-flipped" : "archive-card"} archive-card-index-${(index % 6) + 1} ${project.legacyArchive ? "is-legacy" : ""}`} tabIndex={0} onFocus={() => setFocusedCard(index)}>
          <ProjectVisual project={project} index={index % 6} />
          <div className="archive-card-content"><div><span>{project.type} · {project.evidence.label === "Verified GitHub repository" ? "source checked" : "portfolio record"}</span>{project.legacyArchive && <small className="archive-card-status">college archive / link may be down</small>}<h2>{project.title}</h2></div><div className="archive-card-actions"><Link href={`/work/${project.slug}`} aria-label={`Read ${project.title} project note`}><FileText size={17} /></Link>{project.evidence.repositoryUrl && <a href={project.evidence.repositoryUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.evidence.repositoryName} source on GitHub`}><Github size={17} /></a>}{project.legacyArchive ? <button type="button" onClick={() => setLegacyProject(project)} aria-label={`Open legacy notice for ${project.title} live project`} aria-haspopup="dialog"><ArrowUpRight size={18} /></button> : <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live project`}><ArrowUpRight size={18} /></a>}</div></div><button type="button" className="archive-card-flip" onClick={() => setFlippedCard(flippedCard === index ? null : index)} aria-pressed={flippedCard === index}>field note / {index + 1}</button><div className="archive-card-field-note" aria-hidden={flippedCard !== index}><span>{project.legacyArchive ? "LEGACY NOTE" : "ARCHIVE NOTE"} / {String(index + 1).padStart(2, "0")}</span><b>{project.stack.slice(0, 3).join(" · ")}</b><p>{project.proof}</p></div>
          </article>
        </Fragment>)}
      </div>
      {visibleProjects.length === 0 && <p className="no-results">No projects match that search. Try another project type or a shorter word.</p>}
      {curated && <div className="archive-prompt work-shelf-prompt"><Sparkles size={17} /><p>Looking for earlier experiments, interfaces, and college-era work?</p><Link href="/all-projects">Open the complete archive <ArrowUpRight size={16} /></Link></div>}
    </main>
    <LegacyProjectDialog project={legacyProject} onOpenChange={(open) => { if (!open) setLegacyProject(null); }} />
  </div>;
}
