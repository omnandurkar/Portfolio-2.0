// Split-Screen Studio: Generated editorial imagery gives each case-study family a material world; small vectors provide a distinct project cue without making unverified product claims.
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/portfolio";
import "./CaseStudyArtwork.css";

type VisualFamily = "commerce" | "learning" | "events" | "dimensional" | "systems";

type ArtworkDescriptor = { family: VisualFamily; cue: string; field: string };
export type CaseStudyArtMeta = ArtworkDescriptor & { art: { src: string; alt: string; label: string }; note: string };

const familyArt: Record<VisualFamily, { src: string; alt: string; label: string }> = {
  commerce: { src: "/assets/om-case-family-commerce_05e0894e.jpg", alt: "Editorial still life of ingredients, a food counter, and abstract commerce objects", label: "Commerce / appetite / flow" },
  learning: { src: "/assets/om-case-family-learning_71d74b16.jpg", alt: "Editorial abstract scene of prompt cards, notes, and a guided practice loop", label: "Practice / reflection / path" },
  events: { src: "/assets/om-case-family-events_1cb31a06.jpg", alt: "Editorial scene of a dynamic route, arena forms, and floating ticket shapes", label: "Gathering / pace / entry" },
  dimensional: { src: "/assets/om-case-family-dimensional_032dbc5c.jpg", alt: "Cinematic abstract product scene with translucent blue surfaces and glass forms", label: "Motion / depth / interface" },
  systems: { src: "/assets/om-case-family-systems_bbeb1f8d.jpg", alt: "Editorial system of connected modules, a status orb, and fine signal lines", label: "System / signal / order" },
};

const projectArt: Record<string, ArtworkDescriptor> = {
  "Nutribites": { family: "commerce", cue: "basket loop", field: "food commerce" },
  "Interview Xpert": { family: "learning", cue: "prompt loop", field: "guided practice" },
  "Tracer": { family: "learning", cue: "memory trail", field: "private reflection" },
  "Spizz": { family: "dimensional", cue: "fizz orbit", field: "product motion" },
  "LinkShift Notes": { family: "learning", cue: "link relay", field: "notes and recall" },
  "Pariksha": { family: "systems", cue: "exam relay", field: "assessment system" },
  "Easy Tickets": { family: "events", cue: "entry route", field: "ticketing" },
  "Cyberfication": { family: "dimensional", cue: "energy beam", field: "creative web" },
  "Zentry UI": { family: "dimensional", cue: "focus frame", field: "interface study" },
  "AI Interview": { family: "learning", cue: "voice pulse", field: "interview preparation" },
  "Smart Dustbin": { family: "systems", cue: "sensor ring", field: "connected utility" },
  "System": { family: "systems", cue: "progress grid", field: "productivity loop" },
  "XORA": { family: "dimensional", cue: "launch plane", field: "SaaS landing" },
  "One8sports": { family: "events", cue: "pace line", field: "sports presentation" },
  "Clever Books": { family: "systems", cue: "ledger arc", field: "finance product" },
  "Coffee Shop": { family: "commerce", cue: "steam lift", field: "hospitality" },
  "Doraemon Gadget Store": { family: "commerce", cue: "gadget shelf", field: "playful commerce" },
  "FoodoBar": { family: "commerce", cue: "plate path", field: "food browsing" },
  "Party Planners": { family: "events", cue: "confetti route", field: "event planning" },
  "User Management CRUD": { family: "systems", cue: "profile nodes", field: "admin workflow" },
  "Recipe API App": { family: "commerce", cue: "ingredient scan", field: "recipe discovery" },
  "MacBook Three JS": { family: "dimensional", cue: "depth axis", field: "3D exploration" },
  "Framer Notes": { family: "learning", cue: "spring note", field: "motion notes" },
  "ChartJS Dashboard": { family: "systems", cue: "signal bars", field: "analytics" },
  "Road To Code": { family: "learning", cue: "step path", field: "learning product" },
};

