// Split-Screen Studio: The atlas exposes useful keyboard routes and occasional discoveries without turning the portfolio into a game or obscuring its core content.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpen, Command, Eye, FolderOpen, Gamepad2, Lightbulb, Map, MoonStar, Sparkles, SunMoon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command";
import { usePortfolioMode } from "@/contexts/ModeContext";
import "./InteractionAtlas.css";
import "./InteractionAtlasPlaybook.css";

type AtlasAction = "palette" | "mode" | "focus" | "work" | "story" | "guide" | "home" | "blueprint" | "graph" | "gravity";

const isTypingTarget = (target: EventTarget | null) => target instanceof HTMLElement && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable);

export default function InteractionAtlas() {
  const { mode, toggleMode } = usePortfolioMode();
  const [, setLocation] = useLocation();
  const reducedMotion = useReducedMotion();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [focusActive, setFocusActive] = useState(false);
  const [constellationActive, setConstellationActive] = useState(false);
  const [orbitActive, setOrbitActive] = useState(false);
  const [blueprintActive, setBlueprintActive] = useState(false);
  const [terminalCard, setTerminalCard] = useState<"ship" | "build" | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const sequence = useRef("");
  const konami = useRef<string[]>([]);
  const holdTimer = useRef<number | null>(null);
  const lateCommit = new Date().getHours() >= 22 || new Date().getHours() < 5;

  const runAction = useCallback((action: AtlasAction) => {
    setPaletteOpen(false);
    if (action === "palette") { setPaletteOpen(true); setAnnouncement("Command deck opened"); return; }
    if (action === "mode") { toggleMode(); setAnnouncement(`Changing to ${mode === "studio" ? "Maker" : "Studio"} mode`); return; }
    if (action === "focus") { setFocusActive((active) => !active); setAnnouncement(focusActive ? "Signal focus released" : "Signal focus active. Press Shift L to release."); return; }
    if (action === "work") { setLocation("/"); window.setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }), 90); setAnnouncement("Selected work opened"); return; }
    if (action === "story") { setLocation("/story"); setAnnouncement("Story mode opened"); return; }
    if (action === "guide") { setLocation("/field-guide"); setAnnouncement("Interaction field guide opened"); return; }
    if (action === "blueprint") { setBlueprintActive(true); setAnnouncement("Blueprint lens active. Press Escape to close."); return; }
    if (action === "graph") { setLocation("/"); window.setTimeout(() => window.dispatchEvent(new CustomEvent("om:egg", { detail: "build-graph" })), 90); setAnnouncement("Project constellation opened"); return; }
    if (action === "gravity") { const releaseGravity = () => window.dispatchEvent(new CustomEvent("om:egg", { detail: "gravity" })); if (window.location.pathname !== "/") { setLocation("/"); window.setTimeout(releaseGravity, 180); } else releaseGravity(); setAnnouncement(reducedMotion ? "Gravity signal acknowledged. Motion is reduced." : "Gravity signal active. Decorative materials return automatically; Escape resets now."); return; }
    setLocation("/"); setAnnouncement("Home opened");
  }, [focusActive, mode, reducedMotion, setLocation, toggleMode]);

  useEffect(() => {
    const runCustomCommand = (event: Event) => runAction((event as CustomEvent<AtlasAction>).detail);
    const revealOrbit = () => { setOrbitActive(true); setAnnouncement("OM orbit signal found"); };
    window.addEventListener("om:run-command", runCustomCommand);
    window.addEventListener("om:orbit", revealOrbit);
    return () => { window.removeEventListener("om:run-command", runCustomCommand); window.removeEventListener("om:orbit", revealOrbit); };
  }, [runAction]);

  useEffect(() => { console.info("OM / Console whisper — the best little details never block the path. Open /field-guide when you are curious."); }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (paletteOpen) setPaletteOpen(false);
        if (focusActive) setFocusActive(false);
        if (constellationActive) setConstellationActive(false);
        if (blueprintActive) setBlueprintActive(false);
        if (terminalCard) setTerminalCard(null);
        window.dispatchEvent(new CustomEvent("om:egg", { detail: "gravity-reset" }));
        return;
      }
      if (isTypingTarget(event.target)) return;
      const key = event.key.toLowerCase();
      if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey && key === "b" && holdTimer.current === null) {
        holdTimer.current = window.setTimeout(() => { runAction("graph"); holdTimer.current = null; }, 700);
      }
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", "b", "a"].includes(key)) {
        konami.current = [...konami.current, key].slice(-10);
        if (konami.current.join("|") === "arrowup|arrowup|arrowdown|arrowdown|arrowleft|arrowright|arrowleft|arrowright|b|a") {
          setBlueprintActive(true); setAnnouncement("Blueprint lens found"); konami.current = [];
        }
      }
      if ((event.metaKey || event.ctrlKey) && key === "k") { event.preventDefault(); runAction("palette"); return; }
      if (event.key === "?") { event.preventDefault(); runAction("palette"); return; }
      if (event.shiftKey && key === "l") { event.preventDefault(); runAction("focus"); return; }
      if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey && key.length === 1 && /[a-z]/.test(key)) {
        sequence.current = `${sequence.current}${key}`.slice(-9);
        if (sequence.current.endsWith("build")) { setConstellationActive(true); setAnnouncement("Build constellation found"); sequence.current = ""; return; }
        if (sequence.current.endsWith("mumbai")) { window.dispatchEvent(new CustomEvent("om:egg", { detail: "mumbai" })); setAnnouncement("Mumbai monsoon found"); sequence.current = ""; return; }
        if (sequence.current.endsWith("chai")) { window.dispatchEvent(new CustomEvent("om:egg", { detail: "chai" })); setAnnouncement("Chai break found"); sequence.current = ""; return; }
        if (sequence.current.endsWith("shipit")) { setTerminalCard("ship"); setAnnouncement("Ship it terminal found"); sequence.current = ""; return; }
        if (sequence.current.endsWith("npmrunom")) { setTerminalCard("build"); setAnnouncement("Portfolio build command found"); sequence.current = ""; return; }
        if (key === "m") { event.preventDefault(); runAction("mode"); return; }
        if (key === "p") { event.preventDefault(); runAction("work"); return; }
        if (key === "s") { event.preventDefault(); runAction("story"); return; }
        if (key === "g") { event.preventDefault(); runAction("guide"); return; }
      }
    };
    const handleKeyup = (event: KeyboardEvent) => { if (event.key.toLowerCase() === "b" && holdTimer.current !== null) { window.clearTimeout(holdTimer.current); holdTimer.current = null; } };
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);
    return () => { window.removeEventListener("keydown", handleKeydown); window.removeEventListener("keyup", handleKeyup); };
  }, [blueprintActive, constellationActive, focusActive, paletteOpen, runAction, terminalCard]);

  useEffect(() => { if (!constellationActive) return; const timer = window.setTimeout(() => setConstellationActive(false), reducedMotion ? 1800 : 4200); return () => window.clearTimeout(timer); }, [constellationActive, reducedMotion]);
  useEffect(() => { if (!orbitActive) return; const timer = window.setTimeout(() => setOrbitActive(false), reducedMotion ? 600 : 1800); return () => window.clearTimeout(timer); }, [orbitActive, reducedMotion]);

  return <div className="interaction-atlas">
    <span className="atlas-live-region" aria-live="polite">{announcement}</span>
    <AnimatePresence>
      {focusActive && <motion.div className="atlas-focus" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0.01 : 0.22 }} aria-hidden="true"><div className="atlas-focus-core" /><span>Signal focus / Shift L to release</span></motion.div>}
      {constellationActive && <motion.div className="atlas-constellation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0.01 : 0.25 }} aria-hidden="true"><svg viewBox="0 0 1440 800" preserveAspectRatio="none"><path d="M0 560 L210 370 L430 470 L655 245 L875 435 L1125 210 L1440 370" /><circle cx="210" cy="370" r="6" /><circle cx="430" cy="470" r="6" /><circle cx="655" cy="245" r="8" /><circle cx="875" cy="435" r="6" /><circle cx="1125" cy="210" r="8" /></svg><div><b>BUILD / constellation</b><span>Ship the first useful version.</span></div></motion.div>}
      {orbitActive && <motion.div className="atlas-orbit" initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: reducedMotion ? 0.01 : 0.25 }} aria-hidden="true"><i /><i /><b>OM</b><span>signal found</span></motion.div>}
      {blueprintActive && <motion.div className="atlas-blueprint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0.01 : 0.2 }} role="dialog" aria-label="Blueprint lens"><button type="button" onClick={() => setBlueprintActive(false)}>Close lens / Esc</button><div><span>Blueprint lens / portfolio routes</span><b>Every page is a system,<br />not a trap.</b><p>Home → Proof → Story → Guide</p></div></motion.div>}
      {terminalCard && <motion.div className="atlas-terminal-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: reducedMotion ? 0.01 : 0.2 }} role="status"><button type="button" onClick={() => setTerminalCard(null)} aria-label="Close terminal card">×</button><span>{terminalCard === "ship" ? "shipit" : "npm run om"}</span><b>{terminalCard === "ship" ? "useful beats finished." : "portfolio compiled with curiosity."}</b><p>{terminalCard === "ship" ? "The next small useful version is usually the right one." : "Home, work, Story Mode, and the Field Guide are all online."}</p></motion.div>}
      {lateCommit && <div className="atlas-late-commit" aria-hidden="true"><MoonStar size={12} /> late-night commit / quiet focus</div>}
    </AnimatePresence>
    <CommandDialog open={paletteOpen} onOpenChange={setPaletteOpen} title="Om’s command deck" description="Search portfolio routes and interaction controls" className="atlas-command-dialog">
      <div className="atlas-command-top"><span>OM / COMMAND DECK</span><b>{mode === "studio" ? "STUDIO" : "MAKER"}</b></div>
      <CommandInput placeholder="Find a route or type a visual signal…" />
      <CommandList><CommandEmpty>No route in this atlas.</CommandEmpty>
        <CommandGroup heading="Navigate"><CommandItem value="home portfolio" onSelect={() => runAction("home")}><Map size={15} /> Home <CommandShortcut>H</CommandShortcut></CommandItem><CommandItem value="selected work projects proof" onSelect={() => runAction("work")}><FolderOpen size={15} /> Selected work <CommandShortcut>P</CommandShortcut></CommandItem><CommandItem value="story retro life log" onSelect={() => runAction("story")}><Gamepad2 size={15} /> Story mode <CommandShortcut>S</CommandShortcut></CommandItem><CommandItem value="field guide creative choices" onSelect={() => runAction("guide")}><BookOpen size={15} /> Interaction field guide <CommandShortcut>G</CommandShortcut></CommandItem></CommandGroup>
        <CommandGroup heading="Change the room"><CommandItem value="switch mode studio maker material" onSelect={() => runAction("mode")}><SunMoon size={15} /> Switch Studio / Maker <CommandShortcut>M</CommandShortcut></CommandItem><CommandItem value="signal focus lights blur highlight" onSelect={() => runAction("focus")}><Eye size={15} /> Signal focus <CommandShortcut>⇧ L</CommandShortcut></CommandItem><CommandItem value="gravity fall materials restore scene visual signal" onSelect={() => runAction("gravity")}><Sparkles size={15} /> Gravity / fall the materials <CommandShortcut>Enter</CommandShortcut></CommandItem><CommandItem value="blueprint lens konami map" onSelect={() => runAction("blueprint")}><Map size={15} /> Blueprint lens <CommandShortcut>↑↑↓↓←→←→BA</CommandShortcut></CommandItem><CommandItem value="project constellation hold b build graph" onSelect={() => runAction("graph")}><Sparkles size={15} /> Project constellation <CommandShortcut>Hold B</CommandShortcut></CommandItem><CommandItem value="show keyboard shortcuts help command deck" onSelect={() => runAction("palette")}><Command size={15} /> Keep exploring <CommandShortcut>⌘ K</CommandShortcut></CommandItem></CommandGroup>
      </CommandList>
      <div className="atlas-command-footer"><span><MoonStar size={13} /> Esc resets a signal</span><span><Lightbulb size={13} /> Try typing GRAVITY</span></div>
    </CommandDialog>
  </div>;
}
