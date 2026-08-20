// Split-Screen Studio: A signature, accessible mode control that conveys transformation rather than a generic theme switch.
import { motion } from "framer-motion";
import { Grid2X2, PencilLine } from "lucide-react";
import { usePortfolioMode } from "@/contexts/ModeContext";

export default function ModeToggle() {
  const { mode, toggleMode } = usePortfolioMode();
  const isStudio = mode === "studio";

  return (
    <button className="mode-toggle" onClick={toggleMode} type="button" aria-label={`Switch to ${isStudio ? "scrapbook" : "studio"} mode`}>
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
  );
}
