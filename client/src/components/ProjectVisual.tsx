// Split-Screen Studio: Abstract project artefacts provide a consistent visual canvas without pretending to be product screenshots.
import { ArrowUpRight, Braces, Layers3 } from "lucide-react";
import { type PointerEvent } from "react";
import { Project } from "@/data/portfolio";

export default function ProjectVisual({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  const fallbackProfiles = [
    { name: "commerce", cue: "basket / active", label: "favourite foods", marks: ["Oats", "Bites", "Dates"] },
    { name: "interview", cue: "question / 04", label: "Tell me about a challenge", marks: ["STAR", "voice", "practice"] },
    { name: "journal", cue: "entry / today", label: "how are you, really?", marks: ["calm", "busy", "clear"] },
    { name: "soda", cue: "fizz / form", label: "sparkling launch", marks: ["POP", "01", "cold"] },
    { name: "notes", cue: "saved / 21", label: "things to revisit", marks: ["link", "idea", "later"] },
    { name: "ticket", cue: "entry / 04", label: "your way in", marks: ["admit", "fast", "simple"] },
  ][index % 6];

  const projectProfiles: Record<string, typeof fallbackProfiles> = {
    "Nutribites": { name: "commerce", cue: "basket / active", label: "favourite foods", marks: ["Oats", "Bites", "Dates"] },
    "Interview Xpert": { name: "interview", cue: "prompt / 04", label: "say it with structure", marks: ["STAR", "voice", "practice"] },
    "Tracer": { name: "journal", cue: "entry / quiet", label: "private reflection", marks: ["mood", "note", "return"] },
    "Spizz": { name: "soda", cue: "fizz / 3d", label: "sparkling launch", marks: ["POP", "cold", "motion"] },
    "LinkShift Notes": { name: "notes", cue: "clip / saved", label: "things to revisit", marks: ["link", "idea", "later"] },
    "Pariksha": { name: "interview", cue: "exam / ready", label: "assessment, made calmer", marks: ["schedule", "attempt", "review"] },
    "Easy Tickets": { name: "ticket", cue: "entry / admit", label: "a clearer way in", marks: ["admit", "fast", "simple"] },
    "Cyberfication": { name: "soda", cue: "pulse / 01", label: "controlled voltage", marks: ["flow", "glow", "shift"] },
    "Zentry UI": { name: "interview", cue: "layout / focus", label: "the visual centre", marks: ["layer", "signal", "frame"] },
    "AI Interview": { name: "interview", cue: "prompt / guide", label: "practice flow", marks: ["listen", "answer", "learn"] },
    "Smart Dustbin": { name: "commerce", cue: "utility / live", label: "everyday signal", marks: ["sense", "open", "clear"] },
    "System": { name: "journal", cue: "xp / progress", label: "make progress visible", marks: ["task", "streak", "level"] },
    "XORA": { name: "ticket", cue: "saas / value", label: "from feature to action", marks: ["value", "proof", "go"] },
    "One8sports": { name: "soda", cue: "pace / sport", label: "move with purpose", marks: ["run", "form", "energy"] },
    "Clever Books": { name: "journal", cue: "finance / clear", label: "confidence first", marks: ["plan", "track", "read"] },
    "Coffee Shop": { name: "commerce", cue: "brew / warm", label: "a first welcome", marks: ["bean", "pour", "stay"] },
    "Doraemon Gadget Store": { name: "ticket", cue: "gadget / play", label: "a curious shelf", marks: ["find", "play", "take"] },
    "FoodoBar": { name: "commerce", cue: "menu / now", label: "food at a glance", marks: ["pick", "taste", "repeat"] },
    "Party Planners": { name: "ticket", cue: "event / invite", label: "anticipation, staged", marks: ["plan", "gather", "go"] },
    "User Management CRUD": { name: "notes", cue: "admin / edit", label: "predictable controls", marks: ["add", "update", "remove"] },
    "Recipe API App": { name: "commerce", cue: "recipe / find", label: "the next meal", marks: ["search", "save", "cook"] },
    "MacBook Three JS": { name: "soda", cue: "object / depth", label: "a familiar object, reframed", marks: ["turn", "light", "depth"] },
    "Framer Notes": { name: "notes", cue: "motion / note", label: "capture in rhythm", marks: ["write", "move", "keep"] },
    "ChartJS Dashboard": { name: "journal", cue: "data / signal", label: "read the signal", marks: ["chart", "scan", "decide"] },
    "Road To Code": { name: "interview", cue: "learn / next", label: "the next step", marks: ["start", "build", "grow"] },
  };
  const visualProfiles = projectProfiles[project.title] ?? fallbackProfiles;

  const signatureObjects = {
    commerce: <div className="signature-object grocery-object"><i /><i /><i /><b>+</b><span>basket</span></div>,
    interview: <div className="signature-object prompt-object"><b>?</b><i /><i /><span>say it out loud</span></div>,
    journal: <div className="signature-object journal-object"><i /><b>today</b><span>calm · busy · clear</span></div>,
    soda: <div className="signature-object soda-object"><b>FIZZ</b><i /><span>cold press</span></div>,
    notes: <div className="signature-object note-object"><i /><b>saved</b><span>↗ revisit later</span></div>,
    ticket: <div className="signature-object ticket-object"><b>ADMIT</b><i /><span>01 · easy entry</span></div>,
  } as const;

  const updateProjectTilt = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--project-x", `${x * 12}px`);
    event.currentTarget.style.setProperty("--project-y", `${y * 10}px`);
  };

  const resetProjectTilt = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.removeProperty("--project-x");
    event.currentTarget.style.removeProperty("--project-y");
  };

  return (
      <div className={`project-visual accent-${project.accent} visual-${index % 6} signature-${visualProfiles.name} artifact-${project.slug} ${featured ? "is-featured" : ""}`} onPointerMove={updateProjectTilt} onPointerLeave={resetProjectTilt}>
      {featured && index === 0 && <img className="project-signal-art" src="/assets/om-project-signal-blue_dddfb8d1.jpg" alt="" />}
      <span className="project-cue">{visualProfiles.cue}</span>
      <div className="project-orb orb-one" />
      <div className="project-orb orb-two" />
      <div className="artefact artefact-one" /><div className="artefact artefact-two" /><div className="artefact artefact-three" />
      <div className="project-window">
        <div className="window-top"><i /><i /><i /><span>{project.category}</span></div>
        <div className="window-body">
          <div className="code-rail"><Braces size={17} /><span>{String(index + 1).padStart(2, "0")}</span></div>
          <div className="code-lines"><b /><b /><b /><b /></div>
          <div className="window-tiles"><i /><i /><i /></div>
        </div>
      </div>
      <div className="project-specific" aria-hidden="true">
        <b>{visualProfiles.label}</b>
        <div className="specific-track">{visualProfiles.marks.map((mark, markIndex) => <span key={mark} className={`mark-${markIndex}`}>{mark}</span>)}</div>
      </div>
      <div aria-hidden="true">{signatureObjects[visualProfiles.name as keyof typeof signatureObjects]}</div>
      <div className="artifact-lines"><i /><i /><i /><i /></div>
      <div className="project-marks"><Layers3 size={17} /><ArrowUpRight size={17} /></div>
    </div>
  );
}
