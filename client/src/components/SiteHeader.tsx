// Split-Screen Studio: Navigation stays quiet in Studio mode and becomes a taped-in notebook tab bar in Scrapbook mode.
/** Design reminder — Header résumé access now enters the visual Proofboard; only that route hands visitors to the real source PDF. */
import { MapPinned, Menu, X } from "lucide-react";
import { type MouseEvent, useState } from "react";
import { Link, useLocation } from "wouter";
import { HoverHint } from "@/components/HoverHint";
import "./SiteHeaderEggs.css";

const navItems = [
  { label: "About", anchor: "about" },
  { label: "Work", anchor: "work" },
  { label: "Experience", anchor: "experience" },
  { label: "Contact", anchor: "contact" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [routeMapOpen, setRouteMapOpen] = useState(false);
  const [resumeNoteOpen, setResumeNoteOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const homePrefix = location === "/" ? "" : "/";
  const closeMenu = () => setMenuOpen(false);
  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (event.detail >= 3) {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent("om:orbit"));
      setRouteMapOpen(true);
    }
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <HoverHint label="Home terminal" detail="Return to the portfolio’s main signal. Triple-click the OM mark for a small orbit discovery." side="bottom"><Link href="/" className="brand-lockup" onClick={handleBrandClick} aria-label="Om Nandurkar home. Tap three times for a hidden signal.">
          <img src="/assets/om-monogram_8c27653c.png" alt="" />
          <span>OM</span>
          <em>OM NANDURKAR</em>
        </Link></HoverHint>

        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
          {navItems.map((item) => (
            <HoverHint key={item.anchor} label={item.label} detail={{ About: "A concise view of Om’s working approach.", Work: "Selected builds with evidence and case-study routes.", Experience: "Teams, internships, and practical delivery context.", Contact: "Choose a direct reason to start a conversation." }[item.label] ?? item.label} side="bottom"><a href={`${homePrefix}#${item.anchor}`} onClick={closeMenu}>{item.label}</a></HoverHint>
          ))}
          <HoverHint label="Story cartridge" detail="Play Om’s scroll-driven side quest, with scene navigation and parallax worlds." side="bottom"><Link href="/story" onClick={closeMenu}>Story</Link></HoverHint>
          <HoverHint label="Field guide" detail="Inspect the portfolio’s hidden controls, materials, and creative system." side="bottom"><Link href="/field-guide" onClick={closeMenu}>Guide</Link></HoverHint>
          <HoverHint label="Project archive" detail="Browse every project and its evidence-aware case-study note." side="bottom"><Link href="/all-projects" onClick={closeMenu}>Archive</Link></HoverHint>
        </nav>

        <div className="header-actions">
          <div className="resume-margin-wrap"><HoverHint label="Résumé proofboard" detail="Open a visual, recruiter-ready résumé with interactive work evidence and a direct route to the real PDF. Shift + Enter reveals a margin note." side="bottom"><Link className="resume-link" href="/resume" onKeyDown={(event) => { if (event.shiftKey && event.key === "Enter") { event.preventDefault(); setResumeNoteOpen((open) => !open); } }}>Resume <span>↗</span></Link></HoverHint>{resumeNoteOpen && <span className="resume-margin-note" role="status">Built for skim-reading: context, proof, and a direct source-document handoff.</span>}</div>
          <button className="mobile-menu" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X size={19} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {routeMapOpen && <div className="header-route-map" role="dialog" aria-label="Portfolio route map"><button type="button" aria-label="Close route map" onClick={() => setRouteMapOpen(false)}><X size={16} /></button><span><MapPinned size={14} /> OM / route map</span><div><button type="button" onClick={() => { setRouteMapOpen(false); setLocation("/"); }}>Home signal</button><button type="button" onClick={() => { setRouteMapOpen(false); setLocation("/story"); }}>Story cartridge</button><button type="button" onClick={() => { setRouteMapOpen(false); setLocation("/field-guide"); }}>Field Guide</button></div><p>A small map for a portfolio that never hides its main path.</p></div>}
    </header>
  );
}
