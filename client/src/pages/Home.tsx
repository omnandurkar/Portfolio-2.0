// Split-Screen Studio: The homepage tells one curated career story in two deliberately contrasting visual systems; the 10-second brief becomes a focused recruiter dossier.
/** Design reminder — The homepage is an editorial Studio/Maker hero; Storyboard Break and First Draft are optional, portrait-led layers that never compromise the normal work, story, or recruiter paths. */
import { motion } from "framer-motion";
import { type KeyboardEvent, type PointerEvent, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Check, Code2, Coffee, Copy, Database, FileText, Gamepad2, Github, Linkedin, Mail, MapPin, Palette, Plus, Send, Sparkles, X } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import ProjectVisual from "@/components/ProjectVisual";
import { experiences, featuredProjects, profile } from "@/data/portfolio";
import { usePortfolioMode } from "@/contexts/ModeContext";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { HoverHint } from "@/components/HoverHint";
import { Link } from "wouter";
import "./IdentityDossier.css";
import "./HeroPortraitExperiment.css";
import "./FooterDiscovery.css";
import "./HomeEasterEggs.css";

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const services = [
  { number: "01", title: "Web development", icon: Code2, tags: ["Next.js", "React", "JavaScript"], copy: "Responsive products that feel deliberate from the first interaction to the last state." },
  { number: "02", title: "Product interface", icon: Palette, tags: ["Figma", "Motion", "Responsive"], copy: "Visual systems and interactions that help a product say more with less friction." },
  { number: "03", title: "Backend systems", icon: Database, tags: ["Node.js", "Express", "APIs"], copy: "The practical infrastructure underneath an intuitive, dependable user experience." },
];

const contactIntents = [
  { id: "product", label: "Build a product", studio: "A practical product idea", maker: "let’s make something useful", subject: "A product idea for Om", body: "Hi Om,%0A%0AI’d like to discuss a product idea." },
  { id: "interface", label: "Shape an interface", studio: "An interface that needs clarity", maker: "let’s make it feel right", subject: "An interface project for Om", body: "Hi Om,%0A%0AI’d like to discuss an interface or frontend project." },
  { id: "hello", label: "Say hello", studio: "A thoughtful hello", maker: "a little internet hello", subject: "Hello Om", body: "Hi Om,%0A%0A" },
];

