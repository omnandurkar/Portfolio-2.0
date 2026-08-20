// Split-Screen Studio: This field guide makes the portfolio's interaction craft inspectable through an off-kilter Studio ledger / Maker pinboard.
/** Design reminder — The Field Guide records live, optional discoveries such as Storyboard Break and First Draft without making the portfolio’s essential routes contingent on hidden actions. */
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen, Check, Command, Eye, Gamepad2, Keyboard, Layers3, Lightbulb, Map, MousePointer2, Plus, Sparkles, SunMoon, WandSparkles } from "lucide-react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import { usePortfolioMode } from "@/contexts/ModeContext";
import "./FieldGuide.css";
import "./FieldGuideDiscovery.css";
import "./FieldGuidePlaybook.css";

type GuideCommand = {
  key: string;
  title: string;
  copy: string;
  action: string;
  tone: "blue" | "ink" | "signal";
};

const commands: GuideCommand[] = [
  { key: "⌘ / Ctrl K", title: "Command deck", copy: "Open a fast, searchable route to the portfolio’s core places and playful controls.", action: "palette", tone: "blue" },
  { key: "M", title: "Change the material", copy: "Flip the entire portfolio between Studio precision and Maker desk craft.", action: "mode", tone: "ink" },
  { key: "Shift L", title: "Signal focus", copy: "Dim the room and hold a blue spotlight over the work. Press again to let the lights back in.", action: "focus", tone: "signal" },
  { key: "P", title: "Open the proof", copy: "Jump straight to the selected project index—the quickest route to tangible work.", action: "work", tone: "blue" },
  { key: "S", title: "Enter story mode", copy: "Warp from the polished portfolio into Om’s playable retro life log.", action: "story", tone: "ink" },
  { key: "G", title: "Open this guide", copy: "Return to the index of materials, motion rules, shortcuts, and secret signals.", action: "guide", tone: "signal" },
];

