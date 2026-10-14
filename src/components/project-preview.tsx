import type { Project } from "@/data/projects";
import { ProjectScreenshot } from "./project-screenshot";

export function ProjectPreview({ project }: { project: Project }) {
  const image = project.preview ?? project.images[0];
  if (!image) return null;
  const kind = image.kind ?? (project.recordingUrl ? "recording" : "screenshot");
  return <div className={`project-preview preview-${project.slug}`}>
    <div className="preview-bar"><span>{image.label.replace(/ · recording still$/, "")}</span><span>{kind === "recording" ? "Recording still" : kind === "illustration" ? "Illustration" : "Screenshot"}</span></div>
    <div className="preview-capture"><ProjectScreenshot image={image} /></div>
  </div>;
}
