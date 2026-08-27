// Split-Screen Studio: Shared factual content preserves a focused Studio voice and a tactile Maker reading of the same body of work.
export type Evidence = {
  label: "Verified GitHub repository" | "Portfolio record";
  repositoryUrl?: string;
  repositoryName?: string;
};

export type Project = {
  title: string;
  type: "Full stack" | "Frontend";
  category: string;
  description: string;
  stack: string[];
  liveUrl: string;
  legacyArchive?: boolean;
  accent: "blue" | "red" | "yellow" | "green";
  slug: string;
  role: string;
  proof: string;
  focus: string;
  coverImage?: string;
  evidence: Evidence;
  caseStudy: {
    headings: { opportunity: string; build: string; contribution: string };
    brief: string;
    approach: string;
    contributions: string[];
    closing: string;
    context?: { label: string; statement: string; sourceName: string; sourceUrl: string };
    scope?: { title: string; detail: string };
    story?: { label: string; title: string; summary: string; beats: string[] };
  };
};

type Seed = Omit<Project, "slug" | "role" | "proof" | "caseStudy"> & { role?: string };

const slugify = (title: string) => title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const projectVoice: Record<string, { opportunity: string; build: string; contribution: string }> = {
  "Nutribites": { opportunity: "Food ordering should stay understandable after checkout.", build: "Commerce flows with a visible next step.", contribution: "Storefront mechanics, made navigable." },
  "Interview Xpert": { opportunity: "Practice is stronger when the prompt has structure.", build: "A place to rehearse the answer out loud.", contribution: "The practice loop, made concrete." },
  "Tracer": { opportunity: "Private reflection needs a calm place to land.", build: "Capture first. Return when it helps.", contribution: "A quieter digital journal." },
  "Spizz": { opportunity: "A product launch can behave like the product itself.", build: "Motion, depth, and a satisfying pause.", contribution: "A soda story with dimensional energy." },
  "LinkShift Notes": { opportunity: "Small ideas deserve a place before they disappear.", build: "A link, a note, and a return path.", contribution: "Loose thoughts, kept within reach." },
  "Pariksha": { opportunity: "Exam software has to make pressure feel more manageable.", build: "A calm assessment route for students and administrators.", contribution: "An examination system with a visible chain of responsibility." },
  "Easy Tickets": { opportunity: "The route to an event should feel immediate.", build: "Ticket details without needless detours.", contribution: "A clear way in." },
  "Cyberfication": { opportunity: "Experimental interfaces can still have rhythm.", build: "Visual energy, carefully directed.", contribution: "A high-voltage web study." },
  "Zentry UI": { opportunity: "A dense interface still needs a focal point.", build: "Layered visual hierarchy with a sharp centre.", contribution: "A controlled interface experiment." },
  "AI Interview": { opportunity: "Interview preparation benefits from a guided flow.", build: "A practice journey with fewer blank moments.", contribution: "A preparation tool shaped for momentum." },
  "Smart Dustbin": { opportunity: "An everyday utility can become a product interaction.", build: "A connected concept with a simple purpose.", contribution: "Utility, treated as an interface." },
  "XORA": { opportunity: "A SaaS landing page must make value legible.", build: "A direct narrative from product to action.", contribution: "A clean conversion signal." },
  "One8sports": { opportunity: "Sports products need pace without visual noise.", build: "Presentation built for movement and focus.", contribution: "Sport, staged as a digital object." },
  "Clever Books": { opportunity: "Finance products need confidence before complexity.", build: "A clear frame for product information.", contribution: "Finance UX with a sharper read." },
  "Coffee Shop": { opportunity: "Hospitality begins before someone walks through the door.", build: "Warm cues for a simple first impression.", contribution: "A café mood in the browser." },
  "Doraemon Gadget Store": { opportunity: "Playfulness can make a store memorable.", build: "A product shelf with an imaginative tone.", contribution: "Commerce with character." },
  "FoodoBar": { opportunity: "Food browsing should be immediate and appetite-led.", build: "A direct visual path into the menu.", contribution: "A food interface with a quick read." },
  "Party Planners": { opportunity: "Planning events is about making anticipation visible.", build: "An event page with a focused invitation.", contribution: "Planning cues for a social moment." },
  "User Management CRUD": { opportunity: "Administrative work benefits from predictable controls.", build: "A CRUD interface with familiar actions.", contribution: "User management, made practical." },
  "Recipe API App": { opportunity: "Recipe discovery needs a useful way into the catalogue.", build: "API-backed browsing with a food-first focus.", contribution: "A route to the next meal." },
  "MacBook Three JS": { opportunity: "A familiar object becomes new when it has depth.", build: "An exploratory product scene in the browser.", contribution: "3D product study for the web." },
  "Framer Notes": { opportunity: "Notes can have motion without becoming distracting.", build: "Capture utility with an animated layer.", contribution: "A notes tool with deliberate rhythm." },
  "ChartJS Dashboard": { opportunity: "Charts work when the signal stays legible.", build: "A dashboard organised around readable data.", contribution: "Analytics with visual order." },
  "Road To Code": { opportunity: "Learning products should make the next step reachable.", build: "A web experience oriented around learning.", contribution: "A learning path with a product frame." },
  "System": { opportunity: "A productivity loop can make progress visible without hiding the work.", build: "Tasks, progression, and feedback within one focused game-like frame.", contribution: "A personal system that treats follow-through as an interaction." },
  "ShopVista": { opportunity: "More choice needs more orientation.", build: "A commerce journey staged as a Gallery Receipt.", contribution: "Product discovery with service design in view." },
  "The Last Seed — Story Atlas": { opportunity: "A story world should reward attention, not just scrolling.", build: "Ten narrative systems, each with one clear signal.", contribution: "Creative development as an authored archive." },
  "Move Into Order": { opportunity: "Moving is a lot. The plan does not have to be.", build: "A room-first route from packing to the first settled week.", contribution: "Logistics reframed as orientation." },
  "Laocoön — Bronze & Time": { opportunity: "A single object can carry a whole atmosphere.", build: "A scroll-led material study with the camera as choreographer.", contribution: "Digital sculpture, held in an editorial frame." },
  "Theorem of Kemet": { opportunity: "Curiosity needs a visible method.", build: "A field journal that separates traceable records from interpretation.", contribution: "An immersive archive that earns reader trust." },
  "Valor": { opportunity: "A small everyday object can still have a material story.", build: "A product launch paced around pull, carry, care, and time.", contribution: "A quiet digital stage for everyday carry." },
};

