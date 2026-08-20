// Split-Screen Studio: Theme state controls two intentional visual languages; the handoff is a brief material signal, not a blocking screen transition.
import { useReducedMotion } from "framer-motion";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import "./ModeHandoff.css";

export type PortfolioMode = "studio" | "scrapbook";

type ModeContextValue = {
  mode: PortfolioMode;
  toggleMode: () => void;
};

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const reducedMotion = useReducedMotion();
  const [mode, setMode] = useState<PortfolioMode>(() => {
    const requestedMode = new URLSearchParams(window.location.search).get("mode");
    const saved = localStorage.getItem("om-portfolio-mode");
    return requestedMode === "scrapbook" || (!requestedMode && saved === "scrapbook") ? "scrapbook" : "studio";
  });
  const modeRef = useRef(mode);
  const timeoutRef = useRef<number | undefined>(undefined);
  const [handoff, setHandoff] = useState<{ id: number; from: PortfolioMode; to: PortfolioMode } | null>(null);

  useEffect(() => {
    modeRef.current = mode;
    document.documentElement.dataset.portfolioMode = mode;
    localStorage.setItem("om-portfolio-mode", mode);
  }, [mode]);

  useEffect(() => () => { if (timeoutRef.current) window.clearTimeout(timeoutRef.current); }, []);

  useEffect(() => {
    const requestedMode = new URLSearchParams(window.location.search).get("mode");
    if (requestedMode === "studio" || requestedMode === "scrapbook") setMode(requestedMode);
  }, [location]);

  const toggleMode = () => {
    const from = modeRef.current;
    const to = from === "studio" ? "scrapbook" : "studio";
    modeRef.current = to;
    setMode(to);
    if (reducedMotion) return;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    const id = Date.now();
    setHandoff({ id, from, to });
    timeoutRef.current = window.setTimeout(() => setHandoff((current) => current?.id === id ? null : current), 570);
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      <div className={`portfolio-root mode-${mode}`}>
        {handoff && <div key={handoff.id} className={`mode-handoff mode-handoff-${handoff.from}-to-${handoff.to}`} aria-hidden="true"><span className="mode-handoff-echo mode-handoff-echo-one" /><span className="mode-handoff-echo mode-handoff-echo-two" /><span className="mode-handoff-surface" /><span className="mode-handoff-beam" /><span className="mode-handoff-caption">{handoff.from === "studio" ? "precision → play" : "play → precision"}</span></div>}
        {children}
      </div>
    </ModeContext.Provider>
  );
}

export function usePortfolioMode() {
  const context = useContext(ModeContext);
  if (!context) throw new Error("usePortfolioMode must be used inside ModeProvider");
  return context;
}
