import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const image = project.images[0];
  return (
    <Link href={`/projects/${project.slug}`} className={`project-card project-${project.slug}`} aria-label={`${project.title}: ${project.summary}`}>
      <div className="project-visual">
        {image ? (
          <div className="project-screen">
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 540px) 90vw, (max-width: 760px) 44vw, 28vw" />
          </div>
        ) : (
          <div className="go-art" aria-label="Go rewards engine project illustration">
            <span className="eyebrow">Go / Rewards engine</span>
            <strong>Spend smarter.</strong>
            <span className="eyebrow">Rates · Caps · Wallets</span>
          </div>
        )}
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