const projectDetail: Record<string, { brief: string; approach: string }> = {
  "Nutribites": { brief: "Nutribites frames ordering as a journey that stays legible after the basket: sign-in, favourites, tracking, and admin work each have a role in the path.", approach: "The MERN build gives the store a clear hand-off from browsing to order follow-up, keeping the customer and administration paths visible without treating every screen as a sales moment." },
  "Interview Xpert": { brief: "Interview Xpert turns the blank-page problem of interview practice into a more structured rehearsal loop.", approach: "The Next.js and TypeScript build organises practice around a useful prompt-to-response rhythm, with motion used to support progression rather than distract from the answer." },
  "Tracer": { brief: "Tracer treats journaling as a private place to capture a thought now and recognise a pattern later.", approach: "The Prisma-backed product keeps the interface quiet around the act of reflection, giving mood tracking and later review a shared, calm frame." },
  "Spizz": { brief: "Spizz uses the launch page itself as the product demonstration: material, depth, and pacing do the storytelling.", approach: "React Three Fiber, Three.js, and GSAP are used as a motion study around a dimensional soda object, with each scene transition designed to create a deliberate pause." },
  "ChartJS Dashboard": { brief: "ChartJS Dashboard starts with a simple judgement: the data view is only helpful when its signal survives the interface around it.", approach: "The React and Chart.js build arranges the dashboard around readable chart space and a restrained UI frame, avoiding decorative complexity around the data." },
  "MacBook Three JS": { brief: "MacBook Three JS explores how a familiar product object changes when depth becomes part of the browser experience.", approach: "React Three Fiber and Three.js give the product scene an exploratory spatial frame, while Framer Motion supports the surrounding interface rhythm." },
  "Framer Notes": { brief: "Framer Notes tests how a notes tool can acknowledge motion without interrupting the act of capture.", approach: "The build uses Framer Motion as feedback around a Mongoose-backed notes flow, keeping the note itself more important than the animation." },
  "Smart Dustbin": { brief: "Smart Dustbin uses a connected-utility concept to ask how an everyday object can communicate purpose with less friction.", approach: "The project presents the concept through a product-oriented interface frame, giving the utility a clear, direct interaction story." },
  "Easy Tickets": { brief: "Easy Tickets focuses on the moment between deciding to attend and having a route into the event.", approach: "The web build keeps ticket details and access cues close together, so the page reads as an entry path rather than a chain of detours." },
  "Pariksha": { brief: "Pariksha is a student- and administrator-facing examination platform built around a calmer assessment journey: scheduled exams, a focused player, later results, and a record of critical decisions.", approach: "The public repository documents a Next.js, React, Prisma, and NextAuth build. Its student dashboard, exam player, access request, result, and administrative management flows are presented as one connected assessment system, with audit logs and analytics giving the operational side a visible place." },
  "Road To Code": { brief: "Road To Code frames a learning product around one practical question: can the next useful step stay within reach?", approach: "The MERN project uses a product-shaped learning flow, giving educational content a clearer sense of movement and return." },
  "System": { brief: "System is a gamified productivity concept that translates tasks, streaks, activity tracking, and longer-term progression into one deliberate daily loop.", approach: "The public repository documents a Next.js product with PostgreSQL, Prisma, Framer Motion, and charting dependencies. Its design treats everyday follow-through as a feedback system, connecting tasks, progress, and visual status without presenting the game layer as a substitute for the work itself." },
  "ShopVista": { brief: "ShopVista is an editorial e-commerce concept for design-led everyday objects. It makes the commercial route feel closer to a gallery catalogue—search and comparison, object detail, bag, checkout, gifting, tracking, and account surfaces remain parts of the same reading experience.", approach: "The React 19, TypeScript, Vite, Tailwind, Framer Motion, GSAP, and Wouter build uses a Gallery Receipt system: warm paper, ink-navy type, precise cobalt signals, asymmetric rails, and a custom aperture/orbit motif. The aim is to make service clarity feel as considered as product staging." },
  "The Last Seed — Story Atlas": { brief: "The Last Seed — Story Atlas turns an original story about a held promise into a collection of ten speculative-fiction worlds. Each uses its own visual grammar—an object, a path, an interaction, and a narrative pressure—rather than repeating one portfolio-page formula.", approach: "React 19, TypeScript, Vite, Wouter, Lenis, GSAP ScrollTrigger, Framer Motion, Three.js, React Three Fiber, and SVG are distributed by purpose: one focused 3D anchor per story, long-scroll choreography for cinematic shifts, and accessible controls for the local moments that ask the reader to participate." },
  "Move Into Order": { brief: "Move Into Order is a room-first moving companion that turns competing logistics—packing, access, handoff, first-night needs, box finding, and early routines—into visible, recoverable next steps.", approach: "The React 19, TypeScript, Vite, Tailwind, Wouter, Framer Motion, GSAP, Lenis, and Three.js prototype uses a Blueprint Carton Editorial system. Warm kraft surfaces, blueprint routes, labels, and an opening cardboard-box hero give operational planning a physical, calmer frame." },
  "Laocoön — Bronze & Time": { brief: "Laocoön — Bronze & Time is a scroll-driven digital sculpture study. A bronze horse is treated as a protagonist rather than a product render, moving through light, shadow, smoke, and a gradual bronze-to-sapphire shift.", approach: "A self-contained Three.js and WebGL build stages the experience with a fixed visual field, a scroll-driven camera arc, responsive lighting, a liquid-metal shader, ember-like particles, and a sparse five-line editorial grid. The interface frames the sculpture instead of competing with it." },
  "Theorem of Kemet": { brief: "Theorem of Kemet is an evidence-aware journal for ancient Egypt’s unresolved stories. A reader-facing archive and private curator desk make the difference between a claim, documented record, counterargument, anomaly, and interpretation deliberately legible.", approach: "The full-stack product combines React 19, TypeScript, Vite, Wouter, Tailwind, Framer Motion, GSAP, Express, tRPC, Drizzle, MySQL, and Vitest. Its Field Notes of the Necropolis system uses archival texture and slow image-led movement while keeping sources, labels, and accessible controls close to the reader’s next question." },
  "Valor": { brief: "Valor is a Mumbai–Nashik leather-goods startup concept centered on the Field Pull wallet: a slim, hand-finished carry piece intended to become more personal through daily use, patina, and time.", approach: "The website pairs a cinematic, scroll-led product story with tactile neo-heritage material cues: charred leather, parchment dossier panels, restrained brass, editorial serif typography, and a pull-tab interaction that gives the hero product a clear physical behaviour." },
};

