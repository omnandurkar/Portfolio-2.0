// Split-Screen Studio: The original compact Studio–Maker pill remains visually familiar while a fixed shell keeps it reachable on every route.
import { motion } from "framer-motion";
import { Grid2X2, PencilLine } from "lucide-react";
import { useRef, useState } from "react";
import { usePortfolioMode } from "@/contexts/ModeContext";
import "./TetheredModeControl.css";
import "./ModeDrag.css";

export default function TetheredModeControl() {
  const { mode, toggleMode } = usePortfolioMode();
  const isStudio = mode === "studio";
  const [dragging, setDragging] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const switchedByDrag = useRef(false);

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
    }
  };
  const clickMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (switchedByDrag.current) { event.preventDefault(); switchedByDrag.current = false; return; }
    toggleMode();
  };

  return <div className="tethered-mode-control">
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
  </div>;
}
