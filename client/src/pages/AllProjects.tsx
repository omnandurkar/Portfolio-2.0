// Split-Screen Studio: The archive is a clear Studio index and a discoverable Maker desk, with every project opening an evidence-aware project note.
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, FileText, Github, Search } from "lucide-react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import ProjectVisual from "@/components/ProjectVisual";
import { archiveProjects } from "@/data/portfolio";
import "./ArchiveEggs.css";

type Filter = "All" | "Full stack" | "Frontend";

export default function AllProjects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [focusedCard, setFocusedCard] = useState<number | null>(null);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const visibleProjects = useMemo(() => archiveProjects.filter((project) => (filter === "All" || project.type === filter) && `${project.title} ${project.category}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);

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

  return <div className="site-shell archive-page">
    <SiteHeader />
    <main className="archive-main section-shell">
      <a className="back-link" href="/"><ArrowLeft size={16} /> Back to selected work</a>
      <div className="archive-heading"><p className="eyebrow"><span className="signal-dot" /> Project archive</p><h1>Every build<br /><em>has a note.</em></h1><p>Each project now opens into a documented project note, grounded in a live build, public source where available, and the original portfolio record.</p></div>
      <div className="archive-tools">
        <div className="filter-row" aria-label="Project filters">{(["All", "Full stack", "Frontend"] as Filter[]).map((item) => <button type="button" className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
        <label className="archive-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" aria-label="Search projects" /></label>
      </div>
      <div className="archive-grid">
        {visibleProjects.map((project, index) => <article className={flippedCard === index ? "archive-card is-flipped" : "archive-card"} key={project.title} tabIndex={0} onFocus={() => setFocusedCard(index)}>
          <ProjectVisual project={project} index={index % 6} />
          <div className="archive-card-content"><div><span>{project.type} · {project.evidence.label === "Verified GitHub repository" ? "source checked" : "portfolio record"}</span><h2>{project.title}</h2></div><div className="archive-card-actions"><Link href={`/work/${project.slug}`} aria-label={`Read ${project.title} project note`}><FileText size={17} /></Link>{project.evidence.repositoryUrl && <a href={project.evidence.repositoryUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.evidence.repositoryName} source on GitHub`}><Github size={17} /></a>}<a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live project`}><ArrowUpRight size={18} /></a></div></div><button type="button" className="archive-card-flip" onClick={() => setFlippedCard(flippedCard === index ? null : index)} aria-pressed={flippedCard === index}>field note / {index + 1}</button><div className="archive-card-field-note" aria-hidden={flippedCard !== index}><span>ARCHIVE NOTE / {String(index + 1).padStart(2, "0")}</span><b>{project.stack.slice(0, 3).join(" · ")}</b><p>{project.proof}</p></div>
        </article>)}
      </div>
      {visibleProjects.length === 0 && <p className="no-results">No projects match that search. Try another project type or a shorter word.</p>}
    </main>
  </div>;
}
