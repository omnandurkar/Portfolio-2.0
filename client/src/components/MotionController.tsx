// Split-Screen Studio: Lenis and GSAP add quiet cinematic continuity in Studio mode while Scrapbook remains tactile and light.
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { usePortfolioMode } from "@/contexts/ModeContext";

export default function MotionController() {
  const { mode } = usePortfolioMode();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || mode !== "studio") return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.82 });
    let frame = 0;
    const animate = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(animate); };
    frame = requestAnimationFrame(animate);
    const art = document.querySelector<HTMLElement>(".studio-hero-art");
    const marquee = document.querySelector<HTMLElement>(".hero-marquee");
    const context = gsap.context(() => {
      if (art) gsap.to(art, { scale: 1.08, yPercent: 5, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      if (marquee) gsap.to(marquee, { yPercent: 50, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "70% top", end: "bottom top", scrub: true } });
    });
    return () => { cancelAnimationFrame(frame); lenis.destroy(); context.revert(); ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); };
  }, [mode]);

  return null;
}