const familyNotes: Record<VisualFamily, string> = {
  commerce: "A choice-to-completion cue: browsing, selection, and a clear next step.",
  learning: "A return-path cue: capture, practice, and a moment to come back to.",
  events: "A momentum cue: the route into a shared moment should stay easy to follow.",
  dimensional: "A product-theatre cue: depth and motion should make the interface easier to feel.",
  systems: "A legibility cue: useful signals deserve a calm, visible structure.",
};

export function getCaseStudyArt(project: Project): CaseStudyArtMeta {
  const descriptor = projectArt[project.title] ?? { family: "systems", cue: "signal map", field: project.category.toLowerCase() };
  return { ...descriptor, art: familyArt[descriptor.family], note: familyNotes[descriptor.family] };
}

function VectorMotif({ family, cue }: ArtworkDescriptor) {
  if (family === "commerce") return <svg className="case-art-vector case-art-vector-commerce" viewBox="0 0 180 180" aria-hidden="true"><path d="M35 57h110l-13 65H48L35 57Z" /><path d="M60 57 72 34M120 57l-12-23M39 84h102" /><circle className="case-art-node" cx="69" cy="93" r="6" /><circle className="case-art-node" cx="111" cy="93" r="6" /><text x="90" y="153">{cue}</text></svg>;
  if (family === "learning") return <svg className="case-art-vector case-art-vector-learning" viewBox="0 0 180 180" aria-hidden="true"><path d="M42 55c32-30 69-24 85 8 19 40-17 72-56 53-29-14-22-51 6-56 21-4 34 19 19 32" /><circle className="case-art-node" cx="42" cy="55" r="6" /><circle className="case-art-node" cx="96" cy="92" r="7" /><circle className="case-art-node" cx="127" cy="63" r="5" /><text x="90" y="153">{cue}</text></svg>;
  if (family === "events") return <svg className="case-art-vector case-art-vector-events" viewBox="0 0 180 180" aria-hidden="true"><path d="M25 122C48 80 55 117 80 75s37 25 60-24" /><path d="m129 51 12-1-5 11" /><rect className="case-art-ticket" x="38" y="81" width="39" height="25" rx="2" transform="rotate(-19 38 81)" /><circle className="case-art-node" cx="80" cy="75" r="6" /><text x="90" y="153">{cue}</text></svg>;
  if (family === "dimensional") return <svg className="case-art-vector case-art-vector-dimensional" viewBox="0 0 180 180" aria-hidden="true"><path d="m55 58 42-22 41 23v48l-42 24-41-24V58Z" /><path d="m55 58 41 24 42-23M96 82v49" /><circle className="case-art-node" cx="96" cy="36" r="6" /><circle className="case-art-node" cx="138" cy="59" r="5" /><text x="90" y="153">{cue}</text></svg>;
  return <svg className="case-art-vector case-art-vector-systems" viewBox="0 0 180 180" aria-hidden="true"><path d="M43 98h94M54 62v72M126 62v72" /><circle className="case-art-ring" cx="90" cy="98" r="26" /><circle className="case-art-node" cx="54" cy="62" r="6" /><circle className="case-art-node" cx="126" cy="62" r="6" /><circle className="case-art-node" cx="90" cy="124" r="6" /><text x="90" y="153">{cue}</text></svg>;
}

export default function CaseStudyArtwork({ project }: { project: Project }) {
  const descriptor = getCaseStudyArt(project);
  const art = descriptor.art;
  const reducedMotion = useReducedMotion();
  return <figure className={`case-artwork case-artwork-${descriptor.family}`}>
    <motion.img src={art.src} alt={`${art.alt}; used as a visual metaphor for ${project.title}.`} initial={{ opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reducedMotion ? 0.01 : 0.6, ease: [0.23, 1, 0.32, 1] }} />
    <div className="case-artwork-scan" aria-hidden="true" />
    <div className="case-artwork-vector-wrap"><VectorMotif {...descriptor} /></div>
    <figcaption><span>{art.label}</span><b>{descriptor.field} / {project.title}</b></figcaption>
  </figure>;
}
