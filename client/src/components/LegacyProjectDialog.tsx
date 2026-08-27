/** Design reminder — This dialog is an archival detour: Studio frames an older deployment as a measured system notice, while Maker frames it as a preserved college project card. */
import { ArrowUpRight, FileText, ShieldAlert } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@/data/portfolio";
import { usePortfolioMode } from "@/contexts/ModeContext";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import "./LegacyProjectDialog.css";

type LegacyProjectDialogProps = {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
};

export default function LegacyProjectDialog({ project, onOpenChange }: LegacyProjectDialogProps) {
  const { mode } = usePortfolioMode();
  if (!project) return null;

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className={`legacy-project-dialog legacy-project-dialog-${mode}`}>
        <div className="legacy-project-dialog-card">
          <span className="legacy-project-dialog-rail" aria-hidden="true">ARCHIVE / EARLY WORK<i /></span>
          <div className="legacy-project-dialog-glow" aria-hidden="true" />
          <DialogHeader className="legacy-project-dialog-head">
            <p className="legacy-project-dialog-label"><ShieldAlert size={14} /> College-era archive</p>
            <DialogTitle>{project.title}<em>.</em></DialogTitle>
            <DialogDescription>
              This is an early project kept as a record of the craft, ideas, and learning behind it.
            </DialogDescription>
          </DialogHeader>
          <div className="legacy-project-dialog-context">
            <span>WHY THE LINK MAY BE DOWN</span>
            <p>The original deployment may no longer function as expected. Its libraries, Node/runtime version, build tooling, or hosting requirements may now be out of date. You can still try the historic link, or read the project note to see the work in context.</p>
          </div>
          <div className="legacy-project-dialog-project-note">
            <FileText size={17} />
            <p><b>Better first stop:</b> the project note preserves the brief, stack, contribution, and available source evidence.</p>
          </div>
          <DialogFooter className="legacy-project-dialog-actions">
            <a href={project.liveUrl} target="_blank" rel="noreferrer"><ArrowUpRight size={15} /> Visit anyway</a>
            <Link href={`/work/${project.slug}`} onClick={() => onOpenChange(false)}><FileText size={15} /> Read the project</Link>
          </DialogFooter>
          <p className="legacy-project-dialog-footnote">This notice only appears for legacy records whose public deployments were unavailable during the latest portfolio check.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