const discoveries = [
  ["01", "Move across the portrait", "Homepage hero", "Human signal", "The portrait answers a pointer with a quiet tilt.", MousePointer2],
  ["02", "↑ ↑ ↓ ↓ ← → ← → B A", "Any route", "Blueprint lens", "An escapable route map proves every page is a system, not a trap.", Map],
  ["03", "Drag or use the fixed material pill", "Every route", "Material handoff", "Studio precision and Maker craft share one dependable information architecture.", Layers3],
  ["04", "Tap OM × 3", "Header brand mark", "Orbit mark", "The monogram becomes a beacon and opens a small route map.", Sparkles],
  ["05", "Type S H I P I T", "Any route", "Ship it terminal", "A short terminal card reminds you that useful beats finished.", Keyboard],
  ["06", "Type N P M R U N O M", "Any route", "Portfolio build", "A friendly compile card confirms the connected portfolio routes.", Command],
  ["07", "Type M U M B A I", "Homepage hero", "Mumbai monsoon", "A temporary rain texture honours the city behind the work.", Sparkles],
  ["08", "Click chai or type C H A I", "Maker homepage", "Chai break", "A small warm pause says: small breaks, better builds.", Lightbulb],
  ["09", "Visit late at night", "Studio routes", "Late-night commit", "A quiet local-time note appears without changing the page flow.", SunMoon],
  ["10", "Scan a case-study shelf", "Case studies", "Debug fireflies", "Choose whether a bug exposes a lesson or hides the next step.", Eye],
  ["11", "Tap OM × 3", "Header brand mark", "Monogram map", "The orbit event also offers direct Home, Story, and Guide routes.", Map],
  ["12", "Collect three paper marks", "Maker homepage", "Paper trail", "Three tiny stationery marks unfold one practical build lesson.", MousePointer2],
  ["13", "Turn the dossier back flap", "Homepage brief", "Hiring prompts", "A second dossier surface suggests the most useful interview conversations.", BookOpen],
  ["14", "Combine the build kit", "Maker homepage", "Desk rearranger", "A visible desk control resolves into a clear-path principle.", Layers3],
  ["15", "Hold B for 0.7 seconds", "Any route / work", "Project constellation", "A cancellable graph collects selected work into one build system.", WandSparkles],
  ["16", "Stay for one minute", "Homepage footer", "One-minute workspace", "A dismissible note points curious visitors toward this guide.", Map],
  ["17", "Scan the shelf", "Case studies", "Shelf scan", "Stack choices and evidence become an optional inspection layer.", Eye],
  ["18", "Claim each chapter lesson", "Story Mode", "Memory cards", "Eight saved memories persist locally and mark story progress.", Gamepad2],
  ["19", "Use replay last scene", "Story finale", "Replay route", "Return to the previously active scene without restarting the journey.", Gamepad2],
  ["20", "Run silent sound check", "Story / Music lab", "Visual soundtrack", "A waveform adds rhythm without forcing background audio.", Sparkles],
  ["21", "Choose both route habits", "Story / Learning route", "Route repair", "Observe and simplify restore a dependable learning path.", Map],
  ["22", "Focus a card, then press 1–9", "Project archive", "Archive flipbook", "A field note flips over the focused archive card.", Keyboard],
  ["23", "Open traveller compass", "Story console", "Cursor compass", "A gentle cue explains every available way to move scenes.", Map],
  ["24", "Choose good or bad bug", "Story or case shelf", "Good bug / bad bug", "The portfolio makes its debugging philosophy explicit.", Lightbulb],
  ["25", "Use the comma remix", "Homepage contact", "Contact composer remix", "A selected intention becomes a copyable, specific opening line.", Command],
  ["26", "Visit an unknown route", "404 recovery shelf", "Secret shelf", "A lost route becomes a useful recovery choice, never a dead end.", BookOpen],
  ["27", "Shift + Enter on Résumé", "Header résumé", "Margin note", "A small note explains how the résumé is designed to be skimmed.", Eye],
  ["28", "Change materials across routes", "Field Guide / footer", "Precision and play", "The persistent material choice acts as the living meter between two design instincts.", SunMoon],
  ["29", "Open the browser console", "Any route", "Console whisper", "A friendly, non-essential message points back to the Field Guide.", Command],
  ["30", "Collect five proof artefacts", "Across portfolio", "Proof of process", "The route map connects project proof, story memory, and the field guide into one process record.", WandSparkles],
  ["31", "Linger over Story Mode", "Homepage hero", "Storyboard Break", "The real hero briefly becomes a three-frame preview of Om’s Story Cartridge. Move away to restore the current scene; click to play.", Gamepad2],
  ["32", "Lift the first draft tab", "Homepage portrait", "First Draft", "The portrait shifts aside to reveal a construction sheet: idea, interface, and iteration. Tap again to restore the scene.", Layers3],
] as const;

const choices = [
  { title: "One architecture, two materials", value: "Studio ↔ Maker", copy: "The information stays constant. What changes is the material language: cinematic stage versus assembled desk.", accent: "mode" },
  { title: "Signal Blue carries intent", value: "#3972FF", copy: "It marks routes, motion, focus, and the OM signature; supporting colours only belong to Maker stationery.", accent: "signal" },
  { title: "Projects read as evidence", value: "23 build notes", copy: "Each project gets a factual role, stack, proof, and distinct artefact rather than a repeated generic card.", accent: "proof" },
  { title: "Motion has a job", value: "prefers-reduced-motion", copy: "Movement adds character, direction, or tactile response—and always yields to people who prefer a steadier page.", accent: "motion" },
];

const sendCommand = (action: string) => window.dispatchEvent(new CustomEvent("om:run-command", { detail: action }));
const proofArtefacts = ["Hero signal", "Selected work", "Case-study shelf", "Story memory", "Field Guide"];

