// Split-Screen Studio: this one-time opening handoff lets the black signal field and tactile paper desk meet at a precise centre seam.
import { useEffect, useState } from "react";
import "./HomeLoadHandoff.css";

const initialNavigation = typeof window !== "undefined" ? window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined : undefined;
const enteredAtHome = typeof window !== "undefined" && window.location.pathname === "/" && initialNavigation?.type === "reload";
let homeHandoffConsumed = false;

export default function HomeLoadHandoff() {
  const [isVisible, setIsVisible] = useState(() => enteredAtHome && !homeHandoffConsumed);
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    homeHandoffConsumed = true;
    if (!isVisible) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const useReducedMotion = preference.matches;
    setReducedMotion(useReducedMotion);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => setIsVisible(false), useReducedMotion ? 700 : 3000);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <section className={`home-load-handoff ${reducedMotion ? "is-reduced" : ""}`} role="status" aria-live="polite" aria-label="Opening Om Nandurkar’s portfolio">
      <div className="home-load-handoff__studio-field" aria-hidden="true">
        <span className="home-load-handoff__grid" />
        <span className="home-load-handoff__orbit home-load-handoff__orbit--one" />
        <span className="home-load-handoff__orbit home-load-handoff__orbit--two" />
        <span className="home-load-handoff__signal">01</span>
      </div>
      <div className="home-load-handoff__maker-field" aria-hidden="true">
        <span className="home-load-handoff__paper-line home-load-handoff__paper-line--one" />
        <span className="home-load-handoff__paper-line home-load-handoff__paper-line--two" />
        <span className="home-load-handoff__tape" />
        <span className="home-load-handoff__pencil-mark">made / by hand</span>
      </div>

      <div className="home-load-handoff__seam" aria-hidden="true"><i /></div>
      <div className="home-load-handoff__copy">
        <p><span>OM / portfolio</span><i>opening the desk</i></p>
        <div className="home-load-handoff__title" aria-hidden="true"><b>STUDIO</b><span>×</span><em>MAKER</em></div>
        <div className="home-load-handoff__ledger" aria-hidden="true"><span>signal</span><i /><span>paper</span></div>
        <strong>{reducedMotion ? "Portfolio ready" : "Two ways of making, one point of view."}</strong>
      </div>
      <button type="button" className="home-load-handoff__skip" onClick={() => setIsVisible(false)}>Skip opening <span aria-hidden="true">↗</span></button>
    </section>
  );
}
