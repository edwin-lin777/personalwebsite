"use client";

import { useState } from "react";
import { ProjectScreenshot } from "./project-screenshot";
import type { ProjectImage } from "@/data/projects";

export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [active, setActive] = useState(0);
  if (!images.length) {
    return <div className="project-no-image"><span className="eyebrow">Go / Rewards engine</span><h2>Spending in.<br />Rewards out.</h2><p>Category rates, spending caps, and annual fees.<br />A closer look at the rules behind the rewards.</p><span className="eyebrow">Visual demo to be added</span></div>;
  }
  const image = images[active];
  return (
    <figure className="project-gallery">
      <div className="gallery-image"><ProjectScreenshot key={image.src} image={image} /></div>
      <figcaption>
        {images.length > 1 ? <div className="image-options" aria-label="Project screenshots">{images.map((item, index) => <button key={item.src} type="button" onClick={() => setActive(index)} aria-pressed={index === active}>{item.label}</button>)}</div> : <span>{image.label}</span>}
        <span className="gallery-note">{image.kind === "recording" ? "Demo recording still" : image.kind === "illustration" ? "Workflow illustration" : "Screenshot preview"}</span>
      </figcaption>
    </figure>
  );
}
