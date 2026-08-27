// Split-Screen Studio: Original project stills, atmosphere backdrops, and restrained title-specific SVG motifs give each case study a material world without turning external context into an unverified product claim.
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/portfolio";
import "./CaseStudyArtwork.css";

type VisualFamily = "commerce" | "learning" | "events" | "dimensional" | "systems";

type ArtworkDescriptor = { family: VisualFamily; cue: string; field: string; art?: { src: string; alt: string; label: string }; note?: string };
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
  "ShopVista": { family: "commerce", cue: "receipt orbit", field: "editorial commerce", art: { src: "/assets/shopvista-editorial-thumbnail_11acdcc0.png", alt: "Original editorial still life of a cobalt aperture, folded receipt paper, and neutral design objects", label: "Gallery Receipt / original study" }, note: "An editorial commerce cue: object discovery and practical service states belong to the same reading rhythm." },
  "The Last Seed — Story Atlas": { family: "learning", cue: "seed atlas", field: "speculative storytelling", art: { src: "/assets/the-last-seed-editorial-thumbnail_f60e80d1.png", alt: "Original cinematic study of a glowing seed suspended in a dark archival landscape", label: "Story Atlas / original study" }, note: "A narrative cue: one held signal opens into an anthology without making environmental data claims." },
  "Move Into Order": { family: "systems", cue: "room route", field: "moving companion", art: { src: "/assets/move-into-order-editorial-thumbnail_7c5c153e.png", alt: "Original editorial study of a labeled cardboard moving box, route lines, and a warm floor plan", label: "Blueprint Carton / original study" }, note: "An orientation cue: a life transition becomes easier to act on when the next room and next state stay visible." },
  "Laocoön — Bronze & Time": { family: "dimensional", cue: "bronze arc", field: "digital sculpture study", art: { src: "/assets/laocoon-bronze-editorial-thumbnail_9add576f.png", alt: "Original abstract editorial study of a bronzed sculptural form in copper light and sapphire shadow", label: "Bronze & Time / original study" }, note: "A material cue: the site studies motion, light, and sculpture without reproducing a collection work or implying affiliation." },
  "Theorem of Kemet": { family: "systems", cue: "five lenses", field: "evidence-aware journal", art: { src: "/assets/theorem-kemet-editorial-thumbnail_365eb9ff.png", alt: "Original field-journal still life with five connected evidence nodes, an artifact case, and excavation-paper texture", label: "Field Notes / original study" }, note: "A method cue: visual links guide exploration, but the record, counterargument, and interpretation remain distinct." },
  "Valor": { family: "commerce", cue: "field pull", field: "leather goods launch", art: { src: "/assets/valor-editorial-thumbnail_45928ddf.png", alt: "Original tactile still life of a dark leather wallet, brass detail, and parchment-like material surface", label: "Field Pull / original study" }, note: "A material cue: the product story focuses on touch, care, and time without making certification or sourcing claims." },
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
  return { ...descriptor, art: descriptor.art ?? familyArt[descriptor.family], note: descriptor.note ?? familyNotes[descriptor.family] };
}