export default function Home() {
  const { mode } = usePortfolioMode();
  const isStudio = mode === "studio";
  const [activeProject, setActiveProject] = useState(0);
  const [contactIntent, setContactIntent] = useState("product");
  const [identityOpen, setIdentityOpen] = useState(() => new URLSearchParams(window.location.search).get("brief") === "open");
  const [signalFound, setSignalFound] = useState(false);
  const [dossierBack, setDossierBack] = useState(false);
  const [monsoon, setMonsoon] = useState(false);
  const [chaiOpen, setChaiOpen] = useState(false);
  const [paperTrail, setPaperTrail] = useState<string[]>([]);
  const [deskCombined, setDeskCombined] = useState(false);
  const [contactRemix, setContactRemix] = useState(false);
  const [buildGraph, setBuildGraph] = useState(false);
  const [workspaceNudge, setWorkspaceNudge] = useState(false);
  const [storyboardActive, setStoryboardActive] = useState(false);
  const [firstDraftOpen, setFirstDraftOpen] = useState(false);
  const [gravityActive, setGravityActive] = useState(false);
  const storyboardTimer = useRef<number | null>(null);
  const gravityLayer = useRef<HTMLDivElement | null>(null);
  const gravityResetTimer = useRef<number | null>(null);
  const selectedProject = featuredProjects[activeProject];
  const selectedContactIntent = contactIntents.find((intent) => intent.id === contactIntent) ?? contactIntents[0];

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("continue") !== "work") return;
    const timer = window.setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" }), 560);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onEgg = (event: Event) => {
      const egg = (event as CustomEvent<string>).detail;
      if (egg === "mumbai") setMonsoon(true);
      if (egg === "chai") setChaiOpen(true);
      if (egg === "build-graph") setBuildGraph(true);
      if (egg === "gravity") setGravityActive(true);
      if (egg === "gravity-reset") setGravityActive(false);
    };
    window.addEventListener("om:egg", onEgg);
    return () => window.removeEventListener("om:egg", onEgg);
  }, []);

  useEffect(() => { if (!monsoon) return; const timer = window.setTimeout(() => setMonsoon(false), 5200); return () => window.clearTimeout(timer); }, [monsoon]);
  useEffect(() => { if (!chaiOpen) return; const timer = window.setTimeout(() => setChaiOpen(false), 5200); return () => window.clearTimeout(timer); }, [chaiOpen]);
  useEffect(() => { const timer = window.setTimeout(() => setWorkspaceNudge(true), 60000); return () => window.clearTimeout(timer); }, []);
  useEffect(() => () => { if (storyboardTimer.current) window.clearTimeout(storyboardTimer.current); }, []);
  useEffect(() => () => { if (gravityResetTimer.current) window.clearTimeout(gravityResetTimer.current); }, []);
  useEffect(() => {
    if (!gravityActive) return;
    const layer = gravityLayer.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resetGravity = () => {
      if (gravityResetTimer.current) window.clearTimeout(gravityResetTimer.current);
      layer?.replaceChildren();
      setGravityActive(false);
    };
    window.addEventListener("om:gravity-reset", resetGravity);
    if (reduceMotion || !layer) {
      gravityResetTimer.current = window.setTimeout(resetGravity, 1800);
      return () => { window.removeEventListener("om:gravity-reset", resetGravity); if (gravityResetTimer.current) window.clearTimeout(gravityResetTimer.current); };
    }
    const materials = Array.from(document.querySelectorAll<HTMLElement>("[data-gravity-material]"));
    const clones = materials.flatMap((material, index) => {
      const bounds = material.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return [];
      const clone = material.cloneNode(true) as HTMLElement;
      clone.classList.add("gravity-material-clone");
      clone.removeAttribute("data-gravity-material");
      clone.setAttribute("aria-hidden", "true");
      clone.style.right = "auto";
      clone.style.bottom = "auto";
      clone.style.setProperty("--gravity-left", `${bounds.left}px`);
      clone.style.setProperty("--gravity-top", `${bounds.top}px`);
      clone.style.setProperty("--gravity-width", `${bounds.width}px`);
      clone.style.setProperty("--gravity-height", `${bounds.height}px`);
      clone.style.setProperty("--gravity-delay", `${index * 72}ms`);
      clone.style.setProperty("--gravity-tilt", `${(index % 2 === 0 ? 1 : -1) * (7 + index * 3)}deg`);
      clone.style.setProperty("--gravity-x", `${(index - (materials.length - 1) / 2) * 8}vw`);
      return [clone];
    });
    layer.replaceChildren(...clones);
    requestAnimationFrame(() => layer.classList.add("is-falling"));
    gravityResetTimer.current = window.setTimeout(resetGravity, 7000);
    return () => { window.removeEventListener("om:gravity-reset", resetGravity); if (gravityResetTimer.current) window.clearTimeout(gravityResetTimer.current); layer.replaceChildren(); };
  }, [gravityActive]);

  const handleProjectNavigatorKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextProject = event.key === "Home" ? 0 : event.key === "End" ? featuredProjects.length - 1 : (activeProject + (event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1) + featuredProjects.length) % featuredProjects.length;
    setActiveProject(nextProject);
    requestAnimationFrame(() => document.getElementById(`project-tab-${nextProject}`)?.focus());
  };

  const updatePortraitTilt = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--portrait-x", `${x * 10}px`);
    event.currentTarget.style.setProperty("--portrait-y", `${y * 8}px`);
  };

  const resetPortraitTilt = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.removeProperty("--portrait-x");
    event.currentTarget.style.removeProperty("--portrait-y");
  };

  const collectTrail = (piece: string) => setPaperTrail((current) => current.includes(piece) ? current : [...current, piece]);
  const remixLine = `I have ${selectedContactIntent.label.toLowerCase()} that could use clearer paths.`;
  const startStoryboard = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (storyboardTimer.current) window.clearTimeout(storyboardTimer.current);
    storyboardTimer.current = window.setTimeout(() => setStoryboardActive(true), 650);
  };
  const stopStoryboard = () => {
    if (storyboardTimer.current) window.clearTimeout(storyboardTimer.current);
    storyboardTimer.current = null;
    setStoryboardActive(false);
  };

  return (
    <div className={`site-shell ${monsoon ? "is-monsoon" : ""} ${chaiOpen ? "is-chai" : ""}`}>
      <SiteHeader />
      <main>
        <section className={`hero ${storyboardActive ? "is-storyboard-active" : ""} ${firstDraftOpen ? "is-first-draft-open" : ""} ${gravityActive ? "is-gravity-active" : ""}`} id="top">
          <div className="hero-art" aria-hidden="true">
            <img className="studio-hero-art" src="/assets/om-studio-signal-hero_7c477776.jpg" alt="" />
            <img className="scrapbook-hero-art" src="/assets/om-scrapbook-desk_9aeef479.jpg" alt="" />
            <img className="sticker-sheet" data-gravity-material="sticker-sheet" src="/assets/om-scrapbook-sticker-sheet_349fd13a.png" alt="" />
            <figure className="hero-secondary-portrait hero-secondary-window" data-gravity-material="window-print" aria-hidden="true">
              <img src="/assets/om-portrait-outlook-experiment_4e277d5d.jpeg" alt="" />
              <figcaption>outside / perspective</figcaption>
            </figure>
            <figure className="hero-secondary-portrait hero-secondary-outlook" data-gravity-material="outlook-print" aria-hidden="true">
              <img src="/assets/om-portrait-window-experiment_5bb6fe0c.jpg" alt="" />
              <figcaption>sunlit / iteration</figcaption>
            </figure>
            <figure className="hero-secondary-portrait hero-secondary-closeup" data-gravity-material="closeup-print" aria-hidden="true">
              <img src="/assets/om-portrait-closeup-experiment_51745c1b.jpeg" alt="" />
              <figcaption>focus / 01</figcaption>
            </figure>
            <aside className="first-draft-underlay" id="first-draft-underlay" aria-hidden="true">
              <span className="first-draft-index">DRAFT / 00</span>
              <strong>Before the polish,<br />there was a path.</strong>
              <div className="first-draft-grid" />
              <div className="first-draft-notes"><span>01 / idea</span><span>02 / interface</span><span>03 / iteration</span></div>
              <i className="first-draft-arrow" />
              <em>keep what works · redraw the rest</em>
            </aside>
            <figure className="hero-portrait" onPointerMove={updatePortraitTilt} onPointerLeave={resetPortraitTilt}>
              <img src="/assets/om-editorial-portrait_32f7492d.png" alt="Portrait of Om Nandurkar" />
              <figcaption><span>{isStudio ? "OM / 2026" : "the person behind the pixels"}</span><i>{isStudio ? "builder, observer, iterating" : "made with care + a little chaos"}</i></figcaption>
            </figure>
          </div>
          <button type="button" className="first-draft-tab" aria-expanded={firstDraftOpen} aria-controls="first-draft-underlay" onClick={() => setFirstDraftOpen((open) => !open)}><span>{firstDraftOpen ? "restore scene" : "lift the first draft"}</span><b aria-hidden="true">{firstDraftOpen ? "↘" : "↗"}</b></button>
          <motion.div className="hero-copy" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.p variants={reveal} className="eyebrow"><span className="signal-dot" /> {isStudio ? "Product-minded full-stack developer · India" : "the maker’s desk · India"}</motion.p>
            <motion.h1 variants={reveal}>
              <span>{isStudio ? "Full-stack" : "Hi, I’m"}</span>
              <strong>{isStudio ? "developer." : "Om."}</strong>
            </motion.h1>
            <motion.p variants={reveal} className="hero-statement">
              {isStudio ? "I turn rough ideas into useful digital products — with clear interfaces, dependable systems, and motion that earns its place." : "I build websites, product moments, and useful little systems. Come look through the things I’ve made."}
            </motion.p>
            <motion.div variants={reveal} className={`identity-card ${identityOpen ? "is-open" : ""}`}>
              <HoverHint label="Recruiter brief" detail="A fast, centred read of role fit, stack, location, proof, and direct contact."><button type="button" className="identity-pull" aria-expanded={identityOpen} aria-haspopup="dialog" onClick={() => setIdentityOpen(true)}>
                <span className="identity-pull-dot" aria-hidden="true" />
                <span>{isStudio ? "Pull a 10-second brief" : "pull my little ID card"}</span>
                <b aria-hidden="true">↘</b>
              </button></HoverHint>
            </motion.div>
            <motion.div variants={reveal} className="hero-actions">
              <HoverHint label="Selected work" detail="Jump to six representative builds, then open the evidence behind each one."><a href="#work" className="primary-action">Explore selected work <ArrowUpRight size={17} /></a></HoverHint>
              <HoverHint label="Meet Om" detail="Read the values, skills, and working approach behind the interface."><a href="#about" className="quiet-action"><ArrowDown size={16} /> Meet the maker</a></HoverHint>
            </motion.div>
            <div className="story-launch-wrap" onMouseEnter={startStoryboard} onMouseLeave={stopStoryboard} onFocus={startStoryboard} onBlur={stopStoryboard} onKeyDown={(event) => { if (event.key === "Escape") stopStoryboard(); }}>
              <HoverHint label="Story Mode" detail="Pause here for a moment to reveal a three-frame story preview, then launch the interactive Story Cartridge."><motion.a variants={reveal} href="/story" className="story-launch"><span><Gamepad2 size={16} /> Story mode</span><strong>Dive into my story <ArrowUpRight size={15} /></strong><i>Retro life log / draft 01</i></motion.a></HoverHint>
            </div>
            <motion.div variants={reveal} className="dual-mode-note" aria-label="This portfolio has a Studio and a Maker mode">
              <span><i /> Studio / precision</span><b>↔</b><span><i /> Maker / play</span>
            </motion.div>
            <motion.p variants={reveal} className="hero-availability"><span /> Open to purposeful product conversations</motion.p>
          </motion.div>
          <div className="hero-side-note" aria-hidden="true">
            <span>{isStudio ? "01 / about Om" : "my little internet corner"}</span>
            <i />
            <span>{isStudio ? "Scroll for the proof" : "scroll for the good stuff"}</span>
          </div>
          <div className="storyboard-break" aria-hidden="true">
            <div className="storyboard-break-intro"><span>STORYBOARD BREAK</span><i>three frames / one unfinished map</i></div>
            <figure className="storyboard-frame storyboard-frame-signal"><img src="/assets/om-story-portal_bd4edb62.png" alt="" /><figcaption><b>01</b><span>Catch a signal</span></figcaption></figure>
            <figure className="storyboard-frame storyboard-frame-build"><img src="/assets/om-story-traveller-cutout_73643b66.png" alt="" /><figcaption><b>04</b><span>Make it respond</span></figcaption></figure>
            <figure className="storyboard-frame storyboard-frame-horizon"><img src="/assets/om-story-horizon_7f1a3262.png" alt="" /><figcaption><b>08</b><span>Keep the map open</span></figcaption></figure>
            <p className="storyboard-break-route">release to return · click to play</p>
          </div>
          {!isStudio && <div className="maker-desk-discoveries" aria-label="Maker desk discoveries">
            <HoverHint label="Chai break" detail="A small pause for the next useful idea. You can also type chai."><button type="button" className="maker-chai-cup" onClick={() => setChaiOpen(true)}><Coffee size={15} /><span>chai</span></button></HoverHint>
            <div className="maker-paper-trail" aria-label="Paper trail"><HoverHint label="Paper trail: first mark" detail="Collect three visible stationery marks to unfold a build lesson."><button type="button" className={paperTrail.includes("a") ? "is-collected" : ""} onClick={() => collectTrail("a")} aria-label="Collect first paper trail mark"><Plus size={14} /></button></HoverHint><HoverHint label="Paper trail: second mark" detail="Collect three visible stationery marks to unfold a build lesson."><button type="button" className={paperTrail.includes("b") ? "is-collected" : ""} onClick={() => collectTrail("b")} aria-label="Collect second paper trail mark"><Plus size={14} /></button></HoverHint><HoverHint label="Paper trail: third mark" detail="Collect three visible stationery marks to unfold a build lesson."><button type="button" className={paperTrail.includes("c") ? "is-collected" : ""} onClick={() => collectTrail("c")} aria-label="Collect third paper trail mark"><Plus size={14} /></button></HoverHint></div>
            <button type="button" className={deskCombined ? "maker-build-kit is-combined" : "maker-build-kit"} onClick={() => setDeskCombined(true)}><span>{deskCombined ? <Check size={12} /> : <Plus size={12} />}</span>{deskCombined ? "clear paths beat clever friction" : "combine the build kit"}</button>
          </div>}
          {paperTrail.length === 3 && <motion.p className="paper-trail-note" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="status">A small early lesson: make the path obvious before making it clever.</motion.p>}
          {chaiOpen && <motion.p className="chai-note" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="status">small breaks; better builds.</motion.p>}
          {monsoon && <div className="mumbai-monsoon" aria-hidden="true"><span>Mumbai / building through the weather</span></div>}
          {firstDraftOpen && <p className="first-draft-status" role="status">First draft surfaced: idea, interface, iteration.</p>}
          {gravityActive && <><div className="gravity-veil" aria-hidden="true" /><div className="gravity-material-layer" ref={gravityLayer} aria-hidden="true" /><div className="gravity-status" role="status"><span>GRAVITY / decorative materials in free fall</span><button type="button" onClick={() => setGravityActive(false)}>Reset scene / Esc</button></div></>}
          <div className="hero-marquee" aria-hidden="true"><span>REACT · NEXT.JS · NODE · EXPRESS · GSAP · UI SYSTEMS · </span><span>REACT · NEXT.JS · NODE · EXPRESS · GSAP · UI SYSTEMS · </span></div>
        </section>
        <Dialog open={identityOpen} onOpenChange={setIdentityOpen}>
          <DialogContent className={`identity-dossier ${isStudio ? "identity-dossier-studio" : "identity-dossier-maker"}`} showCloseButton={false} aria-describedby="identity-dossier-description">
            <motion.div className="identity-dossier-card" initial={{ opacity: 0, y: 42, scale: 0.88, rotate: isStudio ? -1.2 : -2.2 }} animate={{ opacity: 1, y: 0, scale: 1, rotate: isStudio ? 0 : -0.45 }} transition={{ type: "spring", stiffness: 310, damping: 25, mass: 0.78 }}>
              <div className="identity-dossier-glow" aria-hidden="true" />
              <button type="button" className="identity-dossier-close" onClick={() => setIdentityOpen(false)} aria-label="Close Om’s 10-second brief"><X size={17} /><span>Close</span></button>
              <div className="identity-dossier-rail" aria-hidden="true"><span>OM</span><i /><span>2026</span></div>
              <header className="identity-dossier-head">
                <div className="identity-dossier-label"><span className="signal-dot" /> {isStudio ? "Recruiter / quick read" : "a quick note for your hiring team"}</div>
                <div className="identity-dossier-intro"><img src="/assets/om-editorial-portrait_32f7492d.png" alt="Om Nandurkar" /><div><DialogTitle>Om Nandurkar</DialogTitle><DialogDescription id="identity-dossier-description">Product-minded web developer building useful, polished digital experiences.</DialogDescription></div></div>
              </header>
              <div className="identity-dossier-summary"><strong>One-line fit</strong><p>MERN stack developer in Mumbai, currently working professionally and open to a thoughtful next product or engineering opportunity.</p></div>
              <dl className="identity-dossier-facts">
                <div><dt><BriefcaseBusiness size={15} /> Best fit</dt><dd>Frontend / full-stack product work</dd></div>
                <div><dt><MapPin size={15} /> Based in</dt><dd>Mumbai, India</dd></div>
                <div><dt><Code2 size={15} /> Working with</dt><dd>React, Node, Express, MongoDB</dd></div>
                <div><dt><Sparkles size={15} /> Proof at a glance</dt><dd>23 projects · 22 verified repositories</dd></div>
              </dl>
              <section className="identity-dossier-conversation" aria-label="Interview conversation starters"><span>{isStudio ? "Good interview prompts" : "you could ask me about"}</span><div><b>Building responsive product flows</b><b>Motion with accessibility fallbacks</b><b>Turning a rough idea into a shipped interface</b></div></section>
              <button type="button" className="identity-dossier-flap" aria-expanded={dossierBack} onClick={() => setDossierBack((open) => !open)}>{dossierBack ? "Close the back flap" : "Turn over: three hiring prompts"}<span>↘</span></button>
              {dossierBack && <motion.section className="identity-dossier-back" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="status"><span>Ask me about</span><p>Making complex flows calm, collaborating with UI/UX teams, and turning rough requirements into shipping decisions.</p></motion.section>}
              <footer className="identity-dossier-actions"><a href={`mailto:${profile.email}?subject=Opportunity%20for%20Om%20Nandurkar`}><Send size={15} /> Email Om</a><Link href="/resume" onClick={() => setIdentityOpen(false)}><FileText size={15} /> View résumé</Link><a href="#work" onClick={() => setIdentityOpen(false)}>See proof <ArrowUpRight size={15} /></a></footer>
              <p className="identity-dossier-note">{isStudio ? "Clear role context first. The creative layer is here when you have a minute." : "the serious bit, folded into a little paper card."}</p>
            </motion.div>
          </DialogContent>
        </Dialog>

        <section className="about-section section-shell" id="about">
          <motion.div className="section-kicker" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}><span>01</span><i /> About</motion.div>
          <div className="about-layout">
            <motion.div className="about-headline" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={reveal}>
              <p className="scribble-label">{isStudio ? "Built to ship." : "a few things about me"}</p>
              <h2>Craft with <em>clarity.</em></h2>
            </motion.div>
            <motion.div className="about-body" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={reveal}>
              <p>I’m a MERN Stack Developer with hands-on experience building websites from scratch, working with UI/UX collaborators, and making web applications feel faster and easier to use.</p>
              <p>I care about the full experience: what users see, what they feel when they interact, and the dependable systems underneath.</p>
              <div className="metrics" aria-label="Career summary">
                <div><strong>20<span>+</span></strong><small>shipped projects</small></div>
                <div><strong>02</strong><small>teams supported</small></div>
                <div><strong>∞</strong><small>curious iterations</small></div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="services-section section-shell" id="services">
          <div className="section-kicker"><span>02</span><i /> What I do</div>
          <div className="services-intro"><h2>From first sketch<br />to <em>shipped system.</em></h2><p>Not just pages. Thoughtful interfaces, scalable logic, and the attention in between.</p></div>
          <div className="service-list">
            {services.map((service, index) => {
              const Icon = service.icon;
              return <motion.article key={service.title} className="service-item" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={{ ...reveal, visible: { ...reveal.visible, transition: { delay: index * 0.08 } } }}>
                <div className="service-number">{service.number}</div>
                <div className="service-icon"><Icon size={22} /></div>
                <div className="service-core"><h3>{service.title}</h3><p>{service.copy}</p></div>
                <div className="tag-row">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </motion.article>;
            })}
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-shell work-heading">
            <div className="section-kicker"><span>03</span><i /> Selected work</div>
            <div className="work-title-row"><h2>Projects with<br /><em>purpose.</em></h2><p>Six working proofs of how I think: useful flows first, visual character second, dependable systems underneath.</p></div>
            <div className="work-navigator">
              <div className="navigator-intro"><span className="signal-dot" /><p>{isStudio ? "Build index / choose a system to inspect" : "pick a card from the work pile"}</p></div>
              <div className="project-tabs" role="tablist" aria-label="Selected projects">
                {featuredProjects.map((project, index) => <button id={`project-tab-${index}`} key={project.title} type="button" role="tab" aria-selected={activeProject === index} aria-controls="project-readout" className={activeProject === index ? "active" : ""} onClick={() => setActiveProject(index)} onPointerEnter={() => setActiveProject(index)} onKeyDown={handleProjectNavigatorKeyDown}><small>{String(index + 1).padStart(2, "0")}</small>{project.title}</button>)}
              </div>
              <div className="project-readout" id="project-readout" role="tabpanel" aria-live="polite" aria-labelledby={`project-tab-${activeProject}`}>
                <div><span>Current build</span><strong>{selectedProject.role ?? selectedProject.type}</strong></div>
                <p>{selectedProject.proof ?? selectedProject.description}</p>
                <a href={selectedProject.slug ? `/work/${selectedProject.slug}` : selectedProject.liveUrl}>Read the build note <ArrowUpRight size={15} /></a>
              </div>
            </div>
          </div>
          <div className="featured-work section-shell">
            {featuredProjects.map((project, index) => (
              <motion.article className={`project-feature project-${index + 1}`} key={project.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={reveal}>
                <ProjectVisual project={project} index={index} featured={index === 0} />
                  <div className="project-content">
                    <div className="project-meta"><span>{project.type}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <dl className="project-proof" aria-label={`${project.title} project proof`}><div><dt>Role</dt><dd>{project.role ?? `${project.type} build`}</dd></div><div><dt>Focus</dt><dd>{project.proof ?? project.category}</dd></div></dl>
                    <div className="project-footer"><div className="tag-row">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-actions">{project.slug && <a className="project-note-link" href={`/work/${project.slug}`}>Build note <ArrowUpRight size={16} /></a>}<a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`View ${project.title} live website`}>View live <ArrowUpRight size={17} /></a></div></div>
                  </div>
                </motion.article>
            ))}
          </div>
          <div className="archive-prompt section-shell">
            <Sparkles size={17} /><p>There’s a broader body of experiments, interfaces, and full-stack work behind this edit.</p><a href="/all-projects">Open the archive <ArrowUpRight size={16} /></a>
          </div>
          {buildGraph && <motion.aside className="build-project-graph" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} role="status"><button type="button" onClick={() => setBuildGraph(false)} aria-label="Close project constellation">×</button><span>BUILD / project constellation</span><p>{featuredProjects.map((project) => <a key={project.title} href={`/work/${project.slug}`}>{project.title}</a>)}</p></motion.aside>}
        </section>

        <section className="experience-section section-shell" id="experience">
          <div className="section-kicker"><span>04</span><i /> Experience</div>
          <div className="experience-header"><h2>Learning in<br /><em>the real world.</em></h2><p>Real teams, feedback loops, and the practical work of making a product clearer each time it ships.</p></div>
          <div className="timeline">
            {experiences.map((experience, index) => <motion.article className="experience-entry" key={experience.company} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={reveal}>
              <div className="timeline-pin"><i /><span>{String(index + 1).padStart(2, "0")}</span></div>
              <p className="period">{experience.period}</p>
              <h3>{experience.company}</h3><h4>{experience.role}</h4>
              <div className="experience-notes">{experience.notes.map((note) => <p key={note}>{note}</p>)}</div>
            </motion.article>)}
          </div>
        </section>

        <section className="contact-section section-shell" id="contact">
          <div className="contact-spark" aria-hidden="true">✦</div>
          <p className="eyebrow"><span className="signal-dot" /> Open to new conversations</p>
          <h2>Let’s make<br /><em>something useful.</em></h2>
          <div className="contact-composer">
            <div className="contact-intent-copy"><span>{isStudio ? "Conversation prompt" : "pick a sticky note"}</span><strong>{isStudio ? selectedContactIntent.studio : selectedContactIntent.maker}</strong></div>
            <div className="contact-intents" role="group" aria-label="Choose a reason to contact Om">
              {contactIntents.map((intent) => <button key={intent.id} type="button" className={intent.id === contactIntent ? "active" : ""} aria-pressed={intent.id === contactIntent} onClick={() => setContactIntent(intent.id)}><i>{intent.id === contactIntent ? "●" : "○"}</i>{intent.label}</button>)}
            </div>
            <button type="button" className={contactRemix ? "contact-remix is-open" : "contact-remix"} onClick={() => setContactRemix((open) => !open)} aria-expanded={contactRemix}><span>,</span> remix the opening line</button>
            {contactRemix && <motion.div className="contact-remix-note" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} role="status"><p>{remixLine}</p><button type="button" onClick={() => navigator.clipboard?.writeText(remixLine)}><Copy size={12} /> Copy line</button></motion.div>}
          </div>
          <a className="email-link" href={`mailto:${profile.email}?subject=${encodeURIComponent(selectedContactIntent.subject)}&body=${selectedContactIntent.body}`}>Start the note <ArrowUpRight size={26} /></a>
          <div className="contact-bottom"><p>Bring the complicated brief. I’ll help make the product path obvious, useful, and worth using.</p><div className="social-links"><a href="https://github.com/" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href={`mailto:${profile.email}`}><Mail size={16} /> Email</a></div></div>
        </section>
      </main>
      <footer className="site-footer"><span className="footer-mark"><b>OM</b><i>signal / 2026</i></span><span>Built with React · Tailwind · GSAP</span><div className="footer-discovery"><button type="button" className={signalFound ? "footer-signal is-found" : "footer-signal"} aria-expanded={signalFound} onClick={() => setSignalFound((found) => !found)}><Sparkles size={12} /><span>{isStudio ? "Found a signal?" : "a little secret?"}</span></button>{signalFound && <motion.div className="footer-signal-note" initial={{ opacity: 0, y: 7, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2 }} role="status"><p>{isStudio ? "The work stays obvious. The hidden layer is optional." : "There’s a whole little map behind the main path."}</p><a href="/field-guide">Open the Field Guide <ArrowUpRight size={12} /></a></motion.div>}</div><a href="#top">Back to top ↑</a>{workspaceNudge && <motion.div className="workspace-nudge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><span>Still here? There’s a little map behind the pixels.</span><a href="/field-guide">Open it <ArrowUpRight size={12} /></a><button type="button" aria-label="Dismiss workspace note" onClick={() => setWorkspaceNudge(false)}>×</button></motion.div>}</footer>
    </div>
  );
}
