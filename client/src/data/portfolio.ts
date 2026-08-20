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
  };
};

type Seed = Omit<Project, "slug" | "role" | "proof" | "caseStudy">;

const slugify = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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
};

const makeProject = (seed: Seed): Project => {
  const verified = seed.evidence.label === "Verified GitHub repository";
  const stackLine = seed.stack.slice(0, 4).join(", ");
  const headings = projectVoice[seed.title] ?? { opportunity: `${seed.title}, seen through a product lens.`, build: "A focused build path.", contribution: "The work, made tangible." };
  const detail = projectDetail[seed.title];
  return {
    ...seed,
    slug: slugify(seed.title),
    role: `${seed.type} build`,
    proof: verified ? "Public deployment and verified source repository" : "Public deployment and portfolio record",
    caseStudy: {
      headings,
      brief: detail?.brief ?? `${seed.description} Its main product focus is ${seed.focus}.`,
      approach: detail?.approach ?? `Built as a ${seed.type.toLowerCase()} project with ${stackLine}, using the implementation to give ${seed.category.toLowerCase()} a focused, usable interface rather than adding interface complexity for its own sake.`,
      contributions: [
        `Designed and implemented the ${seed.title} experience around ${seed.focus}.`,
        `Used ${stackLine} to implement the public project experience.`,
        verified ? `Maintained a public codebase for the project: ${seed.evidence.repositoryName}.` : "Documented the work through the live project and portfolio record.",
      ],
      closing: verified ? "A documented portfolio project with a live build and a public repository for technical context." : "A documented portfolio project with a live build; supporting source evidence is not currently public in the connected GitHub account.",
    },
  };
};

const projects: Project[] = [
  makeProject({ title: "Nutribites", type: "Full stack", category: "Health food commerce", description: "A MERN online food store with sign-in, cart, favourites, order tracking, and an administrative workflow.", stack: ["MERN", "Tailwind", "AOS"], liveUrl: "https://www.nutribites.store/", accent: "green", focus: "the customer journey before and after a purchase", evidence: { label: "Portfolio record" } }),
  makeProject({ title: "Interview Xpert", type: "Full stack", category: "Career preparation", description: "An interview-preparation experience designed to make practice more structured and useful.", stack: ["Next.js", "TypeScript", "React", "Tailwind CSS"], liveUrl: "https://interview-xpert.vercel.app/", accent: "blue", focus: "structured interview practice", coverImage: "/assets/om-case-study-systems_ad415a10.jpg", evidence: { label: "Verified GitHub repository", repositoryName: "interview-xpert", repositoryUrl: "https://github.com/omnandurkar/interview-xpert" } }),
  makeProject({ title: "Tracer", type: "Full stack", category: "Digital journaling", description: "A secure journaling product for capturing thoughts, tracking moods, and reflecting on patterns.", stack: ["Next.js", "React", "Prisma", "Tailwind CSS"], liveUrl: "https://tracer-ai.vercel.app/", accent: "red", focus: "calm capture and later reflection", evidence: { label: "Verified GitHub repository", repositoryName: "Tracer", repositoryUrl: "https://github.com/omnandurkar/Tracer" } }),
  makeProject({ title: "Spizz", type: "Frontend", category: "3D product landing page", description: "A motion-led product story that uses dimensional visuals to make a soda brand feel interactive.", stack: ["Next.js", "React Three Fiber", "Three.js", "GSAP"], liveUrl: "https://spizz.vercel.app/", accent: "yellow", focus: "a dimensional product story", coverImage: "/assets/om-case-study-motion_e3794e30.jpg", evidence: { label: "Verified GitHub repository", repositoryName: "spizz", repositoryUrl: "https://github.com/omnandurkar/spizz" } }),
  makeProject({ title: "LinkShift Notes", type: "Full stack", category: "Notes & links", description: "A focused notes product built to capture useful ideas and keep them readily accessible.", stack: ["Next.js", "Mongoose", "Framer Motion", "Tailwind CSS"], liveUrl: "https://notes.omnandurkar.me/", accent: "blue", focus: "quick capture and accessible recall", coverImage: "/assets/om-case-study-maker_3d83918a.jpg", evidence: { label: "Verified GitHub repository", repositoryName: "auth-framer-notes", repositoryUrl: "https://github.com/omnandurkar/auth-framer-notes" } }),
  makeProject({ title: "Pariksha", type: "Full stack", category: "Examination platform", description: "A student- and admin-facing assessment platform with scheduled exams, a focused exam player, results, management controls, and audit-oriented operational context.", stack: ["Next.js", "React", "Prisma", "NextAuth"], liveUrl: "https://pariksha-nine.vercel.app", accent: "blue", focus: "a calm, accountable assessment journey", evidence: { label: "Verified GitHub repository", repositoryName: "pariksha", repositoryUrl: "https://github.com/omnandurkar/pariksha" } }),
  makeProject({ title: "Easy Tickets", type: "Full stack", category: "Ticketing platform", description: "A product-oriented ticketing experience designed around clear flows and fast access.", stack: ["JavaScript", "Web platform"], liveUrl: "https://easytickets.vercel.app/", accent: "red", focus: "clear ticketing flows and fast access", evidence: { label: "Verified GitHub repository", repositoryName: "EasyTicket", repositoryUrl: "https://github.com/omnandurkar/EasyTicket" } }),
  makeProject({ title: "Cyberfication", type: "Frontend", category: "Creative web", description: "A high-energy experimental frontend experience.", stack: ["JavaScript", "Creative web"], liveUrl: "https://cyberfiction-three.vercel.app/", accent: "yellow", focus: "expressive visual pacing", evidence: { label: "Verified GitHub repository", repositoryName: "CYBERFICTION", repositoryUrl: "https://github.com/omnandurkar/CYBERFICTION" } }),
  makeProject({ title: "Zentry UI", type: "Frontend", category: "Interface study", description: "A visually detailed interface exploration.", stack: ["React", "Tailwind CSS"], liveUrl: "https://zentry-sage.vercel.app/", accent: "green", focus: "a visually precise interface study", evidence: { label: "Verified GitHub repository", repositoryName: "Zentry", repositoryUrl: "https://github.com/omnandurkar/Zentry" } }),
  makeProject({ title: "AI Interview", type: "Full stack", category: "Career preparation", description: "An interview-focused full-stack application.", stack: ["Next.js", "React", "Framer Motion", "Tailwind CSS"], liveUrl: "https://ai-moker.vercel.app/", accent: "blue", focus: "an interview-oriented application flow", evidence: { label: "Verified GitHub repository", repositoryName: "ai-moker", repositoryUrl: "https://github.com/omnandurkar/ai-moker" } }),
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
];

export const featuredProjects = projects.slice(0, 6);
export const archiveProjects = projects;

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
