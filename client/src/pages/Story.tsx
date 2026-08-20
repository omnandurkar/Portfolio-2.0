// Joy-Con Journey: Story Mode is an original console-inspired, scroll-led narrative world; its character, scenes, and controls remain useful and readable without motion.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Box, ChevronRight, Code2, Flag, Gamepad2, Layers3, Map, Music2, Play, RotateCcw, Sparkles } from "lucide-react";
import { type CSSProperties, type PointerEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { featuredProjects } from "@/data/portfolio";
import { usePortfolioMode } from "@/contexts/ModeContext";
import { HoverHint } from "@/components/HoverHint";
import "./StoryQuest.css";
import "./StoryRepair.css";
import "./StoryEggs.css";

type Chapter = {
  id: string;
  code: string;
  label: string;
  eyebrow: string;
  title: string;
  emphasis: string;
  copy: string;
  dialogue: string;
  field: string;
  action: string;
  art: string;
  world: "signals" | "music" | "route" | "bench" | "arcade" | "camp" | "cave" | "horizon";
};

const art = {
  signals: "/assets/om-story-portal_bd4edb62.png",
  music: "/assets/om-story-music_89d80809.png",
  bench: "/assets/om-story-build-forest_87ac78ca.png",
  horizon: "/assets/om-story-horizon_7f1a3262.png",
};

const traveller = "/assets/om-story-traveller-cutout_73643b66.png";

const chapters: Chapter[] = [
  { id: "signals", code: "01", label: "Signals", eyebrow: "MUMBAI / FIRST QUEST", title: "Before code, there was", emphasis: "curiosity.", copy: "The first skill was noticing: a screen that responds, a sound that lingers, a small idea asking to be followed.", dialogue: "Every build begins as a question worth keeping.", field: "collect / question", action: "Catch a signal", art: art.signals, world: "signals" },
  { id: "music", code: "02", label: "Music lab", eyebrow: "SIDE QUEST / RHYTHM", title: "Making a song taught", emphasis: "iteration.", copy: "Write a version. Listen closely. Change what does not work. Share it before it feels finished. The rhythm came before the framework.", dialogue: "A rough first version is still a real beginning.", field: "listen / revise / share", action: "Wake the waveform", art: art.music, world: "music" },
  { id: "route", code: "03", label: "Learning route", eyebrow: "MAP / PRACTICE", title: "The classroom was only", emphasis: "one route.", copy: "Classes set a direction; self-led practice, late experiments, and the habit of making made the map wider.", dialogue: "The route changes. The learning stays.", field: "class / practice / experiment", action: "Choose a trail", art: art.signals, world: "route" },
  { id: "bench", code: "04", label: "First build", eyebrow: "WORKBENCH / RESPONSE", title: "Then an idea", emphasis: "responded.", copy: "A blank screen became a tiny interface. A click did something. That small response made development feel less like a subject and more like a language.", dialogue: "Wait. I made that move.", field: "input / response / belief", action: "Assemble the build", art: art.bench, world: "bench" },
  { id: "arcade", code: "05", label: "Project arcade", eyebrow: "EVIDENCE / PLAYABLE PROOF", title: "Projects became", emphasis: "proof.", copy: "Commerce, journaling, interview practice, motion, notes, and ticketing: each project is a different attempt to make a useful path clearer.", dialogue: "Pick a star. Each one leads to a real build.", field: "23 projects / 22 verified repos", action: "Open project stars", art: art.bench, world: "arcade" },
  { id: "camp", code: "06", label: "Team camp", eyebrow: "APPRENTICESHIP / TEAMPLAY", title: "Learning became", emphasis: "real.", copy: "At Road To Code and Stoic & Salamander, work expanded beyond one screen: feedback, internal tools, responsive products, and the responsibility of shipping with others.", dialogue: "The best lessons usually arrive with a deadline.", field: "feedback / collaboration / shipping", action: "Pass the signal", art: art.signals, world: "camp" },
  { id: "cave", code: "07", label: "Debug cavern", eyebrow: "CORE LOOP / CRAFT", title: "The lesson was never", emphasis: "one shortcut.", copy: "Build. Observe. Refine. Progress is often a stack of imperfect attempts that eventually begins to look like experience.", dialogue: "Keep the lesson. Leave the pressure.", field: "build / observe / refine", action: "Repair the route", art: art.bench, world: "cave" },
  { id: "horizon", code: "08", label: "Open horizon", eyebrow: "NEXT QUEST / NOW", title: "Still building the", emphasis: "next map.", copy: "Today, Om is a product-minded full-stack developer, interested in useful products, clear interfaces, dependable systems, and people on the other side of every screen.", dialogue: "The map is unfinished on purpose.", field: "open to purposeful work", action: "Return to selected work", art: art.horizon, world: "horizon" },
];

const inventoryNames = ["curiosity signal", "rough rhythm", "practice route", "first response", "project proof", "team signal", "debug lesson", "open map"];

export default function Story() {
  const { mode, toggleMode } = usePortfolioMode();
  const [, setLocation] = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [activeChapter, setActiveChapter] = useState(0);
  const [booting, setBooting] = useState(true);
  const [inventory, setInventory] = useState<number[]>(() => { try { return JSON.parse(window.localStorage.getItem("om-story-memories") ?? "[]") as number[]; } catch { return []; } });
  const [choice, setChoice] = useState("");
  const [pulling, setPulling] = useState(false);
  const [routeRepair, setRouteRepair] = useState<string[]>([]);
  const [soundCheck, setSoundCheck] = useState(false);
  const [compassOpen, setCompassOpen] = useState(false);
  const [lastScene, setLastScene] = useState(0);
  const pullStart = useRef<number | null>(null);
  const active = chapters[activeChapter];

  const goToChapter = (index: number) => { setLastScene(activeChapter); document.getElementById(`quest-${chapters[index].id}`)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" }); };

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), prefersReducedMotion ? 150 : 1100);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => { window.localStorage.setItem("om-story-memories", JSON.stringify(inventory)); }, [inventory]);

  useEffect(() => {
    const updateWorld = () => {
      const viewport = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-quest-chapter]").forEach((node) => {
        const rect = node.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (viewport - rect.top) / (viewport + rect.height)));
        node.style.setProperty("--quest-bg-x", `${(0.5 - progress) * 13}vw`);
        node.style.setProperty("--quest-bg-y", `${(0.5 - progress) * 6}vh`);
        node.style.setProperty("--quest-mid-x", `${(progress - 0.5) * 18}vw`);
        node.style.setProperty("--quest-fg-x", `${(0.5 - progress) * 28}vw`);
        node.style.setProperty("--quest-character-x", `${(progress - 0.5) * 9}vw`);
        node.style.setProperty("--quest-glow", String(0.45 + progress * 0.55));
      });
    };
    let frame = 0;
    const onScroll = () => { window.cancelAnimationFrame(frame); frame = window.requestAnimationFrame(updateWorld); };
    updateWorld();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  useEffect(() => {
    const chaptersNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-quest-chapter]"));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveChapter(Number((entry.target as HTMLElement).dataset.questChapter ?? 0));
    }), { rootMargin: "-42% 0px -46% 0px", threshold: 0.01 });
    chaptersNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey && ["ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); goToChapter(Math.max(0, Math.min(chapters.length - 1, activeChapter + (event.key === "ArrowRight" ? 1 : -1)))); }
      if (!event.altKey && event.key.toLowerCase() === "r") { event.preventDefault(); document.getElementById("quest-start")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" }); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeChapter, prefersReducedMotion]);

  const claimItem = (index: number, label: string) => {
    setInventory((items) => items.includes(index) ? items : [...items, index]);
    setChoice(label);
  };

  const completeJourney = () => {
    setPulling(true);
    window.setTimeout(() => setLocation("/?continue=work#work"), prefersReducedMotion ? 20 : 520);
  };

  const beginPull = (event: PointerEvent<HTMLButtonElement>) => {
    pullStart.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const endPull = (event: PointerEvent<HTMLButtonElement>) => {
    const distance = pullStart.current === null ? 0 : event.clientY - pullStart.current;
    pullStart.current = null;
    if (distance > 46) completeJourney();
  };

  return <main className={`quest-shell quest-${mode === "studio" ? "studio" : "maker"}`}>
    <AnimatePresence>{pulling && <motion.div className="quest-pull-through" initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ opacity: 0 }} transition={{ duration: prefersReducedMotion ? .01 : .48, ease: [0.23, 1, 0.32, 1] }} aria-hidden="true"><span>CONTINUING / SELECTED WORK</span><b>↓</b></motion.div>}</AnimatePresence>
    <AnimatePresence>{booting && <motion.div className="quest-portal" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: prefersReducedMotion ? 0.01 : 0.35 }} aria-hidden="true"><motion.div className="quest-portal-card" initial={{ scale: .84, y: 22, rotate: -2 }} animate={{ scale: 1, y: 0, rotate: 0 }} transition={{ duration: prefersReducedMotion ? 0.01 : .58, ease: [0.23, 1, 0.32, 1] }}><span>OM / PORTFOLIO SIGNAL</span><strong>STORY CARTRIDGE</strong><i>Loading the human side of the work…</i><em /></motion.div></motion.div>}</AnimatePresence>

    <header className="quest-console" aria-label="Story navigation">
      <HoverHint label="Portfolio exit" detail="Return to Om’s recruiter-ready portfolio without losing the Story Cartridge route." side="bottom"><Link href="/" className="quest-exit"><ArrowLeft size={15} /> Portfolio</Link></HoverHint>
      <div className="quest-console-center"><b className="quest-console-mark">OM</b><span>STORY CARTRIDGE</span><i>●</i><strong>{active.code} / {active.label}</strong></div>
      <div className="quest-console-actions"><HoverHint label="Traveller compass" detail="A gentle cue for the next scene. It never controls the story for you." side="bottom"><button type="button" className="quest-compass-toggle" onClick={() => setCompassOpen((open) => !open)} aria-expanded={compassOpen}><Map size={14} /><span>Compass</span></button></HoverHint><HoverHint label="Change story material" detail={`Switch this journey to ${mode === "studio" ? "the tactile Maker notebook" : "the focused Studio console"}.`} side="bottom"><button type="button" className="quest-mode-switch" onClick={toggleMode} aria-label={`Switch Story Mode to ${mode === "studio" ? "Maker" : "Studio"}`}><Layers3 size={14} /><span>{mode === "studio" ? "Maker" : "Studio"}</span></button></HoverHint><HoverHint label="Restart journey" detail="Return to the cartridge’s opening scene. Keyboard shortcut: R." side="bottom"><button type="button" onClick={() => document.getElementById("quest-start")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })}><RotateCcw size={14} /><span>Restart</span></button></HoverHint><HoverHint label="Interaction guide" detail="See the portfolio’s shortcuts, creative rules, and hidden signals." side="bottom"><Link href="/field-guide">Guide <ChevronRight size={14} /></Link></HoverHint></div>
    </header>

    {compassOpen && <motion.aside className="quest-compass-note" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} role="status">The traveller faces the active scene. Use scene select, Alt + arrows, or simply keep scrolling.</motion.aside>}

    <aside className="quest-controller" aria-label="Story chapter navigator"><div className="quest-controller-cap"><Gamepad2 size={15} /><span>SCENE SELECT</span></div><div className="quest-controller-track"><span style={{ "--quest-track": `${activeChapter / (chapters.length - 1) * 100}%` } as CSSProperties} /></div><div className="quest-controller-buttons">{chapters.map((chapter, index) => <HoverHint key={chapter.id} label={`Chapter ${chapter.code}`} detail={`${chapter.label}: ${chapter.field}. Alt + ← / → also moves between scenes.`} side="right"><button type="button" className={index === activeChapter ? "active" : inventory.includes(index) ? "collected" : ""} aria-label={`Go to chapter ${chapter.code}: ${chapter.label}`} aria-current={index === activeChapter ? "step" : undefined} onClick={() => goToChapter(index)}><b>{chapter.code}</b><i>{chapter.label}</i></button></HoverHint>)}</div><p><Box size={14} /> {inventory.length}/8 memories saved</p></aside>

    <section className="quest-home" id="quest-start">
      <div className="quest-home-stage"><div className="quest-home-grid" aria-hidden="true" /><div className="quest-home-aurora" aria-hidden="true" /><div className="quest-home-orbit" aria-hidden="true"><i /><i /><b>OM</b></div><div className="quest-cartridge"><div className="quest-cartridge-top"><span>STORY / 01</span><i>READY</i></div><div className="quest-cartridge-cover"><img src={traveller} alt="Original story character of Om, a small developer traveller carrying a compact sling bag." /><div className="quest-cartridge-map" aria-hidden="true"><span /><span /><span /><em /></div></div><div className="quest-cartridge-bottom"><strong>OM’S<br />SIDE QUEST</strong><span>scroll to play</span></div></div><div className="quest-home-copy"><p><Play size={14} fill="currentColor" /> PLAYABLE PORTFOLIO STORY</p><h1>Some stories are<br /><em>better played.</em></h1><span>Scroll to travel. The world moves with you.</span><button type="button" onClick={() => goToChapter(0)}>Start the journey <ArrowRight size={17} /></button></div><div className="quest-home-hint"><span>↓</span> 8 chapters / 1 developer / no shortcuts</div></div>
    </section>

    <div className="quest-chapters">{chapters.map((chapter, index) => <QuestChapter key={chapter.id} chapter={chapter} index={index} active={activeChapter === index} collected={inventory.includes(index)} choice={choice} onClaim={claimItem} onGo={goToChapter} reducedMotion={Boolean(prefersReducedMotion)} />)}</div>
    {(active.id === "music" || active.id === "route" || active.id === "cave") && <motion.aside className="quest-side-quest" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} role="status"><span>SIDE QUEST / {active.label}</span>{active.id === "music" && <><b>Sound check, visually.</b><p>A silent waveform keeps the music lesson visible without adding background audio.</p><button type="button" className={soundCheck ? "is-on" : ""} onClick={() => setSoundCheck((on) => !on)}>{soundCheck ? "Waveform running" : "Run a silent sound check"}</button><i className={soundCheck ? "quest-visual-wave is-on" : "quest-visual-wave"} aria-hidden="true"><em /><em /><em /><em /><em /></i></>}{active.id === "route" && <><b>Route repair</b><p>Choose the two habits that make a learning route dependable.</p><div>{["Observe", "Simplify"].map((piece) => <button type="button" key={piece} className={routeRepair.includes(piece) ? "is-on" : ""} onClick={() => setRouteRepair((current) => current.includes(piece) ? current : [...current, piece])}>{piece}</button>)}</div>{routeRepair.length === 2 && <small>Route restored: notice what matters, then make the next step clear.</small>}</>}{active.id === "cave" && <><b>Good bug / bad bug</b><p>Keep the signal. Remove the friction.</p><div><button type="button" onClick={() => claimItem(6, "good bug: useful signal")}>Good: points to a lesson</button><button type="button" onClick={() => claimItem(6, "bad bug: hidden friction")}>Bad: hides the next step</button></div></>}</motion.aside>}

    <footer className="quest-finale" id="quest-finale"><div><span>GAME CLEAR?</span><h2>Not quite.<em>That’s the point.</em></h2><p>The journey stays open because the best work is still ahead.</p></div>{inventory.length === chapters.length && <motion.div className="quest-memory-postcard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><b>POSTCARD UNLOCKED</b><span>You carried every small lesson forward. That is the route.</span></motion.div>}<button className="quest-final-pull" type="button" onClick={completeJourney} onPointerDown={beginPull} onPointerUp={endPull} aria-label="Pull to continue into selected work on the homepage"><span className="quest-final-pull-rope" aria-hidden="true"><i /></span><b>Pull through to<br />selected work</b><em>drag down or click</em><ArrowRight size={17} /></button><button type="button" className="quest-replay-last" onClick={() => goToChapter(lastScene)}>Replay last scene <RotateCcw size={14} /></button><small>Keyboard: Alt + ← / → to move scenes · R to restart</small></footer>
  </main>;
}

