// Split-Screen Studio: the 404 is a small recovery shelf, not a dead end—every playful object leads back into an ordinary portfolio route.
import { ArrowUpRight, BookOpen, Home, Map, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { usePortfolioMode } from "@/contexts/ModeContext";
import "./NotFoundShelf.css";

const shelfRoutes = [
  { label: "Selected work", note: "proof, projects, and process", route: "/?continue=work#work", icon: Sparkles },
  { label: "Story cartridge", note: "the human side of the work", route: "/story", icon: BookOpen },
  { label: "Field Guide", note: "signals, shortcuts, and small rules", route: "/field-guide", icon: Map },
];

export default function NotFound() {
  const [, setLocation] = useLocation();
  const { mode } = usePortfolioMode();
  return <main className={`not-found-shelf mode-${mode}`}><div className="not-found-grid" aria-hidden="true" /><section className="not-found-intro"><p>404 / misplaced but not lost</p><h1>This page slipped<br /><em>behind the shelf.</em></h1><span>Choose a useful route back into the portfolio.</span><button type="button" onClick={() => setLocation("/")}><Home size={15} /> Return home</button></section><section className="secret-shelf" aria-label="Secret recovery shelf"><div className="secret-shelf-top"><span>RECOVERY SHELF / 03 ROUTES</span><i>found a little detour</i></div><div className="secret-shelf-items">{shelfRoutes.map((item, index) => { const Icon = item.icon; return <button type="button" className={`shelf-item shelf-item-${index + 1}`} key={item.label} onClick={() => setLocation(item.route)}><Icon size={18} /><b>{item.label}</b><small>{item.note}</small><ArrowUpRight size={14} /></button>; })}</div><p>Nothing important is hidden here. This is just a better way to get unlost.</p></section></main>;
}