type CaseStudyExtension = Partial<Project["caseStudy"]>;

const projectCaseStudyExtensions: Record<string, CaseStudyExtension> = {
  "ShopVista": {
    contributions: [
      "Designed the Gallery Receipt system: warm paper, ink navy, fine ledger rails, receipt metadata, and a cobalt orbit/aperture cue.",
      "Connected discovery, product-detail, bag, simulated checkout, gifting, tracking, and account samples into one deliberate commercial narrative.",
      "Used Framer Motion and GSAP for product focus and confirmation feedback, while retaining a reduced-motion path.",
    ],
    context: { label: "Context note / product discovery", statement: "Bain and Flipkart’s work on India’s online shopping landscape is useful context for a simple design premise: when choice expands, discovery needs orientation. ShopVista explores that premise through an editorial interface rather than a recommendation claim.", sourceName: "Bain & Company / Flipkart, How India Shops Online", sourceUrl: "https://www.bain.com/insights/how-india-shops-online-2024/" },
    scope: { title: "Prototype boundary", detail: "ShopVista is an interactive frontend concept. Its catalogue, account, tracking, support, checkout, and payment states are fictional client-side samples; it does not process payments or store customer data." },
    story: { label: "Reading beat / commerce", title: "Shelf → object → receipt.", summary: "The visual rhythm follows the practical journey without turning support and post-purchase screens into an afterthought.", beats: ["Discover through a curated shelf", "Read an object through its passport", "Complete a simulated receipt" ] },
  },
  "The Last Seed — Story Atlas": {
    contributions: [
      "Developed ten original story worlds with distinct typographic, color, interaction, and object systems.",
      "Used one focused 3D anchor per world, with SVG paths and scroll choreography carrying the broader narrative structure.",
      "Lazy-loaded routes and separated heavier visual dependencies so the anthology did not require every story scene on first load.",
    ],
    context: { label: "Context note / biodiversity", statement: "FAO identifies biodiversity as a foundation of food and agriculture. That real-world context gives an ethical horizon to The Last Seed, while the project itself remains an original work of speculative fiction—not a biodiversity data product.", sourceName: "Food and Agriculture Organization of the United Nations, Biodiversity", sourceUrl: "https://www.fao.org/biodiversity/en/" },
    scope: { title: "Fiction and data boundary", detail: "This is a static, frontend-only anthology of original speculative-fiction narratives. Its seeds, signals, worlds, and visual states are authored story material, not live environmental data, measurements, or forecasts." },
    story: { label: "Reading beat / anthology", title: "Ten worlds. One live archive.", summary: "The Atlas lets each story keep a different motion personality while the collection remains navigable as a whole.", beats: ["Enter through a held seed", "Follow one of ten authored signals", "Return through the Archive Reactor" ] },
  },
  "Move Into Order": {
    contributions: [
      "Translated a broad moving workflow into room bundles, clear stages, reversible completion, and one visible next action.",
      "Designed the Blueprint Carton Editorial system around kraft surfaces, blueprint lines, labels, taped edges, and move-orange action cues.",
      "Built planner, handoff, arrival, label-studio, finder, settling, home-signals, and keyboard-navigation prototype surfaces.",
    ],
    context: { label: "Context note / touch targets", statement: "WCAG 2.2’s Target Size (Minimum) success criterion describes a 24 by 24 CSS-pixel minimum with defined exceptions. That standard helped frame touch-target intent in this project; it is not an accessibility certification.", sourceName: "W3C, WCAG 2.2 — Target Size (Minimum)", sourceUrl: "https://www.w3.org/TR/WCAG22/#target-size-minimum" },
    scope: { title: "Prototype boundary", detail: "Move Into Order is a frontend prototype. Its active-session states reset on refresh; authentication, persistence, reminders, sharing, uploads, and QR-supported inventory are intentionally production-roadmap work." },
    story: { label: "Reading beat / moving route", title: "One room. One phase. One next thing.", summary: "The visual route narrows a noisy life transition into a sequence that can be seen, completed, and reopened.", beats: ["Plan by room", "Hold the move-day handoff", "Arrive with a first-night route" ] },
  },
  "Laocoön — Bronze & Time": {
    contributions: [
      "Directed the cinematic editorial system: five-line grid, negative space, high-contrast light, and a bronze-to-sapphire atmosphere.",
      "Implemented a scroll-driven Three.js scene with an oblique camera arc, physically inspired lighting, embers, and liquid-metal background behavior.",
      "Used sparse navigation and slow motion to make a single sculptural object carry the narrative rather than adding conventional landing-page density.",
    ],
    context: { label: "Context note / art-historical reference", statement: "The Vatican Museums’ collection record for the Laocoön Group provides a historical reference point for the project’s interest in sculpture, force, and material memory. This site is a fictional digital-art study, not a museum collaboration or collection record.", sourceName: "Vatican Museums, Laocoön Group", sourceUrl: "https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/museo-pio-clementino/cortile-ottagono/laocoonte.html" },
    scope: { title: "Fictional exhibition boundary", detail: "Laocoön — Bronze & Time is a static digital-art and 3D-web study. Its portfolio artwork uses original abstracted sculpture imagery and does not reproduce the Laocoön Group, claim ownership, or imply affiliation with a museum." },
    story: { label: "Reading beat / material study", title: "Bronze → motion → afterimage.", summary: "The scroll behaves like a camera choreographer, moving around one object instead of pushing the visitor through a conventional content stack.", beats: ["Hold the material study", "Arc around the gesture", "Let bronze resolve into sapphire" ] },
  },
  "Theorem of Kemet": {
    contributions: [
      "Designed the five-part evidence model so claim, documented record, counterargument, anomaly, and theory never collapse into one visual assertion.",
      "Built public reading, archive, source trails, evidence-board, folio, and artifact-inspection experiences alongside a private four-pass curator workflow.",
      "Implemented server-verified curator access and protected session boundaries without treating an atmospheric puzzle as the security control itself.",
    ],
    context: { label: "Context note / privacy language", statement: "NIST’s voluntary Privacy Framework offers a risk-based vocabulary for managing privacy risk. It is useful context for explaining the journal’s careful data and access boundaries; it does not certify this project or make it a compliance product.", sourceName: "National Institute of Standards and Technology, Privacy Framework", sourceUrl: "https://www.nist.gov/privacy-framework" },
    scope: { title: "Evidence boundary", detail: "Visual relationships, personal interpretations, and anomaly labels are never presented as proof. The journal is not predictive or diagnostic; its purpose is to make source-aware reading and editorial method more visible." },
    story: { label: "Reading beat / field method", title: "Claim → record → question.", summary: "The strongest visual moment is not a revelation: it is the reader seeing exactly where evidence ends and interpretation begins.", beats: ["Name the public claim", "Inspect records and counterarguments", "Frame an interpretation as interpretation" ] },
  },
  "Valor": {
    contributions: [
      "Designed and developed the Field Pull wallet launch experience around a physical pull-tab gesture and slow material reveal.",
      "Built a scroll-led product story with finish selection, carry profiles, care notes, workshop context, and a Batch 01 release journey.",
      "Used neo-heritage material language—charred leather, parchment, brass, and editorial type—to keep the product stage tactile but restrained.",
    ],
    context: { label: "Context note / leather industry", statement: "Leather Working Group develops environmental audit protocols for leather manufacturing. It is included here only as general material-industry context; it makes no claim about Valor’s certification, supplier, sourcing, or production practices.", sourceName: "Leather Working Group", sourceUrl: "https://www.leatherworkinggroup.com/" },
    scope: { title: "Brand record boundary", detail: "This record documents the supplied brand and website brief. It makes no independent certification, sourcing, inventory, durability, or sustainability claim about Valor or the Field Pull wallet." },
    story: { label: "Reading beat / material object", title: "Pull → carry → patina.", summary: "The launch uses one small everyday mechanism to introduce the larger material story rather than inventing performance claims.", beats: ["Pull the wallet open", "Choose a finish and carry profile", "Read care as part of ownership" ] },
  },
};