function QuestChapter({ chapter, index, active, collected, choice, onClaim, onGo, reducedMotion }: { chapter: Chapter; index: number; active: boolean; collected: boolean; choice: string; onClaim: (index: number, label: string) => void; onGo: (index: number) => void; reducedMotion: boolean }) {
  const style = { "--quest-art": `url(${chapter.art})` } as CSSProperties;
  return <section className={`quest-chapter quest-world-${chapter.world} ${active ? "is-active" : ""}`} id={`quest-${chapter.id}`} data-quest-chapter={index} data-quest-chapter-index={index} data-world={chapter.world} style={style}>
    <div className="quest-world-stage"><div className="quest-sky" aria-hidden="true"><i /><i /><i /><i /></div><div className="quest-world-art" aria-hidden="true" /><div className="quest-world-mid" aria-hidden="true"><SceneGlyph world={chapter.world} /></div><div className="quest-world-foreground" aria-hidden="true"><span /><span /><span /><i /></div><div className="quest-walker" aria-hidden="true"><span className="quest-walker-shadow" /><img src={traveller} alt="" /></div><div className="quest-scanline" aria-hidden="true" />
      <div className="quest-scene-hud"><span>CHAPTER {chapter.code}</span><i /> <b>{chapter.field}</b></div>
      <article className="quest-story-card"><div className="quest-story-label"><span>{chapter.eyebrow}</span><b>{collected ? "SAVED" : "NEW"}</b></div><h2>{chapter.title} <em>{chapter.emphasis}</em></h2><p>{chapter.copy}</p><blockquote><span>OM</span><q>{chapter.dialogue}</q></blockquote><QuestAction chapter={chapter} index={index} collected={collected} choice={choice} onClaim={onClaim} onGo={onGo} reducedMotion={reducedMotion} /></article>
      <div className="quest-scroll-prompt" aria-hidden="true"><span>SCROLL TO MOVE</span><i /></div>
    </div>
  </section>;
}