export default function FieldGuide() {
  const { mode } = usePortfolioMode();
  const reducedMotion = useReducedMotion();
  const [materialTurns, setMaterialTurns] = useState(0);
  const [proofMarks, setProofMarks] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem("om-proof-marks") || "[]"); } catch { return []; } });

  useEffect(() => { localStorage.setItem("om-proof-marks", JSON.stringify(proofMarks)); }, [proofMarks]);
  const toggleProofMark = (mark: string) => setProofMarks((marks) => marks.includes(mark) ? marks.filter((item) => item !== mark) : [...marks, mark]);

  return (
    <div className={`guide-shell guide-${mode}`}>
      <SiteHeader />
      <main>
        <section className="guide-hero">
          <div className="guide-grain" aria-hidden="true" />
          <div className="guide-vectors" aria-hidden="true">
            <svg className="guide-vector guide-vector-loop" viewBox="0 0 160 160"><circle cx="80" cy="80" r="51" /><circle cx="80" cy="80" r="21" /><path d="M40 80h80M80 40v80" /></svg>
            <svg className="guide-vector guide-vector-arrow" viewBox="0 0 120 88"><path d="M12 70C43 12 71 20 102 24M87 8l18 16-18 17" /></svg>
            <svg className="guide-vector guide-vector-spark" viewBox="0 0 80 80"><path d="M40 3l7 30 30 7-30 7-7 30-7-30-30-7 30-7z" /></svg>
          </div>
          <motion.div className="guide-hero-index" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reducedMotion ? 0.01 : 0.42 }}><span>OM / INTERACTION ATLAS</span><i /><b>2026</b></motion.div>
          <div className="guide-hero-copy">
            <motion.p className="guide-eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0.01 : 0.42, delay: 0.04 }}><Map size={15} /> Field guide / made to be explored</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0.01 : 0.52, delay: 0.08 }}>The portfolio<br />has a <em>second layer.</em></motion.h1>
            <motion.p className="guide-lead" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0.01 : 0.44, delay: 0.15 }}>A live index of the materials, shortcuts, and hidden signals that make this portfolio feel less like a page and more like an environment.</motion.p>
          </div>
          <motion.aside className="guide-invite" initial={{ opacity: 0, rotate: mode === "studio" ? 0 : 3, y: 18 }} animate={{ opacity: 1, rotate: mode === "studio" ? 0 : -1.5, y: 0 }} transition={{ duration: reducedMotion ? 0.01 : 0.5, delay: 0.2 }}>
            <span>{mode === "studio" ? "QUICK START" : "a note for the curious"}</span>
            <strong>Press <kbd>⌘</kbd><kbd>K</kbd></strong>
            <p>or choose a card below. Every surprise is optional; the work stays easy to reach.</p>
            <button type="button" onClick={() => sendCommand("palette")}>Open command deck <Command size={15} /></button>
          </motion.aside>
          <div className="guide-scroll-cue" aria-hidden="true"><span>inspect the system</span><i /></div>
        </section>

        <section className="guide-section guide-command-section" aria-labelledby="guide-commands-heading">
          <div className="guide-section-heading"><span>01</span><div><p>Keyboard routes</p><h2 id="guide-commands-heading">Useful keys,<br /><em>not gimmicks.</em></h2></div><p className="guide-heading-note">Keys are ignored while you are typing and never replace clear visible navigation.</p></div>
          <div className="guide-command-grid">
            {commands.map((command, index) => <motion.article key={command.title} className={`guide-command-card guide-tone-${command.tone}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0.01 : 0.36, delay: index * 0.035 }}>
              <div><kbd>{command.key}</kbd><span>{String(index + 1).padStart(2, "0")}</span></div>
              <h3>{command.title}</h3><p>{command.copy}</p>
              <button type="button" onClick={() => sendCommand(command.action)}>Try it <ArrowUpRight size={15} /></button>
            </motion.article>)}
          </div>
        </section>

        <section className="guide-section guide-choice-section" aria-labelledby="guide-choices-heading">
          <div className="guide-section-heading"><span>02</span><div><p>Creative decisions</p><h2 id="guide-choices-heading">The choices<br /><em>behind the surface.</em></h2></div></div>
          <div className="guide-choice-board">
            <div className="guide-choice-line" aria-hidden="true" />
            {choices.map((choice, index) => <article className={`guide-choice guide-choice-${choice.accent}`} key={choice.title}><span>{choice.value}</span><h3>{choice.title}</h3><p>{choice.copy}</p><i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i></article>)}
          </div>
        </section>

        <section className="guide-section guide-playbook-controls" aria-labelledby="guide-playbook-controls-heading">
          <div className="guide-section-heading"><span>02A</span><div><p>Living controls</p><h2 id="guide-playbook-controls-heading">Precision, play,<br /><em>and proof.</em></h2></div><p className="guide-heading-note">Two small controls make the material system and process record visible. They never gate access to the work.</p></div>
          <div className="guide-playbook-control-grid">
            <article className="guide-material-meter"><p>28 / Precision ↔ play</p><h3>Make the material choice visible.</h3><div className="guide-meter-track" aria-label={`${materialTurns} material turns logged`}><i style={{ width: `${Math.min(100, materialTurns * 16.66)}%` }} /><span>{mode === "studio" ? "precision" : "play"}</span></div><small>{materialTurns ? `${materialTurns} material ${materialTurns === 1 ? "turn" : "turns"} logged this visit.` : "Try the fixed material pill and log a turn here."}</small><button type="button" onClick={() => { setMaterialTurns((turns) => turns + 1); sendCommand("mode"); }}><SunMoon size={14} /> Change material + log turn</button></article>
            <article className="guide-proof-board"><p>30 / Proof of process</p><h3>Carry five useful artefacts forward.</h3><div>{proofArtefacts.map((mark) => <button type="button" key={mark} className={proofMarks.includes(mark) ? "is-marked" : ""} aria-pressed={proofMarks.includes(mark)} onClick={() => toggleProofMark(mark)}>{proofMarks.includes(mark) ? <Check size={13} /> : <Plus size={13} />} {mark}</button>)}</div>{proofMarks.length === proofArtefacts.length ? <strong role="status">Process poster unlocked: clear evidence beats loud claims.</strong> : <small>{proofMarks.length}/5 marks saved locally on this device.</small>}</article>
          </div>
        </section>

        <section className="guide-section guide-discovery-section" aria-labelledby="guide-discoveries-heading">
          <div className="guide-section-heading"><span>03</span><div><p>32-signal live index</p><h2 id="guide-discoveries-heading">Small details<br /><em>with a reason.</em></h2></div><p className="guide-heading-note">The hidden layer rewards curiosity without hiding the core portfolio behind a puzzle. Every entry states exactly where to find it.</p></div>
          <div className="guide-discovery-grid">
            {discoveries.map(([mark, trigger, location, title, copy, Icon], index) => <motion.article key={title} className={`guide-discovery guide-discovery-${index + 1}`} whileHover={reducedMotion ? undefined : { y: -7, rotate: index % 2 ? -0.5 : 0.5 }} transition={{ duration: 0.2 }}><div className="guide-discovery-mark"><span>{mark}</span><Icon size={20} /></div><p className="guide-trigger">{trigger}</p><p className="guide-discovery-location"><Map size={11} /> {location}</p><h3>{title}</h3><p>{copy}</p><i aria-hidden="true" /></motion.article>)}
          </div>
        </section>

        <section className="guide-closing">
          <div className="guide-closing-mark" aria-hidden="true"><span>OM</span><i /><b /></div>
          <div><p><Lightbulb size={15} /> The design rule</p><h2>Make the work easy to find.<br /><em>Make discovery worth the detour.</em></h2></div>
          <div className="guide-closing-actions"><Link href="/all-projects">Inspect the archive <ArrowUpRight size={16} /></Link><button type="button" onClick={() => sendCommand("mode")}><SunMoon size={15} /> Change the material</button></div>
        </section>
      </main>
    </div>
  );
}
