// Split-Screen Studio: Hover Atlas hints explain purposeful controls after a deliberate pause, with full keyboard focus support and no dependency on hover for essential use.
import type { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usePortfolioMode } from "@/contexts/ModeContext";
import "./HoverHint.css";

export function HoverHint({ label, detail, children, side = "top" }: { label: string; detail: string; children: ReactNode; side?: "top" | "right" | "bottom" | "left" }) {
  const { mode } = usePortfolioMode();
  return <Tooltip delayDuration={1000}>
    <TooltipTrigger asChild><span className="hover-atlas-trigger">{children}</span></TooltipTrigger>
    <TooltipContent side={side} sideOffset={11} className={`hover-atlas-content hover-atlas-${mode}`}><span className="hover-atlas-kicker"><i /> {mode === "studio" ? "SIGNAL READOUT" : "FIELD NOTE"}</span><strong className="hover-atlas-title">{label}</strong><p>{detail}</p></TooltipContent>
  </Tooltip>;
}
