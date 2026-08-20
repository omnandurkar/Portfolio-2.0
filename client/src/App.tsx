// Split-Screen Studio: App routing preserves the curated homepage and a separately navigable project archive.
/** Design reminder — Proofboard / Signal Sheet is a deliberate fifth route in the same Studio ↔ Maker system, not an external résumé detour. */
import MotionController from "@/components/MotionController";
import InteractionAtlas from "@/components/InteractionAtlas";
import TetheredModeControl from "@/components/TetheredModeControl";
import "@/components/VisualQa.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AllProjects from "@/pages/AllProjects";
import CaseStudy from "@/pages/CaseStudy";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import FieldGuide from "@/pages/FieldGuide";
import Story from "@/pages/Story";
import Resume from "@/pages/Resume";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ModeProvider } from "./contexts/ModeContext";

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/resume" component={Resume} /><Route path="/story" component={Story} /><Route path="/field-guide" component={FieldGuide} /><Route path="/all-projects" component={AllProjects} /><Route path="/work/:slug" component={CaseStudy} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ModeProvider><MotionController /><InteractionAtlas /><TetheredModeControl /><TooltipProvider><Toaster /><Router /></TooltipProvider></ModeProvider></ErrorBoundary>;
}