function QuestAction({ chapter, index, collected, choice, onClaim, onGo, reducedMotion }: { chapter: Chapter; index: number; collected: boolean; choice: string; onClaim: (index: number, label: string) => void; onGo: (index: number) => void; reducedMotion: boolean }) {
  if (chapter.id === "arcade") return <div className="quest-action quest-project-stars">{featuredProjects.slice(0, 4).map((project, projectIndex) => <Link key={project.slug} href={`/work/${project.slug}`}><i>{projectIndex + 1}</i><span>{project.title}</span><ArrowRight size={13} /></Link>)}</div>;
  if (chapter.id === "horizon") return <div className="quest-action quest-horizon-action"><Link href="/">Open the portfolio <ArrowRight size={15} /></Link><button type="button" onClick={() => onGo(0)}>Replay journey <RotateCcw size={14} /></button></div>;
  if (chapter.id === "route") return <div className="quest-action quest-choice-action">{["Class notes", "Side project", "Late experiment"].map((trail) => <button key={trail} type="button" onClick={() => onClaim(index, trail)}>{trail}<i>↗</i></button>)}{choice && <small>{choice} logged in the route.</small>}</div>;
  if (chapter.id === "music") return <div className="quest-action quest-wave-action"><button type="button" onClick={(event) => { event.currentTarget.classList.toggle("is-playing"); onClaim(index, "rough rhythm"); }}><span /><span /><span /><span /><span /> {collected ? "Waveform saved" : chapter.action}</button></div>;
  return <div className="quest-action"><button type="button" disabled={collected} onClick={() => onClaim(index, inventoryNames[index])}>{collected ? "Memory saved" : chapter.action} {collected ? <Sparkles size={14} /> : <ArrowRight size={14} />}</button>{index === 0 && <small>{reducedMotion ? "Motion is simplified for this visit." : "The world layers move at different speeds as you travel."}</small>}</div>;
}

