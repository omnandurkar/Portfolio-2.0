// Split-Screen Studio: a low-profile continuation signal uses instrument precision in Studio and a taped field note in Maker, always guiding attention without competing with content.
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { usePortfolioMode } from "@/contexts/ModeContext";
import "./ScrollContinuationCue.css";

export default function ScrollContinuationCue() {
  const { mode } = usePortfolioMode();
  const [atEnd, setAtEnd] = useState(false);
  const isStudio = mode === "studio";

  useEffect(() => {
    const checkPosition = () => {
      const documentHeight = document.documentElement.scrollHeight;
      setAtEnd(window.scrollY + window.innerHeight >= documentHeight - 96);
    };

    checkPosition();
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition);
    return () => {
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, []);

  if (atEnd) return null;

  return (
    <button
      type="button"
      className={`scroll-continuation-cue ${isStudio ? "is-studio" : "is-maker"}`}
      onClick={() => window.scrollBy({ top: Math.max(window.innerHeight * 0.72, 420), behavior: "smooth" })}
      aria-label="Continue to the next part of the portfolio"
    >
      <span className="scroll-continuation-eyebrow">{isStudio ? "NEXT SIGNAL" : "KEEP DIGGING"}</span>
      <span className="scroll-continuation-copy">{isStudio ? "Scroll for the proof" : "There’s more on the desk"}</span>
      <ArrowDown className="scroll-continuation-arrow" size={16} aria-hidden="true" />
    </button>
  );
}
