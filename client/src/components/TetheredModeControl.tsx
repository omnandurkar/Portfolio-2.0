// Split-Screen Studio: The original compact Studio–Maker pill remains visually familiar while a fixed shell keeps it reachable on every route.
// Split-Screen Studio: This fixed control turns the first-visit dual-mode note into a brief focused handoff; the page recedes while the real material switch remains actionable.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Grid2X2, Keyboard, PencilLine, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { usePortfolioMode } from "@/contexts/ModeContext";
import "./TetheredModeControl.css";
import "./ModeDrag.css";

const MODE_GUIDE_COOLDOWN_KEY = "om-mode-guide-cooldown-until";
const MODE_GUIDE_COOLDOWN_MS = 2 * 60 * 1000;

export default function TetheredModeControl() {
  const { mode, toggleMode } = usePortfolioMode();
  const [location] = useLocation();
  const reducedMotion = useReducedMotion();
  const isStudio = mode === "studio";
  const isHome = location === "/";
  const [dragging, setDragging] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [shortcutUsed, setShortcutUsed] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const switchedByDrag = useRef(false);

  const armGuideCooldown = () => {
    window.localStorage.setItem(MODE_GUIDE_COOLDOWN_KEY, String(Date.now() + MODE_GUIDE_COOLDOWN_MS));
  };

  const dismissGuide = () => {
    armGuideCooldown();
    setGuideOpen(false);
  };

  useEffect(() => {
    if (!isHome) {
      setGuideOpen(false);
      return;
    }

    const cooldownUntil = Number(window.localStorage.getItem(MODE_GUIDE_COOLDOWN_KEY) || "0");
    if (cooldownUntil > Date.now()) return;

    armGuideCooldown();
    setGuideOpen(true);
  }, [isHome]);

  useEffect(() => {
    const noteShortcut = (event: KeyboardEvent) => {
      const target = event.target;
      const typing = target instanceof HTMLElement && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable);
      if (!typing && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.key.toLowerCase() === "m") {
        setShortcutUsed(true);
        dismissGuide();
      }
    };
    window.addEventListener("keydown", noteShortcut);
    return () => window.removeEventListener("keydown", noteShortcut);
  }, []);

  const beginDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    pointerStart.current = event.clientX;
    switchedByDrag.current = false;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const finishDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    const distance = pointerStart.current === null ? 0 : event.clientX - pointerStart.current;
    pointerStart.current = null;
    setDragging(false);
    if (Math.abs(distance) >= 38) {
      switchedByDrag.current = true;
      toggleMode();
      dismissGuide();
    }
  };
  const clickMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (switchedByDrag.current) { event.preventDefault(); switchedByDrag.current = false; return; }
    toggleMode();
    dismissGuide();
  };

  const showGuide = isHome && guideOpen;

  return <div className={showGuide ? "tethered-mode-control mode-onboarding-active" : "tethered-mode-control"}>
    <AnimatePresence>
      {showGuide && <motion.div
        className={`mode-onboarding-scrim mode-onboarding-scrim-${mode}`}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.2, ease: [0.23, 1, 0.32, 1] }}
      />}
    </AnimatePresence>
    <button className={dragging ? "mode-toggle is-material-dragging" : "mode-toggle"} onClick={clickMode} onPointerDown={beginDrag} onPointerUp={finishDrag} onPointerCancel={() => setDragging(false)} type="button" aria-label={`Switch to ${isStudio ? "Maker" : "Studio"} mode`} aria-description="Click to switch materials or drag horizontally to hand off the material." aria-pressed={!isStudio}>
      <motion.span
        className="mode-toggle-icon"
        animate={{ rotate: isStudio ? 0 : -10, scale: isStudio ? 1 : 1.07 }}
        transition={{ type: "spring", stiffness: 420, damping: 20 }}
      >
        {isStudio ? <Grid2X2 aria-hidden="true" size={14} /> : <PencilLine aria-hidden="true" size={15} />}
      </motion.span>
      <span className="mode-toggle-copy">
        <b>{isStudio ? "Maker mode" : "Studio mode"}</b>
        <small>{isStudio ? "ink & paper" : "focus & form"}</small>
      </span>
      <span className="mode-toggle-track" aria-hidden="true"><i /></span>
    </button>
    <AnimatePresence>
      {showGuide && <motion.aside
        className={`mode-intro-guide mode-intro-guide-${mode}`}
        aria-label="A quick guide to the portfolio's two modes"
        initial={{ opacity: 0, y: reducedMotion ? 0 : -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reducedMotion ? 0 : -6, scale: 0.98 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.22, ease: [0.23, 1, 0.32, 1] }}
      >
        <button className="mode-intro-guide-close" type="button" onClick={dismissGuide} aria-label="Dismiss the two-mode guide"><X size={15} /></button>
        <p className="mode-intro-guide-label">QUICK ORIENTATION <i /></p>
        <strong>Two ways to read this portfolio.</strong>
        <p className="mode-intro-guide-copy"><b>Studio</b> is focused and precise. <b>Maker</b> is tactile, playful, and assembled by hand.</p>
        <p className="mode-intro-guide-shortcut"><Keyboard size={15} /><span>{shortcutUsed ? <>Nice — you are now in <b>{isStudio ? "Studio" : "Maker"}</b> mode.</> : <>On a laptop, press <kbd>M</kbd> to switch instantly.</>}</span></p>
        <p className="mode-intro-guide-touch">On touch, tap or drag the control above to switch.</p>
        <button className="mode-intro-guide-dismiss" type="button" onClick={dismissGuide}>Got it <span>→</span></button>
      </motion.aside>}
    </AnimatePresence>
  </div>;
}
