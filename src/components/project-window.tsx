"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

type Collection = "projects" | "hackathons";

export function ProjectWindow() {
  const [collection, setCollection] = useState<Collection>("projects");
  const [edges, setEdges] = useState({ start: true, end: false });
  const rail = useRef<HTMLDivElement>(null);
  const items = projects.filter(project => collection === "projects" ? project.category === "Personal project" : project.category !== "Personal project");

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    element.scrollLeft = 0;
    const update = () => setEdges({ start: element.scrollLeft <= 2, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); element.removeEventListener("scroll", update); };
  }, [collection]);

  function scroll(direction: number) {
    const element = rail.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * .85, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <section className="work-window" aria-label="Selected work">
      <div className="work-window-title">
        <div className="work-tabs" role="tablist" aria-label="Work collection">
          {(["projects", "hackathons"] as const).map(value => <button key={value} id={`${value}-tab`} type="button" role="tab" aria-selected={collection === value} aria-controls="work-panel" tabIndex={collection === value ? 0 : -1} onClick={() => setCollection(value)} onKeyDown={event => {
            if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
              event.preventDefault();
              const next = event.key === "Home" ? "projects" : event.key === "End" ? "hackathons" : value === "projects" ? "hackathons" : "projects";
              setCollection(next);
              document.getElementById(`${next}-tab`)?.focus();
            }
          }}>{value === "projects" ? "Projects" : "Hackathons"}</button>)}
        </div>
        <div className="work-arrows"><button type="button" onClick={() => scroll(-1)} disabled={edges.start} aria-label="Scroll work left">←</button><button type="button" onClick={() => scroll(1)} disabled={edges.end} aria-label="Scroll work right">→</button></div>
      </div>
      <div key={collection} ref={rail} id="work-panel" className="work-rail" role="tabpanel" aria-labelledby={`${collection}-tab`} tabIndex={0} onKeyDown={event => {
        if (event.target === event.currentTarget && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); scroll(event.key === "ArrowLeft" ? -1 : 1); }
      }}>
        {items.map((project, index) => <Link href={`/projects/${project.slug}`} className="work-card" key={project.slug}>
          <div className="work-image">
            {project.images[0] ? <Image src={project.images[0].src} alt={project.images[0].alt} fill sizes="(max-width: 640px) 80vw, 380px" /> : <div className="desk-rewards-art"><span>Go / Canadian rewards</span><strong>More out<br />of everyday.</strong><span>rates + caps + wallets</span></div>}
            {project.recordingUrl && <span className="work-recording">Demo recording</span>}
          </div>
          <div className="work-card-heading"><span className="work-number">0{index + 1}</span><h2>{project.category === "Personal project" ? project.title : project.category}</h2><span aria-hidden="true">↗</span></div>
          <p>{project.summary}</p>
          <div className="work-meta">
            {project.category === "Personal project" ? <ul className="work-stack" aria-label="Technology stack">{project.stack.map(technology => <li key={technology} data-technology={technology}>{technology}</li>)}</ul> : <span className="work-category">{project.title}</span>}
          </div>
        </Link>)}
      </div>
      <div className="work-window-foot"><span>{items.length} {collection}</span><span>Swipe or scroll sideways <span aria-hidden="true">↔</span></span></div>
    </section>
  );
}