const makeProject = (seed: Seed): Project => {
  const verified = seed.evidence.label === "Verified GitHub repository";
  const legacyArchive = seed.legacyArchive === true;
  const stackLine = seed.stack.slice(0, 4).join(", ");
  const headings = projectVoice[seed.title] ?? { opportunity: `${seed.title}, seen through a product lens.`, build: "A focused build path.", contribution: "The work, made tangible." };
  const detail = projectDetail[seed.title];
  const extension = projectCaseStudyExtensions[seed.title];
  return {
    ...seed,
    slug: slugify(seed.title),
    role: seed.role ?? `${seed.type} build`,
    proof: legacyArchive ? "College-era archive record; historic deployment may be unavailable." : verified ? "Public deployment and verified source repository" : "Public deployment and portfolio record",
    caseStudy: {
      headings,
      brief: detail?.brief ?? `${seed.description} Its main product focus is ${seed.focus}.`,
      approach: detail?.approach ?? `Built as a ${seed.type.toLowerCase()} project with ${stackLine}, using the implementation to give ${seed.category.toLowerCase()} a focused, usable interface rather than adding interface complexity for its own sake.`,
      contributions: [
        `Designed and implemented the ${seed.title} experience around ${seed.focus}.`,
        `Used ${stackLine} to implement the public project experience.`,
        verified ? `Maintained a public codebase for the project: ${seed.evidence.repositoryName}.` : "Documented the work through the live project and portfolio record.",
      ],
      closing: legacyArchive ? "A college-era project preserved as an archive note. Its original deployment may no longer run reliably, but the project record and available source context remain here for the work itself." : verified ? "A documented portfolio project with a live build and a public repository for technical context." : "A documented portfolio project with a live build; supporting source evidence is not currently public in the connected GitHub account.",
      ...extension,
    },
  };
};

