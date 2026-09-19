// Split-Screen Studio: this one-time opening handoff lets the black signal field and tactile paper desk meet at a precise centre seam.
import { useEffect, useState } from "react";
import "./HomeLoadHandoff.css";

const initialNavigation = typeof window !== "undefined" ? window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined : undefined;
const enteredAtHome = typeof window !== "undefined" && window.location.pathname === "/" && initialNavigation?.type === "reload";
let homeHandoffConsumed = false;

export default function HomeLoadHandoff() {
  return null;
}
