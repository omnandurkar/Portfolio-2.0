// Split-Screen Studio: Evidence-rich case studies retain Studio precision while Maker presents the same facts as a physical build note; incoming records add optional, clearly bounded source and story layers.
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, BookOpenCheck, Bug, CheckCircle2, ExternalLink, FileWarning, Github, Layers3, Milestone, ScanSearch, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useRoute } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import CaseStudyArtwork, { CaseStudyScene, getCaseStudyArt } from "@/components/CaseStudyArtwork";
import LegacyProjectDialog from "@/components/LegacyProjectDialog";
import { archiveProjects } from "@/data/portfolio";
import { usePortfolioMode } from "@/contexts/ModeContext";
import "./CaseStudyEggs.css";

export default function CaseStudy() {
  const [, params] = useRoute("/work/:slug");
  const projectIndex = archiveProjects.findIndex((project) => project.slug === params?.slug);
  const project = archiveProjects[projectIndex];
  const { mode } = usePortfolioMode();
  const [shelfOpen, setShelfOpen] = useState(false);
  const [debugChoice, setDebugChoice] = useState("");
  const [legacyPromptOpen, setLegacyPromptOpen] = useState(false);

  if (!project) return <div className="site-shell case-study-shell"><SiteHeader /><main className="missing-case-study"><span className="signal-dot" aria-hidden="true" /><p className="study-number">Archive dossier / route not indexed</p><h1>Project note<br />awaiting its record<em>.</em></h1><p>This archive address does not currently match a published case-study dossier. The project index remains available for verified routes and source records.</p><Link href="/all-projects">Return to the archive <ArrowUpRight size={16} /></Link></main></div>;

  const study = project.caseStudy;
  const artwork = getCaseStudyArt(project);
  const evidenceCopy = project.evidence.label === "Verified GitHub repository" ? `Source checked: ${project.evidence.repositoryName}` : "Source note: portfolio record";
  return (
    <div className={`site-shell case-study-shell case-study-family-${artwork.family}`}>
      <SiteHeader />
      <main>
        <section className="case-study-hero section-shell">
          <Link href="/all-projects" className="case-study-back"><ArrowLeft size={15} /> Back to project archive</Link>
          <div className="case-study-grid">
            <motion.div className="case-study-copy" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <p className="eyebrow"><span className="signal-dot" /> {project.category}</p>
              <h1>{project.title}<em>.</em></h1>
              <p className="case-study-lead">{project.description}</p>
              <p className="case-mode-pair" aria-label={`${mode === "studio" ? "Studio" : "Maker"} is active. Press M to switch the case study’s material language.`}><i className="case-mode-pair-mark" aria-hidden="true" /><span>{mode === "studio" ? "Studio / active" : "Maker / active"}</span><b>OM / grid ↔ ink</b><kbd>M</kbd></p>
              <dl className="case-study-facts"><div><dt>Contribution</dt><dd>{project.role}</dd></div><div><dt>Lens</dt><dd>{mode === "studio" ? "Precision / systems" : "Play / process"}</dd></div><div><dt>Stack</dt><dd>{project.stack.join(" · ")}</dd></div></dl>
              <div className="case-study-actions">{project.legacyArchive ? <button type="button" className="primary-action" onClick={() => setLegacyPromptOpen(true)} aria-haspopup="dialog">Visit legacy link <ArrowUpRight size={17} /></button> : <a className="primary-action" href={project.liveUrl} target="_blank" rel="noreferrer">Visit live project <ArrowUpRight size={17} /></a>}{project.evidence.repositoryUrl && <a className="source-action" href={project.evidence.repositoryUrl} target="_blank" rel="noreferrer"><Github size={16} /> Source</a>}</div>
            </motion.div>
            <motion.div className="case-study-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.08 }}>
              <CaseStudyArtwork project={project} />
            </motion.div>
          </div>
        </section>
        <section className="case-study-body section-shell">
          <article className="study-section study-section-material-opportunity"><p className="study-number">01 / Opportunity memo</p><h2>{study.headings.opportunity}</h2><p>{study.brief}</p></article>
          <article className="study-section study-section-offset study-section-material-build"><p className="study-number">02 / Build specification</p><h2>{study.headings.build}</h2><p>{study.approach}</p></article>
          {study.story && <aside className="case-story-route" aria-label={`${project.title} project route`}>
            <div className="case-story-route-intro"><p className="study-number">{study.story.label}</p><h3>{study.story.title}</h3><p>{study.story.summary}</p></div>
            <ol>{study.story.beats.map((beat, index) => <li key={beat}><span>{String(index + 1).padStart(2, "0")}</span><b>{beat}</b></li>)}</ol>
            <Milestone aria-hidden="true" />
          </aside>}
          {study.story && <CaseStudyScene project={project} />}
          <article className="study-contributions contribution-index"><div><p className="study-number">03 / Contribution index</p><h2>{study.headings.contribution}</h2></div><ul>{study.contributions.map((contribution) => <li key={contribution}><CheckCircle2 size={18} />{contribution}</li>)}</ul></article>
          <aside className="case-artifact-note stamped-artifact-note"><div className="case-artifact-stamp" aria-hidden="true"><i /><b>OM</b></div><div><p className="study-number">Stamped artifact / {artwork.cue}</p><h3>{artwork.art.label}</h3><span>{artwork.note}</span></div><em>{artwork.field}</em></aside>
          <article className="study-evidence evidence-ledger"><div className="evidence-icon"><ShieldCheck size={22} /></div><div><p className="study-number">04 / Verification ledger</p><h3>{evidenceCopy}</h3><p>{project.proof}. Claims on this page are limited to the public project, the connected GitHub repository where available, and Om’s existing portfolio record.</p></div>{project.evidence.repositoryUrl && <a href={project.evidence.repositoryUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.evidence.repositoryName} on GitHub`}><Github size={19} /></a>}</article>
          {study.context && <article className="study-context source-tab">
            <div className="context-icon"><BookOpenCheck size={21} /></div>
            <div><p className="study-number">05 / Source tab · {study.context.label}</p><h3>{study.context.sourceName}</h3><p>{study.context.statement}</p></div>
            <a href={study.context.sourceUrl} target="_blank" rel="noreferrer" aria-label={`Read ${study.context.sourceName}`}><ExternalLink size={18} /><span>Read source</span></a>
          </article>}
          {study.scope && <aside className="study-scope-note scope-stamp"><FileWarning size={20} aria-hidden="true" /><div><p className="study-number">Scope boundary</p><h3>{study.scope.title}</h3><p>{study.scope.detail}</p></div></aside>}
          <aside className="case-shelf-scan inspection-viewport"><div><p className="study-number">Inspection viewport / {artwork.cue}</p><h3>{study.story?.title ?? "Inspect the working signal."}</h3><p>{study.story?.summary ?? "Stack choices, proof, and friction are part of the project story too."}</p></div><button type="button" onClick={() => setShelfOpen((open) => !open)} aria-expanded={shelfOpen}><ScanSearch size={16} /> {shelfOpen ? "Close shelf scan" : `Inspect ${artwork.cue}`}</button>{shelfOpen && <motion.div className="case-shelf-panel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><span>{project.title.toUpperCase()} / CLICK A SIGNAL</span><div>{project.stack.map((item) => <button type="button" key={item} onClick={() => setDebugChoice(item)}>{item}</button>)}</div><section><b><Bug size={14} /> Good bug / bad bug</b><button type="button" onClick={() => setDebugChoice("Good bugs point to the next useful decision.")}>Keep the signal</button><button type="button" onClick={() => setDebugChoice("Bad bugs hide the next useful step.")}>Remove the friction</button></section>{debugChoice && <p className="case-shelf-result" role="status">{debugChoice}</p>}</motion.div>}</aside>
          <article className="study-closing"><Layers3 size={25} /><p>{study.closing}</p><Link href="/all-projects">Explore the broader archive <ArrowUpRight size={17} /></Link></article>
        </section>
      </main>
      <footer className="site-footer"><span>© 2026 Om Nandurkar</span><span>Built with React · Tailwind · GSAP</span><Link href="/">Return to homepage ↑</Link></footer>
      <LegacyProjectDialog project={legacyPromptOpen ? project : null} onOpenChange={(open) => setLegacyPromptOpen(open)} />
    </div>
  );
}