function VectorMotif({ family, cue, title }: ArtworkDescriptor & { title: string }) {
  if (title === "ShopVista") return <svg className="case-art-vector case-art-vector-commerce case-art-vector-shopvista" viewBox="0 0 180 180" aria-hidden="true"><circle className="case-art-ring" cx="90" cy="87" r="49" /><circle cx="90" cy="87" r="25" /><path d="M37 87h106M90 34v106M58 128l64-83" /><path className="case-art-ticket" d="M61 57h57v61H61z" /><circle className="case-art-node" cx="90" cy="87" r="6" /><text x="90" y="156">{cue}</text></svg>;
  if (title === "The Last Seed — Story Atlas") return <svg className="case-art-vector case-art-vector-learning case-art-vector-seed" viewBox="0 0 180 180" aria-hidden="true"><path d="M90 35c34 20 27 59 0 66-27-7-34-46 0-66Z" /><path d="M90 99v42M90 119c-19 5-33 15-42 27M90 123c21 4 34 15 43 27M90 113 65 95M91 113l25-18" /><circle className="case-art-node" cx="90" cy="83" r="7" /><circle className="case-art-node" cx="48" cy="147" r="4" /><circle className="case-art-node" cx="133" cy="150" r="4" /><text x="90" y="167">{cue}</text></svg>;
  if (title === "Move Into Order") return <svg className="case-art-vector case-art-vector-systems case-art-vector-move" viewBox="0 0 180 180" aria-hidden="true"><path d="m52 63 38-21 39 22-39 21-38-22ZM52 63v45l38 22 39-23V64M90 85v45" /><path d="M34 130c23-15 36 7 55-7s33 7 57-12" /><circle className="case-art-node" cx="34" cy="130" r="5" /><circle className="case-art-node" cx="90" cy="123" r="5" /><circle className="case-art-node" cx="146" cy="111" r="5" /><text x="90" y="160">{cue}</text></svg>;
  if (title === "Laocoön — Bronze & Time") return <svg className="case-art-vector case-art-vector-dimensional case-art-vector-bronze" viewBox="0 0 180 180" aria-hidden="true"><path d="M39 120C48 59 78 38 111 51c27 11 32 51 14 75" /><path d="M48 116c27 15 61 12 82-10M71 54c8 23 25 39 52 51" /><circle className="case-art-ring" cx="93" cy="89" r="43" /><circle className="case-art-node" cx="45" cy="119" r="5" /><circle className="case-art-node" cx="126" cy="102" r="5" /><text x="90" y="157">{cue}</text></svg>;
  if (title === "Theorem of Kemet") return <svg className="case-art-vector case-art-vector-systems case-art-vector-theorem" viewBox="0 0 180 180" aria-hidden="true"><path d="M43 54 90 83 137 54M43 54l17 70h60l17-70M60 124l30-41 30 41" /><circle className="case-art-node" cx="43" cy="54" r="6" /><circle className="case-art-node" cx="137" cy="54" r="6" /><circle className="case-art-node" cx="90" cy="83" r="7" /><circle className="case-art-node" cx="60" cy="124" r="6" /><circle className="case-art-node" cx="120" cy="124" r="6" /><text x="90" y="155">{cue}</text></svg>;
  if (title === "Valor") return <svg className="case-art-vector case-art-vector-commerce case-art-vector-valor" viewBox="0 0 180 180" aria-hidden="true"><path d="M43 66h94v56H43zM43 66l16-17h61l17 17M57 89h65M57 108h47" /><path className="case-art-ticket" d="M82 49v-15h20v15" /><path d="m118 79 15 0-5-5m5 5-5 5" /><circle className="case-art-node" cx="133" cy="79" r="4" /><text x="90" y="152">{cue}</text></svg>;
  if (family === "commerce") return <svg className="case-art-vector case-art-vector-commerce" viewBox="0 0 180 180" aria-hidden="true"><path d="M35 57h110l-13 65H48L35 57Z" /><path d="M60 57 72 34M120 57l-12-23M39 84h102" /><circle className="case-art-node" cx="69" cy="93" r="6" /><circle className="case-art-node" cx="111" cy="93" r="6" /><text x="90" y="153">{cue}</text></svg>;
  if (family === "learning") return <svg className="case-art-vector case-art-vector-learning" viewBox="0 0 180 180" aria-hidden="true"><path d="M42 55c32-30 69-24 85 8 19 40-17 72-56 53-29-14-22-51 6-56 21-4 34 19 19 32" /><circle className="case-art-node" cx="42" cy="55" r="6" /><circle className="case-art-node" cx="96" cy="92" r="7" /><circle className="case-art-node" cx="127" cy="63" r="5" /><text x="90" y="153">{cue}</text></svg>;
  if (family === "events") return <svg className="case-art-vector case-art-vector-events" viewBox="0 0 180 180" aria-hidden="true"><path d="M25 122C48 80 55 117 80 75s37 25 60-24" /><path d="m129 51 12-1-5 11" /><rect className="case-art-ticket" x="38" y="81" width="39" height="25" rx="2" transform="rotate(-19 38 81)" /><circle className="case-art-node" cx="80" cy="75" r="6" /><text x="90" y="153">{cue}</text></svg>;
  if (family === "dimensional") return <svg className="case-art-vector case-art-vector-dimensional" viewBox="0 0 180 180" aria-hidden="true"><path d="m55 58 42-22 41 23v48l-42 24-41-24V58Z" /><path d="m55 58 41 24 42-23M96 82v49" /><circle className="case-art-node" cx="96" cy="36" r="6" /><circle className="case-art-node" cx="138" cy="59" r="5" /><text x="90" y="153">{cue}</text></svg>;
  return <svg className="case-art-vector case-art-vector-systems" viewBox="0 0 180 180" aria-hidden="true"><path d="M43 98h94M54 62v72M126 62v72" /><circle className="case-art-ring" cx="90" cy="98" r="26" /><circle className="case-art-node" cx="54" cy="62" r="6" /><circle className="case-art-node" cx="126" cy="62" r="6" /><circle className="case-art-node" cx="90" cy="124" r="6" /><text x="90" y="153">{cue}</text></svg>;
}

