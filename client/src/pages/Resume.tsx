/**
 * Design reminder — Proofboard / Signal Sheet: Studio presents a precise dark dossier;
 * Maker turns the same verified résumé into a taped research board led by Signal Blue.
 */
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Code2, ExternalLink, FileText, GraduationCap, Layers3, Mail, Medal, Sparkles, X } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteHeader from "@/components/SiteHeader";
import { HoverHint } from "@/components/HoverHint";
import { profile } from "@/data/portfolio";
import { usePortfolioMode } from "@/contexts/ModeContext";
import "./Resume.css";

gsap.registerPlugin(ScrollTrigger);

type EvidenceId = "stoic" | "road" | "spizz";

const evidence = {
  stoic: {
    index: "01 / system work",
    label: "Stoic & Salamander Global Corporation",
    role: "Software Development Engineer Intern",
    period: "Jul 2024 — Nov 2024",
    image: "/assets/om-case-study-systems_ad415a10.jpg",
    alt: "Dark editorial systems artwork representing internal product work",
    note: "Internal tools for notes, expenses, invoices, and payslips — made clearer through responsive front-end work.",
    markers: ["Internal tools", "Responsive UI", "Operational clarity"],
  },
  road: {
    index: "02 / learning in public",
    label: "Road To Code",
    role: "Tech Assistance Intern",
    period: "Dec 2023 — Feb 2024",
    image: "/assets/om-case-study-maker_3d83918a.jpg",
    alt: "Paper-and-ink editorial artwork representing collaborative learning work",
    note: "Supported learners, contributed to documentation and code, and helped improve the open-source Spaceship project.",
    markers: ["Teaching support", "Open source", "Documentation"],
  },
  spizz: {
    index: "03 / selected build",
    label: "Spizz",
    role: "3D product landing page",
    period: "Project evidence",
    image: "/assets/om-case-study-motion_e3794e30.jpg",
    alt: "Blue and dimensional editorial artwork representing the Spizz landing page",
    note: "A product story built with React Three Fiber, motion, and dimensional web craft — included in the source résumé as a selected project.",
    markers: ["3D web", "GSAP motion", "Product story"],
  },
} as const;

const skillFields = [
  { label: "Product builds", items: ["React", "Next.js", "Node.js", "Express", "MongoDB"], icon: Code2 },
  { label: "Interface motion", items: ["GSAP", "Framer Motion", "React Three Fiber", "AOS", "Tailwind CSS"], icon: Sparkles },
  { label: "Working tools", items: ["TypeScript", "Figma", "Firebase", "Git / GitHub", "Shadcn UI"], icon: Layers3 },
];

const proofNotes = [
  { title: "Portfolio", copy: "A dual-mode project archive with evidence-aware case studies and interaction craft.", source: "Source marker / interface system", tone: "blue" },
  { title: "Nutribites", copy: "A MERN food-commerce flow with account, order, and administrative context.", source: "Source marker / commerce flow", tone: "green" },
  { title: "Spizz", copy: "A dimensional product landing page where the interface itself carries the story.", source: "Source marker / dimensional web", tone: "red" },
];