function SceneGlyph({ world }: { world: Chapter["world"] }) {
  if (world === "music") return <svg viewBox="0 0 420 220"><path d="M0 115h42l14-54 24 106 31-150 28 185 26-115 31 61h224" /><circle cx="280" cy="68" r="35" /><circle cx="280" cy="68" r="15" /></svg>;
  if (world === "route") return <svg viewBox="0 0 420 220"><path d="M20 190c65-35 43-98 112-100 79-2 34 88 116 71 65-13 47-89 150-124" /><circle cx="20" cy="190" r="8" /><circle cx="132" cy="90" r="8" /><circle cx="248" cy="161" r="8" /><circle cx="398" cy="37" r="8" /></svg>;
  if (world === "bench" || world === "arcade") return <svg viewBox="0 0 420 220"><rect x="83" y="37" width="210" height="130" rx="4" /><path d="M112 73h88M112 99h151M112 125h54" /><rect x="230" y="70" width="37" height="37" /><path d="M188 167v26M142 193h96" /></svg>;
  if (world === "camp") return <svg viewBox="0 0 420 220"><path d="M104 176 160 67l58 109H104ZM205 176l53-94 56 94h-109Z" /><path d="M73 183c46-59 78-41 120 0M210 183c41-58 80-41 128 0" /></svg>;
  if (world === "cave") return <svg viewBox="0 0 420 220"><path d="M32 192 94 49l55 84 60-107 61 108 69-55 48 113" /><path d="m189 156 17 18 34-49" /></svg>;
  if (world === "horizon") return <svg viewBox="0 0 420 220"><path d="M0 155c57-39 114-39 171 0 57 39 114 39 171 0 27-18 53-25 78-21" /><path d="M50 60h1M122 32h1M197 65h1M288 37h1M366 73h1" /></svg>;
  return <svg viewBox="0 0 420 220"><path d="M42 156 146 78l66 49 85-92 83 121" /><circle cx="108" cy="49" r="24" /><path d="M58 182h305" /></svg>;
}