const projects: Project[] = [
  makeProject({ title: "Nutribites", type: "Full stack", category: "Health food commerce", description: "A MERN online food store with sign-in, cart, favourites, order tracking, and an administrative workflow.", stack: ["MERN", "Tailwind", "AOS"], liveUrl: "https://www.nutribites.store/", legacyArchive: true, accent: "green", focus: "the customer journey before and after a purchase", evidence: { label: "Portfolio record" } }),
  makeProject({ title: "Interview Xpert", type: "Full stack", category: "Career preparation", description: "An interview-preparation experience designed to make practice more structured and useful.", stack: ["Next.js", "TypeScript", "React", "Tailwind CSS"], liveUrl: "https://interview-xpert.vercel.app/", accent: "blue", focus: "structured interview practice", coverImage: "/assets/om-case-study-systems_ad415a10.jpg", evidence: { label: "Verified GitHub repository", repositoryName: "interview-xpert", repositoryUrl: "https://github.com/omnandurkar/interview-xpert" } }),
  makeProject({ title: "Tracer", type: "Full stack", category: "Digital journaling", description: "A secure journaling product for capturing thoughts, tracking moods, and reflecting on patterns.", stack: ["Next.js", "React", "Prisma", "Tailwind CSS"], liveUrl: "https://tracer-ai.vercel.app/", legacyArchive: true, accent: "red", focus: "calm capture and later reflection", evidence: { label: "Verified GitHub repository", repositoryName: "Tracer", repositoryUrl: "https://github.com/omnandurkar/Tracer" } }),
  makeProject({ title: "Spizz", type: "Frontend", category: "3D product landing page", description: "A motion-led product story that uses dimensional visuals to make a soda brand feel interactive.", stack: ["Next.js", "React Three Fiber", "Three.js", "GSAP"], liveUrl: "https://spizz.vercel.app/", accent: "yellow", focus: "a dimensional product story", coverImage: "/assets/om-case-study-motion_e3794e30.jpg", evidence: { label: "Verified GitHub repository", repositoryName: "spizz", repositoryUrl: "https://github.com/omnandurkar/spizz" } }),
  makeProject({ title: "LinkShift Notes", type: "Full stack", category: "Notes & links", description: "A focused notes product built to capture useful ideas and keep them readily accessible.", stack: ["Next.js", "Mongoose", "Framer Motion", "Tailwind CSS"], liveUrl: "https://notes.omnandurkar.me/", legacyArchive: true, accent: "blue", focus: "quick capture and accessible recall", coverImage: "/assets/om-case-study-maker_3d83918a.jpg", evidence: { label: "Verified GitHub repository", repositoryName: "auth-framer-notes", repositoryUrl: "https://github.com/omnandurkar/auth-framer-notes" } }),
  makeProject({ title: "Pariksha", type: "Full stack", category: "Examination platform", description: "A student- and admin-facing assessment platform with scheduled exams, a focused exam player, results, management controls, and audit-oriented operational context.", stack: ["Next.js", "React", "Prisma", "NextAuth"], liveUrl: "https://pariksha-nine.vercel.app", accent: "blue", focus: "a calm, accountable assessment journey", evidence: { label: "Verified GitHub repository", repositoryName: "pariksha", repositoryUrl: "https://github.com/omnandurkar/pariksha" } }),
  makeProject({ title: "Easy Tickets", type: "Full stack", category: "Ticketing platform", description: "A product-oriented ticketing experience designed around clear flows and fast access.", stack: ["JavaScript", "Web platform"], liveUrl: "https://easytickets.vercel.app/", accent: "red", focus: "clear ticketing flows and fast access", evidence: { label: "Verified GitHub repository", repositoryName: "EasyTicket", repositoryUrl: "https://github.com/omnandurkar/EasyTicket" } }),
  makeProject({ title: "Cyberfication", type: "Frontend", category: "Creative web", description: "A high-energy experimental frontend experience.", stack: ["JavaScript", "Creative web"], liveUrl: "https://cyberfiction-three.vercel.app/", accent: "yellow", focus: "expressive visual pacing", evidence: { label: "Verified GitHub repository", repositoryName: "CYBERFICTION", repositoryUrl: "https://github.com/omnandurkar/CYBERFICTION" } }),
  makeProject({ title: "Zentry UI", type: "Frontend", category: "Interface study", description: "A visually detailed interface exploration.", stack: ["React", "Tailwind CSS"], liveUrl: "https://zentry-sage.vercel.app/", accent: "green", focus: "a visually precise interface study", evidence: { label: "Verified GitHub repository", repositoryName: "Zentry", repositoryUrl: "https://github.com/omnandurkar/Zentry" } }),
  makeProject({ title: "AI Interview", type: "Full stack", category: "Career preparation", description: "An interview-focused full-stack application.", stack: ["Next.js", "React", "Framer Motion", "Tailwind CSS"], liveUrl: "https://ai-moker.vercel.app/", legacyArchive: true, accent: "blue", focus: "an interview-oriented application flow", evidence: { label: "Verified GitHub repository", repositoryName: "ai-moker", repositoryUrl: "https://github.com/omnandurkar/ai-moker" } }),
  makeProject({ title: "Smart Dustbin", type: "Full stack", category: "Smart utility", description: "A connected utility product concept.", stack: ["JavaScript", "Product concept"], liveUrl: "https://dustbin-ruddy.vercel.app/", accent: "green", focus: "a connected utility concept", evidence: { label: "Verified GitHub repository", repositoryName: "Dustbin", repositoryUrl: "https://github.com/omnandurkar/Dustbin" } }),
  makeProject({ title: "System", type: "Full stack", category: "Gamified productivity", description: "A game-like productivity concept that brings daily tasks, progress tracking, and longer-term progression into one personal system.", stack: ["Next.js", "PostgreSQL", "Prisma", "Framer Motion"], liveUrl: "https://its-mysystem.vercel.app", accent: "red", focus: "the feedback loop between tasks, progress, and motivation", evidence: { label: "Verified GitHub repository", repositoryName: "System", repositoryUrl: "https://github.com/omnandurkar/System" } }),
  makeProject({ title: "XORA", type: "Frontend", category: "SaaS landing page", description: "A conversion-led SaaS landing page.", stack: ["React", "Framer Motion", "Tailwind CSS"], liveUrl: "https://xora-seven.vercel.app/", accent: "red", focus: "a focused SaaS landing experience", evidence: { label: "Verified GitHub repository", repositoryName: "xora", repositoryUrl: "https://github.com/omnandurkar/xora" } }),
  makeProject({ title: "One8sports", type: "Frontend", category: "Sports commerce", description: "A sports-focused frontend site.", stack: ["Next.js", "React Three Fiber", "Three.js", "Framer Motion"], liveUrl: "https://www.one8sport.in/", accent: "yellow", focus: "sports-oriented product presentation", evidence: { label: "Verified GitHub repository", repositoryName: "one8sport.in", repositoryUrl: "https://github.com/omnandurkar/one8sport.in" } }),
  makeProject({ title: "Clever Books", type: "Frontend", category: "Finance product", description: "A frontend project for a finance-focused platform.", stack: ["React", "GSAP", "Framer Motion", "Tailwind CSS"], liveUrl: "https://clever-books-omega.vercel.app/", accent: "blue", focus: "a finance-product interface", evidence: { label: "Verified GitHub repository", repositoryName: "CleverBooks", repositoryUrl: "https://github.com/omnandurkar/CleverBooks" } }),
  makeProject({ title: "Coffee Shop", type: "Frontend", category: "Hospitality", description: "A warm, visual café landing page.", stack: ["React"], liveUrl: "https://coffee-shop17.vercel.app/", accent: "red", focus: "a warm hospitality first impression", evidence: { label: "Verified GitHub repository", repositoryName: "Coffee-Shop", repositoryUrl: "https://github.com/omnandurkar/Coffee-Shop" } }),
  makeProject({ title: "Doraemon Gadget Store", type: "Frontend", category: "Commerce", description: "A playful gadget-store user interface.", stack: ["HTML", "CSS", "JavaScript"], liveUrl: "https://doraemon-gadget-store.netlify.app/", accent: "yellow", focus: "a playful commerce presentation", evidence: { label: "Verified GitHub repository", repositoryName: "Gadget-Store", repositoryUrl: "https://github.com/omnandurkar/Gadget-Store" } }),
  makeProject({ title: "FoodoBar", type: "Frontend", category: "Food", description: "A food-focused frontend interface.", stack: ["HTML", "CSS", "JavaScript"], liveUrl: "https://foodobar.netlify.app/", accent: "green", focus: "a food-first browsing experience", evidence: { label: "Verified GitHub repository", repositoryName: "FoodoBAR", repositoryUrl: "https://github.com/omnandurkar/FoodoBAR" } }),
  makeProject({ title: "Party Planners", type: "Frontend", category: "Events", description: "An events and planning showcase.", stack: ["HTML", "CSS", "JavaScript"], liveUrl: "https://party-planners.netlify.app/", accent: "red", focus: "event-planning presentation", evidence: { label: "Verified GitHub repository", repositoryName: "Party-Planners", repositoryUrl: "https://github.com/omnandurkar/Party-Planners" } }),
  makeProject({ title: "User Management CRUD", type: "Full stack", category: "Admin", description: "A user-management application with CRUD workflows.", stack: ["Next.js", "Mongoose", "Framer Motion", "Tailwind CSS"], liveUrl: "https://next-auth-alpha-rose.vercel.app/", accent: "blue", focus: "practical user-management workflows", evidence: { label: "Verified GitHub repository", repositoryName: "next-user-management", repositoryUrl: "https://github.com/omnandurkar/next-user-management" } }),
  makeProject({ title: "Recipe API App", type: "Full stack", category: "Food", description: "A recipe discovery app powered by an API.", stack: ["Next.js", "React", "Tailwind CSS"], liveUrl: "https://omrecipeapp.vercel.app/", accent: "yellow", focus: "recipe discovery through a public application interface", evidence: { label: "Verified GitHub repository", repositoryName: "next-recipe-app", repositoryUrl: "https://github.com/omnandurkar/next-recipe-app" } }),
  makeProject({ title: "MacBook Three JS", type: "Frontend", category: "3D", description: "An exploratory product scene in Three.js.", stack: ["React", "React Three Fiber", "Three.js", "Framer Motion"], liveUrl: "https://mac-three-js.vercel.app/", accent: "green", focus: "an exploratory 3D product scene", evidence: { label: "Verified GitHub repository", repositoryName: "MacThreeJs", repositoryUrl: "https://github.com/omnandurkar/MacThreeJs" } }),
  makeProject({ title: "Framer Notes", type: "Full stack", category: "Notes", description: "A motion-forward notes application.", stack: ["Next.js", "Mongoose", "Framer Motion", "Tailwind CSS"], liveUrl: "https://next-framer-notes.vercel.app/", accent: "red", focus: "notes captured through a motion-aware interface", evidence: { label: "Verified GitHub repository", repositoryName: "next-framer-notes", repositoryUrl: "https://github.com/omnandurkar/next-framer-notes" } }),
  makeProject({ title: "ChartJS Dashboard", type: "Full stack", category: "Analytics", description: "A dashboard focused on clear data display.", stack: ["React", "Chart.js", "Tailwind CSS"], liveUrl: "https://dashboard-two-iota-97.vercel.app/", accent: "blue", focus: "legible data display", evidence: { label: "Verified GitHub repository", repositoryName: "ChartJs", repositoryUrl: "https://github.com/omnandurkar/ChartJs" } }),
  makeProject({ title: "Road To Code", type: "Full stack", category: "Education", description: "A learning-oriented full-stack project.", stack: ["MERN", "UI"], liveUrl: "https://road-to-code.vercel.app/", accent: "yellow", focus: "a learning-oriented product experience", evidence: { label: "Portfolio record" } }),
  makeProject({ title: "ShopVista", type: "Frontend", category: "Editorial commerce concept", description: "An editorial e-commerce concept that makes product discovery feel like browsing a design catalogue.", stack: ["React 19", "TypeScript", "GSAP", "Framer Motion"], liveUrl: "https://shop-vista-sage.vercel.app/", accent: "blue", focus: "curated discovery and a clear simulated commerce journey", role: "Product + visual design · frontend build", coverImage: "/assets/shopvista-editorial-thumbnail_11acdcc0.png", evidence: { label: "Verified GitHub repository", repositoryName: "ShopVista", repositoryUrl: "https://github.com/omnandurkar/ShopVista" } }),
  makeProject({ title: "The Last Seed — Story Atlas", type: "Frontend", category: "Interactive storytelling", description: "A ten-world speculative-fiction anthology built as a cinematic, scroll-driven story archive.", stack: ["React 19", "Three.js", "GSAP", "Lenis"], liveUrl: "https://the-last-seed-tau.vercel.app/", accent: "red", focus: "original narratives revealed through interaction and visual systems", role: "Creative frontend · experience design", coverImage: "/assets/the-last-seed-editorial-thumbnail_f60e80d1.png", evidence: { label: "Verified GitHub repository", repositoryName: "the-last-seed", repositoryUrl: "https://github.com/omnandurkar/the-last-seed" } }),
  makeProject({ title: "Move Into Order", type: "Frontend", category: "Moving companion prototype", description: "A room-first moving companion that turns fragmented logistics into a calm, visible journey.", stack: ["React 19", "TypeScript", "Three.js", "GSAP"], liveUrl: "https://move-into-order.vercel.app/", accent: "yellow", focus: "room-based planning from packing to the first settled week", role: "Product strategy · UX/UI · frontend build", coverImage: "/assets/move-into-order-editorial-thumbnail_7c5c153e.png", evidence: { label: "Verified GitHub repository", repositoryName: "move-into-order", repositoryUrl: "https://github.com/omnandurkar/move-into-order" } }),
  makeProject({ title: "Laocoön — Bronze & Time", type: "Frontend", category: "3D editorial art study", description: "A scroll-driven digital sculpture study that turns a bronze horse into an editorial experience.", stack: ["Three.js", "WebGL", "GLSL", "JavaScript"], liveUrl: "https://laocoon-bronze-silk.vercel.app/", accent: "green", focus: "material memory through a slow scroll-driven camera", role: "Art direction · 3D web · frontend build", coverImage: "/assets/laocoon-bronze-editorial-thumbnail_9add576f.png", evidence: { label: "Verified GitHub repository", repositoryName: "Laocoon-Bronze", repositoryUrl: "https://github.com/omnandurkar/Laocoon-Bronze" } }),
  makeProject({ title: "Theorem of Kemet", type: "Full stack", category: "Evidence-aware editorial journal", description: "An immersive field journal for ancient Egypt’s unresolved stories, structured around sources and interpretation.", stack: ["React 19", "Express", "tRPC", "Drizzle + MySQL"], liveUrl: "https://theorem-of-om.vercel.app/", accent: "blue", focus: "evidence-aware reading and a protected curator workflow", role: "Editorial product · full-stack build", coverImage: "/assets/theorem-kemet-editorial-thumbnail_365eb9ff.png", evidence: { label: "Verified GitHub repository", repositoryName: "Theorem-of-Om", repositoryUrl: "https://github.com/omnandurkar/Theorem-of-Om" } }),
  makeProject({ title: "Valor", type: "Frontend", category: "Leather goods brand experience", description: "A tactile, scroll-led launch for a purposeful everyday wallet and its material story.", stack: ["React", "TypeScript", "GSAP", "Framer Motion"], liveUrl: "https://thevalor.vercel.app/", accent: "red", focus: "the Field Pull wallet’s pull-tab, carry, care, and Batch 01 story", role: "Website design · frontend development", coverImage: "/assets/valor-editorial-thumbnail_45928ddf.png", evidence: { label: "Verified GitHub repository", repositoryName: "Valor", repositoryUrl: "https://github.com/omnandurkar/Valor" } }),
];