export default function Resume() {
  const { mode } = usePortfolioMode();
  const reducedMotion = useReducedMotion();
  const routeRef = useRef<HTMLElement>(null);
  const [activeEvidence, setActiveEvidence] = useState<EvidenceId>("stoic");
  const [heroPreviewOpen, setHeroPreviewOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const active = evidence[activeEvidence];

  useLayoutEffect(() => {
    if (reducedMotion || !routeRef.current) return;
    const context = gsap.context(() => {
      gsap.from(".resume-gsap-reveal", {
        y: 26,
        opacity: 0,
        duration: 0.72,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: ".resume-hero", start: "top 75%", once: true },
      });
      gsap.to(".resume-vector-path", {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".resume-evidence", start: "top 72%", once: true },
      });
    }, routeRef);
    return () => context.revert();
  }, [reducedMotion]);

  const activateEvidence = (id: EvidenceId) => setActiveEvidence(id);

  return (
    <main className="resume-route" ref={routeRef}>
      <SiteHeader />
      <section className="resume-hero" aria-labelledby="resume-title">
        <div className="resume-hero-grid" aria-hidden="true" />
        <div className="resume-orbit resume-orbit-one" aria-hidden="true" />
        <div className="resume-orbit resume-orbit-two" aria-hidden="true" />
        <svg className="resume-hero-vector" viewBox="0 0 520 310" fill="none" aria-hidden="true"><path className="resume-vector-path" d="M11 264C94 264 103 202 169 202C249 202 238 49 353 64C425 74 438 129 505 42" /><circle cx="169" cy="202" r="6" /><circle cx="353" cy="64" r="7" /></svg>
        <div className="resume-shell resume-hero-layout">
          <div className="resume-hero-copy">
            <Link href="/" className="resume-back resume-gsap-reveal"><span>←</span> Portfolio home</Link>
            <p className="resume-eyebrow resume-gsap-reveal"><i /> Recruiter signal / 2026</p>
            <h1 id="resume-title" className="resume-gsap-reveal">A working record,<br /><em>made visible.</em></h1>
            <p className="resume-hero-summary resume-gsap-reveal">A visual read of Om Nandurkar’s full-stack work, selected proof, and the practical skills behind the portfolio. Start with the signal sheet, then inspect the material.</p>
            <div className="resume-hero-actions resume-gsap-reveal">
              <a className="resume-primary-cta" href={profile.resumeUrl} target="_blank" rel="noreferrer"><FileText size={17} /> Open real résumé PDF <ExternalLink size={14} /></a>
              <a className="resume-secondary-cta" href="#resume-evidence"><ArrowDown size={16} /> Inspect the proof</a>
            </div>
            <p className="resume-source-line resume-gsap-reveal">Visual page based on the supplied résumé; the linked PDF remains the official source document.</p>
          </div>

          <motion.aside className="resume-signal-sheet" initial={{ opacity: 0, y: 22, rotate: -1.5 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.65, delay: 0.15 }} aria-label="Résumé signal sheet">
            <div className="resume-sheet-tape" aria-hidden="true" />
            <header><span>OM / signal sheet</span><b>01</b></header>
            <div className="resume-sheet-name"><img src="/assets/om-editorial-portrait_32f7492d.png" alt="Om Nandurkar" /><div><strong>Om Nandurkar</strong><small>Full-stack developer</small></div></div>
            <dl>
              <div><dt>Builds with</dt><dd>React, Node, systems thinking</dd></div>
              <div><dt>Current evidence</dt><dd>Product work, motion, usable interfaces</dd></div>
              <div><dt>Open to</dt><dd>Thoughtful product and engineering opportunities</dd></div>
            </dl>
            <div className="resume-sheet-stamp"><span>OM</span><small>{mode === "studio" ? "precision / proof" : "desk copy / keep"}</small></div>
            <div className="resume-hero-preview-wrap">
              <button type="button" className="resume-hero-preview-trigger" onClick={() => setHeroPreviewOpen((open) => !open)} aria-expanded={heroPreviewOpen} aria-controls="resume-hero-live-preview">{heroPreviewOpen ? <><X size={15} /> Close live preview</> : <><FileText size={15} /> Live PDF preview <ArrowUpRight size={13} /></>}</button>
              {heroPreviewOpen && <motion.div id="resume-hero-live-preview" className="resume-hero-live-preview" initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.22 }}><span>verified source / live PDF</span><iframe title="Hero preview of Om Nandurkar’s real résumé PDF" src="https://drive.google.com/file/d/1Ly0l0SSPd7Lc2tOXOtwi06-jUB5THFUH/preview" loading="lazy" /></motion.div>}
            </div>
          </motion.aside>
        </div>
        <div className="resume-hero-rule" aria-hidden="true"><span>Full-stack practice</span><i /><span>Product craft</span><i /><span>Human interfaces</span></div>
      </section>

      <section className="resume-evidence" id="resume-evidence" aria-labelledby="resume-evidence-title">
        <div className="resume-shell">
          <header className="resume-section-intro">
            <p><span>01</span> Evidence ledger</p>
            <div><h2 id="resume-evidence-title">Work,<br /><em>cross-referenced.</em></h2><span>Choose a record to inspect its work surface.</span></div>
          </header>
          <div className="resume-evidence-layout">
            <div className="resume-evidence-rail" role="list" aria-label="Experience and project proof">
              {(Object.entries(evidence) as [EvidenceId, (typeof evidence)[EvidenceId]][]).map(([id, item]) => <button key={id} type="button" className={activeEvidence === id ? "resume-evidence-card active" : "resume-evidence-card"} onMouseEnter={() => activateEvidence(id)} onFocus={() => activateEvidence(id)} onClick={() => activateEvidence(id)} role="listitem" aria-pressed={activeEvidence === id}>
                <span className="resume-evidence-index">{item.index}</span><strong>{item.label}</strong><small>{item.role} <i /> {item.period}</small><ArrowUpRight size={16} />
              </button>)}
            </div>
            <motion.article className="resume-evidence-stage" key={activeEvidence} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }} aria-live="polite">
              <div className="resume-stage-image"><img src={active.image} alt={active.alt} /><span className="resume-stage-scanline" aria-hidden="true" /><div className="resume-stage-corner top" aria-hidden="true" /><div className="resume-stage-corner bottom" aria-hidden="true" /></div>
              <div className="resume-stage-copy"><p>{active.index}</p><h3>{active.label}</h3><span>{active.role} · {active.period}</span><div>{active.markers.map((marker) => <b key={marker}>{marker}</b>)}</div><p>{active.note}</p></div>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="resume-capabilities" aria-labelledby="resume-capabilities-title">
        <div className="resume-shell">
          <header className="resume-section-intro resume-capabilities-heading"><p><span>02</span> Capability field</p><div><h2 id="resume-capabilities-title">Technical range,<br /><em>kept useful.</em></h2></div></header>
          <div className="resume-skill-fields">{skillFields.map(({ label, items, icon: Icon }, index) => <article className="resume-skill-field" key={label}><header><span>0{index + 1}</span><Icon size={20} /><h3>{label}</h3></header><div>{items.map((item) => <button type="button" key={item} aria-label={`${item} is part of Om’s technical toolkit`}><i />{item}</button>)}</div><p>{index === 0 ? "Tools for the product journey from interface to API." : index === 1 ? "Motion used as feedback, dimension, and pacing — not decoration." : "Collaboration and delivery tools that keep the work traceable."}</p></article>)}</div>
        </div>
      </section>

      <section className="resume-proof" aria-labelledby="resume-proof-title">
        <div className="resume-shell">
          <header className="resume-section-intro"><p><span>03</span> Selected material</p><div><h2 id="resume-proof-title">Projects, studies,<br /><em>and proof.</em></h2><span>Three evidence records named in the source résumé.</span></div></header>
          <div className="resume-proof-grid">{proofNotes.map((note, index) => <motion.article className={`resume-proof-note ${note.tone}`} key={note.title} whileHover={reducedMotion ? undefined : { y: -8, rotate: 0 }} transition={{ type: "spring", stiffness: 290, damping: 18 }}><span>{String(index + 1).padStart(2, "0")}</span><div className="resume-note-pin" aria-hidden="true" /><small>{note.source}</small><h3>{note.title}</h3><p>{note.copy}</p><div className="resume-proof-signature"><i /> Case-study reference</div><Link href={note.title === "Portfolio" ? "/" : note.title === "Nutribites" ? "/work/nutribites" : "/work/spizz"}>Open the evidence <ArrowUpRight size={14} /></Link></motion.article>)}</div>
        </div>
      </section>

      <section className="resume-background" aria-labelledby="resume-background-title">
        <div className="resume-shell resume-background-layout">
          <div><p className="resume-eyebrow"><i /> Context beyond code</p><h2 id="resume-background-title">Education and<br /><em>shared practice.</em></h2><p>Computer Engineering at JSPM’s Imperial College of Engineering and Research, supplemented by development-team leadership, student-community work, and debate experience.</p><span className="resume-margin-signal">margin note — rigorous enough for systems, curious enough for new interfaces.</span></div>
          <div className="resume-background-cards">
            <article><div className="resume-card-tape" aria-hidden="true" /><GraduationCap size={21} /><span>2021 — 2025</span><h3>B.E. Computer Engineering</h3><p>JSPM’s Imperial College of Engineering and Research, Wagholi, Pune.</p></article>
            <article><div className="resume-card-pin" aria-hidden="true" /><BriefcaseBusiness size={21} /><span>Community leadership</span><h3>Teams that learn in public</h3><p>Development Team Lead at Microsoft Learn Student Ambassadors; Management Team Executive at Google Developer Student Club.</p></article>
            <article><div className="resume-card-stamp" aria-hidden="true">OM</div><Medal size={21} /><span>Beyond the screen</span><h3>Debate practice</h3><p>Two-time winner and one-time runner-up in a debate competition organised by the college.</p></article>
          </div>
        </div>
      </section>

      <section className="resume-document" id="resume-document" aria-labelledby="resume-document-title">
        <div className="resume-shell resume-document-layout">
          <div className="resume-document-copy"><p className="resume-eyebrow"><i /> Original document</p><h2 id="resume-document-title">Need the formal<br /><em>version?</em></h2><p>The visual proofboard is designed for an easier first read. Open the verified PDF when you need the source format, detailed project copy, and direct document handoff.</p><div><a className="resume-primary-cta" href={profile.resumeUrl} target="_blank" rel="noreferrer"><FileText size={17} /> Open real résumé PDF <ExternalLink size={14} /></a><a className="resume-email-cta" href={`mailto:${profile.email}?subject=Opportunity%20for%20Om%20Nandurkar`}><Mail size={16} /> Start a conversation</a></div></div>
          <div className={previewOpen ? "resume-document-preview open" : "resume-document-preview"}>
            <span className="resume-document-tab">source / pdf</span><span className="resume-document-tape" aria-hidden="true" />
            <div className="resume-preview-paper" aria-hidden={previewOpen}><span>OM NANDURKAR</span><i /><i /><i /><i /><b>TECHNICAL SKILLS</b><i /><i /><b>PROFESSIONAL EXPERIENCE</b><i /><i /><i /></div>
            <button type="button" className="resume-preview-trigger" onClick={() => setPreviewOpen((open) => !open)} aria-expanded={previewOpen}>{previewOpen ? <><X size={16} /> Close live preview</> : <><FileText size={16} /> Load live PDF preview</>}</button>
            {previewOpen && <iframe title="Live preview of Om Nandurkar’s real résumé PDF" src="https://drive.google.com/file/d/1Ly0l0SSPd7Lc2tOXOtwi06-jUB5THFUH/preview" loading="lazy" />}
          </div>
        </div>
      </section>
      <footer className="resume-footer resume-shell"><span>OM / résumé proofboard</span><Link href="/">Return to the portfolio <ArrowUpRight size={14} /></Link></footer>
    </main>
  );
}
