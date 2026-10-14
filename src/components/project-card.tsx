import { ProjectPreview } from "./project-preview";
import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className={`project-card project-${project.slug}`} aria-label={`${project.title}: ${project.summary}`}>
      <div className="project-visual">
        <ProjectPreview project={project} />
        <span className="project-arrow" aria-hidden="true">↗</span>
      </div>
      <div className="project-copy">
        <span className="eyebrow">{project.category}</span>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
      </div>
    </Link>
  );
}