// Current portfolio priority: lead with the six newest evidence-led case studies,
// preserve all other active work in its original sequence, and keep college-era work last.
const currentProjectPriority = [
  "ShopVista",
  "The Last Seed — Story Atlas",
  "Move Into Order",
  "Laocoön — Bronze & Time",
  "Theorem of Kemet",
  "Valor",
];

const priorityIndexFor = (project: Project) => {
  const index = currentProjectPriority.indexOf(project.title);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
};

const currentProjects = projects
  .filter((project) => !project.legacyArchive)
  .sort((left, right) => priorityIndexFor(left) - priorityIndexFor(right));

const legacyProjects = projects.filter((project) => project.legacyArchive);

export const featuredProjects = currentProjects.slice(0, 6);
export const archiveProjects = [...currentProjects, ...legacyProjects];

export const experiences = [
  { company: "Stoic & Salamander Global Corporation", role: "Software Developer Apprentice", period: "Jul 2024 — Nov 2024", notes: ["Built internal tools for notes, expenses, invoices, and payslips.", "Contributed to responsive frontend projects and mentored junior developers."] },
  { company: "Road To Code", role: "Tech Assistance Intern", period: "Dec 2023 — Feb 2024", notes: ["Taught computer-science students the fundamentals of web development.", "Contributed documentation and code to the open-source Spaceship project."] },
];

export const profile = {
  email: "nandurkarom172@gmail.com",
  resumeUrl: "https://drive.google.com/file/d/1Ly0l0SSPd7Lc2tOXOtwi06-jUB5THFUH/view?usp=sharing",
  social: [
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
    { label: "GitHub", url: "https://github.com/omnandurkar" },
    { label: "Peerlist", url: "https://peerlist.io/" },
    { label: "WhatsApp", url: "https://wa.me/" },
  ],
};
