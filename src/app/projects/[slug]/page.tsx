import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/project-gallery";
import { getProject, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return { title: project?.title ?? "Project not found", description: project?.description };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const others = projects.filter(item => item.slug !== project.slug);
  return <main id="main-content" className="detail-page"><div className="detail-top"><Link href="/" className="back-link">← Back to all projects</Link><span className="eyebrow">{project.category}</span></div><header className="detail-heading"><div><h1>{project.title}</h1><p>{project.subtitle}</p></div><ul className="stack-list" aria-label="Technology stack">{project.stack.map(item => <li key={item}>{item}</li>)}</ul></header><ProjectGallery images={project.images} /><div className="project-story"><div><p className="project-description">{project.description}</p><section><h2>{project.slug === "navis" ? "The project" : "My contribution"}</h2><p>{project.contribution}</p></section><section><h2>A closer look</h2><ul>{project.highlights.map(item => <li key={item}>{item}</li>)}</ul></section></div><aside className="project-actions" aria-label="Explore this project">{project.liveUrl && <a className="action-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Open live app ↗</a>}{project.recordingUrl && <><a className="action-link" href={project.recordingUrl} target="_blank" rel="noopener noreferrer">Watch recording ↗</a><span className="action-note">Opens the demo video on Dropbox.</span></>}{project.codeUrl && <a className="action-link" href={project.codeUrl} target="_blank" rel="noopener noreferrer">Explore the code ↗</a>}{!project.liveUrl && !project.recordingUrl && !project.codeUrl && <span className="action-note">Screenshot walkthrough above.</span>}</aside></div><nav className="other-projects" aria-label="Other projects"><span className="eyebrow">Also on my desk</span><div>{others.map(item => <Link href={`/projects/${item.slug}`} key={item.slug}>{item.title} ↗</Link>)}</div></nav></main>;
}