const sceneContent: Record<string, { key: string; label: string; title: string; body: string; marker: string; atmosphere?: string }> = {
  "ShopVista": { key: "shopvista", label: "Full spread / Gallery Receipt", title: "One order of information, not a wall of commerce.", body: "A receipt becomes the scene prop: an object shelf, a comparison mark, and a service-state line sit in the same visual system. The cue is less about selling and more about making the next decision readable.", marker: "object → compare → receipt", atmosphere: "/assets/shopvista-atmosphere_7363e189.png" },
  "The Last Seed — Story Atlas": { key: "seed", label: "Full spread / Seed Atlas", title: "An anthology held together by one small signal.", body: "The seed is treated as a reader’s anchor, with root-like paths standing in for ten distinct narrative worlds. Each path suggests a world to enter without recasting speculative fiction as ecological research.", marker: "hold → follow → return", atmosphere: "/assets/the-last-seed-atmosphere_be97f976.png" },
  "Move Into Order": { key: "move", label: "Full spread / Blueprint Carton", title: "The next room becomes the next useful decision.", body: "The carton and its route line act as a moving-day map: a physical object, a changing state, and a calm instruction in one frame. The goal is a recoverable plan rather than a false promise that the move is effortless.", marker: "room → handoff → settle", atmosphere: "/assets/move-into-order-atmosphere_aba3a21e.png" },
  "Laocoön — Bronze & Time": { key: "bronze", label: "Full spread / Bronze Arc", title: "Light moves around the object; the page stays out of its way.", body: "An abstract bronze arc and afterimage trace stand in for a camera moving around one material gesture. They echo the study’s fictional exhibition frame without reproducing the Laocoön Group or borrowing museum authority.", marker: "bronze → arc → sapphire", atmosphere: "/assets/laocoon-bronze-atmosphere_29e18dd4.png" },
  "Theorem of Kemet": { key: "kemet", label: "Full spread / Evidence Lenses", title: "Five visible positions before one interpretation.", body: "The case-file diagram makes the journal’s editorial method spatial: a public claim can meet a record, counterargument, anomaly, and theory without becoming a single asserted fact.", marker: "claim → record → question", atmosphere: "/assets/theorem-kemet-atmosphere_b9bcfd35.png" },
  "Valor": { key: "valor", label: "Full spread / Field Pull", title: "A small mechanism gives the material story its pace.", body: "A pull-tab silhouette, brass rule, and patina rings stage the Field Pull wallet as an everyday object. The scene keeps attention on handling, care, and time without manufacturing sustainability or durability claims.", marker: "pull → carry → patina", atmosphere: "/assets/valor-atmosphere_ee69b5c6.png" },
};

export function CaseStudyScene({ project }: { project: Project }) {
  const descriptor = getCaseStudyArt(project);
  const scene = sceneContent[project.title] ?? { key: "signal", label: "Full spread / Signal Map", title: "A system made easier to inspect.", body: "A single visual cue holds the project’s technical and interaction decisions in one place.", marker: "observe → inspect → return" };
  return <section className={`case-project-scene case-project-scene-${scene.key}`} aria-label={`${project.title} visual scene`}>
    <div className="case-project-scene-frame" aria-hidden="true">{scene.atmosphere && <img className="case-project-scene-atmosphere" src={scene.atmosphere} alt="" />}<span>{scene.marker}</span><VectorMotif {...descriptor} title={project.title} /><i className="case-project-scene-paper-mark" /></div>
    <div className="case-project-scene-copy"><p className="study-number">{scene.label}</p><h3>{scene.title}</h3><p>{scene.body}</p></div>
    <div className="case-project-scene-index" aria-hidden="true"><b>{descriptor.cue}</b><i /><span>01 / material cue</span></div>
  </section>;
}

export default function CaseStudyArtwork({ project }: { project: Project }) {
  const descriptor = getCaseStudyArt(project);
  const art = descriptor.art;
  const reducedMotion = useReducedMotion();
  return <figure className={`case-artwork case-artwork-${descriptor.family}`}>
    <motion.img src={art.src} alt={`${art.alt}; used as a visual metaphor for ${project.title}.`} initial={{ opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reducedMotion ? 0.01 : 0.6, ease: [0.23, 1, 0.32, 1] }} />
    <div className="case-artwork-scan" aria-hidden="true" />
    <div className="case-artwork-vector-wrap"><VectorMotif {...descriptor} title={project.title} /></div>
    <figcaption><span>{art.label}</span><b>{descriptor.field} / {project.title}</b></figcaption>
  </figure>;
}
